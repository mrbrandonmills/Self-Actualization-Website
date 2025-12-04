'use client'

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { Course } from '@/data/courses'

/**
 * Alchemist Laboratory Hybrid - Uses 4K video beakers with 3D camera controls
 * Combines beautiful pre-rendered beakers with interactive 3D navigation
 */

interface AlchemistLaboratoryHybridProps {
  courses: Course[]
  onBeakerClick: (courseId: string) => void
  selectedCourseId?: string | null
}

interface VideoBackdropProps {
  videoSrc: string
}

function VideoBackdrop({ videoSrc }: VideoBackdropProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [video] = useState(() => {
    const vid = document.createElement('video')
    vid.src = videoSrc
    vid.crossOrigin = 'Anonymous'
    vid.loop = true
    vid.muted = true
    vid.play()
    return vid
  })

  useEffect(() => {
    return () => {
      video.pause()
      video.src = ''
    }
  }, [video])

  return (
    <mesh ref={meshRef} position={[0, 0, -8]}>
      <planeGeometry args={[16, 9]} />
      <meshBasicMaterial>
        <videoTexture attach="map" args={[video]} />
      </meshBasicMaterial>
    </mesh>
  )
}

interface BeakerHitBoxProps {
  position: [number, number, number]
  course: Course
  onClick: () => void
  isSelected: boolean
  onHover: (isHovered: boolean) => void
}

function BeakerHitBox({ position, course, onClick, isSelected, onHover }: BeakerHitBoxProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [isHovered, setIsHovered] = useState(false)

  useFrame(() => {
    if (meshRef.current && (isHovered || isSelected)) {
      meshRef.current.scale.lerp(new THREE.Vector3(1.1, 1.1, 1.1), 0.1)
    } else if (meshRef.current) {
      meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
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
        onHover(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        setIsHovered(false)
        onHover(false)
        document.body.style.cursor = 'default'
      }}
    >
      <cylinderGeometry args={[0.6, 0.5, 2.2, 16]} />
      <meshBasicMaterial
        visible={isHovered || isSelected}
        color={isSelected ? '#D4AF37' : '#FFFFFF'}
        transparent
        opacity={0.1}
        wireframe
      />
    </mesh>
  )
}

function LaboratoryScene({ courses, onBeakerClick, selectedCourseId }: AlchemistLaboratoryHybridProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  // Beaker positions (matching video layout approximately)
  const beakerPositions: [number, number, number][] = [
    [-5.5, 0, 0],  // Green left
    [-3.5, -0.3, 0.5],  // Green second
    [-1, 0, 0],  // Blue center-left
    [1, -0.3, 0.5],  // Blue center-right
    [3.5, 0.5, 0],  // Purple right
    [5.5, 0, 0.5],  // Purple rightmost
  ]

  const handleBeakerClick = (courseId: string) => {
    onBeakerClick(courseId)
  }

  return (
    <>
      {/* Video backdrop with beakers */}
      <VideoBackdrop videoSrc="/assets/beakers/beaker-scene.mp4" />

      {/* Interactive hit boxes over beakers */}
      {courses.map((course, index) => (
        <BeakerHitBox
          key={course.id}
          position={beakerPositions[index]}
          course={course}
          onClick={() => handleBeakerClick(course.id)}
          isSelected={selectedCourseId === course.id}
          onHover={(isHovered) => setHoveredId(isHovered ? course.id : null)}
        />
      ))}

      {/* Environment lighting */}
      <ambientLight intensity={0.5} />
      <Environment preset="sunset" />

      {/* Camera controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={8}
        maxDistance={20}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  )
}

export default function AlchemistLaboratoryHybrid(props: AlchemistLaboratoryHybridProps) {
  return (
    <div className="w-full h-screen bg-[#05201f]">
      <Canvas
        camera={{ position: [0, 2, 12], fov: 50 }}
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
