/**
 * InfiniteJourney - Monolith-Inspired Infinite Space Journey
 * Continuous flying through space with hold-to-accelerate
 * Multiple zones that blend together seamlessly
 */

'use client';

import React, { useRef, useMemo, useState, useEffect, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Stars, ScrollControls, Scroll, Preload } from '@react-three/drei';
import * as THREE from 'three';
import { HorizontalBookPages } from './HorizontalBookGallery';

interface InfiniteJourneyProps {
  scrollProgress: number;
}

// Player character that flies through space
function FlyingCharacter({ speed }: { speed: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    const time = clock.getElapsedTime();

    // Gentle bobbing motion
    groupRef.current.position.y = Math.sin(time * 2 + speed) * 0.3;
    groupRef.current.position.x = Math.cos(time * 1.5) * 0.2;

    // Tilt based on speed
    groupRef.current.rotation.z = Math.sin(time * 1.5) * 0.15;
    groupRef.current.rotation.x = -speed * 0.3; // Pitch forward when fast

    // Enhanced glow when fast
    if (glowRef.current) {
      glowRef.current.intensity = 5 + speed * 10;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 8]}>
      {/* Main body - glowing orb */}
      <mesh>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial
          color="#FFD700"
          emissive="#FFD700"
          emissiveIntensity={2.0 + speed}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Inner core - brighter */}
      <mesh scale={0.6}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshBasicMaterial
          color="#FFFFFF"
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Trailing particles */}
      {[...Array(5)].map((_, i) => (
        <mesh key={i} position={[0, 0, -1 - i * 0.5]}>
          <sphereGeometry args={[0.2 - i * 0.03, 8, 8]} />
          <meshBasicMaterial
            color="#FFD700"
            transparent
            opacity={0.6 - i * 0.1}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}

      {/* Glow light */}
      <pointLight
        ref={glowRef}
        position={[0, 0, 0]}
        color="#FFD700"
        intensity={5}
        distance={30}
        decay={2}
      />
    </group>
  );
}

// Infinite tunnel of particles
function InfiniteTunnel({ speed, zone }: { speed: number; zone: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const particleCount = 2000;

  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Create tunnel effect - particles in a cylinder
      const angle = Math.random() * Math.PI * 2;
      const radius = 5 + Math.random() * 15;
      const z = Math.random() * 100 - 50;

      positions[i3] = Math.cos(angle) * radius;
      positions[i3 + 1] = Math.sin(angle) * radius;
      positions[i3 + 2] = z;

      // Color based on zone
      const zoneColors = [
        [0.77, 0.64, 0.35], // Gold
        [0.42, 0.48, 0.77], // Blue
        [0.54, 0.60, 0.42], // Green
        [0.77, 0.35, 0.64], // Purple
        [1.0, 1.0, 1.0],    // White
      ];

      const color = zoneColors[zone % zoneColors.length];
      colors[i3] = color[0];
      colors[i3 + 1] = color[1];
      colors[i3 + 2] = color[2];

      sizes[i] = Math.random() * 0.5 + 0.2;
    }

    return { positions, colors, sizes };
  }, [zone]);

  useFrame(() => {
    if (!pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

    // Move particles backwards (creates forward motion illusion)
    const moveSpeed = 0.5 + speed * 2;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      positions[i3 + 2] += moveSpeed;

      // Wrap around when too far
      if (positions[i3 + 2] > 50) {
        positions[i3 + 2] = -50;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={particles.colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particleCount}
          array={particles.sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.3}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Floating obstacles/landmarks
function FloatingLandmarks({ speed }: { speed: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    // Move landmarks backwards
    groupRef.current.position.z += (0.5 + speed * 2);

    // Wrap around
    if (groupRef.current.position.z > 50) {
      groupRef.current.position.z = -100;
    }

    // Gentle rotation
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.2;
  });

  return (
    <group ref={groupRef} position={[0, 0, -50]}>
      {/* Create ring obstacles */}
      {[...Array(10)].map((_, i) => (
        <group key={i} position={[0, 0, -i * 20]}>
          <mesh rotation={[0, 0, i * 0.3]}>
            <torusGeometry args={[8, 0.5, 16, 32]} />
            <meshStandardMaterial
              color="#C4A35A"
              emissive="#C4A35A"
              emissiveIntensity={1.0}
              transparent
              opacity={0.7}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function InfiniteJourney({ scrollProgress }: InfiniteJourneyProps) {
  // Speed control - hold mouse to go faster
  const [speed, setSpeed] = useState(0);
  const [isAccelerating, setIsAccelerating] = useState(false);

  useEffect(() => {
    const handleMouseDown = () => setIsAccelerating(true);
    const handleMouseUp = () => setIsAccelerating(false);
    const handleTouchStart = () => setIsAccelerating(true);
    const handleTouchEnd = () => setIsAccelerating(false);

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  useFrame(() => {
    // Smooth speed interpolation
    const targetSpeed = isAccelerating ? 1 : 0.3;
    const newSpeed = speed + (targetSpeed - speed) * 0.05;
    setSpeed(newSpeed);
  });

  return (
    <Suspense fallback={null}>
      <ScrollControls horizontal damping={4} pages={5} distance={1}>
        <Scroll>
          <HorizontalBookPages />
        </Scroll>
      </ScrollControls>
      <Preload />
    </Suspense>
  );
}
