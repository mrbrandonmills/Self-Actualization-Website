/**
 * KasaneBookJourney - Flying Book with Drone Camera
 * Natural page flipping from spine + orbiting drone camera
 * Artistic choreography between book and camera
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
  const groupRef = useRef<THREE.Group>(null);

  // Load page texture
  const texture = useLoader(THREE.TextureLoader, `/book-pages/${pageNumber}.png`);

  // Calculate which page should be flipping based on scroll
  const pageIndex = pageNumber - 1;
  const pageProgress = pageIndex / totalPages;

  // Each page flips when its turn comes in the scroll
  const flipStart = pageProgress;
  const flipEnd = pageProgress + (1 / totalPages) * 2; // Slightly overlap for smooth effect

  const flipProgress = THREE.MathUtils.clamp(
    (scrollProgress - flipStart) / (flipEnd - flipStart),
    0,
    1
  );

  // Easing for smooth page flip
  const easeInOutCubic = (t: number) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };
  const easedFlip = easeInOutCubic(flipProgress);

  // Determine if this is a left or right page
  const isLeftPage = pageNumber % 2 === 1; // Odd pages on left

  useFrame(() => {
    if (!meshRef.current || !groupRef.current) return;

    // Pages stack at spine with slight offset for thickness
    const pageThickness = 0.003;
    const stackOffset = (pageNumber - totalPages / 2) * pageThickness;

    if (isLeftPage) {
      // Left pages start at left position, flip to the left
      groupRef.current.position.set(-1.5, 0, stackOffset);

      // Rotate around the right edge (spine) - pivot point at x=1.5 (right edge of left page)
      meshRef.current.position.x = 1.5; // Offset so rotation happens at spine
      meshRef.current.rotation.y = -Math.PI * easedFlip; // Flip left
    } else {
      // Right pages start at right position, flip to the right
      groupRef.current.position.set(1.5, 0, stackOffset);

      // Rotate around the left edge (spine) - pivot point at x=-1.5 (left edge of right page)
      meshRef.current.position.x = -1.5; // Offset so rotation happens at spine
      meshRef.current.rotation.y = Math.PI * easedFlip; // Flip right
    }

    // Slight curl/bend effect for realism
    const curlAmount = Math.sin(easedFlip * Math.PI) * 0.1;
    meshRef.current.rotation.x = curlAmount;
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <planeGeometry args={[3, 4]} />
        <meshStandardMaterial
          map={texture}
          side={THREE.DoubleSide}
          roughness={0.5}
          metalness={0.1}
        />
      </mesh>
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

  // BOOK CHOREOGRAPHY - Artistic movement through space
  useFrame(({ clock }) => {
    if (!bookRef.current) return;

    const time = clock.getElapsedTime();

    // Book moves along Z axis (toward camera)
    const zPosition = THREE.MathUtils.lerp(60, -40, scrollProgress);
    bookRef.current.position.z = zPosition;

    // Book follows a flowing path in X and Y
    const pathFrequency = scrollProgress * Math.PI * 3; // 1.5 cycles
    bookRef.current.position.x = Math.sin(pathFrequency) * 8 + Math.cos(time * 0.2) * 1;
    bookRef.current.position.y = Math.cos(pathFrequency * 0.7) * 5 + Math.sin(time * 0.15) * 0.8;

    // Book rotation - elegant tumbling
    bookRef.current.rotation.x = scrollProgress * Math.PI * 1.5 + Math.sin(time * 0.3) * 0.15;
    bookRef.current.rotation.y = scrollProgress * Math.PI * 4 + Math.cos(time * 0.25) * 0.2;
    bookRef.current.rotation.z = Math.sin(scrollProgress * Math.PI * 2) * 0.4 + Math.cos(time * 0.2) * 0.1;

    // Scale - book grows as it approaches
    const scale = THREE.MathUtils.lerp(0.6, 2.2, scrollProgress);
    bookRef.current.scale.setScalar(scale);
  });

  // DRONE CAMERA - Orbiting around the book with artistic movement
  useFrame(({ clock }) => {
    if (!cameraRef.current || !bookRef.current) return;

    const time = clock.getElapsedTime();

    // Camera orbits around the book
    const orbitAngle = scrollProgress * Math.PI * 6 + time * 0.3; // 3 full orbits + rotation
    const orbitRadius = 18 - scrollProgress * 5; // Gets closer as we progress

    // Camera height varies - swooping motion
    const heightVariation = Math.sin(scrollProgress * Math.PI * 4) * 8;

    // Calculate camera position in orbit
    const targetX = bookRef.current.position.x + Math.cos(orbitAngle) * orbitRadius;
    const targetY = bookRef.current.position.y + heightVariation + Math.sin(orbitAngle * 0.5) * 4;
    const targetZ = bookRef.current.position.z + Math.sin(orbitAngle) * orbitRadius + 12;

    // Smooth camera movement with interpolation
    cameraRef.current.position.x += (targetX - cameraRef.current.position.x) * 0.08;
    cameraRef.current.position.y += (targetY - cameraRef.current.position.y) * 0.08;
    cameraRef.current.position.z += (targetZ - cameraRef.current.position.z) * 0.08;

    // Camera shake/sway for organic feel
    const shakeX = Math.sin(time * 2) * 0.3;
    const shakeY = Math.cos(time * 1.5) * 0.2;
    cameraRef.current.position.x += shakeX;
    cameraRef.current.position.y += shakeY;

    // Always look at the book
    cameraRef.current.lookAt(bookRef.current.position);

    // Dynamic FOV - zoom in/out for drama
    const fovBase = 65;
    const fovVariation = Math.sin(scrollProgress * Math.PI * 5) * 15;
    const fovShake = Math.sin(time * 3) * 2;
    cameraRef.current.fov = fovBase + fovVariation + fovShake;
    cameraRef.current.updateProjectionMatrix();
  });

  return (
    <>
      {/* Drone Camera */}
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[20, 10, 70]}
        fov={65}
        near={0.1}
        far={300}
      />

      {/* The Flying Book */}
      <group ref={bookRef} position={[0, 0, 60]}>
        {/* Front Cover */}
        <mesh position={[-1.5, 0, -0.15]} castShadow>
          <boxGeometry args={[3, 4, 0.08]} />
          <meshStandardMaterial
            color="#6b5d4f"
            roughness={0.7}
            metalness={0.15}
          />
        </mesh>

        {/* Back Cover */}
        <mesh position={[1.5, 0, 0.15]} castShadow>
          <boxGeometry args={[3, 4, 0.08]} />
          <meshStandardMaterial
            color="#6b5d4f"
            roughness={0.7}
            metalness={0.15}
          />
        </mesh>

        {/* Spine */}
        <mesh position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
          <boxGeometry args={[0.3, 4, 0.4]} />
          <meshStandardMaterial
            color="#4a3f35"
            roughness={0.85}
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

        {/* Dynamic book glow - intensifies as pages flip */}
        <pointLight
          position={[0, 0, 0]}
          color="#FFD700"
          intensity={2 + scrollProgress * 8}
          distance={25}
          decay={2}
        />

        {/* Rim light on book edges */}
        <pointLight
          position={[0, 0, 3]}
          color="#FFF8DC"
          intensity={4}
          distance={15}
          decay={2}
        />
      </group>

      {/* BRIGHT Environment */}
      <color attach="background" args={['#f8f6f2']} />

      {/* Cinematic Lighting */}
      <ambientLight intensity={1.2} color="#ffffff" />

      {/* Key light - from above and front */}
      <directionalLight
        position={[20, 30, 20]}
        intensity={2.5}
        color="#fffaf0"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={150}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
      />

      {/* Rim light - creates edge definition */}
      <directionalLight
        position={[-20, 15, -15]}
        intensity={1.5}
        color="#e8dcc8"
      />

      {/* Fill light - from below */}
      <pointLight
        position={[0, -20, 15]}
        intensity={1.2}
        color="#ffefd5"
        distance={80}
      />

      {/* Accent light - follows the book */}
      <spotLight
        position={[10, 20, 30]}
        intensity={2}
        angle={0.5}
        penumbra={0.5}
        color="#fff5e6"
        castShadow
      />

      {/* Atmospheric fog for depth */}
      <fog attach="fog" args={['#f8f6f2', 50, 150]} />

      {/* Environment for reflections */}
      <Environment preset="apartment" />
    </>
  );
}
