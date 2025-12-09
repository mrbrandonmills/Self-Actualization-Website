'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { essays } from '@/data/essays'

/**
 * Essays Page - Research & Thought Leadership
 * Academic papers and essays by Brandon Mills & Jesse Doherty
 */

export default function EssaysPage() {
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
            Essays on
            <br />
            <span className="text-gold">Self-Actualization</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lead max-w-2xl mx-auto mb-xl text-center"
            style={{ textAlign: 'center' }}
          >
            Academic research and thought leadership exploring consciousness, identity, relationships, and the science of transformation.
          </motion.p>

          <div className="divider" />
        </div>
      </section>

      {/* Essays Grid */}
      <section className="section">
        <div className="container-lg">
          <div className="space-y-16">
            {essays.map((essay, index) => (
              <motion.article
                key={essay.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="essay-card"
              >
                <div className="flex items-baseline gap-6 mb-6">
                  <span className="text-6xl font-light text-gold">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1">
                    <h2 className="h3 mb-3">{essay.title}</h2>
                    {essay.subtitle && (
                      <p className="text-lg text-accent mb-3 italic">{essay.subtitle}</p>
                    )}
                    <div className="flex items-center gap-4 text-sm text-gray-400 flex-wrap">
                      <span>{essay.author}</span>
                      <span>•</span>
                      <span>{essay.publishDate}</span>
                      <span>•</span>
                      <span>{essay.readingTime}</span>
                      {essay.institution && (
                        <>
                          <span>•</span>
                          <span>{essay.institution}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[rgba(212,175,55,0.15)] border border-[rgba(212,175,55,0.3)] rounded-full text-sm text-gold mb-6">
                  <span>🔬</span>
                  <span>{essay.category}</span>
                </div>

                <p className="text-lg leading-relaxed mb-6">
                  {essay.abstract}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {essay.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs bg-[rgba(212,175,55,0.1)] text-accent rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/essays/${essay.slug}`}
                  className="inline-flex items-center gap-3 text-gold hover:text-yellow-400 transition-colors font-medium group"
                >
                  <span>Read Research Paper</span>
                  <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section gradient-dark text-center">
        <div className="container-lg">
          <h2 className="h2 mb-lg">
            Ready to Begin Your Journey?
          </h2>
          <p className="lead mb-xl max-w-2xl mx-auto">
            Explore the complete Laboratory of Life series and start your transformation today.
          </p>
          <Link href="/books" className="btn btn-primary">
            View Books
          </Link>
        </div>
      </section>

      <style jsx>{`
        .essay-card {
          background: rgba(212, 175, 55, 0.05);
          border-left: 4px solid rgba(212, 175, 55, 0.5);
          border-radius: 8px;
          padding: 48px;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .essay-card:hover {
          background: rgba(212, 175, 55, 0.08);
          border-left-color: var(--color-gold);
          transform: translateX(8px);
        }

        @media (max-width: 768px) {
          .essay-card {
            padding: 32px 24px;
          }
        }
      `}</style>
    </main>
  )
}
