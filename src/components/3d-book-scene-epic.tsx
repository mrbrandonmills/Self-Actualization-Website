'use client'

import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, Environment } from '@react-three/drei'
import { Suspense } from 'react'
import EpicThreeDBook from './3d-book-epic'

interface EpicBookSceneProps {
  scrollProgress: number
}

/**
 * Epic 3D Book Scene
 *
 * Camera positioned for dramatic cinematic view
 * Lighting setup for photorealistic rendering
 * Environment for reflections and ambient lighting
 */
export default function EpicBookScene({ scrollProgress }: EpicBookSceneProps) {
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
        powerPreference: 'high-performance',
      }}
      dpr={[1, 2]} // Limit pixel ratio for better mobile performance
    >
      {/* Camera - positioned for dramatic view */}
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 12]}
        fov={45}
        near={0.1}
        far={1000}
      />

      {/* Ambient lighting - soft fill */}
      <ambientLight intensity={0.3} color="#e2ffc2" />

      {/* Key light - main directional light */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        color="#ffffff"
      />

      {/* Fill light - softer from opposite side */}
      <directionalLight
        position={[-8, 5, -5]}
        intensity={0.4}
        color="#c5d2b7"
      />

      {/* Back light - rim lighting effect */}
      <directionalLight
        position={[0, -5, -10]}
        intensity={0.6}
        color="#63692B"
      />

      {/* Environment for reflections */}
      <Suspense fallback={null}>
        <Environment preset="forest" />
      </Suspense>

      {/* Fog for depth */}
      <fog attach="fog" args={['#05201f', 15, 40]} />

      {/* The Epic Book */}
      <EpicThreeDBook scrollProgress={scrollProgress} />
    </Canvas>
  )
}
