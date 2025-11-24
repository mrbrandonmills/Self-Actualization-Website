'use client'

import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom, DepthOfField, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { BookPage } from './BookPage'
import { CameraChoreography } from './CameraChoreography'
import { pageChoreography } from './PageChoreography'
import { useMuseumScroll } from '@/hooks/useMuseumScroll'

export function BookExplosionScene() {
  const scrollProgress = useMuseumScroll()

  return (
    <Canvas
      shadows
      camera={{
        position: [0, 0, 20],
        fov: 50,
      }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
      }}
    >
      {/* Background - Bartosz Dark */}
      <color attach="background" args={['#05201f']} />

      {/* Atmospheric fog */}
      <fog attach="fog" args={['#031614', 20, 100]} />

      {/* === LIGHTING SYSTEM === */}

      {/* HDRI Environment for realistic bounce light */}
      <Environment
        preset="city"
        background={false}
        blur={0.5}
      />

      {/* Key Light - Cinematic three-point */}
      <spotLight
        position={[10, 15, 10]}
        intensity={3.5}
        angle={0.5}
        penumbra={0.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={0.0001}
        color="#FFF8E7"  // Warm
      />

      {/* Rim Light 1 - Left */}
      <directionalLight
        position={[-10, 5, 5]}
        intensity={2.0}
        color="#C9A050"  // Gold
      />

      {/* Rim Light 2 - Right */}
      <directionalLight
        position={[10, 5, -5]}
        intensity={2.0}
        color="#C9A050"  // Gold
      />

      {/* Fill Light - Opposite key */}
      <directionalLight
        position={[-10, -5, -10]}
        intensity={0.8}
        color="#7BA8D1"  // Cool blue
      />

      {/* Dynamic camera-follow light */}
      <pointLight
        position={[0, 2, 20]}
        intensity={1.5}
        color="#FFF8E7"
        distance={30}
      />

      {/* === BOOK PAGES === */}
      {pageChoreography.map((config) => (
        <BookPage
          key={config.id}
          config={config}
          scrollProgress={scrollProgress}
        />
      ))}

      {/* === CAMERA SYSTEM === */}
      <CameraChoreography scrollProgress={scrollProgress} />

      {/* Orbit controls for debugging (disable in production) */}
      <OrbitControls
        enabled={false}
        enableDamping
        dampingFactor={0.05}
      />

      {/* === POST-PROCESSING EFFECTS === */}
      <EffectComposer>
        {/* Bloom - Soft glow */}
        <Bloom
          intensity={1.0}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          blendFunction={BlendFunction.ADD}
        />

        {/* Depth of Field - Cinematic focus */}
        <DepthOfField
          focusDistance={0.02}
          focalLength={0.05}
          bokehScale={2}
        />

        {/* Vignette - Frame darkening */}
        <Vignette
          offset={0.3}
          darkness={0.5}
        />
      </EffectComposer>
    </Canvas>
  )
}
