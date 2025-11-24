'use client'

import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, Environment } from '@react-three/drei'
import { Suspense } from 'react'
import ThreeDBook from './3d-book'

interface ThreeDBookSceneProps {
  scrollProgress: number
}

/**
 * 3D Book Scene Container
 *
 * Sets up the Three.js scene with:
 * - Lighting (ambient + directional for shadows)
 * - Camera configuration
 * - Environment for reflections
 * - Scroll-driven book animation
 */
export default function ThreeDBookScene({ scrollProgress }: ThreeDBookSceneProps) {
  return (
    <Canvas
      shadows
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        pointerEvents: 'none',
      }}
      gl={{
        antialias: true,
        alpha: true,
      }}
    >
      {/* Camera */}
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <directionalLight position={[-5, 3, -5]} intensity={0.3} />

      {/* Environment for subtle reflections */}
      <Suspense fallback={null}>
        <Environment preset="studio" />
      </Suspense>

      {/* The Book */}
      <ThreeDBook scrollProgress={scrollProgress} />

      {/* Debug controls (disable in production) */}
      {/* <OrbitControls enableZoom={false} /> */}
    </Canvas>
  )
}
