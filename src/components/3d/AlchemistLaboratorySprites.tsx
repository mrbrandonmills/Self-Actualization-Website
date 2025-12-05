'use client'

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Environment, Sparkles } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import { Course } from '@/data/courses'

/**
 * Alchemist Laboratory - Full 3D Scene
 * Complete immersive laboratory with:
 * - Wooden lab table and shelving
 * - Stone walls and floor
 * - Ambient laboratory objects
 * - Realistic lighting and shadows
 * - High-quality beaker sprites positioned in 3D space
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

// Laboratory Table Component
function LabTable() {
  return (
    <group position={[0, -3, 0]}>
      {/* Main table top */}
      <mesh position={[0, 0.5, 0]} receiveShadow castShadow>
        <boxGeometry args={[28, 0.4, 8]} />
        <meshStandardMaterial
          color="#3d2817"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Table legs */}
      {[
        [-13, -1.5, 3.5],
        [13, -1.5, 3.5],
        [-13, -1.5, -3.5],
        [13, -1.5, -3.5],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow>
          <cylinderGeometry args={[0.3, 0.3, 3, 8]} />
          <meshStandardMaterial color="#2d1f12" roughness={0.9} />
        </mesh>
      ))}

      {/* Support beam */}
      <mesh position={[0, -2.5, 0]}>
        <boxGeometry args={[26, 0.3, 0.3]} />
        <meshStandardMaterial color="#2d1f12" roughness={0.9} />
      </mesh>
    </group>
  )
}

// Stone Wall Component
function StoneWall() {
  return (
    <group position={[0, 0, -8]}>
      {/* Main wall */}
      <mesh receiveShadow>
        <boxGeometry args={[40, 20, 1]} />
        <meshStandardMaterial
          color="#4a4a4a"
          roughness={0.95}
          metalness={0}
        />
      </mesh>

      {/* Stone texture detail blocks */}
      {Array.from({ length: 20 }).map((_, i) => {
        const x = (Math.random() - 0.5) * 35
        const y = (Math.random() - 0.5) * 15
        return (
          <mesh key={i} position={[x, y, 0.6]}>
            <boxGeometry args={[2 + Math.random(), 1.5 + Math.random(), 0.2]} />
            <meshStandardMaterial
              color={`#${Math.floor(Math.random() * 0x333333 + 0x333333).toString(16)}`}
              roughness={0.95}
            />
          </mesh>
        )
      })}
    </group>
  )
}

// Wooden Shelving
function Shelving() {
  return (
    <group position={[-16, 2, -6]}>
      {/* Vertical supports */}
      {[-2, 2].map((x, i) => (
        <mesh key={i} position={[x, 0, 0]} castShadow>
          <boxGeometry args={[0.3, 8, 0.3]} />
          <meshStandardMaterial color="#3d2817" roughness={0.8} />
        </mesh>
      ))}

      {/* Shelves */}
      {[0, 2, 4].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} receiveShadow castShadow>
          <boxGeometry args={[5, 0.2, 1.5]} />
          <meshStandardMaterial color="#3d2817" roughness={0.8} />
        </mesh>
      ))}

      {/* Books on shelves */}
      {[0, 2, 4].map((shelfY, shelfIndex) => (
        <group key={shelfIndex}>
          {Array.from({ length: 3 }).map((_, bookIndex) => {
            const x = -1.5 + bookIndex * 1.5
            return (
              <mesh
                key={bookIndex}
                position={[x, shelfY + 0.4, 0]}
                rotation={[0, Math.random() * 0.3 - 0.15, 0]}
              >
                <boxGeometry args={[0.8, 1.2, 0.3]} />
                <meshStandardMaterial
                  color={['#8B4513', '#654321', '#A0522D', '#CD853F'][Math.floor(Math.random() * 4)]}
                  roughness={0.7}
                />
              </mesh>
            )
          })}
        </group>
      ))}
    </group>
  )
}

// Floor Component
function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5.5, 0]} receiveShadow>
      <planeGeometry args={[60, 40]} />
      <meshStandardMaterial
        color="#2a2520"
        roughness={0.9}
        metalness={0}
      />
    </mesh>
  )
}

// Ambient Laboratory Objects
function AmbientObjects() {
  return (
    <group>
      {/* Glass bottles on table */}
      {[
        { pos: [-7, -1.5, 2], color: '#4ade80', height: 1.5 },
        { pos: [7, -1.5, 2.5], color: '#3b82f6', height: 1.2 },
        { pos: [-11, -1.5, -2], color: '#a855f7', height: 1.8 },
      ].map((bottle, i) => (
        <group key={i} position={bottle.pos as [number, number, number]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.3, 0.3, bottle.height, 16]} />
            <meshPhysicalMaterial
              color={bottle.color}
              transparent
              opacity={0.6}
              roughness={0.1}
              metalness={0.1}
              transmission={0.9}
            />
          </mesh>
        </group>
      ))}

      {/* Candles */}
      {[
        { pos: [-14, -1.8, 3] },
        { pos: [14, -1.8, -3] },
      ].map((candle, i) => (
        <group key={i} position={candle.pos as [number, number, number]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.2, 0.25, 1, 8]} />
            <meshStandardMaterial color="#f5e6d3" roughness={0.6} />
          </mesh>
          {/* Flame glow */}
          <pointLight
            position={[0, 0.7, 0]}
            intensity={0.5}
            distance={3}
            color="#ff6b35"
          />
          <mesh position={[0, 0.6, 0]}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshBasicMaterial color="#ff6b35" />
          </mesh>
        </group>
      ))}

      {/* Scroll/Paper on table */}
      <mesh position={[11, -1.7, 1]} rotation={[-Math.PI / 2, 0, 0.3]} receiveShadow>
        <planeGeometry args={[2, 3]} />
        <meshStandardMaterial color="#f5e6d3" roughness={0.8} />
      </mesh>
    </group>
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
  // Map beakers to courses - positioned ON the lab table
  const beakerMappings = [
    {
      imagePath: '/assets/beakers/individual/beaker-1-green.png',
      position: [-8, -1, 1] as [number, number, number],
      course: courses[0], // Block A - Beginner
    },
    {
      imagePath: '/assets/beakers/individual/beaker-2-blue.png',
      position: [-2, -1.2, 0.5] as [number, number, number],
      course: courses[1], // Block B - Intermediate
    },
    {
      imagePath: '/assets/beakers/individual/beaker-3-purple.png',
      position: [3, -0.8, 0.8] as [number, number, number],
      course: courses[2], // Block C - Advanced
    },
    {
      imagePath: '/assets/beakers/individual/beaker-4.png',
      position: [9, -1.1, 0.3] as [number, number, number],
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
      {/* Laboratory Environment Setup */}
      <Environment preset="warehouse" />
      <fog attach="fog" args={['#05201f', 15, 40]} />

      {/* Global ambient lighting */}
      <ambientLight intensity={0.4} color="#f5e6d3" />

      {/* Main directional light from above-front (sunlight through window) */}
      <directionalLight
        position={[5, 10, 8]}
        intensity={1.2}
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
        intensity={0.6}
        color="#ffa500"
        distance={20}
        castShadow
      />

      {/* Cool rim light from right */}
      <pointLight
        position={[10, 5, 5]}
        intensity={0.5}
        color="#87ceeb"
        distance={20}
      />

      {/* Back wall rim light */}
      <pointLight
        position={[0, 8, -6]}
        intensity={0.4}
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

      {/* Laboratory Environment Components */}
      <Floor />
      <StoneWall />
      <LabTable />
      <Shelving />
      <AmbientObjects />

      {/* Beaker sprites positioned on table with entrance animations */}
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
        target={[0, -1, 0]}
      />

      {/* Enhanced bloom for magical laboratory atmosphere */}
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.3}
          luminanceSmoothing={0.9}
          intensity={1.2}
          radius={0.6}
        />
      </EffectComposer>
    </>
  )
}

export default function AlchemistLaboratorySprites(props: AlchemistLaboratorySpriteProps) {
  return (
    <div className="w-full h-screen bg-gradient-to-b from-[#05201f] to-[#0a2a28]">
      <Canvas
        camera={{ position: [0, 2, 18], fov: 55 }}
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
          Click beakers to explore courses • Drag to rotate • Scroll to zoom
        </p>
      </div>
    </div>
  )
}
