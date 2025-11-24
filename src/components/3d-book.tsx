'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group, Mesh } from 'three'

interface BookPartProps {
  position: [number, number, number]
  rotation?: [number, number, number]
  targetPosition: [number, number, number]
  progress: number
  color: string
}

/**
 * Individual book part (cover, pages, spine)
 * Animates between default position and exploded position
 */
function BookPart({ position, rotation = [0, 0, 0], targetPosition, progress, color }: BookPartProps) {
  const meshRef = useRef<Mesh>(null)

  useFrame(() => {
    if (!meshRef.current) return

    // Interpolate between base position and exploded position
    meshRef.current.position.x = position[0] + (targetPosition[0] - position[0]) * progress
    meshRef.current.position.y = position[1] + (targetPosition[1] - position[1]) * progress
    meshRef.current.position.z = position[2] + (targetPosition[2] - position[2]) * progress

    // Add subtle rotation during explosion
    meshRef.current.rotation.x = rotation[0] + (Math.PI * 0.2 * progress)
    meshRef.current.rotation.y = rotation[1] + (Math.PI * 0.1 * progress)
  })

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <boxGeometry args={[2, 2.8, 0.05]} />
      <meshStandardMaterial
        color={color}
        roughness={0.3}
        metalness={0.1}
      />
    </mesh>
  )
}

interface ThreeDBookProps {
  scrollProgress: number
}

/**
 * 3D Book Component
 *
 * Kasane-inspired scroll-driven 3D book that:
 * - Flies through screen as user scrolls
 * - Breaks apart into individual pages
 * - Reassembles back together
 *
 * Scroll Phases:
 * 0.0-0.2: Book enters from distance
 * 0.2-0.5: Book breaks apart (explosion)
 * 0.5-0.8: Parts float separately
 * 0.8-1.0: Book reassembles
 */
export default function ThreeDBook({ scrollProgress }: ThreeDBookProps) {
  const groupRef = useRef<Group>(null)

  // Calculate animation phases
  const phases = useMemo(() => {
    // Entry phase (0-0.2): Book flies in
    const entryProgress = Math.min(scrollProgress / 0.2, 1)

    // Explosion phase (0.2-0.5): Parts separate
    const explosionStart = 0.2
    const explosionEnd = 0.5
    const explosionProgress = Math.max(
      0,
      Math.min(1, (scrollProgress - explosionStart) / (explosionEnd - explosionStart))
    )

    // Reassembly phase (0.8-1.0): Parts come back together
    const reassemblyStart = 0.8
    const reassemblyEnd = 1.0
    const reassemblyProgress = Math.max(
      0,
      Math.min(1, (scrollProgress - reassemblyStart) / (reassemblyEnd - reassemblyStart))
    )

    // Combined: explosion goes 0→1, then reassembly brings it back to 0
    const separationAmount = explosionProgress * (1 - reassemblyProgress)

    return {
      entryProgress,
      separationAmount,
    }
  }, [scrollProgress])

  // Update group rotation based on scroll
  useFrame(() => {
    if (!groupRef.current) return

    // Camera movement: book enters from distance
    const zPosition = -10 + phases.entryProgress * 10

    groupRef.current.position.z = zPosition

    // Subtle rotation as it enters
    groupRef.current.rotation.y = (1 - phases.entryProgress) * Math.PI * 0.5
  })

  return (
    <group ref={groupRef}>
      {/* Front Cover */}
      <BookPart
        position={[0, 0, 0.1]}
        targetPosition={[0, 0, 2]}
        progress={phases.separationAmount}
        color="#2d3e2f"
      />

      {/* Pages (stack of thin slices) */}
      {Array.from({ length: 15 }).map((_, i) => {
        const zOffset = -0.05 - i * 0.02
        const explosionZ = -2 - i * 0.3
        const explosionX = (i % 2 === 0 ? 1 : -1) * (i * 0.1)

        return (
          <BookPart
            key={i}
            position={[0, 0, zOffset]}
            targetPosition={[explosionX, 0, explosionZ]}
            progress={phases.separationAmount}
            color="#f9f7f1"
          />
        )
      })}

      {/* Back Cover */}
      <BookPart
        position={[0, 0, -0.4]}
        targetPosition={[0, 0, -5]}
        progress={phases.separationAmount}
        color="#2d3e2f"
      />

      {/* Spine */}
      <BookPart
        position={[-1, 0, -0.15]}
        rotation={[0, Math.PI / 2, 0]}
        targetPosition={[-3, 0, -2]}
        progress={phases.separationAmount}
        color="#1a2419"
      />
    </group>
  )
}
