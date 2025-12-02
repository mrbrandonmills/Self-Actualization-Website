/**
 * KasaneBookJourney - Flying Book Through Space
 * Complete book with 87 pages that flies and flips as you scroll
 * KASANÉ-style camera action following the book
 */

'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface BookPageProps {
  pageNumber: number;
  scrollProgress: number;
  totalPages: number;
}

function BookPage({ pageNumber, scrollProgress, totalPages }: BookPageProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Load page texture
  const texture = useLoader(THREE.TextureLoader, `/book-pages/${pageNumber}.png`);

  // Calculate which page should be flipping based on scroll
  const pageProgress = (pageNumber - 1) / totalPages;
  const flipProgress = THREE.MathUtils.clamp(
    (scrollProgress - pageProgress) / (1 / totalPages),
    0,
    1
  );

  // Easing for smooth page flip
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
  const easedFlip = easeOutCubic(flipProgress);

  useFrame(() => {
    if (!meshRef.current) return;

    // Pages start flat (closed book), rotate to open as scroll progresses
    const isLeftPage = pageNumber % 2 === 0;

    if (isLeftPage) {
      // Left pages rotate to the left
      meshRef.current.rotation.y = -Math.PI * easedFlip;
    } else {
      // Right pages rotate to the right
      meshRef.current.rotation.y = Math.PI * easedFlip;
    }

    // Stack pages slightly offset for thickness
    const pageThickness = 0.002;
    const zOffset = (pageNumber - totalPages / 2) * pageThickness;
    meshRef.current.position.z = zOffset;

    // Pages at the spine
    const xOffset = isLeftPage ? -1.5 : 1.5;
    meshRef.current.position.x = xOffset;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[3, 4]} />
      <meshStandardMaterial
        map={texture}
        side={THREE.DoubleSide}
        roughness={0.4}
        metalness={0.1}
      />
    </mesh>
  );
}

interface KasaneBookJourneyProps {
  scrollProgress: number;
}

export function KasaneBookJourney({ scrollProgress }: KasaneBookJourneyProps) {
  const bookRef = useRef<THREE.Group>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  const totalPages = 87;
  const pages = useMemo(() => Array.from({ length: totalPages }, (_, i) => i + 1), [totalPages]);

  // Book movement and rotation based on scroll
  useFrame(({ clock }) => {
    if (!bookRef.current) return;

    const time = clock.getElapsedTime();

    // Book flies through space - moves along Z axis
    const zPosition = THREE.MathUtils.lerp(50, -50, scrollProgress);
    bookRef.current.position.z = zPosition;

    // Book spirals as it flies
    const spiralAngle = scrollProgress * Math.PI * 4; // 2 full rotations
    const spiralRadius = 10 * (1 - scrollProgress * 0.5); // Spiral inward
    bookRef.current.position.x = Math.cos(spiralAngle) * spiralRadius;
    bookRef.current.position.y = Math.sin(spiralAngle) * spiralRadius * 0.5;

    // Multi-axis rotation of the entire book (KASANÉ style)
    bookRef.current.rotation.x = scrollProgress * Math.PI * 2 + Math.sin(time * 0.5) * 0.1;
    bookRef.current.rotation.y = scrollProgress * Math.PI * 6 + Math.cos(time * 0.3) * 0.15;
    bookRef.current.rotation.z = Math.sin(scrollProgress * Math.PI * 3) * 0.3;

    // Scale changes - book gets larger as it approaches
    const scale = THREE.MathUtils.lerp(0.5, 2.0, scrollProgress);
    bookRef.current.scale.setScalar(scale);
  });

  // ACTION MOVIE CAMERA - Follows the book
  useFrame(({ clock }) => {
    if (!cameraRef.current || !bookRef.current) return;

    const time = clock.getElapsedTime();

    // Camera follows the book's position with smooth interpolation
    const targetX = bookRef.current.position.x * 0.3;
    const targetY = bookRef.current.position.y * 0.3;
    const targetZ = bookRef.current.position.z + 15; // Stay behind the book

    cameraRef.current.position.x += (targetX - cameraRef.current.position.x) * 0.05;
    cameraRef.current.position.y += (targetY - cameraRef.current.position.y) * 0.05;
    cameraRef.current.position.z += (targetZ - cameraRef.current.position.z) * 0.05;

    // Camera sway for dynamic feel
    const swayX = Math.sin(time * 0.5) * 1.5;
    const swayY = Math.cos(time * 0.3) * 1.0;
    cameraRef.current.position.x += swayX * 0.1;
    cameraRef.current.position.y += swayY * 0.1;

    // Look at the book
    cameraRef.current.lookAt(bookRef.current.position);

    // Dynamic FOV for drama
    const fovChange = Math.sin(scrollProgress * Math.PI * 4) * 10;
    cameraRef.current.fov = 70 + fovChange;
    cameraRef.current.updateProjectionMatrix();
  });

  return (
    <>
      {/* Action Movie Camera */}
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 0, 65]}
        fov={70}
        near={0.1}
        far={200}
      />

      {/* The Flying Book - All Pages Together */}
      <group ref={bookRef} position={[0, 0, 50]}>
        {/* Book Cover - Front */}
        <mesh position={[1.5, 0, -0.1]}>
          <boxGeometry args={[3, 4, 0.05]} />
          <meshStandardMaterial
            color="#8b7355"
            roughness={0.6}
            metalness={0.2}
          />
        </mesh>

        {/* Book Cover - Back */}
        <mesh position={[-1.5, 0, 0.1]}>
          <boxGeometry args={[3, 4, 0.05]} />
          <meshStandardMaterial
            color="#8b7355"
            roughness={0.6}
            metalness={0.2}
          />
        </mesh>

        {/* Spine */}
        <mesh position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[0.2, 4, 0.3]} />
          <meshStandardMaterial
            color="#5c4033"
            roughness={0.8}
          />
        </mesh>

        {/* All 87 Pages */}
        {pages.map((pageNum) => (
          <BookPage
            key={pageNum}
            pageNumber={pageNum}
            scrollProgress={scrollProgress}
            totalPages={totalPages}
          />
        ))}

        {/* Book glow/aura */}
        <pointLight
          position={[0, 0, 0]}
          color="#FFD700"
          intensity={3 + scrollProgress * 5}
          distance={20}
          decay={2}
        />
      </group>

      {/* BRIGHT Environment */}
      <color attach="background" args={['#faf8f5']} />

      {/* Beautiful lighting */}
      <ambientLight intensity={1.0} color="#ffffff" />

      {/* Key light */}
      <directionalLight
        position={[15, 25, 15]}
        intensity={2.0}
        color="#fff8e7"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Rim light */}
      <directionalLight
        position={[-15, 10, -10]}
        intensity={1.0}
        color="#e8d5b7"
      />

      {/* Fill light */}
      <pointLight
        position={[0, -15, 10]}
        intensity={0.8}
        color="#ffe4b5"
        distance={60}
      />

      {/* Subtle fog for depth */}
      <fog attach="fog" args={['#faf8f5', 40, 120]} />

      {/* Environment for reflections */}
      <Environment preset="apartment" />
    </>
  );
}
