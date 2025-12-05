'use client'

import { useRef, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
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

  // Load the beaker image as texture
  const texture = useLoader(THREE.TextureLoader, imagePath)

  // Floating animation
  useFrame((state) => {
    if (!meshRef.current) return

    const time = state.clock.getElapsedTime()
    const baseY = position[1]
    const floatOffset = Math.sin(time * 0.5 + index) * 0.2
    const hoverLift = (isHovered || isSelected) ? 0.3 : 0

    meshRef.current.position.y = baseY + floatOffset + hoverLift

    // Slight rotation on hover
    if (isHovered || isSelected) {
      meshRef.current.rotation.y = Math.sin(time * 2) * 0.05
    } else {
      meshRef.current.rotation.y = 0
    }

    // Scale pulse on hover/selected
    const targetScale = (isHovered || isSelected) ? 1.1 : 1
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
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
        opacity={isHovered || isSelected ? 1 : 0.95}
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
      {/* Dark laboratory environment */}
      <Environment preset="night" />
      <ambientLight intensity={0.3} />
      <spotLight position={[0, 10, 0]} intensity={0.5} color="#D4AF37" />

      {/* Floating beaker sprites */}
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

      {/* Camera controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={6}
        maxDistance={15}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
        enableDamping
        dampingFactor={0.05}
      />
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
