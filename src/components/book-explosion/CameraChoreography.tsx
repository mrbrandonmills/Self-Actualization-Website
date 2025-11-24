import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface CameraKeyframe {
  time: number  // 0.0 to 1.0 (scroll progress)
  position: [number, number, number]
  rotation: [number, number, number]  // pitch, yaw, roll
  lookAt: [number, number, number]
}

const cameraKeyframes: CameraKeyframe[] = [
  // Opening - front view
  {
    time: 0.0,
    position: [0, 0, 20],
    rotation: [0, 0, 0],
    lookAt: [0, 0, 0]
  },

  // Dolly forward
  {
    time: 0.2,
    position: [0, 0, 15],
    rotation: [0, 0, -0.3],  // Bank left
    lookAt: [0, 0, 0]
  },

  // First explosion - bank left
  {
    time: 0.4,
    position: [-5, 3, 10],
    rotation: [0.2, 0.3, -0.3],
    lookAt: [0, 2, 0]
  },

  // Through the layers - spiral
  {
    time: 0.6,
    position: [5, 5, 5],
    rotation: [0.3, -0.5, 0.5],
    lookAt: [-2, 2, 0]
  },

  // Dramatic roll
  {
    time: 0.8,
    position: [0, 8, 8],
    rotation: [0.5, 0, 3.14],  // 180° barrel roll
    lookAt: [0, 0, 0]
  },

  // Final reveal - elevated rear view
  {
    time: 1.0,
    position: [0, 15, 30],
    rotation: [0.4, 0, 0],
    lookAt: [0, 5, 0]
  },
]

interface CameraChoreographyProps {
  scrollProgress: number
}

export function CameraChoreography({ scrollProgress }: CameraChoreographyProps) {
  const { camera } = useThree()

  useFrame(() => {
    // Find surrounding keyframes
    let prevKeyframe = cameraKeyframes[0]
    let nextKeyframe = cameraKeyframes[cameraKeyframes.length - 1]

    for (let i = 0; i < cameraKeyframes.length - 1; i++) {
      if (
        scrollProgress >= cameraKeyframes[i].time &&
        scrollProgress <= cameraKeyframes[i + 1].time
      ) {
        prevKeyframe = cameraKeyframes[i]
        nextKeyframe = cameraKeyframes[i + 1]
        break
      }
    }

    // Calculate interpolation factor
    const range = nextKeyframe.time - prevKeyframe.time
    const localProgress = range > 0
      ? (scrollProgress - prevKeyframe.time) / range
      : 0

    // Smooth easing (ease-in-out cubic)
    const eased = localProgress < 0.5
      ? 4 * localProgress * localProgress * localProgress
      : 1 - Math.pow(-2 * localProgress + 2, 3) / 2

    // Interpolate position
    const newPos = new THREE.Vector3(
      THREE.MathUtils.lerp(prevKeyframe.position[0], nextKeyframe.position[0], eased),
      THREE.MathUtils.lerp(prevKeyframe.position[1], nextKeyframe.position[1], eased),
      THREE.MathUtils.lerp(prevKeyframe.position[2], nextKeyframe.position[2], eased)
    )

    // Interpolate rotation
    const newRot = new THREE.Euler(
      THREE.MathUtils.lerp(prevKeyframe.rotation[0], nextKeyframe.rotation[0], eased),
      THREE.MathUtils.lerp(prevKeyframe.rotation[1], nextKeyframe.rotation[1], eased),
      THREE.MathUtils.lerp(prevKeyframe.rotation[2], nextKeyframe.rotation[2], eased)
    )

    // Interpolate lookAt target
    const newLookAt = new THREE.Vector3(
      THREE.MathUtils.lerp(prevKeyframe.lookAt[0], nextKeyframe.lookAt[0], eased),
      THREE.MathUtils.lerp(prevKeyframe.lookAt[1], nextKeyframe.lookAt[1], eased),
      THREE.MathUtils.lerp(prevKeyframe.lookAt[2], nextKeyframe.lookAt[2], eased)
    )

    // Apply to camera
    camera.position.copy(newPos)
    camera.rotation.copy(newRot)
    camera.lookAt(newLookAt)
  })

  return null
}
