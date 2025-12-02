/**
 * ArtGalleryJourney - Books displayed in an art gallery behind VIP ropes
 * Walk through the gallery as books turn toward you and open their pages
 * Clean, understandable metaphor: books as valuable art pieces
 */

'use client';

import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

interface GalleryBookProps {
  position: [number, number, number];
  coverTexture: string;
  scrollProgress: number;
  bookIndex: number;
  side: 'left' | 'right'; // Which wall is it on
}

function GalleryBook({ position, coverTexture, scrollProgress, bookIndex, side }: GalleryBookProps) {
  const groupRef = useRef<THREE.Group>(null);
  const bookRef = useRef<THREE.Group>(null);
  const leftCoverRef = useRef<THREE.Mesh>(null);
  const rightCoverRef = useRef<THREE.Mesh>(null);
  const pagesGroupRef = useRef<THREE.Group>(null);

  const texture = useLoader(THREE.TextureLoader, coverTexture);

  // Each book activates at different scroll positions
  const startProgress = bookIndex * 0.2; // Books spaced 20% apart
  const endProgress = startProgress + 0.2;
  const bookProgress = THREE.MathUtils.clamp(
    (scrollProgress - startProgress) / 0.2,
    0,
    1
  );

  useFrame(() => {
    if (!groupRef.current || !bookRef.current || !leftCoverRef.current || !rightCoverRef.current) return;

    // Turn book toward viewer as they approach
    const turnAmount = bookProgress * Math.PI * 0.25; // Turn 45 degrees
    bookRef.current.rotation.y = side === 'left' ? -Math.PI * 0.5 + turnAmount : Math.PI * 0.5 - turnAmount;

    // Open covers
    const openAmount = bookProgress * Math.PI * 0.6;
    leftCoverRef.current.rotation.y = -openAmount;
    rightCoverRef.current.rotation.y = openAmount;

    // Fan out pages
    if (pagesGroupRef.current) {
      pagesGroupRef.current.children.forEach((page, i) => {
        const pageProgress = Math.max(0, bookProgress - i * 0.05);
        page.rotation.y = pageProgress * Math.PI * 0.4 * (i % 2 === 0 ? 1 : -1);
      });
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Book group that rotates */}
      <group ref={bookRef}>
        {/* Spine */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.15, 1.5, 0.15]} />
          <meshStandardMaterial color="#5c4033" roughness={0.9} />
        </mesh>

        {/* Left Cover */}
        <mesh
          ref={leftCoverRef}
          position={[-0.75, 0, 0]}
          rotation={[0, 0, 0]}
        >
          <boxGeometry args={[1.5, 0.03, 1.5]} />
          <meshStandardMaterial
            map={texture}
            color="#ffffff"
            roughness={0.6}
            metalness={0.2}
          />
        </mesh>

        {/* Right Cover */}
        <mesh
          ref={rightCoverRef}
          position={[0.75, 0, 0]}
          rotation={[0, 0, 0]}
        >
          <boxGeometry args={[1.5, 0.03, 1.5]} />
          <meshStandardMaterial
            color="#8b7355"
            roughness={0.7}
            metalness={0.1}
          />
        </mesh>

        {/* Pages - 20 pages fanning out */}
        <group ref={pagesGroupRef}>
          {Array.from({ length: 20 }).map((_, i) => (
            <mesh
              key={i}
              position={[0, i * 0.002, 0]}
              rotation={[0, 0, 0]}
            >
              <boxGeometry args={[1.4, 0.01, 1.4]} />
              <meshStandardMaterial
                color="#f5f5dc"
                roughness={0.8}
                side={THREE.DoubleSide}
              />
            </mesh>
          ))}
        </group>

        {/* Spotlight on book */}
        {bookProgress > 0.3 && (
          <spotLight
            position={[0, 2, 1]}
            angle={0.5}
            penumbra={0.5}
            intensity={bookProgress * 3}
            color="#FFD700"
            castShadow
          />
        )}
      </group>
    </group>
  );
}

// VIP Velvet Rope Barrier
function VIPRope({ position, side }: { position: [number, number, number]; side: 'left' | 'right' }) {
  return (
    <group position={position}>
      {/* Post 1 */}
      <mesh position={[-1.5, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 1, 16]} />
        <meshStandardMaterial color="#B8860B" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Post 2 */}
      <mesh position={[1.5, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 1, 16]} />
        <meshStandardMaterial color="#B8860B" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Velvet rope - draped between posts */}
      <mesh position={[0, 0.3, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[1.5, 0.02, 8, 32, Math.PI]} />
        <meshStandardMaterial color="#8B0000" roughness={0.7} metalness={0.1} />
      </mesh>
    </group>
  );
}

// Gallery wall
function GalleryWall({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  return (
    <mesh position={position} rotation={rotation} receiveShadow>
      <planeGeometry args={[50, 8]} />
      <meshStandardMaterial color="#f5f5f5" roughness={0.9} />
    </mesh>
  );
}

// Gallery floor
function GalleryFloor() {
  return (
    <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[10, 50]} />
      <meshStandardMaterial color="#2c2c2c" roughness={0.3} metalness={0.6} />
    </mesh>
  );
}

interface ArtGalleryJourneyProps {
  scrollProgress: number;
}

export function ArtGalleryJourney({ scrollProgress }: ArtGalleryJourneyProps) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useFrame(() => {
    if (!cameraRef.current) return;

    // Camera walks through gallery (like first-person view)
    const walkDistance = scrollProgress * 40; // Walk 40 units forward
    const targetZ = 5 - walkDistance;
    cameraRef.current.position.z += (targetZ - cameraRef.current.position.z) * 0.05;

    // Slight head bob (natural walking motion)
    const bobAmount = Math.sin(walkDistance * 2) * 0.02;
    const targetY = 0.5 + bobAmount;
    cameraRef.current.position.y += (targetY - cameraRef.current.position.y) * 0.1;

    cameraRef.current.lookAt(0, 0.5, cameraRef.current.position.z - 5);
  });

  return (
    <>
      <perspectiveCamera
        ref={cameraRef}
        position={[0, 0.5, 5]}
        fov={75}
      />

      {/* Gallery Architecture */}
      <GalleryFloor />
      <GalleryWall position={[-4, 2, 0]} rotation={[0, Math.PI / 2, 0]} />
      <GalleryWall position={[4, 2, 0]} rotation={[0, -Math.PI / 2, 0]} />

      {/* Books on left wall with VIP ropes */}
      <GalleryBook
        position={[-3.5, 1, 0]}
        coverTexture="/textures/books/block-a-b-cover.png"
        scrollProgress={scrollProgress}
        bookIndex={0}
        side="left"
      />
      <VIPRope position={[-2.5, 0, 0]} side="left" />

      <GalleryBook
        position={[-3.5, 1, -8]}
        coverTexture="/textures/books/block-c-cover.jpg"
        scrollProgress={scrollProgress}
        bookIndex={1}
        side="left"
      />
      <VIPRope position={[-2.5, 0, -8]} side="left" />

      <GalleryBook
        position={[-3.5, 1, -16]}
        coverTexture="/textures/books/block-a-b-cover.png"
        scrollProgress={scrollProgress}
        bookIndex={2}
        side="left"
      />
      <VIPRope position={[-2.5, 0, -16]} side="left" />

      {/* Books on right wall with VIP ropes */}
      <GalleryBook
        position={[3.5, 1, -4]}
        coverTexture="/textures/books/block-c-cover.jpg"
        scrollProgress={scrollProgress}
        bookIndex={1.5}
        side="right"
      />
      <VIPRope position={[2.5, 0, -4]} side="right" />

      <GalleryBook
        position={[3.5, 1, -12]}
        coverTexture="/textures/books/block-a-b-cover.png"
        scrollProgress={scrollProgress}
        bookIndex={2.5}
        side="right"
      />
      <VIPRope position={[2.5, 0, -12]} side="right" />

      <GalleryBook
        position={[3.5, 1, -20]}
        coverTexture="/textures/books/block-c-cover.jpg"
        scrollProgress={scrollProgress}
        bookIndex={3.5}
        side="right"
      />
      <VIPRope position={[2.5, 0, -20]} side="right" />

      {/* Gallery Lighting - sophisticated museum lighting */}
      <ambientLight intensity={0.3} />

      {/* Ceiling spotlights */}
      <spotLight
        position={[0, 5, 0]}
        angle={0.6}
        penumbra={0.5}
        intensity={2}
        color="#ffffff"
        castShadow
      />
      <spotLight
        position={[0, 5, -10]}
        angle={0.6}
        penumbra={0.5}
        intensity={2}
        color="#ffffff"
        castShadow
      />
      <spotLight
        position={[0, 5, -20]}
        angle={0.6}
        penumbra={0.5}
        intensity={2}
        color="#ffffff"
        castShadow
      />

      {/* Accent lights on walls */}
      <pointLight position={[-3, 2, 0]} intensity={1} color="#FFD700" />
      <pointLight position={[3, 2, -10]} intensity={1} color="#FFD700" />
    </>
  );
}
