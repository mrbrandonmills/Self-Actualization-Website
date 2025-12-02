/**
 * BookDoorsJourney - Books that open like elevator doors
 * Inspired by dcsportsoft.com - clean, cinematic, no abstract nonsense
 * Books open left/right to reveal enlightenment portal behind
 */

'use client';

import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

interface BookDoorProps {
  coverTexture: string;
  scrollProgress: number;
  position: [number, number, number];
  bookIndex: number; // 0, 1, or 2
}

function BookDoor({ coverTexture, scrollProgress, position, bookIndex }: BookDoorProps) {
  const leftDoorRef = useRef<THREE.Mesh>(null);
  const rightDoorRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  const texture = useLoader(THREE.TextureLoader, coverTexture);

  // Calculate opening progress for each book
  // Book 0: opens at 0-0.33
  // Book 1: opens at 0.33-0.66
  // Book 2: opens at 0.66-1.0
  const startProgress = bookIndex * 0.33;
  const endProgress = startProgress + 0.33;
  const bookProgress = THREE.MathUtils.clamp(
    (scrollProgress - startProgress) / 0.33,
    0,
    1
  );

  useFrame(() => {
    if (!leftDoorRef.current || !rightDoorRef.current || !groupRef.current) return;

    // Open doors left and right like elevator doors
    const maxOpenDistance = 6;
    const openAmount = bookProgress * maxOpenDistance;

    leftDoorRef.current.position.x = -openAmount;
    rightDoorRef.current.position.x = openAmount;

    // Fade out as doors open fully
    const opacity = 1 - bookProgress * 0.7;
    if (leftDoorRef.current.material instanceof THREE.MeshStandardMaterial) {
      leftDoorRef.current.material.opacity = opacity;
    }
    if (rightDoorRef.current.material instanceof THREE.MeshStandardMaterial) {
      rightDoorRef.current.material.opacity = opacity;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Left Door (Front Cover) */}
      <mesh ref={leftDoorRef} position={[0, 0, 0.1]}>
        <boxGeometry args={[5, 7, 0.3]} />
        <meshStandardMaterial
          map={texture}
          color="#ffffff"
          transparent
          opacity={1}
          roughness={0.6}
          metalness={0.3}
        />
      </mesh>

      {/* Right Door (Back Cover) */}
      <mesh ref={rightDoorRef} position={[0, 0, 0.1]}>
        <boxGeometry args={[5, 7, 0.3]} />
        <meshStandardMaterial
          color="#8b7355"
          transparent
          opacity={1}
          roughness={0.7}
          metalness={0.2}
        />
      </mesh>

      {/* Portal light behind the doors - revealed as they open */}
      {bookProgress > 0.1 && (
        <mesh position={[0, 0, -2]}>
          <planeGeometry args={[8, 10]} />
          <meshBasicMaterial
            color="#FFD700"
            transparent
            opacity={bookProgress * 0.6}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}

      {/* Glow when doors open */}
      {bookProgress > 0.2 && (
        <pointLight
          position={[0, 0, -1]}
          color="#FFD700"
          intensity={bookProgress * 15}
          distance={20}
          decay={2}
        />
      )}
    </group>
  );
}

interface BookDoorsJourneyProps {
  scrollProgress: number;
}

export function BookDoorsJourney({ scrollProgress }: BookDoorsJourneyProps) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useFrame(() => {
    if (!cameraRef.current) return;

    // Camera slowly moves forward as you scroll
    const targetZ = 15 - scrollProgress * 8; // 15 to 7
    cameraRef.current.position.z += (targetZ - cameraRef.current.position.z) * 0.05;

    // Subtle camera rise
    const targetY = scrollProgress * 3;
    cameraRef.current.position.y += (targetY - cameraRef.current.position.y) * 0.05;

    cameraRef.current.lookAt(0, 0, 0);
  });

  return (
    <>
      <perspectiveCamera
        ref={cameraRef}
        position={[0, 0, 15]}
        fov={50}
      />

      {/* Three books opening in sequence */}
      <BookDoor
        coverTexture="/textures/books/block-a-b-cover.png"
        scrollProgress={scrollProgress}
        position={[0, 0, 0]}
        bookIndex={0}
      />

      <BookDoor
        coverTexture="/textures/books/block-c-cover.jpg"
        scrollProgress={scrollProgress}
        position={[0, 0, -5]}
        bookIndex={1}
      />

      <BookDoor
        coverTexture="/textures/books/block-a-b-cover.png"
        scrollProgress={scrollProgress}
        position={[0, 0, -10]}
        bookIndex={2}
      />

      {/* Final enlightenment portal at the end */}
      {scrollProgress > 0.8 && (
        <mesh position={[0, 0, -20]}>
          <planeGeometry args={[20, 20]} />
          <meshBasicMaterial
            color="#FFFFFF"
            transparent
            opacity={(scrollProgress - 0.8) * 3}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}

      {/* Simple lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
    </>
  );
}
