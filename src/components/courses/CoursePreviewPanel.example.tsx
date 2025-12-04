'use client'

/**
 * Usage Example for CoursePreviewPanel
 *
 * This demonstrates how to integrate the holographic course preview panel
 * with course cards or beaker components.
 */

import { useState } from 'react'
import { CoursePreviewPanel } from './CoursePreviewPanel'
import { Course } from '@/data/courses'
import { getCourseColor } from '@/lib/rainbow-colors'

export function CoursePreviewPanelExample() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [isPanelOpen, setIsPanelOpen] = useState(false)

  // Example course data
  const exampleCourse: Course = {
    id: '1',
    title: 'Foundations of Self-Awareness',
    description: 'Begin your transformative journey by developing deep self-awareness. Learn fundamental practices to observe your thoughts, emotions, and patterns with clarity and compassion.',
    instructor: 'Dr. Marcus Stone',
    duration: '4 weeks',
    level: 'Beginner',
    price: 149,
    thumbnail: '',
    modules: 6,
    slug: 'foundations-of-self-awareness',
    featured: true,
  }

  const handleOpenPreview = (course: Course) => {
    setSelectedCourse(course)
    setIsPanelOpen(true)
  }

  const handleClosePreview = () => {
    setIsPanelOpen(false)
    // Delay clearing course to allow exit animation
    setTimeout(() => setSelectedCourse(null), 300)
  }

  // Get the course color for the liquid effect
  const courseColor = selectedCourse
    ? getCourseColor(0).base
    : '#C9A050'

  return (
    <div className="min-h-screen bg-[#05201F] p-8">
      {/* Demo trigger button */}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-serif text-gold-500 mb-8">
          Course Preview Panel Demo
        </h1>

        <button
          onClick={() => handleOpenPreview(exampleCourse)}
          className="px-8 py-4 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-gray-900 font-medium hover:scale-105 transition-transform duration-300"
        >
          Open Course Preview
        </button>

        {/* Usage instructions */}
        <div className="mt-12 p-6 rounded-xl bg-white/5 border border-white/10">
          <h2 className="text-2xl font-serif text-gold-500 mb-4">
            Integration Guide
          </h2>

          <div className="space-y-4 text-gray-300">
            <div>
              <h3 className="text-lg font-medium text-white mb-2">
                1. Import the component
              </h3>
              <pre className="bg-black/30 p-4 rounded-lg text-sm overflow-x-auto">
{`import { CoursePreviewPanel } from '@/components/courses/CoursePreviewPanel'`}
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-medium text-white mb-2">
                2. Add state management
              </h3>
              <pre className="bg-black/30 p-4 rounded-lg text-sm overflow-x-auto">
{`const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
const [isPanelOpen, setIsPanelOpen] = useState(false)`}
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-medium text-white mb-2">
                3. Render the panel
              </h3>
              <pre className="bg-black/30 p-4 rounded-lg text-sm overflow-x-auto">
{`<CoursePreviewPanel
  course={selectedCourse}
  isOpen={isPanelOpen}
  onClose={() => setIsPanelOpen(false)}
  liquidColor={getCourseColor(courseIndex).base}
/>`}
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-medium text-white mb-2">
                4. Trigger from beaker or card click
              </h3>
              <pre className="bg-black/30 p-4 rounded-lg text-sm overflow-x-auto">
{`onClick={() => {
  setSelectedCourse(course)
  setIsPanelOpen(true)
}}`}
              </pre>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gold-500/10 border border-gold-500/30 rounded-lg">
            <h3 className="text-lg font-medium text-gold-500 mb-2">
              Features
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>✨ Animated liquid header with swirling effects</li>
              <li>✨ Glassmorphism with gold glow</li>
              <li>✨ Slide-in/out animations</li>
              <li>✨ Click outside to close</li>
              <li>✨ Escape key to close</li>
              <li>✨ Responsive design (full screen mobile, panel desktop)</li>
              <li>✨ Accessible with ARIA labels</li>
              <li>✨ Body scroll lock when open</li>
            </ul>
          </div>
        </div>
      </div>

      {/* The actual preview panel */}
      <CoursePreviewPanel
        course={selectedCourse}
        isOpen={isPanelOpen}
        onClose={handleClosePreview}
        liquidColor={courseColor}
      />
    </div>
  )
}

export default CoursePreviewPanelExample
