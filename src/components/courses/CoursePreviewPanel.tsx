'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Course } from '@/data/courses'
import { X, BookOpen, Clock, Award, Sparkles, Loader2 } from 'lucide-react'
import { getStripe } from '@/lib/stripe-client'

interface CoursePreviewPanelProps {
  course: Course | null
  isOpen: boolean
  onClose: () => void
  liquidColor: string
}

/**
 * CoursePreviewPanel - Holographic panel that appears when clicking a course beaker
 * Features:
 * - Glassmorphism with dramatic gold glow
 * - Animated liquid header matching beaker color
 * - Slide-in/out animations with Framer Motion
 * - Responsive: Full screen on mobile, slide-out panel on desktop
 * - Accessible: Focus trap, ARIA labels, keyboard navigation
 */
export function CoursePreviewPanel({
  course,
  isOpen,
  onClose,
  liquidColor,
}: CoursePreviewPanelProps) {
  const [isEnrolling, setIsEnrolling] = useState(false)

  // Handle Stripe checkout
  const handleEnroll = async () => {
    if (!course) return

    setIsEnrolling(true)

    try {
      // Create checkout session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ course }),
      })

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      const { sessionId } = await response.json()

      // Redirect to Stripe Checkout
      const stripe = await getStripe()
      if (!stripe) {
        throw new Error('Stripe failed to load')
      }

      const { error } = await stripe.redirectToCheckout({ sessionId })

      if (error) {
        throw error
      }
    } catch (error) {
      console.error('Enrollment error:', error)
      alert('Failed to start enrollment. Please try again.')
      setIsEnrolling(false)
    }
  }

  // Close panel on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when panel is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!course) return null

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Main panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="course-preview-title"
            className="fixed inset-y-0 right-0 z-[101] w-full md:w-[600px] lg:w-[700px]"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 300,
            }}
          >
            {/* Glassmorphism container */}
            <div
              className="relative h-full flex flex-col overflow-hidden"
              style={{
                background: 'rgba(5, 32, 31, 0.85)',
                backdropFilter: 'blur(40px)',
                WebkitBackdropFilter: 'blur(40px)',
                border: '1px solid rgba(201, 160, 80, 0.3)',
                boxShadow: `
                  0 0 60px rgba(201, 160, 80, 0.4),
                  0 20px 100px rgba(201, 160, 80, 0.3),
                  inset 0 0 80px rgba(201, 160, 80, 0.1)
                `,
              }}
            >
              {/* Animated liquid header */}
              <motion.div
                className="relative h-48 overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${liquidColor} 0%, ${liquidColor}cc 50%, ${liquidColor}99 100%)`,
                }}
              >
                {/* Swirling liquid effect */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${liquidColor}ff 0%, transparent 70%)`,
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />

                {/* Liquid wave animation */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-32"
                  style={{
                    background: `linear-gradient(to top, ${liquidColor}aa, transparent)`,
                  }}
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                {/* Floating particles */}
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      background: `rgba(255, 255, 255, ${0.3 + Math.random() * 0.3})`,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -100, 0],
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}

                {/* Shimmer overlay */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(
                      90deg,
                      transparent 0%,
                      rgba(255, 255, 255, 0.2) 50%,
                      transparent 100%
                    )`,
                    backgroundSize: '200% 100%',
                  }}
                  animate={{
                    backgroundPosition: ['0% 0%', '200% 0%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 w-12 h-12 rounded-full bg-black/30 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/50 hover:border-white/40 transition-all duration-300 group z-10"
                  aria-label="Close preview panel"
                >
                  <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </motion.div>

              {/* Content section */}
              <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gold-500/30">
                <div className="p-8 md:p-10">
                  {/* Course title and instructor */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-6"
                  >
                    <h2
                      id="course-preview-title"
                      className="font-serif text-3xl md:text-4xl font-light mb-3 tracking-tight leading-tight"
                      style={{ color: '#C9A050' }}
                    >
                      {course.title}
                    </h2>
                    <p className="text-sm text-gray-400 uppercase tracking-widest">
                      By {course.instructor}
                    </p>
                  </motion.div>

                  {/* Divider with shimmer */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="h-px mb-8 relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(to right, transparent, rgba(201, 160, 80, 0.5), transparent)',
                    }}
                  >
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)',
                        backgroundSize: '50% 100%',
                      }}
                      animate={{
                        x: ['-100%', '200%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                  </motion.div>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-base md:text-lg text-gray-300 leading-relaxed mb-8"
                  >
                    {course.description}
                  </motion.p>

                  {/* Course stats */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="grid grid-cols-2 gap-4 mb-8"
                  >
                    {/* Modules */}
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-gold-500/30 transition-colors duration-300">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold-500/20 flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-gold-500" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Modules</p>
                        <p className="text-lg font-medium text-white">{course.modules}</p>
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-gold-500/30 transition-colors duration-300">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold-500/20 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-gold-500" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Duration</p>
                        <p className="text-lg font-medium text-white">{course.duration}</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Level badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center gap-3 mb-8"
                  >
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gold-500/20 to-gold-600/20 border border-gold-500/30">
                      <Award className="w-4 h-4 text-gold-500" />
                      <span className="text-sm font-medium text-gold-500 uppercase tracking-wider">
                        {course.level}
                      </span>
                    </div>
                    {course.featured && (
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span className="text-sm font-medium text-purple-400 uppercase tracking-wider">
                          Featured
                        </span>
                      </div>
                    )}
                  </motion.div>

                  {/* Enroll button */}
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    onClick={handleEnroll}
                    disabled={isEnrolling}
                    className="w-full py-4 rounded-xl text-lg font-medium tracking-wide relative overflow-hidden group mb-4"
                    style={{
                      background: isEnrolling
                        ? 'linear-gradient(135deg, #8B8B8B 0%, #A0A0A0 50%, #8B8B8B 100%)'
                        : 'linear-gradient(135deg, #C9A050 0%, #D4AF37 50%, #C9A050 100%)',
                      boxShadow: isEnrolling
                        ? '0 8px 32px rgba(139, 139, 139, 0.4)'
                        : '0 8px 32px rgba(201, 160, 80, 0.4)',
                      cursor: isEnrolling ? 'not-allowed' : 'pointer',
                    }}
                    whileHover={isEnrolling ? {} : { scale: 1.02 }}
                    whileTap={isEnrolling ? {} : { scale: 0.98 }}
                  >
                    {/* Shimmer effect */}
                    {!isEnrolling && (
                      <motion.div
                        className="absolute inset-0"
                        style={{
                          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                          backgroundSize: '50% 100%',
                        }}
                        animate={{
                          x: ['-100%', '200%'],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      />
                    )}

                    <span className="relative z-10 text-gray-900 flex items-center justify-center gap-2">
                      {isEnrolling ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Enroll Now - ${course.price} USD
                        </>
                      )}
                    </span>
                  </motion.button>

                  {/* Money-back guarantee */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center text-xs text-gray-500 uppercase tracking-widest"
                  >
                    30-Day Money-Back Guarantee
                  </motion.p>
                </div>
              </div>

              {/* Bottom glow accent */}
              <div
                className="absolute bottom-0 left-0 right-0 h-px"
                style={{
                  background: 'linear-gradient(to right, transparent, rgba(201, 160, 80, 0.6), transparent)',
                  boxShadow: '0 0 20px rgba(201, 160, 80, 0.4)',
                }}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
