'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Link from 'next/link'
import { Book } from '@/data/books'
import { useState, useRef } from 'react'
import { getBookColor, getCardGradient } from '@/lib/rainbow-colors'

interface BookCardProps {
  book: Book
  index: number
}

/**
 * BookCard - Luxury book card with 3D tilt effect, gold glow, and magnetic cursor
 * Museum-quality presentation inspired by high-end luxury brands
 */
export function BookCard({ book, index }: BookCardProps) {
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

  // Get unique rainbow color for this book
  const bookColor = getBookColor(index)
  const coverGradient = getCardGradient(bookColor)

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
      <Link href={`/books/${book.slug}`}>
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
          {/* Main card with 3D tilt */}
          <motion.div
            className="relative h-full min-h-[500px] rounded-2xl overflow-hidden"
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
              background: '#EDE3D3',
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Book cover with unique rainbow gradient - HYPER-SATURATED */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center p-8 hyper-realistic"
              style={{
                background: coverGradient,
              }}
            >
              {/* Book title overlay on cover */}
              <div className="text-center space-y-4">
                <h3 className="font-serif text-3xl md:text-4xl font-light text-white/95 tracking-tight">
                  {book.title}
                </h3>
                <div
                  className="w-16 h-px mx-auto"
                  style={{
                    background: `linear-gradient(to right, transparent, ${typeof bookColor === 'string' ? bookColor : bookColor.base}88, transparent)`
                  }}
                />
                <p className="font-sans text-sm md:text-base text-white/80 tracking-wide uppercase">
                  {book.subtitle}
                </p>
              </div>

              {/* Image zoom effect layer - HYPER-SATURATED */}
              <motion.div
                className="absolute inset-0 hyper-realistic"
                style={{
                  background: coverGradient,
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            </motion.div>

            {/* ULTRA-SATURATED glow effect on hover */}
            <motion.div
              className="absolute inset-0 pointer-events-none rounded-2xl"
              initial={{ opacity: 0 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                boxShadow: isHovered
                  ? `0 10px 40px ${bookColor.glow}, 0 20px 80px ${bookColor.glow}, 0 30px 120px ${bookColor.glow}`
                  : `0 0 0px ${bookColor.glow}`
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Content overlay - appears on hover */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white z-10"
              initial={{ y: 20, opacity: 0 }}
              animate={{
                y: isHovered ? 0 : 20,
                opacity: isHovered ? 1 : 0
              }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {/* Category badge */}
              <div className="mb-4">
                <span className="inline-block px-4 py-1.5 rounded-full glass-badge text-xs uppercase tracking-wider font-medium">
                  {book.category}
                </span>
              </div>

              {/* Title and subtitle */}
              <h3 className="font-serif text-2xl md:text-3xl font-light mb-2 tracking-tight">
                {book.title}
              </h3>
              <p className="text-sm md:text-base text-gray-300 mb-4 line-clamp-2">
                {book.subtitle}
              </p>

              {/* Price and CTA */}
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-1">
                  <span
                    className="text-2xl font-light"
                    style={{ color: bookColor.base }}
                  >
                    ${book.price}
                  </span>
                  <span className="text-sm text-gray-400">USD</span>
                </div>

                {/* View Details button */}
                <motion.button
                  className="px-6 py-2.5 rounded-full glass-button text-sm font-medium tracking-wide transition-colors duration-300"
                  style={{
                    borderColor: `${bookColor.base}40`,
                  }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: `${bookColor.base}20`,
                    color: bookColor.base,
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  View Details
                </motion.button>
              </div>

              {/* Author */}
              {book.author && (
                <p className="mt-4 text-xs text-gray-500 uppercase tracking-widest">
                  By {book.author}
                </p>
              )}
            </motion.div>

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
                style={{ color: bookColor.base }}
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
            {book.featured && (
              <div className="absolute top-6 left-6 z-10">
                <div
                  className="px-4 py-1.5 rounded-full text-white text-xs font-medium uppercase tracking-wider"
                  style={{
                    background: `linear-gradient(135deg, ${bookColor.base}, ${bookColor.base}dd)`
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
                borderColor: `${bookColor.base}30`,
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
