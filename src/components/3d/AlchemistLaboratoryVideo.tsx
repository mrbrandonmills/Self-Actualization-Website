'use client'

import { useRef, useState } from 'react'
import { Course } from '@/data/courses'

/**
 * AlchemistLaboratoryVideo - Video-based beaker scene
 * Uses high-quality pre-rendered beakers from video instead of 3D geometry
 */

interface AlchemistLaboratoryVideoProps {
  courses: Course[]
  onBeakerClick: (courseId: string) => void
  selectedCourseId?: string | null
}

export default function AlchemistLaboratoryVideo({ courses, onBeakerClick, selectedCourseId }: AlchemistLaboratoryVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hoveredCourse, setHoveredCourse] = useState<string | null>(null)

  // Beaker click zones (approximate positions based on video layout)
  // These map to where beakers appear in the video
  const beakerZones = [
    { id: courses[0]?.id, left: '12%', top: '40%', width: '15%', height: '45%', color: '#4ade80' }, // Green - leftmost
    { id: courses[1]?.id, left: '25%', top: '35%', width: '12%', height: '50%', color: '#4ade80' }, // Green - second
    { id: courses[2]?.id, left: '40%', top: '30%', width: '15%', height: '55%', color: '#3b82f6' }, // Blue - center-left
    { id: courses[3]?.id, left: '52%', top: '35%', width: '12%', height: '50%', color: '#3b82f6' }, // Blue - center-right
    { id: courses[4]?.id, left: '67%', top: '25%', width: '15%', height: '60%', color: '#a855f7' }, // Purple - right
    { id: courses[5]?.id, left: '80%', top: '30%', width: '12%', height: '55%', color: '#a855f7' }, // Purple - rightmost
  ]

  const handleBeakerClick = (courseId: string) => {
    onBeakerClick(courseId)
  }

  return (
    <div className="relative w-full h-screen bg-[#05201f] overflow-hidden">
      {/* Video background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/assets/beakers/beaker-scene.mp4" type="video/mp4" />
      </video>

      {/* Interactive beaker click zones */}
      {beakerZones.slice(0, courses.length).map((zone, index) => {
        const course = courses[index]
        if (!course) return null

        const isSelected = selectedCourseId === zone.id
        const isHovered = hoveredCourse === zone.id

        return (
          <button
            key={zone.id}
            className="absolute cursor-pointer transition-all duration-300"
            style={{
              left: zone.left,
              top: zone.top,
              width: zone.width,
              height: zone.height,
              background: isHovered || isSelected
                ? `radial-gradient(circle, ${zone.color}40 0%, transparent 70%)`
                : 'transparent',
              border: isHovered || isSelected ? `2px solid ${zone.color}80` : 'none',
              borderRadius: '20px',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            }}
            onClick={() => handleBeakerClick(course.id)}
            onMouseEnter={() => setHoveredCourse(course.id)}
            onMouseLeave={() => setHoveredCourse(null)}
            aria-label={`View ${course.title}`}
          >
            {/* Course info overlay on hover */}
            {(isHovered || isSelected) && (
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-sm px-4 py-2 rounded-lg whitespace-nowrap">
                <p className="text-[#D4AF37] text-sm font-semibold">{course.title}</p>
                <p className="text-white/70 text-xs">{course.level} • {course.duration}</p>
              </div>
            )}
          </button>
        )
      })}

      {/* Overlay instructions */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center pointer-events-none">
        <p className="text-[#D4AF37] text-sm font-light tracking-widest uppercase opacity-70">
          Click beakers to explore • Drag to rotate
        </p>
      </div>

      {/* Selected course detail panel */}
      {selectedCourseId && (
        <div className="absolute top-8 right-8 bg-black/90 backdrop-blur-md p-6 rounded-2xl max-w-md border border-[#D4AF37]/30">
          {(() => {
            const course = courses.find(c => c.id === selectedCourseId)
            if (!course) return null

            return (
              <>
                <h3 className="text-2xl font-bold text-[#D4AF37] mb-2">{course.title}</h3>
                <p className="text-white/80 mb-4">{course.description}</p>
                <div className="flex gap-4 text-sm text-white/60 mb-4">
                  <span>📚 {course.level}</span>
                  <span>⏱️ {course.duration}</span>
                  <span>💰 ${course.price}</span>
                </div>
                <button className="w-full bg-[#D4AF37] text-black font-semibold py-3 rounded-lg hover:bg-[#C4A037] transition-colors">
                  Enroll Now
                </button>
              </>
            )
          })()}
        </div>
      )}
    </div>
  )
}
