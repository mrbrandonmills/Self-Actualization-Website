'use client'

import { useRef, useMemo } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { Group, Mesh, TextureLoader } from 'three'

interface BookPartProps {
  position: [number, number, number]
  rotation?: [number, number, number]
  scale?: [number, number, number]
  targetPosition: [number, number, number]
  targetRotation?: [number, number, number]
  progress: number
  color?: string
  texture?: string
  isPage?: boolean
  pageIndex?: number
}

/**
 * Textured book part (uses useLoader hook)
 */
function TexturedBookPart({
  position,
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  targetPosition,
  targetRotation = [0, 0, 0],
  progress,
  texture,
  isPage = false,
}: Omit<BookPartProps, 'color'> & { texture: string }) {
  const meshRef = useRef<Mesh>(null)
  const textureMap = useLoader(TextureLoader, texture)

  useFrame(() => {
    if (!meshRef.current) return

    // Interpolate position
    meshRef.current.position.x = position[0] + (targetPosition[0] - position[0]) * progress
    meshRef.current.position.y = position[1] + (targetPosition[1] - position[1]) * progress
    meshRef.current.position.z = position[2] + (targetPosition[2] - position[2]) * progress

    // Interpolate rotation
    meshRef.current.rotation.x = rotation[0] + (targetRotation[0] - rotation[0]) * progress
    meshRef.current.rotation.y = rotation[1] + (targetRotation[1] - rotation[1]) * progress
    meshRef.current.rotation.z = rotation[2] + (targetRotation[2] - rotation[2]) * progress
  })

  return (
    <mesh ref={meshRef} castShadow receiveShadow scale={scale}>
      <boxGeometry args={[2, 2.8, isPage ? 0.02 : 0.05]} />
      <meshStandardMaterial
        map={textureMap}
        roughness={0.4}
        metalness={0.1}
      />
    </mesh>
  )
}

/**
 * Colored book part (no texture)
 */
function ColoredBookPart({
  position,
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  targetPosition,
  targetRotation = [0, 0, 0],
  progress,
  color = '#2d3e2f',
  isPage = false,
}: Omit<BookPartProps, 'texture'> & { color?: string }) {
  const meshRef = useRef<Mesh>(null)

  useFrame(() => {
    if (!meshRef.current) return

    // Interpolate position
    meshRef.current.position.x = position[0] + (targetPosition[0] - position[0]) * progress
    meshRef.current.position.y = position[1] + (targetPosition[1] - position[1]) * progress
    meshRef.current.position.z = position[2] + (targetPosition[2] - position[2]) * progress

    // Interpolate rotation
    meshRef.current.rotation.x = rotation[0] + (targetRotation[0] - rotation[0]) * progress
    meshRef.current.rotation.y = rotation[1] + (targetRotation[1] - rotation[1]) * progress
    meshRef.current.rotation.z = rotation[2] + (targetRotation[2] - rotation[2]) * progress
  })

  return (
    <mesh ref={meshRef} castShadow receiveShadow scale={scale}>
      <boxGeometry args={[2, 2.8, isPage ? 0.02 : 0.05]} />
      <meshStandardMaterial
        color={color}
        roughness={0.3}
        metalness={0.1}
      />
    </mesh>
  )
}

interface EpicThreeDBookProps {
  scrollProgress: number
}

/**
 * Epic 3D Book - 20x+ Viewport Journey
 *
 * 12-Phase Structure:
 * 0-8%: Book appears from distance
 * 8-16%: Book rotates to showcase
 * 16-24%: Book opens
 * 24-32%: Initial page separation
 * 32-40%: Full explosion
 * 40-48%: Orbital pattern
 * 48-56%: Wave formation
 * 56-64%: Camera fly-through
 * 64-72%: Spiral tornado
 * 72-80%: Reassembly begins
 * 80-88%: Book reforms
 * 88-100%: Final showcase
 */
export default function EpicThreeDBook({ scrollProgress }: EpicThreeDBookProps) {
  const groupRef = useRef<Group>(null)

  // Calculate all 12 phases
  const phases = useMemo(() => {
    // Helper function to create phase progress
    const phaseProgress = (start: number, end: number) => {
      return Math.max(0, Math.min(1, (scrollProgress - start) / (end - start)))
    }

    return {
      // Phase 1: Entry (0-8%)
      entry: phaseProgress(0, 0.08),

      // Phase 2: Rotation showcase (8-16%)
      rotationShowcase: phaseProgress(0.08, 0.16),

      // Phase 3: Opening (16-24%)
      opening: phaseProgress(0.16, 0.24),

      // Phase 4: Initial separation (24-32%)
      initialSeparation: phaseProgress(0.24, 0.32),

      // Phase 5: Full explosion (32-40%)
      fullExplosion: phaseProgress(0.32, 0.40),

      // Phase 6: Orbital (40-48%)
      orbital: phaseProgress(0.40, 0.48),

      // Phase 7: Wave (48-56%)
      wave: phaseProgress(0.48, 0.56),

      // Phase 8: Fly-through (56-64%)
      flyThrough: phaseProgress(0.56, 0.64),

      // Phase 9: Spiral (64-72%)
      spiral: phaseProgress(0.64, 0.72),

      // Phase 10: Reassembly (72-80%)
      reassembly: phaseProgress(0.72, 0.80),

      // Phase 11: Reform (80-88%)
      reform: phaseProgress(0.80, 0.88),

      // Phase 12: Final showcase (88-100%)
      finalShowcase: phaseProgress(0.88, 1.0),
    }
  }, [scrollProgress])

  // Combined animation states
  const animation = useMemo(() => {
    // Book should ONLY separate starting from Opening phase (16%+)
    // Before 16%, book must stay completely closed
    const shouldSeparate = scrollProgress >= 0.16

    // Separation amount: builds up during explosion, reduces during reassembly
    const explosionPeak = shouldSeparate ? Math.max(
      phases.opening, // Start separating during opening
      phases.initialSeparation,
      phases.fullExplosion,
      phases.orbital,
      phases.wave,
      phases.flyThrough,
      phases.spiral
    ) : 0

    // Include finalShowcase to ensure book stays closed at 100%
    const reassemblyAmount = Math.max(phases.reassembly, phases.reform, phases.finalShowcase)
    const separationAmount = explosionPeak * (1 - reassemblyAmount)

    // Group position and rotation
    const groupZ = -20 + phases.entry * 20 // Starts far, comes close
    const groupRotationY = phases.rotationShowcase * Math.PI * 0.5 // Showcase rotation

    // Camera effects
    const cameraShake = phases.fullExplosion * 0.1

    return {
      separationAmount,
      groupZ,
      groupRotationY,
      cameraShake,
      orbitalRotation: phases.orbital * Math.PI * 2,
      waveAmplitude: phases.wave * 0.5,
      spiralRotation: phases.spiral * Math.PI * 4,
    }
  }, [phases, scrollProgress])

  // Update group transformations
  useFrame((state) => {
    if (!groupRef.current) return

    // Position
    groupRef.current.position.z = animation.groupZ

    // Rotation
    groupRef.current.rotation.y = animation.groupRotationY

    // Camera effects
    if (animation.cameraShake > 0) {
      // Shake during explosion
      state.camera.position.x = Math.sin(state.clock.elapsedTime * 10) * animation.cameraShake
      state.camera.position.y = Math.cos(state.clock.elapsedTime * 15) * animation.cameraShake
    } else if (animation.spiralRotation > 0) {
      // Smooth camera movement during fly-through
      const flyProgress = animation.spiralRotation / (Math.PI * 4)
      state.camera.position.x = Math.sin(flyProgress * Math.PI * 2) * 2
      state.camera.position.y = flyProgress * 3 // Rise up
      if (state.camera.rotation) {
        state.camera.rotation.z = Math.sin(flyProgress * Math.PI) * 0.1 // Slight roll
      }
    } else {
      // Reset camera
      state.camera.position.x = 0
      state.camera.position.y = 0
      if (state.camera.rotation) {
        state.camera.rotation.z = 0
      }
    }
  })

  // Generate page data
  const pages = Array.from({ length: 15 }, (_, i) => ({
    index: i,
    src: `/books/blocks-a-b/page-${i === 0 ? '01-cover' : String(i + 1).padStart(2, '0')}.jpg`,
    isCover: i === 0,
    isBackCover: i === 14,
  }))

  return (
    <group ref={groupRef}>
      {/* Front Cover */}
      <TexturedBookPart
        position={[0, 0, 0.3]}
        targetPosition={[
          Math.sin(animation.orbitalRotation) * 3,
          Math.sin(animation.waveAmplitude) * 2,
          3 + Math.cos(animation.spiralRotation) * 2
        ]}
        targetRotation={[
          animation.spiralRotation * 0.5,
          animation.orbitalRotation,
          0
        ]}
        progress={animation.separationAmount}
        texture="/books/blocks-a-b/page-01-cover.jpg"
      />

      {/* Pages - Clean Directional Flow */}
      {pages.slice(1, -1).map((page) => {
        // CLEAN FAN PATTERN: Pages fan out horizontally in an elegant arc
        const totalPages = pages.length - 2
        const normalizedIndex = (page.index - 1) / totalPages // 0 to 1
        const centerIndex = totalPages / 2

        // Calculate arc position: pages spread horizontally with slight vertical curve
        const arcSpread = 8 // Width of the fan
        const arcHeight = 2 // Height of the arc

        // Fan position: spread from left to right in smooth arc
        const fanX = (normalizedIndex - 0.5) * arcSpread
        const fanY = -Math.pow((normalizedIndex - 0.5) * 2, 2) * arcHeight + arcHeight * 0.5
        const fanZ = -(page.index * 0.15) // Slight depth stagger

        // Rotation: each page rotates to face outward from center
        const fanRotationY = (normalizedIndex - 0.5) * Math.PI * 0.3 // Pages angle outward
        const fanRotationX = Math.sin(normalizedIndex * Math.PI) * 0.2

        // ORBITAL: Circular dance pattern
        const angle = normalizedIndex * Math.PI * 2
        const orbitalRadius = 4
        const orbitalX = Math.cos(angle + animation.orbitalRotation) * orbitalRadius
        const orbitalY = Math.sin(angle + animation.orbitalRotation) * orbitalRadius * 0.5
        const orbitalZ = -3

        // WAVE: Smooth sine wave along horizontal axis
        const waveX = (normalizedIndex - 0.5) * 10
        const waveY = Math.sin((normalizedIndex + animation.waveAmplitude) * Math.PI * 3) * 2
        const waveZ = -2

        // CAMERA FLY-THROUGH: Pages create a corridor with 90-degree turns
        // Camera flies through pages that rotate away like doors opening
        const flyProgress = phases.spiral // Reuse spiral phase for fly-through
        const pageGroup = Math.floor(normalizedIndex * 4) // 4 groups of pages
        const groupOffset = pageGroup * Math.PI / 2 // Each group rotates 90 degrees

        // Vertical spiral staircase layout
        const flyThroughX = Math.cos(groupOffset + flyProgress * Math.PI * 2) * 3
        const flyThroughY = (page.index - centerIndex) * 0.5 + flyProgress * 4 // Vertical climb
        const flyThroughZ = Math.sin(groupOffset + flyProgress * Math.PI * 2) * 3 - 3

        // Pages rotate 90 degrees to create corridors
        const flyThroughRotY = groupOffset + (normalizedIndex % 0.25) * Math.PI * 2

        // Smooth blending between phases
        let targetX = fanX
        let targetY = fanY
        let targetZ = fanZ
        const targetRotX = fanRotationX
        let targetRotY = fanRotationY

        // Blend to orbital
        if (phases.orbital > 0) {
          const t = phases.orbital
          targetX = fanX * (1 - t) + orbitalX * t
          targetY = fanY * (1 - t) + orbitalY * t
          targetZ = fanZ * (1 - t) + orbitalZ * t
        }

        // Blend to wave
        if (phases.wave > 0 && phases.orbital >= 1) {
          const t = phases.wave
          targetX = orbitalX * (1 - t) + waveX * t
          targetY = orbitalY * (1 - t) + waveY * t
          targetZ = orbitalZ * (1 - t) + waveZ * t
        }

        // Blend to fly-through (replaces spiral/tornado)
        if (phases.spiral > 0 && phases.wave >= 1) {
          const t = phases.spiral
          const prevX = waveX
          const prevY = waveY
          const prevZ = waveZ
          targetX = prevX * (1 - t) + flyThroughX * t
          targetY = prevY * (1 - t) + flyThroughY * t
          targetZ = prevZ * (1 - t) + flyThroughZ * t
          targetRotY = fanRotationY * (1 - t) + flyThroughRotY * t
        }

        const zOffset = -0.05 - page.index * 0.02

        return (
          <TexturedBookPart
            key={page.index}
            position={[0, 0, zOffset]}
            targetPosition={[targetX, targetY, targetZ]}
            targetRotation={[
              targetRotX,
              targetRotY,
              0
            ]}
            progress={animation.separationAmount}
            texture={page.src}
            isPage
          />
        )
      })}

      {/* Back Cover */}
      <ColoredBookPart
        position={[0, 0, -0.4]}
        targetPosition={[
          -Math.sin(animation.orbitalRotation) * 3,
          -Math.sin(animation.waveAmplitude) * 2,
          -5 - Math.cos(animation.spiralRotation) * 2
        ]}
        targetRotation={[
          -animation.spiralRotation * 0.5,
          -animation.orbitalRotation,
          0
        ]}
        progress={animation.separationAmount}
        color="#1a2419"
      />
    </group>
  )
}
