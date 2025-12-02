/**
 * MagicBookJourney - Harry Potter-style book opening animation
 * Replaces glowing orb with books that fly open with pages flipping
 */

'use client';

import React, { useRef, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface BookPageProps {
  position: [number, number, number];
  rotation: [number, number, number];
  pageNumber: number;
  delay: number;
}

function BookPage({ position, rotation, pageNumber, delay }: BookPageProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hasFlipped, setHasFlipped] = React.useState(false);

  useEffect(() => {
    if (!meshRef.current || hasFlipped) return;

    // Dramatic page flip with overshoot
    const timeline = gsap.timeline({
      delay,
      onComplete: () => setHasFlipped(true),
    });

    timeline
      .to(meshRef.current.rotation, {
        y: Math.PI * 1.2, // Overshoot
        duration: 0.4,
        ease: 'power2.out',
      })
      .to(meshRef.current.rotation, {
        y: Math.PI, // Settle
        duration: 0.15,
        ease: 'power2.in',
      });
  }, [delay, hasFlipped]);

  // Gentle page flutter
  useFrame((state) => {
    if (!meshRef.current || hasFlipped) return;
    const time = state.clock.elapsedTime;
    meshRef.current.position.y = position[1] + Math.sin(time * 3 + pageNumber) * 0.002;
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} castShadow>
      <boxGeometry args={[1.8, 0.01, 2.4]} />
      <meshStandardMaterial
        color="#f5f5dc"
        roughness={0.8}
        metalness={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

interface MagicBookProps {
  position?: [number, number, number];
  scale?: number;
  coverTexture?: string;
  pageCount?: number;
  speed: number;
}

export function MagicBook({
  position = [0, 0, 0],
  scale = 1,
  coverTexture,
  pageCount = 30,
  speed,
}: MagicBookProps) {
  const bookGroupRef = useRef<THREE.Group>(null);
  const leftCoverRef = useRef<THREE.Mesh>(null);
  const rightCoverRef = useRef<THREE.Mesh>(null);
  const [isOpening, setIsOpening] = React.useState(false);

  // Load cover texture
  const texture = coverTexture
    ? useLoader(THREE.TextureLoader, coverTexture)
    : null;

  useEffect(() => {
    if (isOpening) return;

    const timer = setTimeout(() => {
      setIsOpening(true);
      openBook();
    }, 500);

    return () => clearTimeout(timer);
  }, [isOpening]);

  const openBook = () => {
    if (!leftCoverRef.current || !rightCoverRef.current || !bookGroupRef.current) return;

    const timeline = gsap.timeline();

    // Levitate
    timeline
      .to(bookGroupRef.current.position, {
        y: position[1] + 0.3,
        duration: 1,
        ease: 'power2.out',
      })
      // Open covers dramatically
      .to(
        leftCoverRef.current.rotation,
        {
          y: -Math.PI * 0.75,
          duration: 1.2,
          ease: 'power3.out',
        },
        '-=0.4'
      )
      .to(
        rightCoverRef.current.rotation,
        {
          y: Math.PI * 0.75,
          duration: 1.2,
          ease: 'power3.out',
        },
        '-=1.2'
      );
  };

  // Floating animation based on speed
  useFrame((state) => {
    if (!bookGroupRef.current) return;
    const time = state.clock.elapsedTime;
    bookGroupRef.current.rotation.y = Math.sin(time * 0.5) * 0.1;
    bookGroupRef.current.position.x = Math.cos(time * 0.3) * 0.2 * (1 - speed);
  });

  return (
    <group ref={bookGroupRef} position={position} scale={scale}>
      {/* Book spine */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.15, 2.4, 0.2]} />
        <meshStandardMaterial color="#8b4513" roughness={0.9} />
      </mesh>

      {/* Left cover (front) */}
      <mesh
        ref={leftCoverRef}
        position={[-0.95, 0, 0]}
        rotation={[0, 0, 0]}
        castShadow
      >
        <boxGeometry args={[1.8, 0.04, 2.4]} />
        <meshStandardMaterial
          map={texture}
          color={texture ? '#ffffff' : '#5c4033'}
          roughness={0.7}
          metalness={0.2}
        />
      </mesh>

      {/* Right cover (back) */}
      <mesh
        ref={rightCoverRef}
        position={[0.95, 0, 0]}
        rotation={[0, 0, 0]}
        castShadow
      >
        <boxGeometry args={[1.8, 0.04, 2.4]} />
        <meshStandardMaterial
          color="#5c4033"
          roughness={0.7}
          metalness={0.2}
        />
      </mesh>

      {/* Pages - staggered flipping */}
      {isOpening &&
        Array.from({ length: pageCount }).map((_, i) => (
          <BookPage
            key={i}
            position={[0, 0.01 * i, 0]}
            rotation={[0, 0, 0]}
            pageNumber={i}
            delay={1.0 + i * 0.04}
          />
        ))}

      {/* Magical glow */}
      <pointLight
        position={[0, 0, 0]}
        color="#FFD700"
        intensity={3 + speed * 5}
        distance={15}
        decay={2}
      />
    </group>
  );
}

// Flying Books replacing the glowing orb
export function FlyingBooks({ speed }: { speed: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    const time = clock.elapsedTime;

    // Gentle bobbing motion
    groupRef.current.position.y = Math.sin(time * 2) * 0.2;
    groupRef.current.position.x = Math.cos(time * 1.5) * 0.15;

    // Tilt based on speed
    groupRef.current.rotation.z = Math.sin(time * 1.5) * 0.1;
  });

  return (
    <group ref={groupRef} position={[0, 0, 8]}>
      {/* Center book - Block A & B */}
      <MagicBook
        position={[0, 0, 0]}
        scale={0.8}
        coverTexture="/textures/books/block-a-b-cover.png"
        pageCount={30}
        speed={speed}
      />

      {/* Right book - Block C (appears after a delay) */}
      <MagicBook
        position={[2.5, -0.3, -1]}
        scale={0.6}
        coverTexture="/textures/books/block-c-cover.jpg"
        pageCount={25}
        speed={speed}
      />

      {/* Left book - Trilogy */}
      <MagicBook
        position={[-2.5, -0.3, -1]}
        scale={0.6}
        coverTexture="/textures/books/block-a-b-cover.png"
        pageCount={25}
        speed={speed}
      />
    </group>
  );
}
