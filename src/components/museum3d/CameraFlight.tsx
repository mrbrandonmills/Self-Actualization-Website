import { useFrame, useThree } from '@react-three/fiber'
import { useMuseumScroll } from '@/hooks/useMuseumScroll'
import * as THREE from 'three'

/**
 * CameraFlight - Scroll-based camera animation
 *
 * Features:
 * - Camera flies through museum as user scrolls
 * - Smooth lerp transitions
 * - Looks ahead slightly for cinematic feel
 * - 8 stops × 10 units = 80 units journey
 */
export function CameraFlight() {
  const { camera } = useThree()
  const scrollProgress = useMuseumScroll()

  useFrame(() => {
    // Total journey length: 8 stops × 10 units between each
    const journeyLength = 8 * 10 // 80 units

    // Calculate camera Z position based on scroll
    // Starting at Z=10, moving to Z=-70
    const targetZ = 10 - scrollProgress * journeyLength

    // Target position
    const targetPosition = new THREE.Vector3(0, 2, targetZ)

    // Smooth transition (lerp)
    camera.position.lerp(targetPosition, 0.1)

    // Look ahead slightly for cinematic effect
    const lookAtTarget = new THREE.Vector3(0, 2, targetZ - 5)
    camera.lookAt(lookAtTarget)
  })

  return null
}
