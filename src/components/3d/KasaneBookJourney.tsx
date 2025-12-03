/**
 * KasaneBookJourney - Book Opens RIGHT TO LEFT, Ultra-Slow Elegant Page Turns
 * All pages flip from right to left like a real book
 * ULTRA SLOW: 75% slower page turning for maximum elegance
 * EXTENDED JOURNEY: Longer scroll animation for immersive experience
 * COVER ALWAYS VISIBLE: Front cover stays attached and visible
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
  const pivotRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  // Load page texture with error handling
  const texture = useLoader(THREE.TextureLoader, `/book-pages/${pageNumber}.png`, undefined, (error) => {
    console.warn(`Failed to load page ${pageNumber}:`, error);
  });

  // ALL PAGES TURN RIGHT TO LEFT (like a real book)
  // Pages start stacked on the right, flip over to the left

  // Calculate when this page flips
  // EXTENDED Opening: 0% to 90% scroll (even longer journey)
  // EXTRA ULTRA SLOW: 0.20 duration = 20% of scroll per page for maximum immersion
  const flipStartProgress = (pageNumber - 1) / totalPages * 0.90;
  const flipDuration = 0.20; // 20% of scroll per page - ultra elegant slow reveal
  const flipEndProgress = flipStartProgress + flipDuration;

  useFrame(() => {
    if (!pivotRef.current || !meshRef.current) return;

    let rotationAmount = 0;

    if (scrollProgress < 0.90) {
      // OPENING PHASE (extended to 90% for extra long journey)
      const pageProgress = THREE.MathUtils.clamp(
        (scrollProgress - flipStartProgress) / flipDuration,
        0,
        1
      );

      // Smooth easing
      const eased = pageProgress < 0.5
        ? 4 * pageProgress * pageProgress * pageProgress
        : 1 - Math.pow(-2 * pageProgress + 2, 3) / 2;

      rotationAmount = eased;
    } else if (scrollProgress >= 0.90 && scrollProgress < 0.97) {
      // OPEN STATE (hold time)
      rotationAmount = 1;
    } else {
      // CLOSING PHASE (starts at 97%)
      const closeProgress = (scrollProgress - 0.97) / 0.03;
      const eased = closeProgress < 0.5
        ? 4 * closeProgress * closeProgress * closeProgress
        : 1 - Math.pow(-2 * closeProgress + 2, 3) / 2;

      rotationAmount = 1 - eased;
    }

    // ALL PAGES FLIP RIGHT TO LEFT (positive Y rotation)
    pivotRef.current.rotation.y = Math.PI * rotationAmount;

    // Curl effect
    const curlAmount = Math.sin(rotationAmount * Math.PI) * 0.1;
    meshRef.current.rotation.x = curlAmount;
  });

  return (
    <group position={[1.5, 0, (pageNumber - totalPages / 2) * 0.003]}>
      {/* Pivot at left edge (spine) for right-to-left flip */}
      <group ref={pivotRef} position={[-1.5, 0, 0]}>
        <mesh ref={meshRef} position={[1.5, 0, 0]}>
          <planeGeometry args={[3, 4]} />
          <meshStandardMaterial
            map={texture}
            side={THREE.DoubleSide}
            roughness={0.3}
            metalness={0.0}
            emissive="#ffffff"
            emissiveIntensity={0.6}
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

  // Load actual book cover texture with error handling
  const coverTexture = useLoader(
    THREE.TextureLoader,
    '/textures/books/block-a-b-cover.png',
    undefined,
    (error) => {
      console.error('Failed to load cover texture:', error);
    }
  );

  // BOOK MOVEMENT
  useFrame(({ clock }) => {
    if (!bookRef.current) return;

    const time = clock.getElapsedTime();

    if (scrollProgress < 0.97) {
      // Flying phase (extended to 97%)
      const zPosition = THREE.MathUtils.lerp(70, -30, scrollProgress / 0.97);
      bookRef.current.position.z = zPosition;

      const pathFreq = scrollProgress * Math.PI * 2;
      // WIDER sideways movement: 6 → 12 for more dramatic horizontal sweep
      bookRef.current.position.x = Math.sin(pathFreq) * 12 + Math.cos(time * 0.15) * 1.5;
      bookRef.current.position.y = Math.cos(pathFreq * 0.8) * 4 + Math.sin(time * 0.12) * 0.6;

      bookRef.current.rotation.x = scrollProgress * Math.PI * 1.2 + Math.sin(time * 0.25) * 0.1;
      bookRef.current.rotation.y = scrollProgress * Math.PI * 3 + Math.cos(time * 0.2) * 0.15;
      bookRef.current.rotation.z = Math.sin(scrollProgress * Math.PI * 1.5) * 0.3;

      const scale = THREE.MathUtils.lerp(0.7, 2.0, scrollProgress / 0.97);
      bookRef.current.scale.setScalar(scale);
    } else {
      // Stopped phase (starts at 97%)
      bookRef.current.position.z = -30;
      bookRef.current.position.y = Math.sin(time * 0.5) * 0.2;
      bookRef.current.rotation.y = Math.PI * 3 + Math.cos(time * 0.3) * 0.05;
      bookRef.current.scale.setScalar(2.0);
    }

    // FADE OUT - but NEVER fade covers (they stay solid)
    if (scrollProgress >= 0.98) {
      const fadeProgress = (scrollProgress - 0.98) / 0.02;
      const opacity = 1 - fadeProgress;

      bookRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          // NEVER make covers transparent
          const isCover = child.name === 'front-cover' || child.name === 'back-cover';
          if (isCover) return;

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

  // CAMERA 360°
  useFrame(({ clock }) => {
    if (!cameraRef.current || !bookRef.current) return;

    const time = clock.getElapsedTime();

    const orbitAngle = scrollProgress * Math.PI * 2 + time * 0.25;
    const orbitRadius = 20 - scrollProgress * 6;

    const heightBase = Math.sin(scrollProgress * Math.PI * 3) * 10;
    const heightWave = Math.sin(orbitAngle * 0.6) * 3;

    const targetX = bookRef.current.position.x + Math.cos(orbitAngle) * orbitRadius;
    const targetY = bookRef.current.position.y + heightBase + heightWave;
    const targetZ = bookRef.current.position.z + Math.sin(orbitAngle) * orbitRadius + 10;

    cameraRef.current.position.x += (targetX - cameraRef.current.position.x) * 0.1;
    cameraRef.current.position.y += (targetY - cameraRef.current.position.y) * 0.1;
    cameraRef.current.position.z += (targetZ - cameraRef.current.position.z) * 0.1;

    const swayX = Math.sin(time * 1.8) * 0.4;
    const swayY = Math.cos(time * 1.5) * 0.3;
    cameraRef.current.position.x += swayX;
    cameraRef.current.position.y += swayY;

    cameraRef.current.lookAt(bookRef.current.position);

    const fovBase = 68;
    const fovZoom = Math.sin(scrollProgress * Math.PI * 4) * 12;
    const fovShake = Math.sin(time * 2.5) * 1.5;
    cameraRef.current.fov = fovBase + fovZoom + fovShake;
    cameraRef.current.updateProjectionMatrix();
  });

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[20, 8, 80]}
        fov={68}
        near={0.1}
        far={300}
      />

      <group ref={bookRef} position={[0, 0, 70]}>
        {/* Front Cover - ALWAYS VISIBLE, NEVER TRANSPARENT, positioned forward of all pages */}
        <mesh position={[-1.55, 0, -0.5]} castShadow receiveShadow name="front-cover">
          <boxGeometry args={[3.1, 4.1, 0.12]} />
          <meshStandardMaterial
            map={coverTexture}
            roughness={0.6}
            metalness={0.0}
            transparent={false}
            opacity={1}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Back Cover - ALWAYS SOLID, NEVER TRANSPARENT */}
        <mesh position={[1.55, 0, 0.2]} castShadow receiveShadow name="back-cover">
          <boxGeometry args={[3.1, 4.1, 0.12]} />
          <meshStandardMaterial
            color="#6b5d4f"
            roughness={0.7}
            metalness={0.08}
            transparent={false}
            opacity={1}
            side={THREE.DoubleSide}
            emissive="#2a2420"
            emissiveIntensity={0.05}
          />
        </mesh>

        {/* Spine */}
        <mesh position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.4, 4.1, 0.6]} />
          <meshStandardMaterial
            color="#4a3f35"
            roughness={0.7}
            metalness={0.05}
            emissive="#2a2420"
            emissiveIntensity={0.1}
          />
        </mesh>

        {/* All 87 Pages - RIGHT TO LEFT */}
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

        {/* BRIGHT INTERNAL PAGE LIGHTS - make pages clearly readable */}
        <pointLight
          position={[0, 0, 0]}
          color="#ffffff"
          intensity={25}
          distance={15}
          decay={0.5}
        />
        <pointLight
          position={[0, 3, 0]}
          color="#ffffff"
          intensity={20}
          distance={12}
          decay={0.5}
        />
        <pointLight
          position={[0, -3, 0]}
          color="#ffffff"
          intensity={20}
          distance={12}
          decay={0.5}
        />
        <pointLight
          position={[-1.5, 0, 0]}
          color="#ffffff"
          intensity={15}
          distance={8}
          decay={0.5}
        />
        <pointLight
          position={[1.5, 0, 0]}
          color="#ffffff"
          intensity={15}
          distance={8}
          decay={0.5}
        />
      </group>

      <color attach="background" args={['#f5f3ef']} />

      {/* BRIGHT AMBIENT - ensure everything is visible */}
      <ambientLight intensity={3.5} color="#ffffff" />

      {/* KEY LIGHT - main dramatic light from top-right */}
      <directionalLight
        position={[25, 35, 25]}
        intensity={3.2}
        color="#fffbf5"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />

      {/* FILL LIGHT - softer light from left */}
      <directionalLight
        position={[-20, 18, -18]}
        intensity={2.5}
        color="#ffffff"
      />

      {/* FRONT LIGHT - ensures visibility */}
      <directionalLight
        position={[0, 0, 40]}
        intensity={2.8}
        color="#fffbf5"
      />

      {/* BOTTOM FILL - subtle underside illumination */}
      <pointLight
        position={[0, -25, 20]}
        intensity={2.2}
        color="#fffef8"
        distance={100}
        decay={2}
      />

      {/* ACCENT SPOTLIGHT - focused book emphasis */}
      <spotLight
        position={[15, 25, 35]}
        intensity={3.0}
        angle={0.6}
        penumbra={0.6}
        color="#ffffff"
        castShadow
        shadow-bias={-0.0001}
      />

      <fog attach="fog" args={['#f5f3ef', 60, 180]} />

      <Environment preset="apartment" />
    </>
  );
}
