'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

/**
 * AlchemistLabLoader - Elegant loading screen for 3D laboratory
 * Shows while Three.js initializes and assets load
 */

interface AlchemistLabLoaderProps {
  isLoading: boolean
  progress?: number
}

export default function AlchemistLabLoader({ isLoading, progress = 0 }: AlchemistLabLoaderProps) {
  const [loadingText, setLoadingText] = useState('Preparing laboratory')

  useEffect(() => {
    if (!isLoading) return

    const texts = [
      'Preparing laboratory...',
      'Mixing potions...',
      'Polishing beakers...',
      'Adjusting lighting...',
      'Calibrating instruments...',
    ]

    let index = 0
    const interval = setInterval(() => {
      index = (index + 1) % texts.length
      setLoadingText(texts[index])
    }, 1500)

    return () => clearInterval(interval)
  }, [isLoading])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#05201f]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Animated beaker icon */}
          <div className="relative">
            {/* Beaker container */}
            <motion.div
              className="relative w-24 h-32"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Beaker outline */}
              <svg
                viewBox="0 0 100 140"
                className="w-full h-full"
                style={{ filter: 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.3))' }}
              >
                {/* Glass beaker */}
                <path
                  d="M 30 10 L 30 60 Q 30 90 50 100 Q 70 90 70 60 L 70 10 Z"
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth="2"
                  opacity="0.6"
                />

                {/* Liquid fill animation */}
                <motion.path
                  d="M 30 100 Q 30 90 50 90 Q 70 90 70 100 L 70 60 L 30 60 Z"
                  fill="#4ade80"
                  opacity="0.4"
                  initial={{ y: 90 }}
                  animate={{ y: [90, 50, 90] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                {/* Stopper */}
                <circle cx="50" cy="10" r="8" fill="#D4AF37" opacity="0.8" />
              </svg>

              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(74, 222, 128, 0.3) 0%, transparent 70%)',
                  filter: 'blur(30px)',
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>

            {/* Loading text */}
            <motion.p
              className="mt-8 text-center text-[#D4AF37] text-sm tracking-widest uppercase"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              key={loadingText}
            >
              {loadingText}
            </motion.p>

            {/* Progress bar */}
            {progress > 0 && (
              <div className="mt-4 w-64 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#4ade80] via-[#3b82f6] to-[#a855f7]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </div>
            )}

            {/* Spinning particles */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full"
                style={{
                  background: ['#4ade80', '#3b82f6', '#a855f7'][i],
                  boxShadow: `0 0 10px ${['#4ade80', '#3b82f6', '#a855f7'][i]}`,
                }}
                animate={{
                  x: [0, Math.cos((i * 2 * Math.PI) / 3) * 60],
                  y: [0, Math.sin((i * 2 * Math.PI) / 3) * 60],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
