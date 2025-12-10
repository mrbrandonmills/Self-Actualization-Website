'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { courses } from '@/data/courses'

/**
 * Courses Page - Liquid Glass Theme
 * Beautiful, clean design with icons and color variety
 */

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-[var(--color-black-green)]">
      {/* Hero Section */}
      <section className="hero-section px-4 sm:px-6 lg:px-8">
        <div className="container-xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="label text-accent mb-md hero-label mx-auto text-center"
          >
            The Laboratory of Life
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="h1 mb-lg text-center hero-title mx-auto"
          >
            Transform Through
            <br />
            <span className="text-gold">Structured Learning</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lead max-w-2xl mx-auto mb-xl text-center hero-description"
          >
            Discover transformational courses that bridge the gap between theory and practice in self-actualization.
          </motion.p>

          <div className="divider mx-auto" />
        </div>
      </section>

      {/* Courses Grid */}
      <section className="section px-4 sm:px-6 lg:px-8">
        <div className="container-xl mx-auto">
          <div className="courses-grid">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`course-card theme-${course.themeColor || 'gold'}`}
              >
                {/* Level Badge */}
                <div className={`level-badge level-${course.level.toLowerCase()}`}>
                  {course.level}
                </div>

                {/* Course Icon with Category */}
                <div className="icon-category-group">
                  <div className="course-icon">{course.icon || '⚗️'}</div>
                  {course.category && (
                    <p className="category-label">{course.category}</p>
                  )}
                </div>

                {/* Course Info */}
                <h2 className="h3 mb-md course-title">{course.title}</h2>
                <p className="course-description">{course.description}</p>

                {/* Course Meta */}
                <div className="course-meta">
                  <div className="meta-item">
                    <span className="meta-icon">📅</span>
                    <div>
                      <span className="meta-label">Duration</span>
                      <span className="meta-value">{course.duration}</span>
                    </div>
                  </div>
                  <div className="meta-item">
                    <span className="meta-icon">📚</span>
                    <div>
                      <span className="meta-label">Modules</span>
                      <span className="meta-value">{course.modules}</span>
                    </div>
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="card-footer">
                  <div className="price-section">
                    <span className="price-label">From</span>
                    <span className="price-value">${course.price}</span>
                  </div>
                  <Link
                    href={`/courses/${course.slug}`}
                    className="course-btn"
                  >
                    <span>Explore Course</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Explanation Section */}
          <div className="explanation-box">
            <h3 className="explanation-title">How The Laboratory Works</h3>
            <p className="explanation-text">
              Each course is designed as a laboratory—a space for experimentation, discovery, and transformation.
              Rather than passive learning, you'll engage in active experimentation with the principles of self-actualization,
              testing theories against your own lived experience and building a personalized framework for growth.
            </p>
            <div className="explanation-grid">
              <div className="explanation-item">
                <div className="explanation-icon">🔬</div>
                <h4>Experiment</h4>
                <p>Test principles in your daily life through structured exercises and reflections.</p>
              </div>
              <div className="explanation-item">
                <div className="explanation-icon">📊</div>
                <h4>Measure</h4>
                <p>Track your progress with tools designed to make transformation visible and tangible.</p>
              </div>
              <div className="explanation-item">
                <div className="explanation-icon">🎯</div>
                <h4>Iterate</h4>
                <p>Refine your approach based on results, building patterns that actually work for you.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="section gradient-dark text-center px-4 sm:px-6 lg:px-8">
        <div className="container-lg mx-auto">
          <div className="coming-soon-box mx-auto">
            <div className="text-8xl mb-6 text-center">🔬</div>
            <h2 className="h2 mb-lg mx-auto text-center">
              New Courses <span className="text-gold">In Development</span>
            </h2>
            <p className="lead mb-xl max-w-2xl mx-auto text-center">
              We're crafting immersive learning experiences that combine the science of self-actualization with practical transformation tools. Stay tuned!
            </p>
            <div className="flex gap-md justify-center flex-wrap mx-auto">
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
        /* Hero Section */
        .hero-section {
          padding-top: 128px;
          padding-bottom: 64px;
        }

        .hero-label,
        .hero-title,
        .hero-description {
          text-align: center;
        }

        /* Courses Grid */
        .courses-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          margin-bottom: 80px;
          max-width: 1400px;
          margin-left: auto;
          margin-right: auto;
        }

        /* EXAGGERATED Liquid Glass Cards - Floating Effect */
        .course-card {
          background: rgba(10, 47, 46, 0.6);
          backdrop-filter: blur(40px) saturate(180%);
          -webkit-backdrop-filter: blur(40px) saturate(180%);
          border: 1.5px solid rgba(197, 210, 183, 0.2);
          border-radius: 24px;
          padding: 40px;
          transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
          position: relative;
          overflow: hidden;
          box-shadow:
            0 20px 50px -12px rgba(0, 0, 0, 0.5),
            0 0 0 1.5px rgba(197, 210, 183, 0.18),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.1),
            0 50px 100px -20px rgba(212, 175, 55, 0.3);
        }

        .course-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(212,175,55,0.15) 0%, transparent 50%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .course-card:hover {
          transform: translateY(-12px);
          border-color: rgba(197, 210, 183, 0.3);
          box-shadow:
            0 30px 70px -12px rgba(0, 0, 0, 0.6),
            0 0 0 2px rgba(197, 210, 183, 0.3),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.15),
            0 60px 120px -20px rgba(212, 175, 55, 0.5),
            0 0 150px rgba(212, 175, 55, 0.3);
        }

        .course-card:hover::before {
          opacity: 1;
        }

        /* Theme Color Variants - EXAGGERATED Glows */
        .theme-green {
          box-shadow:
            0 20px 50px -12px rgba(0, 0, 0, 0.5),
            0 0 0 1.5px rgba(197, 210, 183, 0.18),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.1),
            0 50px 100px -20px rgba(34, 197, 94, 0.3);
        }
        .theme-green:hover {
          box-shadow:
            0 30px 70px -12px rgba(0, 0, 0, 0.6),
            0 0 0 2px rgba(197, 210, 183, 0.3),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.15),
            0 60px 120px -20px rgba(34, 197, 94, 0.5),
            0 0 150px rgba(34, 197, 94, 0.3);
        }

        .theme-blue {
          box-shadow:
            0 20px 50px -12px rgba(0, 0, 0, 0.5),
            0 0 0 1.5px rgba(197, 210, 183, 0.18),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.1),
            0 50px 100px -20px rgba(59, 130, 246, 0.3);
        }
        .theme-blue:hover {
          box-shadow:
            0 30px 70px -12px rgba(0, 0, 0, 0.6),
            0 0 0 2px rgba(197, 210, 183, 0.3),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.15),
            0 60px 120px -20px rgba(59, 130, 246, 0.5),
            0 0 150px rgba(59, 130, 246, 0.3);
        }

        .theme-purple {
          box-shadow:
            0 20px 50px -12px rgba(0, 0, 0, 0.5),
            0 0 0 1.5px rgba(197, 210, 183, 0.18),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.1),
            0 50px 100px -20px rgba(168, 85, 247, 0.3);
        }
        .theme-purple:hover {
          box-shadow:
            0 30px 70px -12px rgba(0, 0, 0, 0.6),
            0 0 0 2px rgba(197, 210, 183, 0.3),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.15),
            0 60px 120px -20px rgba(168, 85, 247, 0.5),
            0 0 150px rgba(168, 85, 247, 0.3);
        }

        .theme-cyan {
          box-shadow:
            0 20px 50px -12px rgba(0, 0, 0, 0.5),
            0 0 0 1.5px rgba(197, 210, 183, 0.18),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.1),
            0 50px 100px -20px rgba(6, 182, 212, 0.3);
        }
        .theme-cyan:hover {
          box-shadow:
            0 30px 70px -12px rgba(0, 0, 0, 0.6),
            0 0 0 2px rgba(197, 210, 183, 0.3),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.15),
            0 60px 120px -20px rgba(6, 182, 212, 0.5),
            0 0 150px rgba(6, 182, 212, 0.3);
        }

        .theme-rose {
          box-shadow:
            0 20px 50px -12px rgba(0, 0, 0, 0.5),
            0 0 0 1.5px rgba(197, 210, 183, 0.18),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.1),
            0 50px 100px -20px rgba(244, 63, 94, 0.3);
        }
        .theme-rose:hover {
          box-shadow:
            0 30px 70px -12px rgba(0, 0, 0, 0.6),
            0 0 0 2px rgba(197, 210, 183, 0.3),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.15),
            0 60px 120px -20px rgba(244, 63, 94, 0.5),
            0 0 150px rgba(244, 63, 94, 0.3);
        }

        .theme-gold {
          /* Default already has gold glow */
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

        .icon-category-group {
          text-align: center;
          margin-bottom: 24px;
        }

        .course-icon {
          font-size: 64px;
          margin-bottom: 12px;
          filter: drop-shadow(0 0 20px rgba(212, 175, 55, 0.4));
        }

        .category-label {
          font-size: 12px;
          font-weight: 600;
          color: var(--color-gold);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          opacity: 0.8;
        }

        .course-title {
          text-align: left;
        }

        .course-description {
          font-size: 15px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 24px;
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
          align-items: center;
          gap: 12px;
        }

        .meta-icon {
          font-size: 20px;
        }

        .meta-label {
          display: block;
          font-size: 11px;
          color: rgba(212, 175, 55, 0.7);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 4px;
        }

        .meta-value {
          display: block;
          font-size: 15px;
          font-weight: 600;
          color: var(--color-gold);
        }

        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .price-section {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .price-label {
          font-size: 11px;
          color: rgba(212, 175, 55, 0.7);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .price-value {
          font-size: 24px;
          font-weight: 700;
          color: var(--color-gold);
        }

        .course-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 24px;
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

        /* Explanation Section */
        .explanation-box {
          max-width: 1200px;
          margin: 80px auto 0;
          padding: 60px 48px;
          background: rgba(212, 175, 55, 0.05);
          border: 1px solid rgba(212, 175, 55, 0.2);
          border-radius: 24px;
        }

        .explanation-title {
          font-size: 32px;
          font-weight: 700;
          color: var(--color-gold);
          text-align: center;
          margin-bottom: 24px;
        }

        .explanation-text {
          font-size: 17px;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.9);
          text-align: center;
          max-width: 800px;
          margin: 0 auto 48px;
        }

        .explanation-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }

        .explanation-item {
          text-align: center;
          padding: 32px 24px;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 16px;
          border: 1px solid rgba(212, 175, 55, 0.1);
        }

        .explanation-icon {
          font-size: 48px;
          margin-bottom: 16px;
          filter: drop-shadow(0 0 20px rgba(212, 175, 55, 0.3));
        }

        .explanation-item h4 {
          font-size: 20px;
          font-weight: 700;
          color: var(--color-gold);
          margin-bottom: 12px;
        }

        .explanation-item p {
          font-size: 14px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.8);
        }

        .coming-soon-box {
          background: rgba(212, 175, 55, 0.05);
          border: 2px solid rgba(212, 175, 55, 0.3);
          border-radius: 24px;
          padding: 80px 48px;
          box-shadow: 0 20px 80px rgba(0, 0, 0, 0.5),
                      0 0 40px rgba(212, 175, 55, 0.1);
        }

        /* Tablet Breakpoint */
        @media (max-width: 1200px) {
          .courses-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 28px;
          }

          .explanation-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }

        /* Mobile Breakpoint */
        @media (max-width: 768px) {
          .hero-section {
            padding-top: 96px;
            padding-bottom: 48px;
            padding-left: 20px;
            padding-right: 20px;
          }

          .hero-label,
          .hero-title,
          .hero-description {
            text-align: center;
            margin-left: auto;
            margin-right: auto;
            padding-left: 16px;
            padding-right: 16px;
          }

          .courses-grid {
            grid-template-columns: 1fr;
            gap: 24px;
            padding-left: 16px;
            padding-right: 16px;
          }

          .course-card {
            padding: 32px 24px;
            text-align: center;
          }

          .course-card h2,
          .course-card p {
            text-align: center;
          }

          .level-badge {
            margin-left: auto;
            margin-right: auto;
          }

          .course-icon {
            font-size: 56px;
            margin-left: auto;
            margin-right: auto;
          }

          .course-meta {
            padding: 16px;
            gap: 12px;
          }

          .meta-item {
            flex-direction: column;
            text-align: center;
            gap: 4px;
          }

          .card-footer {
            flex-direction: column;
            gap: 16px;
          }

          .price-section {
            text-align: center;
            align-items: center;
          }

          .course-btn {
            width: 100%;
          }

          .explanation-box {
            margin: 48px 16px 0;
            padding: 40px 24px;
          }

          .explanation-title {
            font-size: 24px;
          }

          .explanation-text {
            font-size: 15px;
          }

          .coming-soon-box {
            padding: 48px 24px;
            margin-left: 16px;
            margin-right: 16px;
          }

          .coming-soon-box h2,
          .coming-soon-box p {
            text-align: center;
            padding-left: 8px;
            padding-right: 8px;
          }
        }

        /* Extra Small Mobile Breakpoint */
        @media (max-width: 480px) {
          .hero-section {
            padding-top: 80px;
            padding-bottom: 32px;
          }

          .hero-title {
            font-size: 2rem;
            line-height: 1.2;
          }

          .course-card {
            padding: 24px 16px;
          }

          .course-icon {
            font-size: 48px;
          }

          .explanation-box {
            padding: 32px 16px;
            border-radius: 16px;
          }

          .explanation-item {
            padding: 24px 16px;
          }

          .coming-soon-box {
            padding: 32px 16px;
            border-radius: 16px;
          }

          .coming-soon-box .text-8xl {
            font-size: 4rem;
          }
        }
      `}</style>
    </main>
  )
}
