/**
 * RotatingBooksJourney - Books rotating in 3D space like KASANÉ keyboard
 * Multi-axis rotation, scale transforms, staggered timing
 * Inspired by: kasane-keyboard.com & string-tune.fiddle.digital
 */

'use client';

import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

interface RotatingBookProps {
  coverTexture: string;
  scrollProgress: number;
  bookIndex: number; // 0, 1, or 2
  rotationPattern: 'spiral' | 'flip' | 'tumble';
}

function RotatingBook({ coverTexture, scrollProgress, bookIndex, rotationPattern }: RotatingBookProps) {
  const groupRef = useRef<THREE.Group>(null);
  const bookRef = useRef<THREE.Group>(null);

  const texture = useLoader(THREE.TextureLoader, coverTexture);

  // Staggered timing - each book starts at different scroll position
  const startProgress = bookIndex * 0.25; // 0%, 25%, 50%
  const endProgress = startProgress + 0.5; // Each book animates over 50% of scroll

  const localProgress = THREE.MathUtils.clamp(
    (scrollProgress - startProgress) / 0.5,
    0,
    1
  );

  useFrame(() => {
    if (!groupRef.current || !bookRef.current) return;

    // Scale: starts small (0.3), grows to full size (1.5)
    const scale = THREE.MathUtils.lerp(0.3, 1.5, localProgress);
    groupRef.current.scale.setScalar(scale);

    // Position: moves from far back to front
    const z = THREE.MathUtils.lerp(20, -2, localProgress);
    groupRef.current.position.z = z;

    // Different rotation patterns for each book
    switch (rotationPattern) {
      case 'spiral':
        // Rotates around Y while spinning on X
        bookRef.current.rotation.y = localProgress * Math.PI * 4; // 720 degrees
        bookRef.current.rotation.x = localProgress * Math.PI * 2; // 360 degrees
        bookRef.current.rotation.z = Math.sin(localProgress * Math.PI) * 0.5;
        break;

      case 'flip':
        // Flips like a page turning
        bookRef.current.rotation.y = THREE.MathUtils.lerp(Math.PI * 2, 0, localProgress);
        bookRef.current.rotation.x = Math.sin(localProgress * Math.PI) * 0.3;
        bookRef.current.rotation.z = 0;
        break;

      case 'tumble':
        // Tumbles end over end
        bookRef.current.rotation.x = localProgress * Math.PI * 3;
        bookRef.current.rotation.z = localProgress * Math.PI * 2;
        bookRef.current.rotation.y = Math.cos(localProgress * Math.PI * 2) * 0.5;
        break;
    }

    // Horizontal spread based on book index
    const xOffset = (bookIndex - 1) * 3; // -3, 0, 3
    groupRef.current.position.x = xOffset;

    // Vertical wave motion
    const yOffset = Math.sin(localProgress * Math.PI * 2) * 2;
    groupRef.current.position.y = yOffset;
  });

  return (
    <group ref={groupRef}>
      <group ref={bookRef}>
        {/* Book Spine */}
        <mesh castShadow>
          <boxGeometry args={[0.15, 2, 0.2]} />
          <meshStandardMaterial color="#5c4033" roughness={0.9} />
        </mesh>

        {/* Front Cover */}
        <mesh position={[-0.85, 0, 0]} castShadow>
          <boxGeometry args={[1.7, 0.04, 2]} />
          <meshStandardMaterial
            map={texture}
            color="#ffffff"
            roughness={0.6}
            metalness={0.3}
          />
        </mesh>

        {/* Back Cover */}
        <mesh position={[0.85, 0, 0]} castShadow>
          <boxGeometry args={[1.7, 0.04, 2]} />
          <meshStandardMaterial
            color="#8b7355"
            roughness={0.7}
            metalness={0.2}
          />
        </mesh>

        {/* Pages stack */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[1.6, 1.8, 0.15]} />
          <meshStandardMaterial color="#f5f5dc" roughness={0.8} />
        </mesh>

        {/* Glow when book is in focus */}
        {localProgress > 0.3 && localProgress < 0.7 && (
          <pointLight
            position={[0, 0, 1]}
            color="#FFD700"
            intensity={Math.sin((localProgress - 0.3) * Math.PI * 2.5) * 5}
            distance={10}
            decay={2}
          />
        )}
      </group>
    </group>
  );
}

interface RotatingBooksJourneyProps {
  scrollProgress: number;
}

export function RotatingBooksJourney({ scrollProgress }: RotatingBooksJourneyProps) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useFrame(() => {
    if (!cameraRef.current) return;

    // Camera subtle movement - gentle push forward
    const targetZ = 10 - scrollProgress * 3;
    cameraRef.current.position.z += (targetZ - cameraRef.current.position.z) * 0.05;

    // Slight camera sway
    const sway = Math.sin(scrollProgress * Math.PI * 2) * 0.5;
    const targetX = sway;
    cameraRef.current.position.x += (targetX - cameraRef.current.position.x) * 0.03;

    cameraRef.current.lookAt(0, 0, 0);
  });

  return (
    <>
      <perspectiveCamera
        ref={cameraRef}
        position={[0, 0, 10]}
        fov={75}
      />

      {/* Book 1 - Spiral rotation */}
      <RotatingBook
        coverTexture="/textures/books/block-a-b-cover.png"
        scrollProgress={scrollProgress}
        bookIndex={0}
        rotationPattern="spiral"
      />

      {/* Book 2 - Flip rotation */}
      <RotatingBook
        coverTexture="/textures/books/block-c-cover.jpg"
        scrollProgress={scrollProgress}
        bookIndex={1}
        rotationPattern="flip"
      />

      {/* Book 3 - Tumble rotation */}
      <RotatingBook
        coverTexture="/textures/books/block-a-b-cover.png"
        scrollProgress={scrollProgress}
        bookIndex={2}
        rotationPattern="tumble"
      />

      {/* Cinematic Lighting */}
      <ambientLight intensity={0.4} />

      {/* Key light */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Rim light */}
      <directionalLight
        position={[-5, 3, -5]}
        intensity={0.5}
        color="#4169E1"
      />

      {/* Fill light */}
      <pointLight
        position={[0, -3, 3]}
        intensity={0.3}
        color="#FFD700"
      />

      {/* Background gradient */}
      <mesh position={[0, 0, -30]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshBasicMaterial color="#0a0a0a" />
      </mesh>
    </>
  );
}
