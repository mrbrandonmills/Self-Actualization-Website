'use client'

import { motion } from 'framer-motion'
import { CourseCard } from '@/components/courses/course-card'
import { courses, Course } from '@/data/courses'
import { useState } from 'react'

type LevelFilter = 'All' | Course['level']

const levels: LevelFilter[] = ['All', 'Beginner', 'Intermediate', 'Advanced']

/**
 * Courses Catalog Page
 * Luxury course grid with level filtering and cinematic animations
 */
export default function CoursesPage() {
  const [activeLevel, setActiveLevel] = useState<LevelFilter>('All')

  // Filter courses by selected level
  const filteredCourses = activeLevel === 'All'
    ? courses
    : courses.filter(course => course.level === activeLevel)

  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-16">
      {/* Page header */}
      <section className="px-4 sm:px-6 lg:px-16 mb-12 md:mb-16">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Page title */}
          <motion.h1
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Transformative{' '}
            <span className="inline-block bg-gradient-to-r from-[#D4AF37] via-[#C9A050] to-[#B89040] bg-clip-text text-transparent">
              Courses
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            Master the art of self-actualization
          </motion.p>

          {/* Gold accent divider */}
          <motion.div
            className="w-24 h-px bg-gradient-to-r from-transparent via-[#C9A050] to-transparent mx-auto mb-12"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Level filters */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-3 md:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {levels.map((level, index) => {
              const isActive = activeLevel === level

              return (
                <motion.button
                  key={level}
                  onClick={() => setActiveLevel(level)}
                  className={`
                    px-6 py-2.5 rounded-full text-sm font-medium tracking-wide
                    transition-all duration-400 relative overflow-hidden
                    ${isActive
                      ? 'text-black'
                      : 'text-gray-300 hover:text-white glass-button'
                    }
                  `}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.5 + index * 0.1,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Active background gradient */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] via-[#C9A050] to-[#B89040]"
                      layoutId="activeLevel"
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 30
                      }}
                    />
                  )}

                  {/* Button text */}
                  <span className="relative z-10">{level}</span>

                  {/* Hover glow effect */}
                  {!isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                      initial={{ opacity: 0 }}
                      whileHover={{
                        opacity: 1,
                        boxShadow: '0 0 20px rgba(201, 160, 80, 0.2)'
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
              )
            })}
          </motion.div>
        </motion.div>
      </section>

      {/* Courses count indicator */}
      <motion.div
        className="px-4 sm:px-6 lg:px-16 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <p className="text-center text-sm text-gray-500 uppercase tracking-widest">
          {filteredCourses.length} {filteredCourses.length === 1 ? 'Course' : 'Courses'} Available
        </p>
      </motion.div>

      {/* Courses grid */}
      <section className="px-4 sm:px-6 lg:px-16">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          layout
          transition={{
            layout: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
          }}
        >
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                layout: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.4 }
              }}
            >
              <CourseCard course={course} index={index} />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty state */}
        {filteredCourses.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xl text-gray-500 mb-4">No courses found at this level</p>
            <button
              onClick={() => setActiveLevel('All')}
              className="px-6 py-3 rounded-full glass-button text-sm font-medium tracking-wide hover:text-[#C9A050] transition-colors duration-300"
            >
              View All Courses
            </button>
          </motion.div>
        )}
      </section>

      {/* Bottom spacing */}
      <div className="h-16 md:h-24" />

      {/* Decorative background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
        {/* Gold glow orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(201, 160, 80, 0.08) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(201, 160, 80, 0.06) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      </div>
    </main>
  )
}
