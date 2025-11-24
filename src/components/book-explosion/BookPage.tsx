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

  // Optimize texture for photorealistic rendering (Kasane-level quality)
  useMemo(() => {
    // Anisotropic filtering for sharp textures at angles
    texture.anisotropy = 16

    // High-quality filtering
    texture.minFilter = THREE.LinearMipmapLinearFilter
    texture.magFilter = THREE.LinearFilter

    // Enable mipmaps for LOD
    texture.generateMipmaps = true

    // Color space for accurate rendering
    texture.colorSpace = THREE.SRGBColorSpace

    // Wrap mode for seamless edges
    texture.wrapS = THREE.ClampToEdgeWrapping
    texture.wrapT = THREE.ClampToEdgeWrapping

    texture.needsUpdate = true
  }, [texture])

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
      {/* Book page geometry - standard aspect ratio with slight bevel */}
      <planeGeometry args={[3, 4, 32, 32]} />

      {/* Photorealistic PBR material - Kasane keyboard quality */}
      <meshPhysicalMaterial
        map={texture}
        side={THREE.DoubleSide}

        // Enhanced PBR properties for photorealism
        roughness={0.65}        // Realistic matte paper
        metalness={0.0}         // Non-metallic paper

        // Advanced subsurface scattering for paper translucency
        transmission={0.08}     // More pronounced light pass-through
        thickness={0.15}        // Deeper subsurface scattering
        ior={1.45}             // Index of refraction for paper

        // Rich material contrast (Kasane-style)
        clearcoat={0.12}        // Subtle glossy finish
        clearcoatRoughness={0.3} // Slight roughness on clearcoat

        // Paper fiber texture
        sheen={0.2}             // Velvet-like fiber reflection
        sheenRoughness={0.8}    // Diffuse sheen
        sheenColor={new THREE.Color('#FFF8E7')} // Warm paper tone

        // Enhanced lighting response
        envMapIntensity={2.0}   // Stronger environment reflections
        reflectivity={0.15}     // Subtle reflections

        // Shadow enhancement
        shadowSide={THREE.FrontSide}
      />
    </mesh>
  )
}
