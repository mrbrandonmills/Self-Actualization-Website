'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface VideoBackgroundProps {
  opacity?: number
  blur?: number
}

/**
 * VideoBackground - AI-generated video background with smooth crossfade
 * Supports Sora, Runway Gen-3, or stock videos
 *
 * To use AI-generated videos:
 * 1. Generate videos using Sora/Runway with garden/nature prompts
 * 2. Place MP4 files in /public/videos/
 * 3. Update VIDEO_SOURCES array below
 *
 * Prompts for AI generation:
 * - "Serene garden path with dappled sunlight, gentle breeze through leaves, warm afternoon light, cinematic 4K"
 * - "Flowing stream with smooth stones, soft ripples, morning mist, peaceful nature scene"
 * - "Swaying grass field in golden hour, wildflowers, soft focus background, dreamy aesthetic"
 * - "Butterflies floating through garden, soft pastels, Wes Anderson color grading, whimsical"
 */
export function VideoBackground({
  opacity = 0.3,
  blur = 2,
}: VideoBackgroundProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)

  // Array of video sources (can be AI-generated or stock)
  const VIDEO_SOURCES = [
    '/videos/garden-main.mp4',
    '/videos/stream-flow.mp4',
    '/videos/grass-sway.mp4',
  ]

  // Rotate videos every 30 seconds for variety
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % VIDEO_SOURCES.length)
    }, 30000) // 30 seconds

    return () => clearInterval(interval)
  }, [VIDEO_SOURCES.length])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Video layer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentVideoIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{
              filter: `blur(${blur}px) brightness(1.1) saturate(1.2)`,
              opacity: isLoaded ? opacity : 0,
              transition: 'opacity 1s ease-in-out',
            }}
            onLoadedData={() => setIsLoaded(true)}
          >
            <source src={VIDEO_SOURCES[currentVideoIndex]} type="video/mp4" />
            Your browser does not support video backgrounds.
          </video>
        </motion.div>
      </AnimatePresence>

      {/* Gradient overlay for text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(245,239,230,0.5), rgba(245,239,230,0.75))',
        }}
      />

      {/* Vignette effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.1) 100%)',
        }}
      />

      {/* Loading state - soft gradient background while video loads */}
      {!isLoaded && (
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            background:
              'linear-gradient(135deg, #F5EFE6 0%, #EDE3D3 50%, #F5EFE6 100%)',
            backgroundSize: '200% 200%',
          }}
        />
      )}
    </div>
  )
}

/**
 * ParticleBackground - Magical floating particles and light effects
 * Fireflies, dust motes, light orbs, and volumetric beams
 */
export function ParticleBackground() {
  const [particles, setParticles] = useState<Array<{
    id: number
    x: number
    y: number
    color: string
    size: number
    delay: number
    duration: number
  }>>([])

  const [orbs, setOrbs] = useState<Array<{
    id: number
    x: number
    y: number
    size: number
    color: string
    delay: number
  }>>([])

  const [beams, setBeams] = useState<Array<{
    id: number
    x: number
    rotation: number
    color: string
    delay: number
  }>>([])

  // Generate particles on mount
  useEffect(() => {
    // Create floating particles (fireflies/dust motes)
    const particleArray = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: [
        '#FCD34D', // golden
        '#A78BFA', // lavender
        '#67E8F9', // cyan
        '#6EE7B7', // mint
        '#F9A8D4', // pink
        '#FFFFFF', // white
      ][Math.floor(Math.random() * 6)],
      size: 3 + Math.random() * 4,
      delay: Math.random() * 8,
      duration: 8 + Math.random() * 8,
    }))

    // Create light orbs
    const orbArray = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
      size: 100 + Math.random() * 200,
      color: [
        'rgba(252, 211, 77, 0.3)', // golden
        'rgba(167, 139, 250, 0.3)', // lavender
        'rgba(103, 232, 249, 0.3)', // cyan
        'rgba(110, 231, 183, 0.3)', // mint
      ][Math.floor(Math.random() * 4)],
      delay: Math.random() * 6,
    }))

    // Create light beams
    const beamArray = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: 10 + (i * 20) + Math.random() * 10,
      rotation: -30 + Math.random() * 60,
      color: [
        'rgba(252, 211, 77, 0.15)', // golden
        'rgba(167, 139, 250, 0.15)', // lavender
        'rgba(255, 255, 255, 0.1)', // white
      ][Math.floor(Math.random() * 3)],
      delay: Math.random() * 10,
    }))

    setParticles(particleArray)
    setOrbs(orbArray)
    setBeams(beamArray)
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Light beams */}
      {beams.map((beam) => (
        <motion.div
          key={`beam-${beam.id}`}
          className="light-beam absolute"
          style={{
            left: `${beam.x}%`,
            top: '-10%',
            color: beam.color,
            transform: `rotate(${beam.rotation}deg)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{
            duration: 10,
            delay: beam.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Light orbs */}
      {orbs.map((orb) => (
        <motion.div
          key={`orb-${orb.id}`}
          className="light-orb absolute"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            color: orb.color,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 6,
            delay: orb.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Floating particles (fireflies) */}
      {particles.map((particle) => (
        <motion.div
          key={`particle-${particle.id}`}
          className="firefly absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            color: particle.color,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            y: [-20, -60, -20],
            x: [-10, 10, -10],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Rainbow light refraction effect */}
      <motion.div
        className="absolute inset-0 rainbow-refraction pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 70% 30%, rgba(167,139,250,0.08), transparent 50%)',
          mixBlendMode: 'screen',
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  )
}
