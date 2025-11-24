'use client'

import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration, DepthOfField, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { WorkStop } from './stops/WorkStop'
import { CinematicCamera } from './CinematicCamera'
import { StopTransitions } from './StopTransitions'

/**
 * MuseumScene - Main 3D museum journey container
 *
 * Features:
 * - Bartosz dark background (#05201f)
 * - Post-processing (Bloom, ChromaticAberration, DepthOfField)
 * - Museum lighting (spotlight, rim, ambient, environment)
 * - Negative space fog
 * - Ground plane for shadows
 * - Scroll-based camera flight
 */
export function MuseumScene() {
  return (
    <div className="museum-3d-container">
      <Canvas
        shadows
        camera={{
          position: [0, 2, 10],
          fov: 50,
        }}
        gl={{
          antialias: true,
          alpha: false,
        }}
      >
        {/* Background - Bartosz Dark */}
        <color attach="background" args={['#05201f']} />

        {/* Fog for depth perception */}
        <fog attach="fog" args={['#031614', 10, 100]} />

        {/* Enhanced Cinematic Lighting System */}

        {/* Ambient base light - darker for more drama */}
        <ambientLight intensity={0.15} />

        {/* Key Light - Main dramatic spotlight */}
        <spotLight
          position={[8, 8, 5]}
          intensity={3}
          angle={0.4}
          penumbra={0.6}
          castShadow
          shadow-mapSize-width={4096}
          shadow-mapSize-height={4096}
          shadow-bias={-0.0001}
          color="#ffffff"
        />

        {/* Rim Light - Edge definition */}
        <directionalLight
          position={[-8, 6, -5]}
          intensity={1.5}
          color="#8CB4D8"
        />

        {/* Fill Light - Gold warmth */}
        <pointLight
          position={[0, 4, -5]}
          intensity={0.8}
          color="#C9A050"
          distance={20}
          decay={2}
        />

        {/* Accent Lights - Multiple colored accents throughout journey */}
        <pointLight position={[5, 3, -20]} intensity={0.6} color="#E8C4A0" distance={15} />
        <pointLight position={[-5, 3, -40]} intensity={0.6} color="#A0C8E8" distance={15} />
        <pointLight position={[5, 3, -60]} intensity={0.6} color="#C9A050" distance={15} />

        {/* Environment Map - Museum hall HDRI */}
        <Environment
          preset="city"
          background={false}
          blur={0.5}
        />

        {/* Ground Plane for Shadows */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -5, 0]}
          receiveShadow
        >
          <planeGeometry args={[1000, 1000]} />
          <shadowMaterial opacity={0.3} />
        </mesh>

        {/* Stop Markers */}
        <WorkStop />

        {/* TODO: Add remaining 7 stop markers */}
        {/* <GalleryStop position={[0, 2, -10]} /> */}
        {/* <BlogStop position={[0, 2, -20]} /> */}
        {/* <MeditationStop position={[0, 2, -30]} /> */}
        {/* <ShopStop position={[0, 2, -40]} /> */}
        {/* <MindToolsStop position={[0, 2, -50]} /> */}
        {/* <AboutStop position={[0, 2, -60]} /> */}
        {/* <ContactStop position={[0, 2, -70]} /> */}

        {/* Cinematic Camera System */}
        <CinematicCamera />

        {/* Stop Transition Effects */}
        <StopTransitions />

        {/* Enhanced Post-Processing Effects */}
        <EffectComposer multisampling={8}>
          {/* Cinematic Bloom */}
          <Bloom
            intensity={2.0}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            radius={0.8}
            blendFunction={BlendFunction.ADD}
          />

          {/* Subtle Chromatic Aberration */}
          <ChromaticAberration
            offset={[0.0015, 0.0015]}
            blendFunction={BlendFunction.NORMAL}
          />

          {/* Cinematic Depth of Field */}
          <DepthOfField
            focusDistance={0.015}
            focalLength={0.03}
            bokehScale={4}
          />

          {/* Film Vignette */}
          <Vignette
            offset={0.3}
            darkness={0.6}
            blendFunction={BlendFunction.NORMAL}
          />
        </EffectComposer>
      </Canvas>

      <style jsx>{`
        .museum-3d-container {
          position: relative;
          width: 100%;
          height: 100vh;
        }
      `}</style>
    </div>
  )
}
