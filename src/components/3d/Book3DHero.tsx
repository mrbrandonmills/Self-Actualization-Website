/**
 * Book3DHero - Scroll-Driven 3D Book Explosion
 * Features "Blocks A & B" with full explosion/reassembly animation
 * Based on Kas

ane Keyboard & Monolith Project patterns
 */

'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useScrollProgress, mapRange } from '@/hooks/useScrollProgress';
import { SplitText } from '@/components/animations';

// Particle system configuration
const PARTICLE_COUNT = 800;
const PARTICLE_SPREAD = 8;

interface BookPartProps {
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  explodeProgress: number;
  scale?: number;
  texture?: THREE.Texture | null;
}

// Individual book part (cover, pages, spine)
function BookPart({ position, rotation, color, explodeProgress, scale = 1, texture = null }: BookPartProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Determine material type based on color
  const isCover = color.includes('#3D4A23') || color.includes('#6B7B4C') || color.includes('#8A9A6A');
  const isPage = color.includes('#F2EDE6');

  useFrame(() => {
    if (!meshRef.current) return;

    // Explosion offset
    const offset = explodeProgress * 3;
    meshRef.current.position.x = position[0] + offset * (position[0] * 2);
    meshRef.current.position.y = position[1] + offset * (position[1] * 2);
    meshRef.current.position.z = position[2] + offset * Math.abs(position[2] * 3);

    // Rotation during explosion
    meshRef.current.rotation.x = rotation[0] + explodeProgress * Math.PI * position[0];
    meshRef.current.rotation.y = rotation[1] + explodeProgress * Math.PI * position[1];
    meshRef.current.rotation.z = rotation[2] + explodeProgress * Math.PI * 0.5;
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow scale={scale}>
      <boxGeometry args={[2, 3, 0.3]} />
      {isCover ? (
        // Premium leather/cloth material for covers (with optional texture)
        <meshStandardMaterial
          map={texture || undefined}
          color={texture ? '#FFFFFF' : color}
          roughness={0.4}
          metalness={0.1}
          envMapIntensity={0.8}
          normalScale={new THREE.Vector2(0.5, 0.5)}
        />
      ) : (
        // Soft paper material for pages
        <meshStandardMaterial
          color={isPage ? '#F2EDE6' : color}
          roughness={0.95}
          metalness={0.0}
          envMapIntensity={0.3}
        />
      )}
    </mesh>
  );
}

// Particle explosion system
function Particles({ explosionFactor }: { explosionFactor: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate particle positions and velocities once
  const particles = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      // Start particles at book center
      positions[i3] = (Math.random() - 0.5) * 0.5;
      positions[i3 + 1] = (Math.random() - 0.5) * 0.5;
      positions[i3 + 2] = (Math.random() - 0.5) * 0.3;

      // Random velocity directions
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      velocities[i3] = Math.sin(phi) * Math.cos(theta);
      velocities[i3 + 1] = Math.sin(phi) * Math.sin(theta);
      velocities[i3 + 2] = Math.cos(phi);

      // Cream and olive particle colors
      const colorChoice = Math.random();
      if (colorChoice < 0.3) {
        // Cream particles
        colors[i3] = 0.95;
        colors[i3 + 1] = 0.93;
        colors[i3 + 2] = 0.9;
      } else if (colorChoice < 0.6) {
        // Olive particles
        colors[i3] = 0.42;
        colors[i3 + 1] = 0.48;
        colors[i3 + 2] = 0.3;
      } else {
        // Gold particles
        colors[i3] = 0.77;
        colors[i3 + 1] = 0.64;
        colors[i3 + 2] = 0.35;
      }
    }

    return { positions, velocities, colors };
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

    // Only update if exploding (explosionFactor > 0)
    if (explosionFactor > 0) {
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;

        // Move particles outward
        positions[i3] = particles.positions[i3] + particles.velocities[i3] * explosionFactor * PARTICLE_SPREAD;
        positions[i3 + 1] = particles.positions[i3 + 1] + particles.velocities[i3 + 1] * explosionFactor * PARTICLE_SPREAD - (explosionFactor * 2); // Gravity
        positions[i3 + 2] = particles.positions[i3 + 2] + particles.velocities[i3 + 2] * explosionFactor * PARTICLE_SPREAD;
      }

      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  // Only render if exploding
  if (explosionFactor <= 0) return null;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={PARTICLE_COUNT}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={Math.max(0, 1 - explosionFactor * 0.8)} // Fade out as they expand
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Cinematic Camera Controller
function CinematicCamera({ scrollProgress }: { scrollProgress: number }) {
  useFrame(({ camera }) => {
    // Calculate animation stages
    const initProgress = mapRange(scrollProgress, 0, 0.15, 0, 1);
    const explodeProgress = mapRange(scrollProgress, 0.15, 0.5, 0, 1);
    const orbitProgress = mapRange(scrollProgress, 0.5, 0.75, 0, 1);
    const reassembleProgress = mapRange(scrollProgress, 0.75, 1, 0, 1);

    // Camera position journey (zoom in then pull back)
    const zoomIn = Math.max(0, initProgress - explodeProgress * 0.5);
    camera.position.z = 8 - zoomIn * 2 + explodeProgress * 3;

    // Cinematic pitch (tilt up/down)
    camera.rotation.x =
      initProgress * -0.1 + // Start with slight down tilt
      explodeProgress * 0.3 + // Tilt up during explosion
      orbitProgress * -0.2; // Tilt down during orbit

    // Cinematic roll (dutch angle)
    camera.rotation.z =
      explodeProgress * Math.sin(explodeProgress * Math.PI) * 0.15 + // Roll during explosion
      reassembleProgress * -Math.sin(reassembleProgress * Math.PI) * 0.1; // Counter-roll during reassembly

    // Horizontal pan
    camera.position.x =
      explodeProgress * Math.sin(explodeProgress * Math.PI * 2) * 1.5 + // Pan during explosion
      orbitProgress * Math.cos(orbitProgress * Math.PI) * 1;

    // Vertical movement
    camera.position.y =
      explodeProgress * 0.5 + // Rise during explosion
      reassembleProgress * -0.5; // Descend during reassembly
  });

  return null;
}

// Complete Book Model
function Book3DModel({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);

  // Load real book cover texture
  const coverTexture = useTexture('/books/blocks-a-b/page-01-cover.jpg');

  // Calculate animation stages
  const rotationProgress = mapRange(scrollProgress, 0, 0.2, 0, 1);
  const explodeProgress = mapRange(scrollProgress, 0.2, 0.6, 0, 1);
  const orbitProgress = mapRange(scrollProgress, 0.6, 0.85, 0, 1);
  const reassembleProgress = mapRange(scrollProgress, 0.85, 1, 0, 1);

  // Combined explosion factor
  const explosionFactor = explodeProgress - reassembleProgress;

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    // Initial rotation (0-20% scroll)
    const baseRotation = rotationProgress * Math.PI * 0.5;
    groupRef.current.rotation.y = baseRotation;

    // Dramatic rotation during explosion
    if (explodeProgress > 0 && explodeProgress < 1) {
      groupRef.current.rotation.y += explodeProgress * Math.PI * 2;
      groupRef.current.rotation.x = Math.sin(explodeProgress * Math.PI) * 0.4;
    }

    // Orbit effect (60-85% scroll)
    if (orbitProgress > 0) {
      const time = clock.getElapsedTime();
      groupRef.current.rotation.y += Math.sin(time * 0.5) * orbitProgress * 0.5;
      groupRef.current.rotation.x = Math.cos(time * 0.3) * orbitProgress * 0.3;
      groupRef.current.rotation.z = Math.sin(time * 0.2) * orbitProgress * 0.2;
    }

    // Final reassembly rotation
    if (reassembleProgress > 0) {
      groupRef.current.rotation.y = baseRotation + reassembleProgress * Math.PI * 3;
      groupRef.current.rotation.x = reassembleProgress * 0.1;
      groupRef.current.rotation.z = 0;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Front Cover - with real book cover texture */}
      <BookPart
        position={[0, 0, 0.15]}
        rotation={[0, 0, 0]}
        color="#3D4A23"
        explodeProgress={explosionFactor}
        texture={coverTexture}
      />

      {/* Back Cover - with real book cover texture */}
      <BookPart
        position={[0, 0, -0.15]}
        rotation={[0, Math.PI, 0]}
        color="#6B7B4C"
        explodeProgress={explosionFactor}
        texture={coverTexture}
      />

      {/* Pages (multiple layers) */}
      {[...Array(5)].map((_, i) => (
        <BookPart
          key={i}
          position={[0, 0, -0.1 + i * 0.05]}
          rotation={[0, 0, 0]}
          color="#F2EDE6"
          explodeProgress={explosionFactor * (1 + i * 0.1)}
          scale={0.98}
        />
      ))}

      {/* Spine - darker to match book cover */}
      <mesh position={[-1, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <boxGeometry args={[0.3, 3, 0.3]} />
        <meshStandardMaterial
          color="#3A3A3A"
          roughness={0.6}
          metalness={0.05}
          envMapIntensity={0.6}
        />
      </mesh>

      {/* Particle explosion effect */}
      <Particles explosionFactor={explosionFactor} />
    </group>
  );
}

// Main Hero Component
export function Book3DHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useScrollProgress(containerRef);

  return (
    <div ref={containerRef} className="relative w-full h-[200vh]">
      {/* Fixed Canvas Container */}
      <div className="sticky top-0 h-screen w-full">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          shadows
          gl={{
            antialias: true,
            alpha: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.2,
          }}
        >
          {/* Premium Lighting Setup */}
          {/* Ambient base light */}
          <ambientLight intensity={0.3} />

          {/* Key light - main directional */}
          <directionalLight
            position={[5, 5, 5]}
            intensity={1.5}
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-camera-near={0.5}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
            color="#FFFAEB"
          />

          {/* Fill light - soften shadows */}
          <directionalLight
            position={[-3, 2, -3]}
            intensity={0.6}
            color="#E8DCC4"
          />

          {/* Rim light - edge highlight */}
          <spotLight
            position={[0, 5, -8]}
            intensity={0.8}
            angle={0.4}
            penumbra={1}
            color="#C4A35A"
          />

          {/* Accent warm glow */}
          <pointLight
            position={[-5, 3, -5]}
            intensity={0.4}
            color="#C4A35A"
            distance={15}
            decay={2}
          />

          {/* Cinematic Camera Animation */}
          <CinematicCamera scrollProgress={scrollProgress} />

          {/* Book Model */}
          <Book3DModel scrollProgress={scrollProgress} />

          {/* Dev Controls (comment out for production) */}
          {/* <OrbitControls enableZoom={false} /> */}
        </Canvas>

        {/* Scroll Progress Indicator (dev only) */}
        <div className="absolute top-4 right-4 bg-black/50 text-white px-4 py-2 rounded text-sm font-mono">
          Scroll: {(scrollProgress * 100).toFixed(0)}%
        </div>

        {/* Hero Text Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center max-w-4xl px-[var(--space-md)]">
            <h1
              className="headline-playful mb-[var(--space-xl)]"
              style={{
                opacity: mapRange(scrollProgress, 0, 0.2, 1, 0),
                transform: `translateY(${scrollProgress * -100}px)`,
              }}
            >
              <SplitText
                type="chars"
                reveal="slide-up"
                stagger={0.05}
                duration={1}
                triggerOnView={false}
              >
                Blocks A & B
              </SplitText>
              <br />
              <span className="text-[var(--accent-warm)]">
                <SplitText
                  type="chars"
                  reveal="rotate"
                  stagger={0.04}
                  delay={0.5}
                  duration={0.9}
                  triggerOnView={false}
                >
                  Your Journey Awaits
                </SplitText>
              </span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
