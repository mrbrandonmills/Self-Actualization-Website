'use client'

import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { useRef, useEffect } from 'react'
import Link from 'next/link'

/**
 * Museum-Quality Cinematic Hero Section
 * The Self Actualized Life - Luxury E-Commerce Platform
 *
 * Advanced Features:
 * - Multi-layer parallax with spring physics
 * - Mouse tracking with smooth spring interpolation
 * - Dual animated gradient orbs (gold/white)
 * - Scroll-linked blur and opacity
 * - Glassmorphism badge with pulse animation
 * - 3D rotation reveal on title
 * - Staggered word animations on subtitle
 * - Glass button CTAs with shine sweep effect
 * - Luxury scroll indicator with mouse animation
 *
 * Design Standards: Louis Vuitton, Hermès, Gucci level
 */
export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Advanced parallax effects with scroll
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1.1])
  const blur = useTransform(scrollYProgress, [0, 1], [0, 10])

  // Smooth spring physics for organic parallax
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 })
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 })
  const smoothBlur = useSpring(blur, { stiffness: 100, damping: 30 })

  // Mouse parallax effect with spring interpolation
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { stiffness: 150, damping: 30 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 150, damping: 30 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window

      // Convert to range -1 to 1
      const x = (clientX / innerWidth - 0.5) * 2
      const y = (clientY / innerHeight - 0.5) * 2

      // Set mouse position for parallax (20px max movement)
      mouseX.set(x * 20)
      mouseY.set(y * 20)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <div ref={containerRef} className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Animated gradient orbs - luxury ambient lighting */}
      {/* Gold orb - top left quadrant */}
      <motion.div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.4) 0%, transparent 70%)',
          x: smoothMouseX,
          y: smoothMouseY,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* White orb - bottom right quadrant */}
      <motion.div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%)',
          x: useTransform(smoothMouseX, (x) => -x),
          y: useTransform(smoothMouseY, (y) => -y),
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      {/* Background with advanced parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          y: smoothY,
          scale: smoothScale,
        }}
      >
        {/* Luxury gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />

        {/* Radial gradient overlay for depth */}
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(0, 0, 0, 0.8) 100%)',
          }}
        />

        {/* Noise texture overlay - adds luxury film grain */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Subtle grid pattern - tech luxury */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: '100px 100px',
          }}
        />
      </motion.div>

      {/* Content with mouse parallax and scroll effects */}
      <motion.div
        className="relative z-10 flex min-h-screen items-center justify-center px-6 sm:px-8"
        style={{
          opacity,
          x: useTransform(smoothMouseX, (x) => x * 0.5),
          y: useTransform(smoothMouseY, (y) => y * 0.5),
          filter: useTransform(smoothBlur, (b) => `blur(${b}px)`),
        }}
      >
        <div className="text-center max-w-6xl">
          {/* Luxury badge with glassmorphism */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-8 sm:mb-12"
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-accent"
              animate={{
                opacity: [1, 0.5, 1],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <span className="text-xs tracking-ultra uppercase text-white/60 font-light">
              The Self Actualized Life
            </span>
          </motion.div>

          {/* Main title with 3D rotation reveal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="overflow-hidden mb-6 sm:mb-8"
          >
            <motion.h1
              initial={{ y: 100, rotateX: -30 }}
              animate={{ y: 0, rotateX: 0 }}
              transition={{
                duration: 1.2,
                delay: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-serif text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-white mb-0 leading-[0.9] tracking-tight px-4"
              style={{
                textShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                perspective: '1000px',
              }}
            >
              Become Who You
              <br />
              <span className="text-accent">Were Meant To Be</span>
            </motion.h1>
          </motion.div>

          {/* Subtitle with individual word stagger animations */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="overflow-hidden mb-10 sm:mb-12"
          >
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center justify-center gap-2 xs:gap-3 md:gap-4 text-sm xs:text-base md:text-xl lg:text-2xl text-gray-400 font-light tracking-wide md:tracking-wider px-4"
            >
              {['Premium', 'Books', '•', 'Transformative', 'Courses', '•', 'Collective', 'Writing', 'AI'].map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 1.5 + i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={word === '•' ? 'text-accent text-lg' : ''}
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Animated divider with gold accent */}
          <motion.div
            className="flex items-center justify-center gap-4 mb-10 sm:mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.8 }}
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 2, ease: [0.22, 1, 0.36, 1] }}
              className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent via-white/30 to-white/30"
            />
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
              className="w-2 h-2 rounded-full bg-accent"
              style={{
                boxShadow: '0 0 20px rgba(212, 175, 55, 0.5)',
              }}
            />
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 2, ease: [0.22, 1, 0.36, 1] }}
              className="w-12 sm:w-16 h-px bg-gradient-to-l from-transparent via-white/30 to-white/30"
            />
          </motion.div>

          {/* Glass button CTAs with shine effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            {/* Primary CTA */}
            <Link href="/courses">
              <motion.button
                className="group relative px-8 sm:px-10 py-4 sm:py-5 rounded-full border text-white font-light tracking-luxury uppercase text-xs sm:text-sm overflow-hidden min-w-[200px] sm:min-w-[240px]"
                style={{
                  background: 'rgba(255, 255, 255, 0.06)',
                  backdropFilter: 'blur(24px)',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                }}
                whileHover={{
                  scale: 1.05,
                  borderColor: 'rgba(212, 175, 55, 0.5)',
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                {/* Button shine sweep effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '200%' }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                />
                <span className="relative z-10">Start Your Journey</span>
              </motion.button>
            </Link>

            {/* Secondary CTA */}
            <Link href="/writing">
              <motion.button
                className="group relative px-8 sm:px-10 py-4 sm:py-5 rounded-full border text-white font-light tracking-luxury uppercase text-xs sm:text-sm overflow-hidden min-w-[200px] sm:min-w-[240px]"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(24px)',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                }}
                whileHover={{
                  scale: 1.05,
                  borderColor: 'rgba(212, 175, 55, 0.3)',
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                {/* Button shine sweep effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '200%' }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                />
                <span className="relative z-10">Explore Writing Lab</span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Luxury scroll indicator with mouse animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 3,
              delay: 3.5,
              repeat: Infinity,
              repeatDelay: 2,
              ease: 'easeInOut',
            }}
            className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2"
          >
            <div className="flex flex-col items-center gap-3">
              {/* Animated mouse icon */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-6 h-10 border-2 border-white/20 rounded-full relative"
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
                  className="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-3 bg-accent rounded-full"
                />
              </motion.div>
              <span className="text-xs tracking-ultra uppercase text-white/40 font-light">
                Scroll to explore
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
