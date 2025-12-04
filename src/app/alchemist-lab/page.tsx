'use client'

import dynamic from 'next/dynamic'
import { courses } from '@/data/courses'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AlchemistLabLoader from '@/components/3d/AlchemistLabLoader'

// Dynamic import to avoid SSR issues with Three.js
const AlchemistLaboratory = dynamic(
  () => import('@/components/3d/AlchemistLaboratory'),
  {
    ssr: false,
    loading: () => <AlchemistLabLoader isLoading={true} />,
  }
)

/**
 * Alchemist Laboratory Test Page
 * Jaw-dropping 3D chemistry laboratory showcasing courses as floating beakers
 */
export default function AlchemistLabPage() {
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null)

  const selectedCourse = courses.find(c => c.id === selectedCourseId)

  const handleBeakerClick = (courseId: string) => {
    setSelectedCourseId(courseId === selectedCourseId ? null : courseId)
  }

  return (
    <main className="relative w-full h-screen overflow-hidden bg-[#05201f]">
      {/* 3D Laboratory Scene */}
      <AlchemistLaboratory
        courses={courses}
        onBeakerClick={handleBeakerClick}
        selectedCourseId={selectedCourseId}
      />

      {/* Header overlay */}
      <div className="absolute top-0 left-0 right-0 p-8 pointer-events-none z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1 className="font-serif text-5xl md:text-7xl font-light text-[#D4AF37] mb-4 tracking-tight">
            The Alchemist's Laboratory
          </h1>
          <p className="text-[#4ade80] text-lg md:text-xl font-light tracking-wide">
            Transform yourself • Master your craft • Achieve greatness
          </p>
        </motion.div>
      </div>

      {/* Selected course details panel */}
      <AnimatePresence>
        {selectedCourse && (
          <motion.div
            className="absolute top-1/2 right-8 -translate-y-1/2 w-80 pointer-events-auto z-20"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Glass card with backdrop blur */}
            <div
              className="relative p-6 rounded-2xl border border-[#D4AF37]/30 backdrop-blur-xl"
              style={{
                background: 'rgba(5, 32, 31, 0.85)',
                boxShadow: '0 20px 60px rgba(212, 175, 55, 0.2)',
              }}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedCourseId(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full border border-[#D4AF37]/30 flex items-center justify-center hover:bg-[#D4AF37]/10 transition-colors duration-300"
              >
                <svg
                  className="w-4 h-4 text-[#D4AF37]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Level badge */}
              <div className="mb-4">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs uppercase tracking-wider font-medium ${
                    selectedCourse.level === 'Beginner'
                      ? 'bg-green-600/20 text-green-400 border border-green-600/30'
                      : selectedCourse.level === 'Intermediate'
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30'
                      : 'bg-purple-600/20 text-purple-400 border border-purple-600/30'
                  }`}
                >
                  {selectedCourse.level}
                </span>
              </div>

              {/* Course title */}
              <h2 className="font-serif text-2xl font-light text-[#D4AF37] mb-3 leading-tight">
                {selectedCourse.title}
              </h2>

              {/* Instructor */}
              <p className="text-sm text-[#D4AF37]/70 mb-4 uppercase tracking-widest">
                By {selectedCourse.instructor}
              </p>

              {/* Description */}
              <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                {selectedCourse.description}
              </p>

              {/* Course details grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Duration</p>
                  <p className="text-sm text-gray-200 font-medium">{selectedCourse.duration}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Modules</p>
                  <p className="text-sm text-gray-200 font-medium">{selectedCourse.modules}</p>
                </div>
              </div>

              {/* Price and CTA */}
              <div className="flex items-center justify-between pt-6 border-t border-[#D4AF37]/20">
                <div>
                  <span className="text-3xl font-light text-[#D4AF37]">
                    ${selectedCourse.price}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">USD</span>
                </div>
                <button className="px-6 py-2.5 rounded-full bg-[#D4AF37] text-[#05201f] text-sm font-medium tracking-wide hover:bg-[#FFD700] transition-colors duration-300">
                  Enroll Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend at bottom left */}
      <div className="absolute bottom-8 left-8 pointer-events-none z-10">
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-[#4ade80] shadow-lg shadow-[#4ade80]/50" />
            <span className="text-sm text-gray-400 tracking-wide">Beginner</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-[#3b82f6] shadow-lg shadow-[#3b82f6]/50" />
            <span className="text-sm text-gray-400 tracking-wide">Intermediate</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-[#a855f7] shadow-lg shadow-[#a855f7]/50" />
            <span className="text-sm text-gray-400 tracking-wide">Advanced</span>
          </div>
        </motion.div>
      </div>

      {/* Grain texture overlay for film-like quality */}
      <div
        className="absolute inset-0 pointer-events-none z-[100] opacity-[0.015]"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
        }}
      />
    </main>
  )
}
