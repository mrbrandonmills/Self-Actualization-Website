'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration, DepthOfField } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { WorkStop } from './stops/WorkStop'
import { CameraFlight } from './CameraFlight'

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

        {/* Lighting System */}

        {/* Ambient base light */}
        <ambientLight intensity={0.2} />

        {/* Main museum spotlight */}
        <spotLight
          position={[5, 5, 5]}
          intensity={2}
          angle={0.3}
          penumbra={0.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        {/* Rim lighting */}
        <directionalLight
          position={[-5, 5, -5]}
          intensity={1}
          color="#ffffff"
        />

        {/* Fill light */}
        <pointLight
          position={[0, 3, -5]}
          intensity={0.5}
          color="#C9A050"
        />

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

        {/* Camera Flight System */}
        <CameraFlight />

        {/* Orbit Controls for development */}
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          maxDistance={20}
          minDistance={3}
        />

        {/* Post-Processing Effects */}
        <EffectComposer>
          {/* Unreal Bloom */}
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
            blendFunction={BlendFunction.ADD}
          />

          {/* Chromatic Aberration - Glass prism effect */}
          <ChromaticAberration
            offset={[0.002, 0.002]}
            blendFunction={BlendFunction.NORMAL}
          />

          {/* Depth of Field */}
          <DepthOfField
            focusDistance={0.01}
            focalLength={0.02}
            bokehScale={3}
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
