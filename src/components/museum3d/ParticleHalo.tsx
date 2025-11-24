import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ParticleHaloProps {
  count?: number
  color?: string
  radius?: number
  speed?: number
}

/**
 * ParticleHalo - Floating particles around each stop marker
 *
 * Features:
 * - Spherical distribution
 * - Gentle orbital motion
 * - Configurable color, count, radius
 * - Hardware-accelerated rendering
 */
export function ParticleHalo({
  count = 500,
  color = '#C9A050',
  radius = 2,
  speed = 0.5,
}: ParticleHaloProps) {
  const pointsRef = useRef<THREE.Points>(null)

  // Generate particle positions in a sphere
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      // Spherical coordinates for even distribution
      const r = radius + Math.random() * 1
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
    }

    return positions
  }, [count, radius])

  // Animate particles
  useFrame((state) => {
    if (!pointsRef.current) return

    const time = state.clock.getElapsedTime()

    // Gentle rotation
    pointsRef.current.rotation.y = time * speed * 0.1
    pointsRef.current.rotation.x = Math.sin(time * speed * 0.05) * 0.1

    // Pulsing opacity effect
    const material = pointsRef.current.material as THREE.PointsMaterial
    material.opacity = 0.5 + Math.sin(time * speed) * 0.2
  })

  // Create geometry with positions
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [positions])

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.05}
        color={color}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
