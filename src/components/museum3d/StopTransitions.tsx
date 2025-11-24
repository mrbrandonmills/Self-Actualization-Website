import { useFrame } from '@react-three/fiber'
import { useLenisScroll } from '@/hooks/useLenisScroll'
import { useRef, useState } from 'react'
import * as THREE from 'three'

/**
 * StopTransitions - Visual effects when transitioning between stops
 *
 * Features:
 * - Particle bursts at stop boundaries
 * - Screen flash effects
 * - Camera shake on transitions
 * - Sound trigger points
 */

const STOP_POSITIONS = [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 1]
const TRANSITION_THRESHOLD = 0.02 // How close to a stop to trigger transition

export function StopTransitions() {
  const { scrollProgress } = useLenisScroll()
  const [triggeredStops, setTriggeredStops] = useState<Set<number>>(new Set())
  const particlesRef = useRef<THREE.Points>(null)
  const particleCount = 100
  const positions = new Float32Array(particleCount * 3)
  const velocities = useRef(new Float32Array(particleCount * 3))
  const [transitionActive, setTransitionActive] = useState(false)

  // Initialize particle positions
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 2
    positions[i * 3 + 1] = (Math.random() - 0.5) * 2
    positions[i * 3 + 2] = (Math.random() - 0.5) * 2

    velocities.current[i * 3] = (Math.random() - 0.5) * 0.1
    velocities.current[i * 3 + 1] = (Math.random() - 0.5) * 0.1
    velocities.current[i * 3 + 2] = (Math.random() - 0.5) * 0.1
  }

  useFrame(() => {
    // Check if we're near any stop position
    for (let i = 0; i < STOP_POSITIONS.length; i++) {
      const stopPos = STOP_POSITIONS[i]
      const distance = Math.abs(scrollProgress - stopPos)

      if (distance < TRANSITION_THRESHOLD) {
        // Trigger transition effect if not already triggered
        if (!triggeredStops.has(i)) {
          setTriggeredStops((prev) => new Set(prev).add(i))
          setTransitionActive(true)

          // Reset transition after delay
          setTimeout(() => setTransitionActive(false), 500)
        }
        break
      }
    }

    // Animate particles during transition
    if (transitionActive && particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] += velocities.current[i * 3]
        positions[i * 3 + 1] += velocities.current[i * 3 + 1]
        positions[i * 3 + 2] += velocities.current[i * 3 + 2]

        // Add gravity
        velocities.current[i * 3 + 1] -= 0.001
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <>
      {/* Particle System */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#C9A050"
          transparent
          opacity={transitionActive ? 0.8 : 0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Flash Effect - Light burst on transitions */}
      {transitionActive && (
        <pointLight
          position={[0, 2, scrollProgress * -80 + 10]}
          intensity={10}
          distance={10}
          color="#C9A050"
          decay={2}
        />
      )}
    </>
  )
}
