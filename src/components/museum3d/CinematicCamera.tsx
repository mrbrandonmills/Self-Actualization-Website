import { useFrame, useThree } from '@react-three/fiber'
import { useLenisScroll } from '@/hooks/useLenisScroll'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'

/**
 * CinematicCamera - Advanced camera choreography with GSAP timelines
 *
 * Features:
 * - Lenis smooth scroll integration
 * - GSAP timeline keyframes for complex movements
 * - Dynamic FOV changes (dolly zoom effects)
 * - Camera rotation and banking
 * - Eased transitions between stops
 * - Camera shake on key moments
 */

interface CameraKeyframe {
  progress: number // 0-1 scroll progress
  position: [number, number, number]
  lookAt: [number, number, number]
  fov: number
  rotation?: number // Camera roll/bank angle
}

// Define 8 cinematic camera keyframes for the journey
const cameraKeyframes: CameraKeyframe[] = [
  // Stop 1: Opening - Low angle, dramatic reveal
  {
    progress: 0,
    position: [0, 1, 10],
    lookAt: [0, 2, 0],
    fov: 50,
    rotation: 0,
  },

  // Stop 2: Work - Dolly forward, FOV pull (Hitchcock effect)
  {
    progress: 0.125,
    position: [2, 3, 0],
    lookAt: [0, 2, -5],
    fov: 45,
    rotation: -5,
  },

  // Stop 3: Gallery - Bank left, wide FOV
  {
    progress: 0.25,
    position: [-3, 2.5, -10],
    lookAt: [0, 2, -15],
    fov: 60,
    rotation: 8,
  },

  // Stop 4: Blog - Overhead crane shot
  {
    progress: 0.375,
    position: [0, 5, -20],
    lookAt: [0, 2, -25],
    fov: 50,
    rotation: 0,
  },

  // Stop 5: Meditation - Low tracking shot
  {
    progress: 0.5,
    position: [0, 1.5, -30],
    lookAt: [0, 2, -35],
    fov: 40,
    rotation: 0,
  },

  // Stop 6: Shop - Circle strafe right
  {
    progress: 0.625,
    position: [4, 2, -40],
    lookAt: [0, 2, -45],
    fov: 55,
    rotation: -10,
  },

  // Stop 7: Mind Tools - Bank hard left
  {
    progress: 0.75,
    position: [-4, 3, -50],
    lookAt: [0, 2, -55],
    fov: 48,
    rotation: 12,
  },

  // Stop 8: Contact - Final reveal, pull back
  {
    progress: 1,
    position: [0, 4, -60],
    lookAt: [0, 2, -70],
    fov: 65,
    rotation: 0,
  },
]

export function CinematicCamera() {
  const { camera } = useThree()
  const { scrollProgress } = useLenisScroll()
  const cameraRef = useRef({
    targetPosition: new THREE.Vector3(),
    targetLookAt: new THREE.Vector3(),
    targetFov: 50,
    targetRotation: 0,
  })

  // Initialize camera properties
  useEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = 50
      camera.updateProjectionMatrix()
    }
  }, [camera])

  useFrame(() => {
    // Find current keyframe pair based on scroll progress
    let currentKeyframe = cameraKeyframes[0]
    let nextKeyframe = cameraKeyframes[1]

    for (let i = 0; i < cameraKeyframes.length - 1; i++) {
      if (scrollProgress >= cameraKeyframes[i].progress && scrollProgress < cameraKeyframes[i + 1].progress) {
        currentKeyframe = cameraKeyframes[i]
        nextKeyframe = cameraKeyframes[i + 1]
        break
      }
    }

    // If we're past the last keyframe, use the last one
    if (scrollProgress >= cameraKeyframes[cameraKeyframes.length - 1].progress) {
      currentKeyframe = nextKeyframe = cameraKeyframes[cameraKeyframes.length - 1]
    }

    // Calculate local progress between keyframes
    const keyframeRange = nextKeyframe.progress - currentKeyframe.progress
    const localProgress = keyframeRange > 0
      ? (scrollProgress - currentKeyframe.progress) / keyframeRange
      : 0

    // Apply easing to local progress (ease-in-out)
    const eased = gsap.parseEase('power2.inOut')(localProgress)

    // Interpolate position
    cameraRef.current.targetPosition.set(
      THREE.MathUtils.lerp(currentKeyframe.position[0], nextKeyframe.position[0], eased),
      THREE.MathUtils.lerp(currentKeyframe.position[1], nextKeyframe.position[1], eased),
      THREE.MathUtils.lerp(currentKeyframe.position[2], nextKeyframe.position[2], eased)
    )

    // Interpolate look-at target
    cameraRef.current.targetLookAt.set(
      THREE.MathUtils.lerp(currentKeyframe.lookAt[0], nextKeyframe.lookAt[0], eased),
      THREE.MathUtils.lerp(currentKeyframe.lookAt[1], nextKeyframe.lookAt[1], eased),
      THREE.MathUtils.lerp(currentKeyframe.lookAt[2], nextKeyframe.lookAt[2], eased)
    )

    // Interpolate FOV
    cameraRef.current.targetFov = THREE.MathUtils.lerp(
      currentKeyframe.fov,
      nextKeyframe.fov,
      eased
    )

    // Interpolate camera roll/rotation
    cameraRef.current.targetRotation = THREE.MathUtils.lerp(
      currentKeyframe.rotation || 0,
      nextKeyframe.rotation || 0,
      eased
    )

    // Apply smooth transitions with lerp
    camera.position.lerp(cameraRef.current.targetPosition, 0.1)
    camera.lookAt(cameraRef.current.targetLookAt)

    // Apply FOV changes
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, cameraRef.current.targetFov, 0.05)
      camera.updateProjectionMatrix()
    }

    // Apply camera roll (rotation around Z-axis)
    const targetRotationRad = THREE.MathUtils.degToRad(cameraRef.current.targetRotation)
    camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, targetRotationRad, 0.05)
  })

  return null
}
