import { useRef, useMemo } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import * as THREE from 'three'
import { PageConfig, getPageProgress, interpolate } from './PageChoreography'

interface BookPageProps {
  config: PageConfig
  scrollProgress: number
}

export function BookPage({ config, scrollProgress }: BookPageProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  // Load page texture
  const texture = useLoader(TextureLoader, config.texture)

  // Calculate page-specific progress
  const pageProgress = getPageProgress(scrollProgress, config.timing)

  // Interpolate position and rotation
  const currentPos = interpolate(config.startPos, config.endPos, pageProgress)
  const currentRot = interpolate(config.startRot, config.endRot, pageProgress)

  // Update mesh transform every frame for smooth animation
  useFrame(() => {
    if (!meshRef.current) return

    meshRef.current.position.set(...currentPos)
    meshRef.current.rotation.set(...currentRot)
  })

  return (
    <mesh
      ref={meshRef}
      position={currentPos}
      rotation={currentRot}
      castShadow
      receiveShadow
    >
      {/* Book page geometry - standard aspect ratio */}
      <planeGeometry args={[3, 4]} />

      {/* Hyperrealistic PBR material */}
      <meshPhysicalMaterial
        map={texture}
        side={THREE.DoubleSide}

        // PBR properties for realism
        roughness={0.7}
        metalness={0}

        // Advanced features
        transmission={0.05}  // Slight light pass-through
        thickness={0.1}      // For subsurface scattering
        clearcoat={0.05}     // Aged patina
        sheen={0.1}          // Velvet fiber reflection

        // Lighting response
        envMapIntensity={1.5}
      />
    </mesh>
  )
}
