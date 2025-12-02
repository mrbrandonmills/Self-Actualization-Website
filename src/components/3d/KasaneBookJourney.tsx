/**
 * KasaneBookJourney - Award-Winning 3D Scroll Hero Experience
 * 87 book pages flying through space with KASANÉ-style camera action
 * Multi-axis rotation, dramatic camera movements, staggered choreography
 */

'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface FlyingPageProps {
  pageNumber: number;
  scrollProgress: number;
  totalPages: number;
}

function FlyingPage({ pageNumber, scrollProgress, totalPages }: FlyingPageProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Load page texture
  const texture = useLoader(THREE.TextureLoader, `/book-pages/${pageNumber}.png`);

  // Calculate this page's position in the sequence (0 to 1)
  const pageProgress = pageNumber / totalPages;

  // Staggered timing - each page activates at different scroll points
  const startScroll = pageProgress * 0.7; // Pages spread across 70% of scroll
  const endScroll = startScroll + 0.3; // Each page active for 30% of scroll

  // Local progress for this specific page (0 to 1)
  const localProgress = THREE.MathUtils.clamp(
    (scrollProgress - startScroll) / (endScroll - startScroll),
    0,
    1
  );

  // Easing function for smooth motion
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
  const easedProgress = easeOutCubic(localProgress);

  // Position pages in a spiral path through 3D space
  const spiralRadius = 15;
  const spiralHeight = 100;
  const spiralRotations = 4;

  const angle = pageProgress * Math.PI * 2 * spiralRotations;
  const xPos = Math.cos(angle) * spiralRadius * (1 - pageProgress * 0.5); // Spiral inward
  const yPos = Math.sin(angle) * spiralRadius * 0.5; // Vertical wave
  const zPos = -pageProgress * spiralHeight; // Depth progression

  useFrame(({ clock }) => {
    if (!meshRef.current || !groupRef.current) return;

    const time = clock.getElapsedTime();

    // Position: Move from starting spiral position toward camera
    const progressX = THREE.MathUtils.lerp(xPos, 0, easedProgress);
    const progressY = THREE.MathUtils.lerp(yPos, 0, easedProgress);
    const progressZ = THREE.MathUtils.lerp(zPos, 10, easedProgress); // Fly toward camera

    groupRef.current.position.set(progressX, progressY, progressZ);

    // Multi-axis rotation (different patterns based on page number)
    const rotationPattern = pageNumber % 5;

    switch (rotationPattern) {
      case 0: // Spiral rotation
        meshRef.current.rotation.x = localProgress * Math.PI * 2 + time * 0.1;
        meshRef.current.rotation.y = localProgress * Math.PI * 4;
        meshRef.current.rotation.z = Math.sin(localProgress * Math.PI) * 0.5;
        break;

      case 1: // Tumble
        meshRef.current.rotation.x = localProgress * Math.PI * 3;
        meshRef.current.rotation.y = Math.sin(localProgress * Math.PI * 2) * 0.5;
        meshRef.current.rotation.z = localProgress * Math.PI * 2;
        break;

      case 2: // Flip
        meshRef.current.rotation.x = Math.cos(localProgress * Math.PI * 2) * 0.3;
        meshRef.current.rotation.y = localProgress * Math.PI * 6;
        meshRef.current.rotation.z = 0;
        break;

      case 3: // Wave
        meshRef.current.rotation.x = Math.sin(localProgress * Math.PI * 4) * 0.8;
        meshRef.current.rotation.y = localProgress * Math.PI * 2;
        meshRef.current.rotation.z = Math.cos(localProgress * Math.PI * 3) * 0.3;
        break;

      case 4: // Orbit
        meshRef.current.rotation.x = localProgress * Math.PI;
        meshRef.current.rotation.y = localProgress * Math.PI * 5 + time * 0.2;
        meshRef.current.rotation.z = Math.sin(time + pageNumber) * 0.2;
        break;
    }

    // Scale: Start small, grow as it approaches
    const scale = THREE.MathUtils.lerp(0.5, 2.5, easedProgress);
    groupRef.current.scale.setScalar(scale);

    // Opacity: Fade in as it approaches, fade out when passed
    if (meshRef.current.material instanceof THREE.MeshStandardMaterial) {
      if (localProgress < 0.1) {
        meshRef.current.material.opacity = localProgress * 10;
      } else if (localProgress > 0.9) {
        meshRef.current.material.opacity = (1 - localProgress) * 10;
      } else {
        meshRef.current.material.opacity = 1;
      }
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <planeGeometry args={[3, 4]} />
        <meshStandardMaterial
          map={texture}
          transparent
          opacity={0}
          side={THREE.DoubleSide}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>

      {/* Page glow when in focus */}
      {localProgress > 0.3 && localProgress < 0.7 && (
        <pointLight
          position={[0, 0, 1]}
          color="#FFD700"
          intensity={Math.sin((localProgress - 0.3) * Math.PI * 2.5) * 3}
          distance={15}
          decay={2}
        />
      )}
    </group>
  );
}

interface KasaneBookJourneyProps {
  scrollProgress: number;
}

export function KasaneBookJourney({ scrollProgress }: KasaneBookJourneyProps) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  const totalPages = 87;
  const pages = useMemo(() => Array.from({ length: totalPages }, (_, i) => i + 1), [totalPages]);

  // ACTION MOVIE CAMERA - Dynamic, following, dramatic
  useFrame(({ clock }) => {
    if (!cameraRef.current) return;

    const time = clock.getElapsedTime();

    // Camera moves forward through the spiral based on scroll
    const targetZ = THREE.MathUtils.lerp(50, -50, scrollProgress);
    cameraRef.current.position.z += (targetZ - cameraRef.current.position.z) * 0.05;

    // Dynamic X movement - camera sways as it flies
    const swayX = Math.sin(scrollProgress * Math.PI * 3 + time * 0.5) * 3;
    const targetX = swayX;
    cameraRef.current.position.x += (targetX - cameraRef.current.position.x) * 0.03;

    // Dynamic Y movement - camera rises and falls
    const waveY = Math.cos(scrollProgress * Math.PI * 2) * 4;
    const targetY = waveY;
    cameraRef.current.position.y += (targetY - cameraRef.current.position.y) * 0.04;

    // Camera rotation - look slightly ahead in the direction of movement
    const lookAheadX = swayX * 0.1;
    const lookAheadY = waveY * 0.1;
    const lookAheadZ = -10 - scrollProgress * 20;

    cameraRef.current.lookAt(lookAheadX, lookAheadY, lookAheadZ);

    // Field of view changes for drama - narrow when fast, wide when slow
    const fovChange = Math.sin(scrollProgress * Math.PI * 4) * 5;
    cameraRef.current.fov = 75 + fovChange;
    cameraRef.current.updateProjectionMatrix();
  });

  return (
    <>
      {/* Action Movie Camera */}
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 0, 50]}
        fov={75}
        near={0.1}
        far={200}
      />

      {/* All 87 Pages Flying Through Space */}
      {pages.map((pageNum) => (
        <FlyingPage
          key={pageNum}
          pageNumber={pageNum}
          scrollProgress={scrollProgress}
          totalPages={totalPages}
        />
      ))}

      {/* BRIGHT Environment - Not Dark */}
      <color attach="background" args={['#f5f5f0']} /> {/* Warm light beige */}

      {/* Beautiful lighting */}
      <ambientLight intensity={0.8} color="#ffffff" />

      {/* Key light from above */}
      <directionalLight
        position={[10, 20, 10]}
        intensity={1.5}
        color="#fff8e7"
        castShadow
      />

      {/* Rim light */}
      <directionalLight
        position={[-10, 5, -10]}
        intensity={0.8}
        color="#e8d5b7"
      />

      {/* Fill light from below */}
      <pointLight
        position={[0, -10, 0]}
        intensity={0.5}
        color="#ffe4b5"
        distance={50}
      />

      {/* Subtle fog for depth */}
      <fog attach="fog" args={['#f5f5f0', 30, 100]} />

      {/* Environment for reflections */}
      <Environment preset="apartment" />
    </>
  );
}
