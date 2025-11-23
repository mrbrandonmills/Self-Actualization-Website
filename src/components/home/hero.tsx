'use client'

import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { ParallaxLayer, ParallaxContainer, DepthBlur } from '@/components/parallax-layers'
// import { GardenPathSvg } from '@/components/garden-path-svg' // Removed - not needed for museum experience

/**
 * Wes Anderson-Inspired Nature Hero Section
 * The Self Actualized Life
 *
 * Features:
 * - Warm pastel sky gradient (soft yellows, blues, pinks)
 * - Cinematic entrance with parallax layers
 * - Garden path with perspective
 * - Animated flowing river at bottom
 * - Sunlight rays with gentle pulsing
 * - Swaying grass blades
 * - Vintage film grain overlay
 * - Whimsical, centered, symmetrical composition
 * - Organic CSS animations (NO black backgrounds)
 */

interface HeroProps {
  isEntering?: boolean
}

export function Hero({ isEntering = false }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [grassBlades, setGrassBlades] = useState<number[]>([])

  // Generate random grass blades on mount
  useEffect(() => {
    const blades = Array.from({ length: 40 }, (_, i) => i)
    setGrassBlades(blades)
  }, [])

  return (
    <ParallaxContainer
      isEntering={isEntering}
      className="min-h-screen w-full"
    >
      <div
        ref={containerRef}
        className="relative min-h-screen w-full overflow-hidden"
        style={{
          background: 'linear-gradient(to bottom, #FFF8E7 0%, #F4E8C1 30%, #E8D4A5 60%, #A8C5D1 100%)'
        }}
      >
        {/* Vintage Film Grain Overlay */}
        <div className="film-grain" />

        {/* ===== LAYER 1: SKY BACKGROUND (Slowest) ===== */}
        <ParallaxLayer isEntering={isEntering} depth="sky" duration={4}>
          {/* Sunlight Rays */}
          <div className="sunlight-rays" />
          <div className="sunlight-glow" />
        </ParallaxLayer>

        {/* ===== LAYER 2: FAR BACKGROUND (Slow) ===== */}
        <ParallaxLayer isEntering={isEntering} depth="far" duration={4}>
          {/* Distant clouds */}
          <motion.div
            className="cloud"
            style={{
              top: '10%',
              left: '-100px',
              width: '200px',
              height: '60px',
            }}
            animate={{
              x: [0, 2000],
            }}
            transition={{
              duration: 60,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          <motion.div
            className="cloud"
            style={{
              top: '25%',
              left: '-150px',
              width: '150px',
              height: '50px',
            }}
            animate={{
              x: [0, 2000],
            }}
            transition={{
              duration: 80,
              repeat: Infinity,
              ease: 'linear',
              delay: 10,
            }}
          />
        </ParallaxLayer>

        {/* ===== LAYER 3: MIDGROUND (Medium Speed) ===== */}
        <ParallaxLayer isEntering={isEntering} depth="mid" duration={4}>
          {/* Garden Path SVG - Commented out for museum experience */}
          {/* <GardenPathSvg isAnimating={!isEntering} /> */}

          {/* Flowing River */}
          <div className="river-pattern" />
          <div className="river-waves" />
        </ParallaxLayer>

        {/* ===== LAYER 4: FOREGROUND (Fastest + Blur) ===== */}
        <ParallaxLayer isEntering={isEntering} depth="foreground" duration={4}>
          {/* Grass Field at Bottom */}
          <div className="grass-field" />

          {/* Individual Grass Blades - Random positions */}
          {grassBlades.map((_, i) => (
            <div
              key={i}
              className={`grass-blade ${i % 3 === 0 ? 'grass-blade-slow' : i % 2 === 0 ? 'grass-blade-fast' : ''}`}
              style={{
                left: `${(i / grassBlades.length) * 100}%`,
                height: `${40 + Math.random() * 40}px`,
                animationDelay: `${Math.random() * 2}s`,
                opacity: 0.6 + Math.random() * 0.4,
              }}
            />
          ))}
        </ParallaxLayer>

        {/* Depth blur effect during entrance */}
        <DepthBlur isActive={isEntering} />

        {/* Dappled light patterns */}
        <motion.div
          className="dappled-light"
          style={{ top: '20%', left: '15%' }}
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="dappled-light"
          style={{ top: '40%', right: '25%' }}
          animate={{
            opacity: [0.15, 0.25, 0.15],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />

        {/* Main Content - Centered Wes Anderson Style */}
        <div className="relative z-10 flex min-h-screen items-center justify-center px-6 sm:px-8">
          <div className="text-center max-w-5xl">
            {/* Whimsical Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isEntering ? 0 : 1, scale: isEntering ? 0.8 : 1 }}
              transition={{ duration: 0.8, delay: isEntering ? 0 : 0.2, ease: [0.34, 1.2, 0.64, 1] }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-8 sm:mb-12"
            style={{
              background: 'rgba(245, 239, 230, 0.8)',
              border: '2px solid rgba(184, 212, 200, 0.5)',
              boxShadow: '0 4px 12px rgba(184, 212, 200, 0.3)',
            }}
          >
            <motion.div
              className="w-2 h-2 rounded-full"
              style={{ background: '#B8D4C8' }}
              animate={{
                opacity: [1, 0.5, 1],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <span className="text-xs tracking-widest uppercase font-light" style={{ color: '#3A3A3A' }}>
              The Self Actualized Life
            </span>
          </motion.div>

            {/* Main Title - Symmetrical */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: isEntering ? 0 : 1, y: isEntering ? 40 : 0 }}
              transition={{ duration: 1, delay: isEntering ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6 sm:mb-8"
          >
            <h1
              className="font-serif text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light leading-[0.95] tracking-tight px-4"
              style={{
                color: '#3A3A3A',
                textShadow: '0 2px 8px rgba(168, 197, 209, 0.2)',
              }}
            >
              Become Who You
              <br />
              <span style={{ color: '#B8D4C8' }}>Were Meant To Be</span>
            </h1>
          </motion.div>

            {/* Subtitle with word stagger */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isEntering ? 0 : 1 }}
              transition={{ duration: 1, delay: isEntering ? 0 : 0.8 }}
              className="mb-10 sm:mb-12"
          >
            <motion.div
              className="flex flex-wrap items-center justify-center gap-2 xs:gap-3 md:gap-4 text-sm xs:text-base md:text-xl lg:text-2xl font-light tracking-wide md:tracking-wider px-4"
              style={{ color: '#6B7A7A' }}
            >
              {['Premium', 'Books', '•', 'Transformative', 'Courses', '•', 'Collective', 'Writing', 'AI'].map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.9 + i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ color: word === '•' ? '#E8B4B8' : '#6B7A7A' }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

            {/* Decorative divider */}
            <motion.div
              className="flex items-center justify-center gap-4 mb-10 sm:mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: isEntering ? 0 : 1 }}
              transition={{ duration: 1, delay: isEntering ? 0 : 1.4 }}
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-12 sm:w-16 h-px"
              style={{
                background: 'linear-gradient(to right, transparent, rgba(184, 212, 200, 0.5), rgba(184, 212, 200, 0.5))'
              }}
            />
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 1.8, ease: [0.34, 1.2, 0.64, 1] }}
              className="w-2 h-2 rounded-full"
              style={{
                background: '#E8B4B8',
                boxShadow: '0 0 15px rgba(232, 180, 184, 0.5)',
              }}
            />
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-12 sm:w-16 h-px"
              style={{
                background: 'linear-gradient(to left, transparent, rgba(184, 212, 200, 0.5), rgba(184, 212, 200, 0.5))'
              }}
            />
          </motion.div>

            {/* Call-to-Action Buttons - Wes Anderson Style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isEntering ? 0 : 1, y: isEntering ? 20 : 0 }}
              transition={{ duration: 0.8, delay: isEntering ? 0 : 2, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            {/* Primary CTA */}
            <Link href="/courses">
              <motion.button
                className="px-8 sm:px-10 py-4 sm:py-5 rounded-full text-sm font-light tracking-widest uppercase min-w-[200px] sm:min-w-[240px]"
                style={{
                  background: '#B8D4C8',
                  color: '#3A3A3A',
                  border: '2px solid rgba(158, 197, 171, 0.5)',
                  boxShadow: '0 4px 12px rgba(184, 212, 200, 0.3)',
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 8px 20px rgba(184, 212, 200, 0.4)',
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.34, 1.2, 0.64, 1] }}
              >
                Start Your Journey
              </motion.button>
            </Link>

            {/* Secondary CTA */}
            <Link href="/writing">
              <motion.button
                className="px-8 sm:px-10 py-4 sm:py-5 rounded-full text-sm font-light tracking-widest uppercase min-w-[200px] sm:min-w-[240px]"
                style={{
                  background: 'rgba(245, 239, 230, 0.8)',
                  color: '#3A3A3A',
                  border: '2px solid rgba(232, 180, 184, 0.5)',
                  boxShadow: '0 4px 12px rgba(232, 180, 184, 0.3)',
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 8px 20px rgba(232, 180, 184, 0.4)',
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.34, 1.2, 0.64, 1] }}
              >
                Explore Writing Lab
              </motion.button>
            </Link>
          </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isEntering ? 0 : [0, 1, 1, 0] }}
              transition={{
                duration: 3,
                delay: isEntering ? 0 : 3,
                repeat: isEntering ? 0 : Infinity,
                repeatDelay: 2,
                ease: 'easeInOut',
              }}
              className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2"
          >
            <div className="flex flex-col items-center gap-3">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-6 h-10 rounded-full relative"
                style={{ border: '2px solid rgba(58, 58, 58, 0.3)' }}
              >
                <motion.div
                  animate={{
                    y: [0, 16, 0],
                    opacity: [1, 0, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  className="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-3 rounded-full"
                  style={{ background: '#B8D4C8' }}
                />
              </motion.div>
              <span className="text-xs tracking-widest uppercase font-light" style={{ color: 'rgba(58, 58, 58, 0.5)' }}>
                Scroll to explore
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      </div>
    </ParallaxContainer>
  )
}
