/**
 * KasaneBookJourney - Book Opens, Pages Flip, Camera 360°, Book Closes & Fades
 * Starts closed → Pages flip naturally → Camera orbits 360° → Book closes → Fades out
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
  const pivotRef = useRef<THREE.Group>(null); // Pivot at spine
  const meshRef = useRef<THREE.Mesh>(null);

  // Load page texture
  const texture = useLoader(THREE.TextureLoader, `/book-pages/${pageNumber}.png`);

  // Determine if left or right page
  const isLeftPage = pageNumber % 2 === 1;

  // Calculate when this specific page should flip
  // Book opens gradually: pages flip sequentially from 0% to 80% of scroll
  const flipStartProgress = (pageNumber - 1) / totalPages * 0.8;
  const flipDuration = 0.05; // Each page takes 5% of scroll to flip
  const flipEndProgress = flipStartProgress + flipDuration;

  // At 80%-95% all pages are open (pause for viewing)
  // At 95%-100% book closes back up

  useFrame(() => {
    if (!pivotRef.current || !meshRef.current) return;

    let rotationAmount = 0;

    if (scrollProgress < 0.8) {
      // OPENING PHASE (0% - 80%)
      const pageProgress = THREE.MathUtils.clamp(
        (scrollProgress - flipStartProgress) / flipDuration,
        0,
        1
      );

      // Ease for smooth flip
      const eased = pageProgress < 0.5
        ? 4 * pageProgress * pageProgress * pageProgress
        : 1 - Math.pow(-2 * pageProgress + 2, 3) / 2;

      rotationAmount = eased;
    } else if (scrollProgress >= 0.8 && scrollProgress < 0.95) {
      // OPEN STATE (80% - 95%) - All pages fully open
      rotationAmount = 1;
    } else {
      // CLOSING PHASE (95% - 100%)
      const closeProgress = (scrollProgress - 0.95) / 0.05;
      const eased = closeProgress < 0.5
        ? 4 * closeProgress * closeProgress * closeProgress
        : 1 - Math.pow(-2 * closeProgress + 2, 3) / 2;

      rotationAmount = 1 - eased; // Reverse from 1 to 0
    }

    // Apply rotation at pivot (spine)
    if (isLeftPage) {
      pivotRef.current.rotation.y = -Math.PI * rotationAmount; // Flip left
    } else {
      pivotRef.current.rotation.y = Math.PI * rotationAmount; // Flip right
    }

    // Slight bend/curl for realism
    const curlAmount = Math.sin(rotationAmount * Math.PI) * 0.08;
    meshRef.current.rotation.x = curlAmount;
  });

  return (
    <group
      position={isLeftPage ? [-1.5, 0, (pageNumber - totalPages / 2) * 0.003] : [1.5, 0, (pageNumber - totalPages / 2) * 0.003]}
    >
      {/* Pivot point at spine for rotation */}
      <group ref={pivotRef} position={isLeftPage ? [1.5, 0, 0] : [-1.5, 0, 0]}>
        <mesh ref={meshRef} position={isLeftPage ? [-1.5, 0, 0] : [1.5, 0, 0]}>
          <planeGeometry args={[3, 4]} />
          <meshStandardMaterial
            map={texture}
            side={THREE.DoubleSide}
            roughness={0.6}
            metalness={0.05}
          />
        </mesh>
      </group>
    </group>
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

  // BOOK MOVEMENT - Flies through space, stops at end, fades
  useFrame(({ clock }) => {
    if (!bookRef.current) return;

    const time = clock.getElapsedTime();

    // Book flies forward until 95%, then stops
    if (scrollProgress < 0.95) {
      const zPosition = THREE.MathUtils.lerp(70, -30, scrollProgress / 0.95);
      bookRef.current.position.z = zPosition;

      // Flowing path while flying
      const pathFreq = scrollProgress * Math.PI * 2;
      bookRef.current.position.x = Math.sin(pathFreq) * 6 + Math.cos(time * 0.15) * 0.8;
      bookRef.current.position.y = Math.cos(pathFreq * 0.8) * 4 + Math.sin(time * 0.12) * 0.6;

      // Elegant rotation while flying
      bookRef.current.rotation.x = scrollProgress * Math.PI * 1.2 + Math.sin(time * 0.25) * 0.1;
      bookRef.current.rotation.y = scrollProgress * Math.PI * 3 + Math.cos(time * 0.2) * 0.15;
      bookRef.current.rotation.z = Math.sin(scrollProgress * Math.PI * 1.5) * 0.3;

      // Scale grows as it approaches
      const scale = THREE.MathUtils.lerp(0.7, 2.0, scrollProgress / 0.95);
      bookRef.current.scale.setScalar(scale);
    } else {
      // STOP MOVEMENT at 95% - Book freezes in space
      // Position locked at final position
      bookRef.current.position.z = -30;

      // Slight hover in place
      bookRef.current.position.y = Math.sin(time * 0.5) * 0.2;

      // Subtle rotation
      bookRef.current.rotation.y = Math.PI * 3 + Math.cos(time * 0.3) * 0.05;

      // Scale locked
      bookRef.current.scale.setScalar(2.0);
    }

    // FADE OUT at very end (98% - 100%)
    if (scrollProgress >= 0.98) {
      const fadeProgress = (scrollProgress - 0.98) / 0.02;
      const opacity = 1 - fadeProgress;

      // Fade all children
      bookRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((mat) => {
              mat.transparent = true;
              mat.opacity = opacity;
            });
          } else {
            child.material.transparent = true;
            child.material.opacity = opacity;
          }
        }
      });
    }
  });

  // CAMERA 360° ORBIT - Full rotation around the book
  useFrame(({ clock }) => {
    if (!cameraRef.current || !bookRef.current) return;

    const time = clock.getElapsedTime();

    // Camera does FULL 360° orbit (2π radians = 360 degrees)
    const orbitAngle = scrollProgress * Math.PI * 2 + time * 0.25; // 1 full rotation + continuous spin
    const orbitRadius = 20 - scrollProgress * 6; // Gets closer: 20 → 14

    // Height variation - swooping up and down
    const heightBase = Math.sin(scrollProgress * Math.PI * 3) * 10;
    const heightWave = Math.sin(orbitAngle * 0.6) * 3;

    // Calculate camera orbit position
    const targetX = bookRef.current.position.x + Math.cos(orbitAngle) * orbitRadius;
    const targetY = bookRef.current.position.y + heightBase + heightWave;
    const targetZ = bookRef.current.position.z + Math.sin(orbitAngle) * orbitRadius + 10;

    // Smooth camera movement
    cameraRef.current.position.x += (targetX - cameraRef.current.position.x) * 0.1;
    cameraRef.current.position.y += (targetY - cameraRef.current.position.y) * 0.1;
    cameraRef.current.position.z += (targetZ - cameraRef.current.position.z) * 0.1;

    // Organic camera sway
    const swayX = Math.sin(time * 1.8) * 0.4;
    const swayY = Math.cos(time * 1.5) * 0.3;
    cameraRef.current.position.x += swayX;
    cameraRef.current.position.y += swayY;

    // Always look at book
    cameraRef.current.lookAt(bookRef.current.position);

    // Dynamic FOV zoom
    const fovBase = 68;
    const fovZoom = Math.sin(scrollProgress * Math.PI * 4) * 12;
    const fovShake = Math.sin(time * 2.5) * 1.5;
    cameraRef.current.fov = fovBase + fovZoom + fovShake;
    cameraRef.current.updateProjectionMatrix();
  });

  return (
    <>
      {/* 360° Orbiting Camera */}
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[20, 8, 80]}
        fov={68}
        near={0.1}
        far={300}
      />

      {/* The Flying Book */}
      <group ref={bookRef} position={[0, 0, 70]}>
        {/* Front Cover - CLOSED at start, visible */}
        <mesh position={[-1.5, 0, -0.2]} castShadow>
          <boxGeometry args={[3, 4, 0.1]} />
          <meshStandardMaterial
            color="#5a4a3a"
            roughness={0.75}
            metalness={0.2}
          />
        </mesh>

        {/* Back Cover */}
        <mesh position={[1.5, 0, 0.2]} castShadow>
          <boxGeometry args={[3, 4, 0.1]} />
          <meshStandardMaterial
            color="#5a4a3a"
            roughness={0.75}
            metalness={0.2}
          />
        </mesh>

        {/* Spine */}
        <mesh position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
          <boxGeometry args={[0.4, 4, 0.5]} />
          <meshStandardMaterial
            color="#3d2f25"
            roughness={0.85}
          />
        </mesh>

        {/* All 87 Pages - Start CLOSED */}
        {pages.map((pageNum) => (
          <BookPage
            key={pageNum}
            pageNumber={pageNum}
            scrollProgress={scrollProgress}
            totalPages={totalPages}
          />
        ))}

        {/* Dynamic glow */}
        <pointLight
          position={[0, 0, 0]}
          color="#FFD700"
          intensity={1 + scrollProgress * 6}
          distance={30}
          decay={2}
        />
      </group>

      {/* BRIGHT Background */}
      <color attach="background" args={['#f5f3ef']} />

      {/* Cinematic Lighting */}
      <ambientLight intensity={1.3} color="#ffffff" />

      <directionalLight
        position={[25, 35, 25]}
        intensity={2.8}
        color="#fffbf5"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      <directionalLight
        position={[-20, 18, -18]}
        intensity={1.8}
        color="#e8dcc0"
      />

      <pointLight
        position={[0, -25, 20]}
        intensity={1.5}
        color="#fff5e0"
        distance={100}
      />

      <spotLight
        position={[15, 25, 35]}
        intensity={2.5}
        angle={0.6}
        penumbra={0.6}
        color="#fff8eb"
        castShadow
      />

      <fog attach="fog" args={['#f5f3ef', 60, 180]} />

      <Environment preset="apartment" />
    </>
  );
}
