/**
 * ScrollJourney - Cinematic 3D Camera Journey Based on Scroll
 * Adapted from /Volumes/Super Mastery/cinematic-3d-site ScrollStory architecture
 * Creates traveling-through-space experience as user scrolls
 */

'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';

export interface JourneyChapter {
  id: string;
  // Camera movement
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  // Optional 3D content
  content?: React.ReactNode;
  // Lighting
  ambientIntensity?: number;
  directionalLight?: {
    position: [number, number, number];
    intensity: number;
    color?: string;
  };
}

interface ScrollJourneyProps {
  chapters: JourneyChapter[];
  scrollProgress: number;
}

export function ScrollJourney({ chapters, scrollProgress }: ScrollJourneyProps) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const targetRef = useRef<THREE.Object3D>(null);

  // Update camera position based on scroll
  useFrame(() => {
    if (!cameraRef.current || !targetRef.current || chapters.length === 0) return;

    // Calculate which chapter we're in
    const chapterIndex = Math.min(
      Math.floor(scrollProgress * chapters.length),
      chapters.length - 1
    );

    // Progress within current chapter (0-1)
    const chapterProgress = (scrollProgress * chapters.length) % 1;

    const currentChapter = chapters[chapterIndex];
    const nextChapter = chapters[Math.min(chapterIndex + 1, chapters.length - 1)];

    // Smooth interpolation between chapters (this creates the JOURNEY feeling)
    const lerpedCameraPos = new THREE.Vector3().lerpVectors(
      new THREE.Vector3(...currentChapter.cameraPosition),
      new THREE.Vector3(...nextChapter.cameraPosition),
      chapterProgress
    );

    const lerpedTarget = new THREE.Vector3().lerpVectors(
      new THREE.Vector3(...currentChapter.cameraTarget),
      new THREE.Vector3(...nextChapter.cameraTarget),
      chapterProgress
    );

    // Smooth camera movement with easing
    cameraRef.current.position.lerp(lerpedCameraPos, 0.1);
    targetRef.current.position.lerp(lerpedTarget, 0.1);
    cameraRef.current.lookAt(targetRef.current.position);
  });

  return (
    <>
      {/* Custom camera */}
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={chapters[0]?.cameraPosition || [0, 0, 10]}
        fov={50}
      />

      {/* Invisible target for camera lookAt */}
      <object3D ref={targetRef} position={chapters[0]?.cameraTarget || [0, 0, 0]} />

      {/* Environment */}
      <Environment preset="sunset" />

      {/* Base lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 10]} intensity={1.2} castShadow />
      <pointLight position={[-10, 5, -10]} intensity={0.5} color="#C4A35A" />

      {/* Render chapter content */}
      {chapters.map((chapter, index) => (
        <group key={chapter.id}>
          {chapter.content}
        </group>
      ))}
    </>
  );
}

// Hook to get current chapter based on scroll progress
export function useCurrentChapter(scrollProgress: number, chapterCount: number): number {
  return Math.min(
    Math.floor(scrollProgress * chapterCount),
    chapterCount - 1
  );
}
