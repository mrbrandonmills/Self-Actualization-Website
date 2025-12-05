'use client'

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Environment, Sparkles } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import { Course } from '@/data/courses'

/**
 * Alchemist Laboratory with Sprite Beakers
 * Uses extracted 4K beaker images as 2D sprites positioned in 3D space
 * Floating animations + camera controls + clickable interaction
 */

interface AlchemistLaboratorySpriteProps {
  courses: Course[]
  onBeakerClick: (courseId: string) => void
  selectedCourseId?: string | null
}

interface BeakerSpriteProps {
  imagePath: string
  position: [number, number, number]
  course: Course
  onClick: () => void
  isSelected: boolean
  index: number
}

function BeakerSprite({ imagePath, position, course, onClick, isSelected, index }: BeakerSpriteProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [hasEntered, setHasEntered] = useState(false)
  const [opacity, setOpacity] = useState(0)

  // Load the beaker image as texture
  const texture = useLoader(THREE.TextureLoader, imagePath)

  // Trigger entrance animation after staggered delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasEntered(true)
    }, index * 300 + 500) // Stagger by 300ms, start after 500ms

    return () => clearTimeout(timer)
  }, [index])

  // Entrance + Floating animation
  useFrame((state) => {
    if (!meshRef.current) return

    const time = state.clock.getElapsedTime()

    // Entrance animation
    if (!hasEntered) {
      // Start from far away and high up
      const startX = position[0] + (index % 2 === 0 ? -10 : 10)
      const startY = position[1] + 8
      const startZ = position[2] - 5

      meshRef.current.position.x = startX
      meshRef.current.position.y = startY
      meshRef.current.position.z = startZ
      meshRef.current.scale.set(0.1, 0.1, 0.1)
      setOpacity(0)
    } else {
      // Animate to final position
      const targetX = position[0]
      const baseY = position[1]
      const floatOffset = Math.sin(time * 0.5 + index) * 0.2
      const hoverLift = (isHovered || isSelected) ? 0.3 : 0
      const targetY = baseY + floatOffset + hoverLift
      const targetZ = position[2]

      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.05)
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.05)
      meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.05)

      // Fade in
      setOpacity((prev) => Math.min(prev + 0.02, isHovered || isSelected ? 1 : 0.95))

      // Scale in with bounce
      const targetScale = (isHovered || isSelected) ? 1.1 : 1
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08)

      // Entrance rotation
      if (meshRef.current.scale.x < 0.9) {
        meshRef.current.rotation.y = time * 2
        meshRef.current.rotation.z = Math.sin(time * 3) * 0.3
      } else {
        // Normal hover rotation
        if (isHovered || isSelected) {
          meshRef.current.rotation.y = Math.sin(time * 2) * 0.05
        } else {
          meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, 0, 0.1)
        }
        meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, 0, 0.1)
      }
    }
  })

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      onPointerOver={(e) => {
        e.stopPropagation()
        setIsHovered(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        setIsHovered(false)
        document.body.style.cursor = 'default'
      }}
    >
      <planeGeometry args={[2, 2.5]} />
      <meshBasicMaterial
        map={texture}
        transparent
        side={THREE.DoubleSide}
        opacity={opacity}
      />

      {/* Glow ring on hover/selected */}
      {(isHovered || isSelected) && (
        <mesh position={[0, 0, -0.1]}>
          <ringGeometry args={[1.2, 1.4, 32]} />
          <meshBasicMaterial
            color="#D4AF37"
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </mesh>
  )
}

function LaboratoryScene({ courses, onBeakerClick, selectedCourseId }: AlchemistLaboratorySpriteProps) {
  // Map beakers to courses (using proper extracted PNG files)
  const beakerMappings = [
    {
      imagePath: '/assets/beakers/individual/beaker-1-green.png',
      position: [-4, 0, 0] as [number, number, number],
      course: courses[0], // Block A - Beginner
    },
    {
      imagePath: '/assets/beakers/individual/beaker-2-blue.png',
      position: [-1.5, -0.3, 0.5] as [number, number, number],
      course: courses[1], // Block B - Intermediate
    },
    {
      imagePath: '/assets/beakers/individual/beaker-3-purple.png',
      position: [1.5, 0.2, 0] as [number, number, number],
      course: courses[2], // Block C - Advanced
    },
    {
      imagePath: '/assets/beakers/individual/beaker-4.png',
      position: [4, -0.1, 0.5] as [number, number, number],
      course: courses[3] || { // Future course placeholder
        id: 'course-4',
        title: 'Coming Soon',
        level: 'Advanced' as const,
        description: 'Future course content',
        duration: 'TBD',
        price: 0,
        instructor: 'TBD',
        modules: 0,
      },
    },
  ]

  return (
    <>
      {/* Dramatic laboratory environment */}
      <Environment preset="night" />
      <ambientLight intensity={0.2} color="#0a2a28" />

      {/* Dramatic golden spotlight from above */}
      <spotLight
        position={[0, 12, 0]}
        intensity={1.5}
        angle={Math.PI / 3}
        penumbra={0.5}
        color="#D4AF37"
        castShadow
      />

      {/* Accent rim lights */}
      <pointLight position={[-8, 4, -5]} intensity={0.8} color="#4ade80" distance={15} />
      <pointLight position={[8, 4, -5]} intensity={0.8} color="#a855f7" distance={15} />
      <pointLight position={[0, 4, 8]} intensity={0.8} color="#3b82f6" distance={15} />

      {/* Floating golden particles atmosphere */}
      <Sparkles
        count={100}
        scale={[20, 15, 20]}
        size={2}
        speed={0.3}
        opacity={0.4}
        color="#D4AF37"
      />

      {/* Floating beaker sprites with entrance animations */}
      {beakerMappings.map((mapping, index) => (
        <BeakerSprite
          key={mapping.course.id}
          imagePath={mapping.imagePath}
          position={mapping.position}
          course={mapping.course}
          onClick={() => onBeakerClick(mapping.course.id)}
          isSelected={selectedCourseId === mapping.course.id}
          index={index}
        />
      ))}

      {/* Smooth camera controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={6}
        maxDistance={15}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
        enableDamping
        dampingFactor={0.05}
        autoRotate={false}
        autoRotateSpeed={0.5}
      />

      {/* Premium bloom effect for glowing atmosphere */}
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          intensity={1.5}
          radius={0.8}
        />
      </EffectComposer>
    </>
  )
}

export default function AlchemistLaboratorySprites(props: AlchemistLaboratorySpriteProps) {
  return (
    <div className="w-full h-screen bg-gradient-to-b from-[#05201f] to-[#0a2a28]">
      <Canvas
        camera={{ position: [0, 2, 10], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <LaboratoryScene {...props} />
      </Canvas>

      {/* Overlay instructions */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center pointer-events-none">
        <p className="text-[#D4AF37] text-sm font-light tracking-widest uppercase opacity-70">
          Click beakers to explore • Drag to rotate
        </p>
      </div>
    </div>
  )
}
