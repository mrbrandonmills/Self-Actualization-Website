'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { courses } from '@/data/courses'
import styles from './courses.module.css'

/**
 * Courses Page - Floating Liquid Glass Design
 * Uses CSS Modules for the beautiful glass effect with colored borders
 */

// Map themeColor string to CSS module class
const themeClassMap: Record<string, string> = {
  green: styles.themeGreen,
  blue: styles.themeBlue,
  purple: styles.themePurple,
  cyan: styles.themeCyan,
  rose: styles.themeRose,
  gold: '',
}

// Map level to CSS module class
const levelClassMap: Record<string, string> = {
  beginner: styles.levelBeginner,
  intermediate: styles.levelIntermediate,
  advanced: styles.levelAdvanced,
}

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-[var(--color-black-green)]">
      {/* Hero Section */}
      <section className={`${styles.heroSection} px-4 sm:px-6 lg:px-8`}>
        <div className="container-xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`label text-accent mb-md ${styles.heroLabel} mx-auto text-center`}
            style={{ color: '#d4af37' }}
          >
            The Laboratory of Life
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`h1 mb-lg text-center ${styles.heroTitle} mx-auto`}
            style={{ color: '#e8e4dc' }}
          >
            Transform Through
            <br />
            <span className="text-gold" style={{ color: '#d4af37' }}>Structured Learning</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`lead max-w-2xl mx-auto mb-xl text-center ${styles.heroDescription}`}
            style={{ color: '#c5d2b7' }}
          >
            Discover transformational courses that bridge the gap between theory and practice in self-actualization.
          </motion.p>

          <div className="divider mx-auto" />
        </div>
      </section>

      {/* Courses Grid */}
      <section className="section px-4 sm:px-6 lg:px-8">
        <div className="container-xl mx-auto">
          <div className={styles.coursesGrid}>
            {courses.map((course, index) => {
              const themeClass = themeClassMap[course.themeColor || 'gold'] || ''
              const levelClass = levelClassMap[course.level.toLowerCase()] || ''

              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`${styles.courseCard} ${themeClass}`}
                >
                  {/* Level Badge */}
                  <div className={`${styles.levelBadge} ${levelClass}`}>
                    {course.level}
                  </div>

                  {/* Course Icon with Category */}
                  <div className={styles.iconCategoryGroup}>
                    <div className={styles.courseIcon}>{course.icon || '⚗️'}</div>
                    {course.category && (
                      <p className={styles.categoryLabel}>{course.category}</p>
                    )}
                  </div>

                  {/* Course Info */}
                  <h2 className={`h3 mb-md ${styles.courseTitle}`} style={{ color: '#e8e4dc' }}>{course.title}</h2>
                  <p className={styles.courseDescription}>{course.description}</p>

                  {/* Course Meta */}
                  <div className={styles.courseMeta}>
                    <div className={styles.metaItem}>
                      <span className={styles.metaIcon}>📅</span>
                      <div>
                        <span className={styles.metaLabel}>Duration</span>
                        <span className={styles.metaValue}>{course.duration}</span>
                      </div>
                    </div>
                    <div className={styles.metaItem}>
                      <span className={styles.metaIcon}>📚</span>
                      <div>
                        <span className={styles.metaLabel}>Modules</span>
                        <span className={styles.metaValue}>{course.modules}</span>
                      </div>
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className={styles.cardFooter}>
                    <div className={styles.priceSection}>
                      <span className={styles.priceLabel}>From</span>
                      <span className={styles.priceValue}>${course.price}</span>
                    </div>
                    <Link
                      href={`/courses/${course.slug}`}
                      className={styles.courseBtn}
                    >
                      <span>Explore Course</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Explanation Section */}
          <div className={styles.explanationBox}>
            <h3 className={styles.explanationTitle}>How The Laboratory Works</h3>
            <p className={styles.explanationText}>
              Each course is designed as a laboratory—a space for experimentation, discovery, and transformation.
              Rather than passive learning, you'll engage in active experimentation with the principles of self-actualization,
              testing theories against your own lived experience and building a personalized framework for growth.
            </p>
            <div className={styles.explanationGrid}>
              <div className={styles.explanationItem}>
                <div className={styles.explanationIcon}>🔬</div>
                <h4>Experiment</h4>
                <p>Test principles in your daily life through structured exercises and reflections.</p>
              </div>
              <div className={styles.explanationItem}>
                <div className={styles.explanationIcon}>📊</div>
                <h4>Measure</h4>
                <p>Track your progress with tools designed to make transformation visible and tangible.</p>
              </div>
              <div className={styles.explanationItem}>
                <div className={styles.explanationIcon}>🎯</div>
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
          <div className={`${styles.comingSoonBox} mx-auto`}>
            <div className="text-8xl mb-6 text-center">🔬</div>
            <h2 className="h2 mb-lg mx-auto text-center" style={{ color: '#e8e4dc' }}>
              New Courses <span className="text-gold" style={{ color: '#d4af37' }}>In Development</span>
            </h2>
            <p className="lead mb-xl max-w-2xl mx-auto text-center" style={{ color: '#c5d2b7' }}>
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
    </main>
  )
}
