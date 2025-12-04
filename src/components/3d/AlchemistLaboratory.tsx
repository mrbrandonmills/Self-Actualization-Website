'use client'

import { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, Float, Sparkles } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import { Course } from '@/data/courses'

/**
 * AlchemistLaboratory - Award-winning 3D chemistry laboratory scene
 * Floating beakers representing courses in a dramatic dark teal laboratory
 * Museum-quality KASANÉ-level experience with GPU-accelerated smooth 60fps animations
 */

interface AlchemistLaboratoryProps {
  courses: Course[]
  onBeakerClick: (courseId: string) => void
  selectedCourseId?: string | null
}

interface Beaker3DProps {
  course: Course
  position: [number, number, number]
  index: number
  onClick: () => void
  isSelected: boolean
  isMobile: boolean
}

// Get liquid color by course level
const getLiquidColor = (level: Course['level']): string => {
  switch (level) {
    case 'Beginner':
      return '#4ade80' // Glowing green
    case 'Intermediate':
      return '#3b82f6' // Electric blue
    case 'Advanced':
      return '#a855f7' // Royal purple
    default:
      return '#4ade80'
  }
}

/**
 * Beaker3D - Individual course beaker with swirling liquid
 * Features: Glass cylinder, colored liquid, golden stopper, glow effect, click detection
 */
function Beaker3D({ course, position, index, onClick, isSelected, isMobile }: Beaker3DProps) {
  const beakerRef = useRef<THREE.Group>(null)
  const liquidRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.PointLight>(null)
  const [isHovered, setIsHovered] = useState(false)

  const liquidColor = getLiquidColor(course.level)

  // Floating animation with gentle bob
  useFrame((state) => {
    if (!beakerRef.current) return

    const time = state.clock.getElapsedTime()
    const baseY = position[1]
    const floatOffset = Math.sin(time * 0.5 + index) * 0.15
    const hoverLift = (isHovered || isSelected) ? 0.3 : 0

    beakerRef.current.position.y = baseY + floatOffset + hoverLift

    // Liquid swirl effect
    if (liquidRef.current) {
      const swirlingSpeed = (isHovered || isSelected) ? 2.0 : 0.5
      liquidRef.current.rotation.y += 0.01 * swirlingSpeed
    }

    // Glow intensity
    if (glowRef.current) {
      const glowIntensity = (isHovered || isSelected) ? 3 : 0
      glowRef.current.intensity = THREE.MathUtils.lerp(
        glowRef.current.intensity,
        glowIntensity,
        0.1
      )
    }
  })

  return (
    <group ref={beakerRef} position={position}>
      {/* Golden stopper/cap */}
      <mesh
        position={[0, 1.2, 0]}
        castShadow
      >
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial
          color="#D4AF37"
          metalness={0.9}
          roughness={0.1}
          emissive="#D4AF37"
          emissiveIntensity={isHovered || isSelected ? 0.5 : 0.2}
        />
      </mesh>

      {/* Glass cylinder beaker */}
      <mesh
        position={[0, 0, 0]}
        castShadow
        receiveShadow
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
        <cylinderGeometry args={[0.3, 0.35, 2, 32, 1, true]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={1.0}
          metalness={0.1}
          roughness={0.05}
          transmission={0.9}
          thickness={0.5}
          envMapIntensity={1.5}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          ior={1.5}
        />
      </mesh>

      {/* Swirling liquid inside */}
      <mesh
        ref={liquidRef}
        position={[0, -0.3, 0]}
        castShadow
        receiveShadow
      >
        <cylinderGeometry args={[0.28, 0.33, 1.4, 32]} />
        <meshStandardMaterial
          color={liquidColor}
          transparent={false}
          metalness={0.3}
          roughness={0.4}
          emissive={liquidColor}
          emissiveIntensity={isHovered || isSelected ? 0.8 : 0.5}
        />
      </mesh>

      {/* Golden glow point light on hover */}
      <pointLight
        ref={glowRef}
        position={[0, 0, 0]}
        color="#D4AF37"
        intensity={0}
        distance={4}
        decay={2}
      />

      {/* Sparkle particles for atmosphere (fewer on mobile) */}
      {!isMobile && (isHovered || isSelected) && (
        <Sparkles
          count={20}
          scale={1.5}
          size={2}
          speed={0.4}
          color="#D4AF37"
          opacity={0.6}
        />
      )}

      {/* Course level indicator ring */}
      {(isHovered || isSelected) && (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
          <mesh position={[0, 1.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.5, 0.03, 16, 32]} />
            <meshStandardMaterial
              color={liquidColor}
              metalness={0.8}
              roughness={0.2}
              emissive={liquidColor}
              emissiveIntensity={0.6}
            />
          </mesh>
        </Float>
      )}
    </group>
  )
}

/**
 * LaboratoryEnvironment - Dark teal lab with reflective floor, lighting, background props
 */
function LaboratoryEnvironment({ isMobile }: { isMobile: boolean }) {
  return (
    <>
      {/* Dark reflective floor */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -2, 0]}
        receiveShadow
      >
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial
          color="#05201f"
          metalness={0.9}
          roughness={0.1}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Ambient laboratory glow */}
      <ambientLight intensity={0.2} color="#0a3a38" />

      {/* Dramatic golden spotlights on beakers */}
      <spotLight
        position={[0, 8, 0]}
        intensity={2}
        angle={Math.PI / 3}
        penumbra={0.5}
        color="#D4AF37"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Accent rim lights */}
      <pointLight position={[-5, 3, -5]} intensity={1.5} color="#4ade80" distance={15} />
      <pointLight position={[5, 3, -5]} intensity={1.5} color="#3b82f6" distance={15} />
      <pointLight position={[0, 3, 5]} intensity={1.5} color="#a855f7" distance={15} />

      {/* Floating laboratory instruments in background (simplified on mobile) */}
      {!isMobile && (
        <>
          {/* Golden microscope */}
          <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
            <mesh position={[-6, 2, -8]} castShadow>
              <torusGeometry args={[0.3, 0.1, 16, 32]} />
              <meshStandardMaterial
                color="#D4AF37"
                metalness={0.9}
                roughness={0.2}
                emissive="#D4AF37"
                emissiveIntensity={0.2}
              />
            </mesh>
          </Float>

          {/* Golden scales */}
          <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
            <mesh position={[6, 2, -8]} castShadow>
              <octahedronGeometry args={[0.4, 0]} />
              <meshStandardMaterial
                color="#D4AF37"
                metalness={0.9}
                roughness={0.2}
                emissive="#D4AF37"
                emissiveIntensity={0.2}
              />
            </mesh>
          </Float>

          {/* Floating golden particles (atmosphere) */}
          <Sparkles
            count={isMobile ? 50 : 100}
            scale={[20, 10, 20]}
            size={1.5}
            speed={0.2}
            color="#D4AF37"
            opacity={0.3}
          />
        </>
      )}

      {/* Environment map for reflections - sunset provides better illumination for glass materials */}
      <Environment preset="sunset" />
    </>
  )
}

/**
 * CameraController - Smooth camera transitions with lerp
 */
function CameraController({ selectedBeakerPosition }: { selectedBeakerPosition: [number, number, number] | null }) {
  const { camera } = useThree()

  useFrame(() => {
    if (selectedBeakerPosition) {
      // Zoom to selected beaker
      const targetPosition = new THREE.Vector3(
        selectedBeakerPosition[0],
        selectedBeakerPosition[1] + 1,
        selectedBeakerPosition[2] + 5
      )
      camera.position.lerp(targetPosition, 0.05)

      const lookAtTarget = new THREE.Vector3(...selectedBeakerPosition)
      const currentLookAt = new THREE.Vector3()
      camera.getWorldDirection(currentLookAt)
      currentLookAt.add(camera.position)
      currentLookAt.lerp(lookAtTarget, 0.05)
      camera.lookAt(currentLookAt)
    } else {
      // Return to default view
      const defaultPosition = new THREE.Vector3(0, 3, 10)
      camera.position.lerp(defaultPosition, 0.05)

      const defaultLookAt = new THREE.Vector3(0, 0, 0)
      const currentLookAt = new THREE.Vector3()
      camera.getWorldDirection(currentLookAt)
      currentLookAt.add(camera.position)
      currentLookAt.lerp(defaultLookAt, 0.05)
      camera.lookAt(currentLookAt)
    }
  })

  return null
}

/**
 * AlchemistLaboratory Scene
 */
function AlchemistLaboratoryScene({ courses, onBeakerClick, selectedCourseId }: AlchemistLaboratoryProps) {
  const [localSelectedId, setLocalSelectedId] = useState<string | null>(selectedCourseId || null)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile on mount
  useMemo(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768)
    }
  }, [])

  // Calculate beaker positions in elegant arc formation
  const beakerPositions = useMemo(() => {
    const positions: [number, number, number][] = []
    const radius = 4
    const angleStep = Math.PI / (courses.length + 1)

    courses.forEach((_, index) => {
      const angle = Math.PI - angleStep * (index + 1)
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius - 3
      const y = 0
      positions.push([x, y, z])
    })

    return positions
  }, [courses.length])

  // Get selected beaker position for camera
  const selectedBeakerPosition = useMemo(() => {
    if (!localSelectedId) return null
    const index = courses.findIndex(c => c.id === localSelectedId)
    if (index === -1) return null
    return beakerPositions[index]
  }, [localSelectedId, courses, beakerPositions])

  const handleBeakerClick = (courseId: string) => {
    setLocalSelectedId(courseId === localSelectedId ? null : courseId)
    onBeakerClick(courseId)
  }

  return (
    <>
      {/* Laboratory environment */}
      <LaboratoryEnvironment isMobile={isMobile} />

      {/* Beakers arranged in arc */}
      {courses.map((course, index) => (
        <Beaker3D
          key={course.id}
          course={course}
          position={beakerPositions[index]}
          index={index}
          onClick={() => handleBeakerClick(course.id)}
          isSelected={localSelectedId === course.id}
          isMobile={isMobile}
        />
      ))}

      {/* Camera controller for smooth transitions */}
      <CameraController selectedBeakerPosition={selectedBeakerPosition} />

      {/* Orbit controls for manual exploration */}
      <OrbitControls
        enablePan={false}
        enableZoom={!isMobile}
        minDistance={5}
        maxDistance={15}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
        enableDamping
        dampingFactor={0.05}
      />

      {/* Post-processing for glowing liquid effects */}
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.3}
          luminanceSmoothing={0.9}
          intensity={2.0}
          radius={0.8}
        />
      </EffectComposer>
    </>
  )
}

/**
 * AlchemistLaboratory - Main export component with Canvas wrapper
 */
export default function AlchemistLaboratory(props: AlchemistLaboratoryProps) {
  return (
    <div className="w-full h-screen bg-[#05201f]">
      <Canvas
        camera={{ position: [0, 3, 10], fov: 50 }}
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        performance={{ min: 0.5 }}
        onCreated={({ gl }) => {
          // Enable tone mapping for realistic PBR materials (glass transmission)
          gl.toneMapping = THREE.ACESFilmicToneMapping
          gl.toneMappingExposure = 1.2
          gl.outputColorSpace = THREE.SRGBColorSpace
        }}
      >
        <AlchemistLaboratoryScene {...props} />
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

// Export Beaker3D for standalone use
export { Beaker3D }
