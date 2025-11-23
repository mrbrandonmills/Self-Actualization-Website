'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

/**
 * PARALLAX DEPTH LAYERS
 *
 * Creates cinematic depth by moving layers at different speeds during entrance:
 * - Layer 1 (Background): Sky, slowest movement (1.2x scale)
 * - Layer 2 (Far): Mountains/distant trees (1.5x scale)
 * - Layer 3 (Mid): Garden path, main scene (2x scale)
 * - Layer 4 (Foreground): Grass, flowers, fastest + blur (3x scale)
 *
 * Each layer scales and translates at different rates to create
 * a "camera dolly zoom" effect that pulls the viewer into the scene.
 */

interface ParallaxLayerProps {
  children: ReactNode
  className?: string
  isEntering: boolean
  depth: 'sky' | 'far' | 'mid' | 'foreground'
  duration?: number
}

export function ParallaxLayer({
  children,
  className = '',
  isEntering,
  depth,
  duration = 4,
}: ParallaxLayerProps) {
  // Define scale and translation values for each depth layer
  const depthConfig = {
    sky: {
      scale: 1.2,
      y: 0,
      blur: 0,
      delay: 0,
    },
    far: {
      scale: 1.5,
      y: -50,
      blur: 0,
      delay: 0.1,
    },
    mid: {
      scale: 2,
      y: -100,
      blur: 0,
      delay: 0.2,
    },
    foreground: {
      scale: 3,
      y: -200,
      blur: 8,
      delay: 0.3,
    },
  }

  const config = depthConfig[depth]

  return (
    <motion.div
      className={`absolute inset-0 ${className}`}
      initial={{ scale: 1, y: 0, filter: 'blur(0px)' }}
      animate={{
        scale: isEntering ? config.scale : 1,
        y: isEntering ? config.y : 0,
        filter: isEntering ? `blur(${config.blur}px)` : 'blur(0px)',
      }}
      transition={{
        duration,
        delay: config.delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * PARALLAX CONTAINER
 *
 * Wrapper component that manages the parallax effect state
 * and provides a container for all parallax layers.
 */

interface ParallaxContainerProps {
  children: ReactNode
  className?: string
  isEntering: boolean
}

export function ParallaxContainer({ children, className = '' }: ParallaxContainerProps) {
  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {children}
    </div>
  )
}

/**
 * PARALLAX ELEMENT
 *
 * Individual element that moves independently within a layer.
 * Useful for grass blades, floating particles, etc.
 */

interface ParallaxElementProps {
  children: ReactNode
  className?: string
  isEntering: boolean
  speed?: number // Multiplier for movement speed (1 = normal, 2 = faster)
  delay?: number
  blur?: number
}

export function ParallaxElement({
  children,
  className = '',
  isEntering,
  speed = 1,
  delay = 0,
  blur = 0,
}: ParallaxElementProps) {
  return (
    <motion.div
      className={className}
      initial={{ scale: 1, y: 0, filter: 'blur(0px)', opacity: 1 }}
      animate={{
        scale: isEntering ? 1 + (speed * 0.5) : 1,
        y: isEntering ? -100 * speed : 0,
        filter: isEntering && blur > 0 ? `blur(${blur}px)` : 'blur(0px)',
        opacity: isEntering && speed > 2 ? 0 : 1, // Fade out very fast elements
      }}
      transition={{
        duration: 4,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * DEPTH BLUR GRADIENT
 *
 * Creates a depth-of-field effect by blurring edges during motion.
 * Simulates camera focus on center during the walk-in.
 */

interface DepthBlurProps {
  isActive: boolean
}

export function DepthBlur({ isActive }: DepthBlurProps) {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: 'radial-gradient(circle at center, transparent 30%, rgba(255,255,255,0.1) 100%)',
        backdropFilter: 'blur(0px)',
      }}
      initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
      animate={{
        opacity: isActive ? 1 : 0,
        backdropFilter: isActive ? 'blur(4px)' : 'blur(0px)',
      }}
      transition={{
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
      }}
    />
  )
}
