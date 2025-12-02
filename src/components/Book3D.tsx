'use client';

import { useRef, forwardRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

/**
 * 3D Book Component
 * Realistic book with pages, spine, and cover depth
 * Designed for ghost fade convergence effect
 */

interface Book3DProps {
  // Visual state
  opacity?: number;
  blur?: number;

  // Transform state
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;

  // Book appearance
  coverTexturePath?: string; // Path to cover texture
  coverColor?: string;
  spineColor?: string;
  pageColor?: string;
  title?: string;
  isGhost?: boolean;
  ghostType?: 1 | 2;

  // Animation
  openAmount?: number; // 0 = closed, 1 = fully open
}

const Book3D = forwardRef<THREE.Group, Book3DProps>(
  (
    {
      opacity = 1,
      blur = 0,
      position = [0, 0, 0],
      rotation = [0, 0, 0],
      scale = 1,
      coverTexturePath = '/textures/blocks-combined-01.png',
      coverColor = '#C8B089', // Tan/cream from actual book cover
      spineColor = '#A89168',  // Darker tan for spine
      pageColor = '#F5EFE0', // Warm cream pages
      title = 'Blocks A & B',
      isGhost = false,
      ghostType = 1,
      openAmount = 0,
    },
    ref
  ) => {
    const groupRef = useRef<THREE.Group>(null);

    // Load actual book cover texture
    const bookCoverTexture = useTexture(coverTexturePath);

    // Configure texture to fit properly
    bookCoverTexture.wrapS = THREE.ClampToEdgeWrapping;
    bookCoverTexture.wrapT = THREE.ClampToEdgeWrapping;
    bookCoverTexture.center.set(0.5, 0.5);
    bookCoverTexture.rotation = 0;
    bookCoverTexture.repeat.set(1, 1);
    bookCoverTexture.offset.set(0, 0);

    // Book dimensions (DRAMATIC SIZE - 3x larger for impact)
    const bookWidth = 7.2; // Width (x-axis) - 3x larger
    const bookHeight = 9.6; // Height (y-axis) - 3x larger
    const bookDepth = 1.2; // Thickness (z-axis) - 3x larger
    const spineWidth = 0.24; // 3x larger
    const coverThickness = 0.06; // 3x larger

    return (
      <group
        ref={ref || groupRef}
        position={position}
        rotation={rotation}
        scale={scale}
      >
        {/* Front Cover - CINEMATIC PBR */}
        <mesh position={[0, 0, bookDepth / 2 + coverThickness / 2]} castShadow receiveShadow>
          <boxGeometry args={[bookWidth, bookHeight, coverThickness]} />
          <meshStandardMaterial
            map={bookCoverTexture}
            metalness={0.05} // Slight sheen for luxury feel
            roughness={0.4} // Smoother for light reflections
            transparent
            opacity={opacity}
            envMapIntensity={1.2} // Enhanced reflections
            normalScale={[0.3, 0.3]} // Subtle texture depth
          />
        </mesh>

        {/* Back Cover - CINEMATIC PBR */}
        <mesh position={[0, 0, -bookDepth / 2 - coverThickness / 2]} castShadow receiveShadow>
          <boxGeometry args={[bookWidth, bookHeight, coverThickness]} />
          <meshStandardMaterial
            color={coverColor}
            metalness={0.05}
            roughness={0.4}
            transparent
            opacity={opacity}
            envMapIntensity={1.2}
          />
        </mesh>

        {/* Spine - CINEMATIC PBR with leather-like appearance */}
        <mesh position={[-bookWidth / 2 - spineWidth / 2, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[spineWidth, bookHeight, bookDepth + coverThickness * 2]} />
          <meshStandardMaterial
            color={spineColor}
            metalness={0.02}
            roughness={0.6} // Leather-like finish
            transparent
            opacity={opacity}
            envMapIntensity={0.8}
          />
        </mesh>

        {/* Pages (warm cream paper) - CINEMATIC PAPER */}
        {Array.from({ length: 5 }).map((_, i) => {
          const pageOffset = (i - 2) * (bookDepth / 5);

          return (
            <mesh
              key={`page-${i}`}
              position={[0.06, 0, pageOffset]}
              receiveShadow
            >
              <boxGeometry args={[bookWidth - 0.24, bookHeight - 0.24, 0.06]} />
              <meshStandardMaterial
                color={pageColor}
                metalness={0}
                roughness={0.85} // Slightly less rough for subtle shine
                transparent
                opacity={Math.min(1.0, opacity * 1.1)}
                envMapIntensity={0.3} // Very subtle reflections
              />
            </mesh>
          );
        })}

        {/* Ghost state visual indicator (colored glow) - DRAMATIC */}
        {isGhost && (
          <>
            {/* Inner glow */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[bookWidth + 0.8, bookHeight + 0.8, bookDepth + 0.8]} />
              <meshBasicMaterial
                color={ghostType === 1 ? '#FFD700' : '#00CED1'}
                transparent
                opacity={opacity * 0.25}
                side={THREE.BackSide}
              />
            </mesh>
            {/* Outer glow */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[bookWidth + 1.6, bookHeight + 1.6, bookDepth + 1.6]} />
              <meshBasicMaterial
                color={ghostType === 1 ? '#FFA500' : '#4169E1'}
                transparent
                opacity={opacity * 0.1}
                side={THREE.BackSide}
              />
            </mesh>
          </>
        )}
      </group>
    );
  }
);

Book3D.displayName = 'Book3D';

export default Book3D;
