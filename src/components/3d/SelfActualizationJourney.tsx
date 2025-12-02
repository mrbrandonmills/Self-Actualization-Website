/**
 * Self-Actualization Journey - A Coherent Narrative Experience
 *
 * THE STORY:
 * Act 1 (0-33%): Discovery - You find three ancient tomes floating in the void
 * Act 2 (33-66%): Awakening - The books open, revealing paths of light and knowledge
 * Act 3 (66-100%): Transcendence - Books form a portal, you pass through into transformation
 *
 * METAPHOR: The books are not just objects - they are gates to self-knowledge
 * JOURNEY: From darkness and confusion → through learning → to integration and clarity
 */

'use client';

import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface BookProps {
  position: [number, number, number];
  coverTexture: string;
  scale: number;
  actProgress: number; // 0-1 for each act
  bookId: 'foundation' | 'practice' | 'mastery';
}

function NarrativeBook({ position, coverTexture, scale, actProgress, bookId }: BookProps) {
  const groupRef = useRef<THREE.Group>(null);
  const leftCoverRef = useRef<THREE.Mesh>(null);
  const rightCoverRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.PointLight>(null);

  const texture = useLoader(THREE.TextureLoader, coverTexture);

  useEffect(() => {
    if (!groupRef.current || !leftCoverRef.current || !rightCoverRef.current) return;

    // Act-based animation timeline
    if (actProgress > 0 && actProgress <= 0.5) {
      // Act 1: Books begin to glow from within
      const glowIntensity = actProgress * 2; // 0 to 1
      gsap.to(glowRef.current, {
        intensity: glowIntensity * 5,
        duration: 0.5,
      });
    } else if (actProgress > 0.5) {
      // Act 2: Books open dramatically
      const openProgress = (actProgress - 0.5) * 2; // 0 to 1
      gsap.to(leftCoverRef.current.rotation, {
        y: -Math.PI * 0.5 * openProgress,
        duration: 1,
        ease: 'power2.out',
      });
      gsap.to(rightCoverRef.current.rotation, {
        y: Math.PI * 0.5 * openProgress,
        duration: 1,
        ease: 'power2.out',
      });
    }
  }, [actProgress]);

  // Breathing animation - books are alive
  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;

    // Gentle breathing
    const breath = Math.sin(time * 0.5) * 0.05;
    groupRef.current.scale.setScalar(scale * (1 + breath));

    // Slow rotation - ancient wisdom rotating through time
    groupRef.current.rotation.y = time * 0.1;
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Spine */}
      <mesh castShadow>
        <boxGeometry args={[0.2, 2.4, 0.3]} />
        <meshStandardMaterial
          color="#5c4033"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Left Cover */}
      <mesh
        ref={leftCoverRef}
        position={[-1.1, 0, 0]}
        castShadow
      >
        <boxGeometry args={[2, 0.05, 2.4]} />
        <meshStandardMaterial
          map={texture}
          color="#ffffff"
          roughness={0.7}
          metalness={0.2}
          emissive="#FFD700"
          emissiveIntensity={actProgress * 0.5}
        />
      </mesh>

      {/* Right Cover */}
      <mesh
        ref={rightCoverRef}
        position={[1.1, 0, 0]}
        castShadow
      >
        <boxGeometry args={[2, 0.05, 2.4]} />
        <meshStandardMaterial
          color="#5c4033"
          roughness={0.7}
          metalness={0.2}
        />
      </mesh>

      {/* Inner Glow - represents knowledge within */}
      <pointLight
        ref={glowRef}
        position={[0, 0, 0]}
        color="#FFD700"
        intensity={0}
        distance={10}
        decay={2}
      />

      {/* Page light streams - only visible when book opens */}
      {actProgress > 0.5 && (
        <>
          {[...Array(5)].map((_, i) => (
            <mesh
              key={i}
              position={[0, 0, i * 0.5]}
              rotation={[0, 0, 0]}
            >
              <planeGeometry args={[0.1, 3]} />
              <meshBasicMaterial
                color="#FFD700"
                transparent
                opacity={(actProgress - 0.5) * 0.4}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          ))}
        </>
      )}
    </group>
  );
}

// Thought Particles - represent ideas emerging from the books
function ThoughtParticles({ scrollProgress }: { scrollProgress: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 500;

  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Particles emerge from book centers
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = Math.random() * 5;

      positions[i3] = Math.cos(angle) * radius;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = Math.sin(angle) * radius;

      // Golden light
      colors[i3] = 1.0;
      colors[i3 + 1] = 0.84;
      colors[i3 + 2] = 0.0;
    }

    return { positions, colors };
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

    // Particles float upward and outward - thoughts rising
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      positions[i3 + 1] += 0.02 * scrollProgress; // Rise faster with scroll

      // Expand outward
      const distance = Math.sqrt(
        positions[i3] ** 2 + positions[i3 + 2] ** 2
      );
      const angle = Math.atan2(positions[i3 + 2], positions[i3]);

      positions[i3] = Math.cos(angle) * (distance + 0.01);
      positions[i3 + 2] = Math.sin(angle) * (distance + 0.01);

      // Wrap around
      if (positions[i3 + 1] > 10) {
        positions[i3 + 1] = -10;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  // Only show particles in Act 2+
  if (scrollProgress < 0.33) return null;

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
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

interface SelfActualizationJourneyProps {
  scrollProgress: number;
}

export function SelfActualizationJourney({ scrollProgress }: SelfActualizationJourneyProps) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const sceneGroupRef = useRef<THREE.Group>(null);

  // Determine which act we're in
  const currentAct = Math.floor(scrollProgress * 3); // 0, 1, or 2
  const actProgress = (scrollProgress * 3) % 1; // 0-1 within current act

  useFrame(() => {
    if (!cameraRef.current || !sceneGroupRef.current) return;

    // Act 1: Camera approaches the books from distance
    if (currentAct === 0) {
      const targetZ = 15 - actProgress * 5; // 15 to 10
      cameraRef.current.position.z += (targetZ - cameraRef.current.position.z) * 0.05;
    }

    // Act 2: Camera circles around books as they open
    else if (currentAct === 1) {
      const angle = actProgress * Math.PI; // 0 to 180 degrees
      const radius = 8;
      const targetX = Math.sin(angle) * radius;
      const targetZ = Math.cos(angle) * radius + 10;

      cameraRef.current.position.x += (targetX - cameraRef.current.position.x) * 0.05;
      cameraRef.current.position.z += (targetZ - cameraRef.current.position.z) * 0.05;
      cameraRef.current.lookAt(0, 0, 0);
    }

    // Act 3: Camera passes through the portal formed by books
    else if (currentAct === 2) {
      const targetZ = 10 - actProgress * 15; // Pass through
      const targetX = actProgress * 20; // Shift right dramatically

      cameraRef.current.position.z += (targetZ - cameraRef.current.position.z) * 0.05;
      cameraRef.current.position.x += (targetX - cameraRef.current.position.x) * 0.05;
    }
  });

  return (
    <>
      <perspectiveCamera
        ref={cameraRef}
        position={[0, 0, 15]}
        fov={60}
      />

      <group ref={sceneGroupRef}>
        {/* Act 1-2: Books in triangular formation - representing the three pillars */}
        <NarrativeBook
          position={[0, 2, 0]}
          coverTexture="/textures/books/block-a-b-cover.png"
          scale={1.2}
          actProgress={actProgress}
          bookId="foundation"
        />

        <NarrativeBook
          position={[-3, -1, 0]}
          coverTexture="/textures/books/block-c-cover.jpg"
          scale={1.0}
          actProgress={Math.max(0, actProgress - 0.2)} // Opens slightly after first
          bookId="practice"
        />

        <NarrativeBook
          position={[3, -1, 0]}
          coverTexture="/textures/books/block-a-b-cover.png"
          scale={1.0}
          actProgress={Math.max(0, actProgress - 0.4)} // Opens last
          bookId="mastery"
        />

        {/* Thought Particles - ideas flowing from books */}
        <ThoughtParticles scrollProgress={scrollProgress} />
      </group>

      {/* Atmospheric Lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 10, 10]} intensity={1} color="#C4A35A" />

      {/* Act 3: Bright light at the end of the tunnel */}
      {currentAct === 2 && (
        <pointLight
          position={[actProgress * 20, 0, -10]}
          intensity={actProgress * 10}
          color="#FFFFFF"
          distance={50}
        />
      )}
    </>
  );
}
