'use client'

/**
 * CoursePreviewPanel Demo Page
 * Interactive showcase of the holographic course preview panel
 */

import { useState } from 'react'
import { CoursePreviewPanel } from '@/components/courses/CoursePreviewPanel'
import { courses, Course } from '@/data/courses'
import { getCourseColor } from '@/lib/rainbow-colors'
import { motion } from 'framer-motion'

export default function CoursePreviewDemo() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleOpenPreview = (course: Course, index: number) => {
    setSelectedCourse(course)
    setSelectedIndex(index)
    setIsPanelOpen(true)
  }

  const handleClosePreview = () => {
    setIsPanelOpen(false)
    setTimeout(() => setSelectedCourse(null), 300)
  }

  return (
    <div className="min-h-screen bg-[#05201F] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="font-serif text-5xl md:text-6xl text-gold-500 mb-4">
            Holographic Course Preview
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Click any beaker to open the cinematic course preview panel
          </p>
        </motion.div>

        {/* Course Beakers Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
          {courses.map((course, index) => {
            const courseColor = getCourseColor(index).base

            return (
              <motion.button
                key={course.id}
                onClick={() => handleOpenPreview(course, index)}
                className="group relative aspect-square"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Beaker container */}
                <div className="relative w-full h-full flex flex-col items-center justify-end p-4">
                  {/* Beaker glass */}
                  <div
                    className="relative w-full h-3/4 rounded-b-lg border-2 border-white/20 bg-white/5 backdrop-blur-md overflow-hidden"
                    style={{
                      borderTopLeftRadius: '40% 20%',
                      borderTopRightRadius: '40% 20%',
                    }}
                  >
                    {/* Liquid */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0"
                      style={{
                        background: `linear-gradient(to top, ${courseColor}, ${courseColor}cc)`,
                        height: '60%',
                      }}
                      animate={{
                        height: ['60%', '65%', '60%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />

                    {/* Bubbles */}
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full bg-white/40"
                        style={{
                          left: `${30 + i * 20}%`,
                          bottom: 0,
                        }}
                        animate={{
                          y: [0, -80],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2 + i,
                          repeat: Infinity,
                          delay: i * 0.5,
                        }}
                      />
                    ))}

                    {/* Glow effect */}
                    <div
                      className="absolute inset-0 opacity-50"
                      style={{
                        background: `radial-gradient(circle at 50% 80%, ${courseColor}88, transparent 70%)`,
                      }}
                    />
                  </div>

                  {/* Course label */}
                  <div className="mt-3 text-center">
                    <p
                      className="text-xs font-medium uppercase tracking-wider mb-1"
                      style={{ color: courseColor }}
                    >
                      {course.level}
                    </p>
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {course.title}
                    </p>
                  </div>

                  {/* Hover glow */}
                  <motion.div
                    className="absolute inset-0 rounded-lg pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    style={{
                      boxShadow: `0 0 40px ${courseColor}60`,
                    }}
                  />
                </div>
              </motion.button>
            )
          })}
        </div>

        {/* Features showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid md:grid-cols-3 gap-6"
        >
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <div className="w-12 h-12 rounded-full bg-gold-500/20 flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-gold-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">
              Liquid Animations
            </h3>
            <p className="text-sm text-gray-400">
              Swirling liquid effects, floating particles, and wave animations
              create a mesmerizing sci-fi experience.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <div className="w-12 h-12 rounded-full bg-gold-500/20 flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-gold-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">
              Glassmorphism
            </h3>
            <p className="text-sm text-gray-400">
              Dramatic backdrop blur with gold border glow creates a luxurious
              holographic panel effect.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <div className="w-12 h-12 rounded-full bg-gold-500/20 flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-gold-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">
              Fully Responsive
            </h3>
            <p className="text-sm text-gray-400">
              Full screen on mobile, elegant slide-out panel on desktop. Perfect
              UX across all devices.
            </p>
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 p-6 rounded-xl bg-gradient-to-r from-gold-500/10 to-gold-600/10 border border-gold-500/30"
        >
          <h3 className="text-lg font-medium text-gold-500 mb-3">
            Interaction Tips
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
              Click any beaker to open the preview panel
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
              Press <kbd className="px-2 py-0.5 bg-white/10 rounded">ESC</kbd> to
              close
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
              Click outside the panel to dismiss
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
              Watch the liquid animations and floating particles
            </li>
          </ul>
        </motion.div>
      </div>

      {/* The actual preview panel */}
      <CoursePreviewPanel
        course={selectedCourse}
        isOpen={isPanelOpen}
        onClose={handleClosePreview}
        liquidColor={getCourseColor(selectedIndex).base}
      />
    </div>
  )
}
