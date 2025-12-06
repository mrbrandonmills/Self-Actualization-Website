'use client'

import { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Environment, Sparkles, useGLTF, Html } from '@react-three/drei'
import { EffectComposer, Bloom, DepthOfField, N8AO } from '@react-three/postprocessing'
import * as THREE from 'three'
import { Course } from '@/data/courses'

/**
 * Alchemist Laboratory - Award-Winning Exploration Experience
 * Immersive scavenger hunt laboratory featuring:
 * - "Laboratory in the Swamp" 145MB professional GLB model (Vercel Blob CDN)
 * - Glowing bottles on shelves that users explore to discover courses
 * - N8AO ambient occlusion for depth
 * - Cinematic depth of field and bloom effects
 * - PBR materials with realistic lighting
 * - Social media worthy exploration and discovery mechanic
 * Production-ready with Vercel Blob Storage CDN
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

interface GlowingBottleProps {
  position: [number, number, number]
  course: Course
  onClick: () => void
  isSelected: boolean
  color: string
  label: string
}

// Glowing Bottle on Shelf - Invisible clickable area with pulsing light
function GlowingBottle({ position, course, onClick, isSelected, color, label }: GlowingBottleProps) {
  const lightRef = useRef<THREE.PointLight>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Pulsing light animation
  useFrame((state) => {
    if (!lightRef.current) return

    const time = state.clock.getElapsedTime()

    // Pulse intensity
    const baseIntensity = isHovered || isSelected ? 4 : 2
    const pulseIntensity = baseIntensity + Math.sin(time * 3) * 1
    lightRef.current.intensity = pulseIntensity
  })

  return (
    <group position={position}>
      {/* Invisible clickable sphere around bottle */}
      <mesh
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
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Pulsing point light at bottle position */}
      <pointLight
        ref={lightRef}
        color={color}
        intensity={2}
        distance={8}
        decay={2}
      />

      {/* Floating label on hover */}
      {isHovered && (
        <Html position={[0, 1, 0]} center>
          <div
            style={{
              background: 'rgba(0, 0, 0, 0.9)',
              color: '#D4AF37',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              border: '2px solid ' + color,
              pointerEvents: 'none',
              boxShadow: `0 0 20px ${color}`,
            }}
          >
            {label}
          </div>
        </Html>
      )}
    </group>
  )
}

// Professional Laboratory Model Component - "Laboratory in the Swamp"
function ProfessionalLaboratory() {
  // Use Supabase CDN in production, local file in development
  const assetPath = process.env.NEXT_PUBLIC_ASSETS_CDN
    ? `${process.env.NEXT_PUBLIC_ASSETS_CDN}/laboratory-in-the-swamp/source/scene.glb`
    : '/assets/laboratory-in-the-swamp/source/scene.glb'

  const { scene } = useGLTF(assetPath)

  // Clone the scene to prevent multiple instances from sharing state
  const clonedScene = scene.clone()

  // Traverse and enhance materials for PBR quality
  useEffect(() => {
    clonedScene.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true

        // Enhance material properties for realistic rendering
        if (child.material) {
          child.material.envMapIntensity = 1.5
          child.material.needsUpdate = true
        }
      }
    })
  }, [clonedScene])

  return (
    <primitive
      object={clonedScene}
      scale={[0.5, 0.5, 0.5]}
      position={[0, -4, 0]}
      rotation={[0, Math.PI, 0]}
    />
  )
}

function BeakerSprite({ imagePath, position, course, onClick, isSelected, index }: BeakerSpriteProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [hasEntered, setHasEntered] = useState(false)
  const [opacity, setOpacity] = useState(0)

  // Load the beaker image as texture with high-quality filtering
  const texture = useLoader(THREE.TextureLoader, imagePath)

  // Enable anisotropic filtering for sharp rendering
  useEffect(() => {
    if (texture) {
      texture.anisotropy = 16 // Maximum quality
      texture.minFilter = THREE.LinearMipmapLinearFilter
      texture.magFilter = THREE.LinearFilter
    }
  }, [texture])

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

    // Entrance animation - descend from above onto table
    if (!hasEntered) {
      const startX = position[0]
      const startY = position[1] + 8 // Start from above the table
      const startZ = position[2]

      meshRef.current.position.x = startX
      meshRef.current.position.y = startY
      meshRef.current.position.z = startZ
      meshRef.current.scale.set(0.3, 0.3, 0.3)
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
      <planeGeometry args={[2.5, 3]} />
      <meshBasicMaterial
        map={texture}
        transparent
        side={THREE.DoubleSide}
        opacity={opacity}
      />

      {/* Shadow plane below beaker */}
      <mesh position={[0, -1.5, 0.1]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[1.2, 32]} />
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={opacity * 0.2}
        />
      </mesh>

      {/* Glow ring on hover/selected */}
      {(isHovered || isSelected) && (
        <mesh position={[0, 0, -0.1]}>
          <ringGeometry args={[1.5, 1.8, 32]} />
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
  // Map glowing bottles to courses - positioned at actual shelf bottle locations
  const bottleMappings = [
    {
      position: [-2.8, -0.5, -2.5] as [number, number, number], // Green bottle on lower left shelf
      course: courses[0], // Block A - Beginner
      color: '#4ade80', // Green
      label: `🧪 ${courses[0]?.title || 'Beginner Course'}`,
    },
    {
      position: [1.5, 0.8, -3] as [number, number, number], // Blue bottle on middle shelf
      course: courses[1], // Block B - Intermediate
      color: '#3b82f6', // Blue
      label: `🧪 ${courses[1]?.title || 'Intermediate Course'}`,
    },
    {
      position: [3.2, 0.2, -2.8] as [number, number, number], // Purple bottle on right shelf
      course: courses[2], // Block C - Advanced
      color: '#a855f7', // Purple
      label: `🧪 ${courses[2]?.title || 'Advanced Course'}`,
    },
    {
      position: [-3.5, 1.5, -3.2] as [number, number, number], // Amber bottle on upper shelf
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
      color: '#f59e0b', // Amber
      label: '🧪 Coming Soon',
    },
  ]

  return (
    <>
      {/* Laboratory Environment Setup */}
      <Environment preset="warehouse" />
      <fog attach="fog" args={['#05201f', 15, 40]} />

      {/* Global ambient lighting - brightened for better visibility */}
      <ambientLight intensity={0.8} color="#f5e6d3" />

      {/* Main directional light from above-front (sunlight through window) */}
      <directionalLight
        position={[5, 10, 8]}
        intensity={2.0}
        color="#fff8dc"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />

      {/* Warm fill light from left */}
      <pointLight
        position={[-10, 5, 5]}
        intensity={1.2}
        color="#ffa500"
        distance={20}
        castShadow
      />

      {/* Cool rim light from right */}
      <pointLight
        position={[10, 5, 5]}
        intensity={1.0}
        color="#87ceeb"
        distance={20}
      />

      {/* Back wall rim light */}
      <pointLight
        position={[0, 8, -6]}
        intensity={0.8}
        color="#D4AF37"
        distance={15}
      />

      {/* Atmospheric golden particles */}
      <Sparkles
        count={80}
        scale={[25, 12, 15]}
        size={1.5}
        speed={0.2}
        opacity={0.3}
        color="#D4AF37"
      />

      {/* Professional Laboratory Model with Loading */}
      <Suspense fallback={<Html center><div style={{ color: '#D4AF37', fontSize: '20px', fontWeight: 'bold' }}>Loading Award-Winning Laboratory...</div></Html>}>
        <ProfessionalLaboratory />
      </Suspense>

      {/* Glowing bottles on shelves - explore to discover courses */}
      {bottleMappings.map((mapping) => (
        <GlowingBottle
          key={mapping.course.id}
          position={mapping.position}
          course={mapping.course}
          onClick={() => onBeakerClick(mapping.course.id)}
          isSelected={selectedCourseId === mapping.course.id}
          color={mapping.color}
          label={mapping.label}
        />
      ))}

      {/* Camera controls with updated constraints */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        minDistance={8}
        maxDistance={25}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.2}
        enableDamping
        dampingFactor={0.08}
        autoRotate={false}
        target={[0, -2, 0]}
      />

      {/* Award-Winning Post-Processing Pipeline */}
      <EffectComposer>
        {/* N8AO - Modern ambient occlusion (better than SSAO, no NormalPass needed) */}
        <N8AO
          aoRadius={0.5}
          intensity={2}
          quality="performance"
          color="black"
        />

        {/* Cinematic depth of field - reduced for better clarity */}
        <DepthOfField
          focusDistance={0.05}
          focalLength={0.1}
          bokehScale={1}
          height={480}
        />

        {/* Enhanced bloom for magical atmosphere */}
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
        camera={{ position: [0, 0, 15], fov: 60 }}
        shadows
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
          Explore the laboratory • Find glowing bottles • Click to discover courses
        </p>
      </div>
    </div>
  )
}
