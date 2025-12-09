'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { courses } from '@/data/courses'

/**
 * Courses Page - Liquid Glass Theme
 * Beautiful, clean design without 3D complexity
 */

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-[var(--color-black-green)]">
      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container-xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="label text-accent mb-md"
          >
            The Laboratory of Life
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="h1 mb-lg text-center"
            style={{ textAlign: 'center' }}
          >
            Transform Through
            <br />
            <span className="text-gold">Structured Learning</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lead max-w-2xl mx-auto mb-xl text-center"
            style={{ textAlign: 'center' }}
          >
            Discover transformational courses that bridge the gap between theory and practice in self-actualization.
          </motion.p>

          <div className="divider" />
        </div>
      </section>

      {/* Courses Grid */}
      <section className="section">
        <div className="container-xl">
          <div className="courses-grid">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="course-card"
              >
                {/* Level Badge */}
                <div className={`level-badge level-${course.level.toLowerCase()}`}>
                  {course.level}
                </div>

                {/* Course Icon */}
                <div className="course-icon">{course.icon || '⚗️'}</div>

                {/* Course Info */}
                <h2 className="h3 mb-md">{course.title}</h2>
                <p className="text-sm text-accent mb-md">{course.category}</p>
                <p className="text-base mb-lg">{course.description}</p>

                {/* Course Meta */}
                <div className="course-meta">
                  <div className="meta-item">
                    <span className="meta-label">Duration</span>
                    <span className="meta-value">{course.duration}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Level</span>
                    <span className="meta-value">{course.level}</span>
                  </div>
                </div>

                {/* CTA Button */}
                <Link
                  href={`/courses/${course.slug}`}
                  className="course-btn"
                >
                  <span>Explore Course</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="section gradient-dark text-center">
        <div className="container-lg">
          <div className="coming-soon-box">
            <div className="text-8xl mb-6">🔬</div>
            <h2 className="h2 mb-lg">
              New Courses <span className="text-gold">In Development</span>
            </h2>
            <p className="lead mb-xl max-w-2xl mx-auto">
              We're crafting immersive learning experiences that combine the science of self-actualization with practical transformation tools. Stay tuned!
            </p>
            <div className="flex gap-md justify-center flex-wrap">
              <Link href="/books" className="btn btn-primary">
                Start with the Books
              </Link>
              <Link href="/essays" className="btn btn-outline">
                Read Essays
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .courses-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 32px;
          margin-bottom: 64px;
        }

        .course-card {
          background: rgba(212, 175, 55, 0.05);
          border: 1px solid rgba(212, 175, 55, 0.2);
          border-radius: 16px;
          padding: 40px;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          position: relative;
          overflow: hidden;
        }

        .course-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(212,175,55,0.1) 0%, transparent 50%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .course-card:hover {
          transform: translateY(-8px);
          border-color: rgba(212, 175, 55, 0.5);
          box-shadow: 0 20px 60px rgba(212, 175, 55, 0.15);
        }

        .course-card:hover::before {
          opacity: 1;
        }

        .level-badge {
          display: inline-block;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 20px;
        }

        .level-beginner {
          background: rgba(34, 197, 94, 0.1);
          color: rgb(34, 197, 94);
          border: 1px solid rgba(34, 197, 94, 0.3);
        }

        .level-intermediate {
          background: rgba(59, 130, 246, 0.1);
          color: rgb(59, 130, 246);
          border: 1px solid rgba(59, 130, 246, 0.3);
        }

        .level-advanced {
          background: rgba(168, 85, 247, 0.1);
          color: rgb(168, 85, 247);
          border: 1px solid rgba(168, 85, 247, 0.3);
        }

        .course-icon {
          font-size: 64px;
          margin-bottom: 24px;
          filter: drop-shadow(0 0 20px rgba(212, 175, 55, 0.4));
        }

        .course-meta {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 24px;
          padding: 20px;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 12px;
        }

        .meta-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .meta-label {
          font-size: 12px;
          color: rgba(212, 175, 55, 0.7);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .meta-value {
          font-size: 16px;
          font-weight: 600;
          color: var(--color-gold);
        }

        .course-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 16px 24px;
          background: rgba(212, 175, 55, 0.1);
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-radius: 12px;
          color: var(--color-gold);
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .course-btn:hover {
          background: rgba(212, 175, 55, 0.2);
          border-color: var(--color-gold);
          transform: translateY(-2px);
        }

        .coming-soon-box {
          background: rgba(212, 175, 55, 0.05);
          border: 2px solid rgba(212, 175, 55, 0.3);
          border-radius: 24px;
          padding: 80px 48px;
          box-shadow: 0 20px 80px rgba(0, 0, 0, 0.5),
                      0 0 40px rgba(212, 175, 55, 0.1);
        }

        @media (max-width: 768px) {
          .courses-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .course-card {
            padding: 32px 24px;
          }

          .coming-soon-box {
            padding: 48px 24px;
          }
        }
      `}</style>
    </main>
  )
}
