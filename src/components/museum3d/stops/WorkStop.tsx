import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useSpring, animated } from '@react-spring/three'
import * as THREE from 'three'
import { ParticleHalo } from '../ParticleHalo'

/**
 * WorkStop - 3D Camera Sculpture
 *
 * Features:
 * - Gold metallic camera body
 * - Glass lens with transmission
 * - 500 floating particles
 * - Spotlight casting shadows
 * - Rotates slowly (2 RPM)
 * - Hover: Tilts toward mouse, particles swarm
 */
export function WorkStop() {
  const groupRef = useRef<THREE.Group>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Spring animation for hover
  const { scale } = useSpring({
    scale: isHovered ? 1.1 : 1,
    config: { mass: 1, tension: 280, friction: 60 },
  })

  // Rotation animation
  useFrame((state) => {
    if (!groupRef.current) return

    const time = state.clock.getElapsedTime()

    // Slow rotation (2 RPM = 0.0333 rotations per second)
    groupRef.current.rotation.y = time * 0.2

    // Mouse proximity tilt
    if (isHovered) {
      const mouse = state.mouse
      groupRef.current.rotation.x = mouse.y * 0.3
      groupRef.current.rotation.z = mouse.x * 0.3
    } else {
      // Reset rotation
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        0,
        0.1
      )
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        0,
        0.1
      )
    }
  })

  return (
    <animated.group ref={groupRef} scale={scale} position={[0, 2, 0]}>
      {/* Camera Body - Gold Metallic */}
      <mesh
        castShadow
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
      >
        <boxGeometry args={[1.5, 1, 0.8]} />
        <meshPhysicalMaterial
          color="#D4AF37"
          metalness={0.9}
          roughness={0.1}
          envMapIntensity={1.5}
          clearcoat={1.0}
        />
      </mesh>

      {/* Lens - Glass with Transmission */}
      <mesh position={[0, 0, 0.5]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
        <meshPhysicalMaterial
          color="#ffffff"
          metalness={0}
          roughness={0}
          transmission={1.0}
          thickness={0.5}
          ior={1.5}
        />
      </mesh>

      {/* Viewfinder - Small gold accent */}
      <mesh position={[0, 0.6, -0.3]}>
        <boxGeometry args={[0.4, 0.3, 0.3]} />
        <meshPhysicalMaterial
          color="#C9A050"
          metalness={0.9}
          roughness={0.2}
          emissive="#C9A050"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Spotlight casting shadows */}
      <spotLight
        position={[3, 5, 3]}
        intensity={isHovered ? 3 : 2}
        angle={0.3}
        penumbra={0.5}
        castShadow
        color="#C9A050"
      />

      {/* Point light for proximity effect */}
      <pointLight
        position={[0, 0, 0]}
        intensity={isHovered ? 2 : 0.5}
        color="#D4AF37"
        distance={5}
      />

      {/* Particle Halo */}
      <ParticleHalo
        count={500}
        color="#C9A050"
        radius={2}
        speed={isHovered ? 1.5 : 0.5}
      />
    </animated.group>
  )
}
