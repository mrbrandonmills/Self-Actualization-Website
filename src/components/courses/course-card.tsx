'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Link from 'next/link'
import { Course } from '@/data/courses'
import { useState, useRef } from 'react'
import { getCourseColor, getCardGradient } from '@/lib/rainbow-colors'

interface CourseCardProps {
  course: Course
  index: number
}

/**
 * CourseCard - Luxury course card with 3D tilt effect, gold glow, and magnetic cursor
 * Museum-quality presentation matching book card design
 */
export function CourseCard({ course, index }: CourseCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Motion values for 3D tilt effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Spring physics for smooth, luxury movement
  const mouseX = useSpring(x, { stiffness: 300, damping: 30 })
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 })

  // Transform mouse position to rotation (subtle 3D tilt)
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [3, -3])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-3, 3])

  // Handle mouse move for 3D tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5

    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  // Get unique rainbow color for this course
  const courseColor = getCourseColor(index)
  const thumbnailGradient = getCardGradient(courseColor)

  // Get level badge color
  const getLevelColor = () => {
    switch (course.level) {
      case 'Beginner':
        return 'from-green-600/80 to-emerald-600/80'
      case 'Intermediate':
        return 'from-blue-600/80 to-indigo-600/80'
      case 'Advanced':
        return 'from-purple-600/80 to-pink-600/80'
      default:
        return 'from-gray-600/80 to-gray-700/80'
    }
  }

  // Get course icon based on index
  const getCourseIcon = () => {
    const icons = [
      // Lightbulb
      <svg key="icon" className="w-16 h-16 text-[#8A9A5B]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>,
      // Brain
      <svg key="icon" className="w-16 h-16 text-[#8A9A5B]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>,
      // Star
      <svg key="icon" className="w-16 h-16 text-[#8A9A5B]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>,
      // Heart
      <svg key="icon" className="w-16 h-16 text-[#8A9A5B]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>,
      // Lightning
      <svg key="icon" className="w-16 h-16 text-[#8A9A5B]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>,
      // Target
      <svg key="icon" className="w-16 h-16 text-[#8A9A5B]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>,
    ]
    return icons[index % icons.length]
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="h-full"
    >
      <Link href={`/courses/${course.slug}`}>
        <motion.div
          ref={cardRef}
          className="group relative h-full"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          style={{
            perspective: 1000,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Main card with 3D tilt - EXAGGERATED Floating Glass Effect */}
          <motion.div
            className="relative h-full min-h-[550px] rounded-3xl overflow-hidden"
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
              background: 'rgba(10, 47, 46, 0.6)',
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              boxShadow: `
                0 20px 50px -12px rgba(0, 0, 0, 0.5),
                0 0 0 1.5px rgba(197, 210, 183, 0.18),
                inset 0 1px 0 0 rgba(255, 255, 255, 0.1),
                0 50px 100px -20px ${courseColor.glow}80,
                0 80px 160px -30px ${courseColor.glow}50,
                0 0 100px ${courseColor.glow}30
              `,
              border: '1.5px solid rgba(197, 210, 183, 0.2)',
              transform: 'translateY(0)',
            }}
            whileHover={{
              scale: 1.03,
              y: -12,
              boxShadow: `
                0 30px 70px -12px rgba(0, 0, 0, 0.6),
                0 0 0 2px rgba(197, 210, 183, 0.3),
                inset 0 1px 0 0 rgba(255, 255, 255, 0.15),
                0 60px 120px -20px ${courseColor.glow}90,
                0 100px 200px -30px ${courseColor.glow}70,
                0 0 150px ${courseColor.glow}50
              `,
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Course thumbnail with unique rainbow gradient - HYPER-SATURATED */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center p-8 hyper-realistic"
              style={{
                background: thumbnailGradient,
              }}
            >
              {/* Course icon overlay on thumbnail */}
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <div style={{ color: `${courseColor.base}88` }}>
                    {getCourseIcon()}
                  </div>
                </div>
                <div
                  className="w-20 h-px mx-auto"
                  style={{
                    background: `linear-gradient(to right, transparent, ${courseColor.base}88, transparent)`
                  }}
                />
              </div>

              {/* Image zoom effect layer - HYPER-SATURATED */}
              <motion.div
                className="absolute inset-0 hyper-realistic"
                style={{
                  background: thumbnailGradient,
                }}
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.div>

            {/* Glassmorphism overlay */}
            <motion.div
              className="absolute inset-0 glass-overlay pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent" />
            </motion.div>

            {/* ULTRA-SATURATED glow effect on hover */}
            <motion.div
              className="absolute inset-0 pointer-events-none rounded-2xl"
              initial={{ opacity: 0 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                boxShadow: isHovered
                  ? `0 10px 40px ${courseColor.glow}, 0 20px 80px ${courseColor.glow}, 0 30px 120px ${courseColor.glow}`
                  : `0 0 0px ${courseColor.glow}`
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Content overlay - always visible */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white z-10">
              {/* Level and duration badges */}
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className={`inline-block px-3 py-1 rounded-full text-xs uppercase tracking-wider font-medium bg-gradient-to-r ${getLevelColor()}`}>
                  {course.level}
                </span>
                <span className="inline-block px-3 py-1 rounded-full glass-badge text-xs uppercase tracking-wider font-medium">
                  {course.duration}
                </span>
              </div>

              {/* Title and instructor */}
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: isHovered ? -10 : 0 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="font-serif text-2xl md:text-3xl font-light mb-2 tracking-tight leading-tight">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-400 mb-3 uppercase tracking-widest">
                  By {course.instructor}
                </p>
              </motion.div>

              {/* Module count */}
              <motion.div
                className="mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: isHovered ? 1 : 0.7,
                  y: isHovered ? 0 : 10
                }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span>{course.modules} Modules</span>
                </div>
              </motion.div>

              {/* Description - shows on hover */}
              <motion.p
                className="text-sm md:text-base text-gray-300 mb-4 line-clamp-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  y: isHovered ? 0 : 10
                }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                {course.description}
              </motion.p>

              {/* Price and CTA */}
              <motion.div
                className="flex items-center justify-between"
                initial={{ y: 0 }}
                animate={{ y: isHovered ? -5 : 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-baseline gap-1">
                  <span
                    className="text-3xl font-light"
                    style={{ color: courseColor.base }}
                  >
                    ${course.price}
                  </span>
                  <span className="text-sm text-gray-500">USD</span>
                </div>

                {/* Enroll Now button */}
                <motion.button
                  className="px-6 py-2.5 rounded-full glass-button text-sm font-medium tracking-wide transition-colors duration-300"
                  style={{
                    borderColor: `${courseColor.base}40`,
                  }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: `${courseColor.base}20`,
                    color: courseColor.base,
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  Enroll Now
                </motion.button>
              </motion.div>

              {/* Progress bar - if enrolled */}
              {course.enrolled && course.progress !== undefined && (
                <motion.div
                  className="mt-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500 uppercase tracking-widest">Progress</span>
                    <span
                      className="text-xs font-medium"
                      style={{ color: courseColor.base }}
                    >
                      {course.progress}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full"
                      style={{
                        background: `linear-gradient(to right, ${courseColor.base}dd, ${courseColor.base})`
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${course.progress}%` }}
                      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Magnetic cursor indicator */}
            <motion.div
              className="absolute top-6 right-6 w-12 h-12 rounded-full glass-badge flex items-center justify-center z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? 1 : 0.8
              }}
              transition={{ duration: 0.3 }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                style={{ color: courseColor.base }}
              >
                <path
                  d="M4 10h12M10 4l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>

            {/* Featured badge */}
            {course.featured && (
              <div className="absolute top-6 left-6 z-10">
                <div
                  className="px-4 py-1.5 rounded-full text-white text-xs font-medium uppercase tracking-wider"
                  style={{
                    background: `linear-gradient(135deg, ${courseColor.base}, ${courseColor.base}dd)`
                  }}
                >
                  Featured
                </div>
              </div>
            )}

            {/* Border gradient glow */}
            <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none" />
            <motion.div
              className="absolute inset-0 rounded-2xl border pointer-events-none"
              style={{
                borderColor: `${courseColor.base}30`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  )
}
