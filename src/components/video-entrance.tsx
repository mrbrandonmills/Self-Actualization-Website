'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WesAndersonColors } from '@/lib/wes-anderson-tokens'

/**
 * VIDEO ENTRANCE COMPONENT
 *
 * Clean, professional Wes Anderson-inspired entrance using REAL VIDEO
 * (NOT WebGL, NOT 3D graphics, NOT particle systems)
 *
 * Features:
 * - Real garden path video (POV walking through garden)
 * - Subtle Ken Burns effect on static images (if video unavailable)
 * - Clean fade transitions
 * - Wes Anderson color grading
 * - Smooth, cinematic feel
 *
 * Video Sources:
 * 1. Pexels (free): https://www.pexels.com/search/videos/garden%20path/
 * 2. Pixabay (free): https://pixabay.com/videos/search/garden/
 * 3. Artgrid (premium): https://artgrid.io/
 *
 * Recommended Search Terms:
 * - "Garden path walk through POV"
 * - "Formal garden symmetrical"
 * - "Greenhouse entrance"
 * - "Hedge garden path"
 */

interface VideoEntranceProps {
  onComplete: () => void
  enableMobile?: boolean
}

export function VideoEntrance({ onComplete, enableMobile = true }: VideoEntranceProps) {
  const [phase, setPhase] = useState<'loading' | 'video' | 'complete'>('loading')
  const [videoError, setVideoError] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Detect mobile
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    // Skip on mobile if disabled
    if (isMobile && !enableMobile) {
      onComplete()
      return
    }

    // Start video after brief loading
    const loadingTimer = setTimeout(() => {
      setPhase('video')
    }, 500)

    return () => clearTimeout(loadingTimer)
  }, [isMobile, enableMobile, onComplete])

  const handleVideoEnd = () => {
    setPhase('complete')
    setTimeout(() => onComplete(), 800)
  }

  const handleVideoError = () => {
    console.warn('Video failed to load, using fallback image entrance')
    setVideoError(true)
    // Use image fallback instead
    setTimeout(() => {
      setPhase('complete')
      setTimeout(() => onComplete(), 2000)
    }, 3000)
  }

  if (phase === 'complete') return null

  return (
    <motion.div
      className="fixed inset-0 z-[100]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Loading phase - warm cream background */}
      <AnimatePresence>
        {phase === 'loading' && (
          <motion.div
            className="absolute inset-0"
            style={{ background: WesAndersonColors.cream }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>

      {/* Video phase - garden path walk */}
      <AnimatePresence>
        {phase === 'video' && !videoError && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <video
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
              style={{
                // Wes Anderson color grading (subtle enhancement)
                filter: 'saturate(1.15) contrast(1.05) brightness(1.05)',
              }}
              onEnded={handleVideoEnd}
              onError={handleVideoError}
            >
              <source src="/videos/garden-entrance.mp4" type="video/mp4" />
              <source src="/videos/garden-entrance.webm" type="video/webm" />
            </video>

            {/* Subtle vignette overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.15) 100%)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fallback: Static image with Ken Burns effect */}
      <AnimatePresence>
        {phase === 'video' && videoError && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: 'url(/images/garden-entrance.jpg)',
                filter: 'saturate(1.15) contrast(1.05) brightness(1.05)',
              }}
              initial={{ scale: 1 }}
              animate={{ scale: 1.1 }}
              transition={{
                duration: 3,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Vignette */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.15) 100%)',
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/**
 * SIMPLE IMAGE ENTRANCE (Alternative)
 *
 * Use this if video is too heavy for your use case.
 * Creates a clean crossfade between 2-3 images with Ken Burns effect.
 */

interface SimpleImageEntranceProps {
  onComplete: () => void
  images?: string[]
  duration?: number
}

export function SimpleImageEntrance({
  onComplete,
  images = [
    '/images/garden-path-1.jpg',
    '/images/garden-path-2.jpg',
    '/images/garden-path-3.jpg',
  ],
  duration = 2000,
}: SimpleImageEntranceProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex >= images.length - 1) {
      // Last image - complete after duration
      const timer = setTimeout(() => onComplete(), duration)
      return () => clearTimeout(timer)
    } else {
      // Next image
      const timer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1)
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [currentIndex, images.length, duration, onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[100]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1.1 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 0.8 },
            scale: { duration: duration / 1000, ease: [0.22, 1, 0.36, 1] },
          }}
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${images[currentIndex]})`,
              filter: 'saturate(1.15) contrast(1.05) brightness(1.05)',
            }}
          />

          {/* Vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.15) 100%)',
            }}
          />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
