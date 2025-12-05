/**
 * Courses Page - Alchemist's Laboratory
 * Award-winning 3D experience where each course is a glowing beaker
 * Dark luxury aesthetic with liquid glass theme
 */

'use client';

import { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { courses, Course } from '@/data/courses';
import { CoursePreviewPanel } from '@/components/courses/CoursePreviewPanel';

// Dynamic import with no SSR for 3D component (using sprite-based beakers)
const AlchemistLaboratory = dynamic(
  () => import('@/components/3d/AlchemistLaboratorySprites'),
  {
    ssr: false,
    loading: () => <AlchemistLabLoader />
  }
);

// Loading screen - Clean and minimal
function AlchemistLabLoader() {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <motion.div
          className="beaker-icon"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          🧪
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="loading-dots"
        >
          <span>•</span>
          <span>•</span>
          <span>•</span>
        </motion.div>
      </div>

      <style jsx>{`
        .loading-screen {
          width: 100%;
          height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #05201f;
          border-radius: 16px;
          border: 1px solid rgba(201, 160, 80, 0.2);
        }

        .loading-content {
          text-align: center;
        }

        .beaker-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .loading-dots {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
        }

        .loading-dots span {
          color: #C9A050;
          font-size: 1.5rem;
          animation: pulse 1.5s infinite;
        }

        .loading-dots span:nth-child(1) {
          animation-delay: 0s;
        }

        .loading-dots span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .loading-dots span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

// Map course level to beaker liquid color
function getLiquidColor(level: Course['level']): string {
  switch (level) {
    case 'Beginner':
      return '#22c55e'; // Green
    case 'Intermediate':
      return '#3b82f6'; // Blue
    case 'Advanced':
      return '#a855f7'; // Purple
    default:
      return '#C9A050'; // Gold fallback
  }
}

/**
 * Main Courses Page
 */
export default function CoursesPage() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleBeakerClick = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (course) {
      setSelectedCourse(course);
      setIsPanelOpen(true);
    }
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    // Delay clearing selected course for exit animation
    setTimeout(() => setSelectedCourse(null), 300);
  };

  return (
    <main className="courses-page">
      {/* Header */}
      <motion.section
        className="page-header"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.p
          className="label"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Laboratory of Life
        </motion.p>

        <motion.h1
          className="title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          The Alchemist's{' '}
          <span className="gradient-text">Laboratory</span>
        </motion.h1>

        <motion.p
          className="subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Each glowing beaker contains a transformational course from the Laboratory of Life.
          <br />
          Click any beaker to discover ancient wisdom blended with modern psychology.
        </motion.p>

        <motion.div
          className="divider"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />
      </motion.section>

      {/* 3D Laboratory Scene */}
      <motion.section
        className="laboratory-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        <Suspense fallback={<AlchemistLabLoader />}>
          <div className="canvas-container">
            <AlchemistLaboratory
              courses={courses}
              onBeakerClick={handleBeakerClick}
              selectedCourseId={selectedCourse?.id}
            />
          </div>
        </Suspense>

        {/* Interaction Hint */}
        <motion.div
          className="hint"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <p>✨ Drag to explore | Click beakers to preview courses</p>
        </motion.div>
      </motion.section>

      {/* Level Legend */}
      <motion.section
        className="level-legend"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="legend-item">
          <div className="color-dot" style={{ background: '#22c55e' }} />
          <span>Block A: Beginner</span>
        </div>
        <div className="legend-item">
          <div className="color-dot" style={{ background: '#3b82f6' }} />
          <span>Block B: Intermediate</span>
        </div>
        <div className="legend-item">
          <div className="color-dot" style={{ background: '#a855f7' }} />
          <span>Block C: Advanced</span>
        </div>
      </motion.section>

      {/* Course Details Panel */}
      <CoursePreviewPanel
        course={selectedCourse}
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
        liquidColor={selectedCourse ? getLiquidColor(selectedCourse.level) : '#C9A050'}
      />

      {/* Film Grain Overlay */}
      <div className="film-grain" />

      <style jsx global>{`
        /* Page Container */
        .courses-page {
          min-height: 100vh;
          background: #05201f;
          padding: 8rem 1.5rem 4rem;
          position: relative;
          overflow-x: hidden;
        }

        /* Header */
        .page-header {
          max-width: 1200px;
          margin: 0 auto 4rem;
          text-align: center;
        }

        .label {
          color: #C9A050;
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin-bottom: 1rem;
        }

        .title {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 300;
          color: #f5f3ef;
          letter-spacing: -0.02em;
          line-height: 1.2;
          margin-bottom: 1.5rem;
        }

        .gradient-text {
          background: linear-gradient(135deg, #C9A050, #d4af37, #f0d090);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .subtitle {
          font-size: clamp(1rem, 2vw, 1.125rem);
          color: rgba(245, 243, 239, 0.7);
          line-height: 1.8;
          max-width: 700px;
          margin: 0 auto 2rem;
        }

        .divider {
          width: 80px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #C9A050, transparent);
          margin: 0 auto;
        }

        /* Laboratory Section */
        .laboratory-section {
          max-width: 1400px;
          margin: 0 auto 3rem;
          position: relative;
        }

        .canvas-container {
          width: 100%;
          height: 70vh;
          min-height: 600px;
          border-radius: 16px;
          overflow: hidden;
          box-shadow:
            0 20px 60px rgba(201, 160, 80, 0.15),
            0 0 100px rgba(201, 160, 80, 0.1) inset;
          border: 1px solid rgba(201, 160, 80, 0.2);
          background: #05201f;
        }

        .hint {
          text-align: center;
          margin-top: 2rem;
          opacity: 0.6;
        }

        .hint p {
          color: #C9A050;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        /* Level Legend */
        .level-legend {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: center;
          gap: 3rem;
          flex-wrap: wrap;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: #f5f3ef;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .color-dot {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          box-shadow: 0 0 20px currentColor;
        }

        /* Film Grain */
        .film-grain {
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.03;
          pointer-events: none;
          z-index: 100;
          mix-blend-mode: overlay;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .courses-page {
            padding: 6rem 1rem 3rem;
          }

          .canvas-container {
            height: 50vh;
            min-height: 400px;
          }

          .level-legend {
            gap: 1.5rem;
          }

          .subtitle br {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .level-legend {
            flex-direction: column;
            align-items: center;
            gap: 1rem;
          }
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .film-grain {
            display: none;
          }
        }
      `}</style>
    </main>
  );
}
