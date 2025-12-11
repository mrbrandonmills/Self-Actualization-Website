'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { essays } from '@/data/essays'
import styles from './essays.module.css'

/**
 * Essays Page - Research & Thought Leadership
 * Using CSS Modules for liquid glass floating effect
 */

// Map category to theme color class
const categoryThemeMap: Record<string, string> = {
  'Neuroscience': styles.themePurple,
  'Psychology': styles.themeBlue,
  'Identity': styles.themeCyan,
  'Communication': styles.themeGreen,
  'Philosophy': styles.themeRose,
}

export default function EssaysPage() {
  return (
    <main className="min-h-screen bg-[var(--color-black-green)]">
      {/* Hero Section */}
      <section className={`${styles.heroSection} px-4 sm:px-6 lg:px-8`}>
        <div className="container-xl text-center mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`label text-accent mb-md text-center mx-auto ${styles.heroLabel}`}
            style={{ color: '#d4af37' }}
          >
            The Laboratory of Life
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`h1 mb-lg text-center mx-auto ${styles.heroTitle}`}
            style={{ color: '#e8e4dc' }}
          >
            Essays on
            <br />
            <span style={{ color: '#d4af37', fontWeight: 700 }}>Self-Actualization</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`lead max-w-2xl mx-auto mb-xl text-center ${styles.heroDescription}`}
            style={{ color: '#c5d2b7' }}
          >
            Academic research and thought leadership exploring consciousness, identity, relationships, and the science of transformation.
          </motion.p>

          <div className="divider mx-auto" />
        </div>
      </section>

      {/* Essays Grid */}
      <section className="section px-4 sm:px-6 lg:px-8">
        <div className="container-xl mx-auto">
          <div className={styles.essaysGrid}>
            {essays.map((essay, index) => {
              const themeClass = categoryThemeMap[essay.category] || ''
              const essayNumber = String(index + 1).padStart(2, '0')

              return (
                <motion.article
                  key={essay.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`${styles.essayCard} ${themeClass}`}
                >
                  {/* Essay Header */}
                  <div className={styles.essayHeader}>
                    <span className={styles.essayNumber}>{essayNumber}</span>
                    <div className={styles.essayTitleGroup}>
                      <h2 className={styles.essayTitle}>{essay.title}</h2>
                      {essay.subtitle && (
                        <p className={styles.essaySubtitle}>{essay.subtitle}</p>
                      )}
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className={styles.categoryBadge}>
                    <span className={styles.categoryIcon}>🔬</span>
                    <span>{essay.category}</span>
                  </div>

                  {/* Meta Info */}
                  <div className={styles.essayMeta}>
                    <span>{essay.author}</span>
                    <span className={styles.metaSeparator}>•</span>
                    <span>{essay.publishDate}</span>
                    <span className={styles.metaSeparator}>•</span>
                    <span>{essay.readingTime}</span>
                    {essay.institution && (
                      <>
                        <span className={styles.metaSeparator}>•</span>
                        <span>{essay.institution}</span>
                      </>
                    )}
                  </div>

                  {/* Description */}
                  <p className={styles.essayDescription}>{essay.abstract}</p>

                  {/* Tags */}
                  <div className={styles.tagsList}>
                    {essay.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section gradient-dark text-center px-4 sm:px-6 lg:px-8">
        <div className="container-lg mx-auto">
          <h2 className="h2 mb-lg text-center mx-auto" style={{ color: '#e8e4dc' }}>
            Ready to Begin Your Journey?
          </h2>
          <p className="lead mb-xl max-w-2xl mx-auto text-center" style={{ color: '#c5d2b7' }}>
            Explore the complete Laboratory of Life series and start your transformation today.
          </p>
          <div className="flex gap-md justify-center flex-wrap mx-auto">
            <Link href="/books" className="btn btn-primary">
              View Books
            </Link>
            <Link href="/courses" className="btn btn-outline">
              Explore Courses
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
