/**
 * CosmicJourney - Interactive Animated Space/Cosmos Journey
 * Inspired by The Monolith Project and cosmos-themed award-winning sites
 * Features:
 * - Mouse/touch interaction (hold to fly faster)
 * - Dynamic camera perspective changes
 * - Animated stars, nebulae, particles, fluid motion
 * - Player ship traveling through space
 */

'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment, Stars } from '@react-three/drei';
import * as THREE from 'three';

export interface CosmicChapter {
  id: string;
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  starDensity?: number;
  nebulaColor?: string;
  particleCount?: number;
}

interface CosmicJourneyProps {
  chapters: CosmicChapter[];
  scrollProgress: number;
}

// Animated nebula cloud
function AnimatedNebula({ position, color, scrollProgress }: {
  position: [number, number, number];
  color: string;
  scrollProgress: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Custom shader for nebula effect
  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      opacity: { value: 1.0 }, // Increased from 0.6 to 1.0 for more visibility
      color: { value: new THREE.Color(color) },
    }),
    [color]
  );

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.getElapsedTime() * 0.2;
    }
    if (meshRef.current) {
      // Slow rotation
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      meshRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.1) * 0.2;

      // Pulsing scale
      const pulse = 1 + Math.sin(clock.getElapsedTime() * 0.5) * 0.1;
      meshRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[15, 32, 32]} /> {/* Increased from 5 to 15 for MUCH bigger nebulae */}
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexShader={`
          varying vec2 vUv;
          varying vec3 vPosition;

          void main() {
            vUv = uv;
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float time;
          uniform float opacity;
          uniform vec3 color;

          varying vec2 vUv;
          varying vec3 vPosition;

          // Noise function
          vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
          vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
          vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

          float snoise(vec2 v) {
            const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
            vec2 i  = floor(v + dot(v, C.yy));
            vec2 x0 = v -   i + dot(i, C.xx);
            vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
            vec4 x12 = x0.xyxy + C.xxzz;
            x12.xy -= i1;
            i = mod289(i);
            vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
            vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
            m = m*m;
            m = m*m;
            vec3 x = 2.0 * fract(p * C.www) - 1.0;
            vec3 h = abs(x) - 0.5;
            vec3 ox = floor(x + 0.5);
            vec3 a0 = x - ox;
            m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
            vec3 g;
            g.x  = a0.x  * x0.x  + h.x  * x0.y;
            g.yz = a0.yz * x12.xz + h.yz * x12.yw;
            return 130.0 * dot(m, g);
          }

          void main() {
            // Create flowing nebula pattern
            float noise1 = snoise(vUv * 3.0 + time * 0.5);
            float noise2 = snoise(vUv * 5.0 - time * 0.3);
            float noise3 = snoise(vUv * 8.0 + time * 0.7);

            float pattern = (noise1 + noise2 * 0.5 + noise3 * 0.25) / 1.75;

            // Edge fade
            float dist = length(vPosition) / 5.0;
            float edgeFade = 1.0 - smoothstep(0.3, 1.0, dist);

            float alpha = pattern * opacity * edgeFade;
            alpha = clamp(alpha, 0.0, 1.0);

            gl_FragColor = vec4(color, alpha);
          }
        `}
      />
    </mesh>
  );
}

// Animated particle field
function CosmicParticles({
  position,
  count = 1000,
  color = '#C4A35A',
  spread = 20
}: {
  position: [number, number, number];
  count?: number;
  color?: string;
  spread?: number;
}) {
  const pointsRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Random positions in sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = Math.random() * spread;

      positions[i3] = position[0] + radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = position[1] + radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = position[2] + radius * Math.cos(phi);

      // Random velocities for drift
      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;

      sizes[i] = Math.random() * 0.15 + 0.05;
    }

    return { positions, velocities, sizes };
  }, [count, spread, position]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const time = clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Gentle floating animation
      positions[i3] += particles.velocities[i3] + Math.sin(time + i) * 0.001;
      positions[i3 + 1] += particles.velocities[i3 + 1] + Math.cos(time + i) * 0.001;
      positions[i3 + 2] += particles.velocities[i3 + 2];

      // Wrap around boundary
      const dx = positions[i3] - position[0];
      const dy = positions[i3 + 1] - position[1];
      const dz = positions[i3 + 2] - position[2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (dist > spread) {
        positions[i3] = position[0] + (Math.random() - 0.5) * spread * 0.5;
        positions[i3 + 1] = position[1] + (Math.random() - 0.5) * spread * 0.5;
        positions[i3 + 2] = position[2] + (Math.random() - 0.5) * spread * 0.5;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={particles.sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color={color}
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Animated energy rings
function EnergyRings({
  position,
  count = 3,
  color = '#C4A35A'
}: {
  position: [number, number, number];
  count?: number;
  color?: string;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.3;
    groupRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.5) * 0.2;
  });

  return (
    <group ref={groupRef} position={position}>
      {Array.from({ length: count }).map((_, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2 + i * 1, 0.05, 16, 64]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
            transparent
            opacity={0.6 - i * 0.15}
          />
        </mesh>
      ))}
    </group>
  );
}

// Player ship - user's vessel traveling through space
function PlayerShip({ speedMultiplier }: { speedMultiplier: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    const time = clock.getElapsedTime();

    // Gentle bobbing motion
    groupRef.current.position.y = Math.sin(time * 2) * 0.05;
    groupRef.current.position.x = Math.cos(time * 1.5) * 0.03;

    // Tilt based on movement
    groupRef.current.rotation.z = Math.sin(time * 1.5) * 0.1;
    groupRef.current.rotation.x = speedMultiplier * -0.2; // Pitch forward when accelerating

    // Enhanced glow when accelerating
    if (glowRef.current) {
      glowRef.current.intensity = 2 + speedMultiplier * 3;
    }
  });

  return (
    <group ref={groupRef} position={[0, -2, 5]}> {/* Positioned lower and closer for visibility */}
      {/* Main ship body - MUCH BIGGER sleek delta wing */}
      <mesh position={[0, 0, 0]}>
        <coneGeometry args={[1.5, 3.5, 3]} /> {/* 5x bigger */}
        <meshStandardMaterial
          color="#C4A35A"
          emissive="#FFD700"
          emissiveIntensity={2.0}
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Wings - MUCH BIGGER */}
      <mesh position={[-1, 0, -1]} rotation={[0, 0, Math.PI / 6]}>
        <boxGeometry args={[3, 0.2, 1.5]} />
        <meshStandardMaterial
          color="#8A9A6A"
          emissive="#C4A35A"
          emissiveIntensity={1.5}
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[1, 0, -1]} rotation={[0, 0, -Math.PI / 6]}>
        <boxGeometry args={[3, 0.2, 1.5]} />
        <meshStandardMaterial
          color="#8A9A6A"
          emissive="#C4A35A"
          emissiveIntensity={1.5}
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>

      {/* Engine glow - MUCH BRIGHTER */}
      <pointLight
        ref={glowRef}
        position={[0, 0, -2]}
        color="#FFD700"
        intensity={10}
        distance={20}
        decay={1}
      />

      {/* Engine trail particles - BIGGER */}
      <mesh position={[0, 0, -2.5]}>
        <sphereGeometry args={[0.5, 8, 8]} />
        <meshBasicMaterial
          color="#FFD700"
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

export function CosmicJourney({ chapters, scrollProgress }: CosmicJourneyProps) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const targetRef = useRef<THREE.Object3D>(null);

  // Interactive speed control - hold mouse/touch to fly faster
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
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

  useFrame(({ clock }) => {
    if (!cameraRef.current || !targetRef.current || chapters.length === 0) return;

    // Smoothly interpolate speed multiplier
    const targetSpeed = isAccelerating ? 3 : 1;
    const currentSpeed = speedMultiplier;
    const newSpeed = currentSpeed + (targetSpeed - currentSpeed) * 0.1;
    setSpeedMultiplier(newSpeed);

    const chapterIndex = Math.min(
      Math.floor(scrollProgress * chapters.length),
      chapters.length - 1
    );

    const chapterProgress = (scrollProgress * chapters.length) % 1;

    const currentChapter = chapters[chapterIndex];
    const nextChapter = chapters[Math.min(chapterIndex + 1, chapters.length - 1)];

    // Smooth camera journey with enhanced perspective changes
    const lerpedCameraPos = new THREE.Vector3().lerpVectors(
      new THREE.Vector3(...currentChapter.cameraPosition),
      new THREE.Vector3(...nextChapter.cameraPosition),
      chapterProgress
    );

    const lerpedTarget = new THREE.Vector3().lerpVectors(
      new THREE.Vector3(...currentChapter.cameraTarget),
      new THREE.Vector3(...nextChapter.cameraTarget),
      chapterProgress
    );

    // Add dynamic perspective shifts
    const time = clock.getElapsedTime();

    // Subtle camera sway for immersion
    const swayX = Math.sin(time * 0.3) * 0.5;
    const swayY = Math.cos(time * 0.4) * 0.3;
    const swayZ = Math.sin(time * 0.25) * 0.8;

    lerpedCameraPos.x += swayX;
    lerpedCameraPos.y += swayY;
    lerpedCameraPos.z += swayZ;

    // Enhanced FOV when accelerating for speed feeling
    if (cameraRef.current) {
      const targetFov = 60 + (newSpeed - 1) * 20; // 60 to 100 FOV
      cameraRef.current.fov += (targetFov - cameraRef.current.fov) * 0.1;
      cameraRef.current.updateProjectionMatrix();
    }

    cameraRef.current.position.lerp(lerpedCameraPos, 0.1);
    targetRef.current.position.lerp(lerpedTarget, 0.1);
    cameraRef.current.lookAt(targetRef.current.position);
  });

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={chapters[0]?.cameraPosition || [0, 0, 10]}
        fov={60}
      />

      <object3D ref={targetRef} position={chapters[0]?.cameraTarget || [0, 0, 0]} />

      {/* Player ship - user's vessel */}
      <PlayerShip speedMultiplier={speedMultiplier} />

      {/* Animated starfield background - more stars, faster movement */}
      <Stars
        radius={150}
        depth={80}
        count={8000}
        factor={6}
        saturation={0}
        fade
        speed={speedMultiplier * 2}
      />

      {/* Environment */}
      <Environment preset="night" />

      {/* Ambient space lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={1} color="#ffffff" distance={100} decay={2} />

      {/* Chapter 1: Birth - Golden nebula with particles */}
      <AnimatedNebula position={[0, 0, 0]} color="#C4A35A" scrollProgress={scrollProgress} />
      <CosmicParticles position={[0, 0, 0]} count={1500} color="#C4A35A" spread={15} />

      {/* Chapter 2: Awakening - Purple/blue nebula with energy rings */}
      <AnimatedNebula position={[25, 5, -10]} color="#6B7BC4" scrollProgress={scrollProgress} />
      <EnergyRings position={[25, 5, -10]} count={4} color="#6B7BC4" />
      <CosmicParticles position={[25, 5, -10]} count={2000} color="#8A9ACA" spread={20} />

      {/* Chapter 3: Growth - Green nebula cluster */}
      <AnimatedNebula position={[45, 8, 5]} color="#6B7B4C" scrollProgress={scrollProgress} />
      <AnimatedNebula position={[50, 6, -5]} color="#8A9A6A" scrollProgress={scrollProgress} />
      <CosmicParticles position={[47, 7, 0]} count={2500} color="#8A9A6A" spread={25} />

      {/* Chapter 4: Transformation - Multi-color cosmic storm */}
      <AnimatedNebula position={[70, 4, -15]} color="#C45AA3" scrollProgress={scrollProgress} />
      <AnimatedNebula position={[68, 8, -12]} color="#C4A35A" scrollProgress={scrollProgress} />
      <EnergyRings position={[69, 6, -13]} count={5} color="#C4A35A" />
      <CosmicParticles position={[69, 6, -13]} count={3000} color="#ffffff" spread={30} />

      {/* Chapter 5: Actualization - Brilliant white/gold supernova */}
      <AnimatedNebula position={[95, 10, 10]} color="#FFFFFF" scrollProgress={scrollProgress} />
      <AnimatedNebula position={[95, 10, 10]} color="#C4A35A" scrollProgress={scrollProgress} />
      <EnergyRings position={[95, 10, 10]} count={6} color="#FFD700" />
      <CosmicParticles position={[95, 10, 10]} count={4000} color="#FFD700" spread={35} />

      {/* Emanating light from final destination */}
      <pointLight position={[95, 10, 10]} intensity={3} color="#FFD700" distance={50} decay={2} />
    </>
  );
}
