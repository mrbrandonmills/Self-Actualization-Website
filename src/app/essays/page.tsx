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
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container-xl text-center mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="label text-accent mb-md text-center mx-auto"
            style={{ color: '#d4af37' }}
          >
            The Laboratory of Life
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="h1 mb-lg text-center mx-auto"
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
            className="lead max-w-2xl mx-auto mb-xl text-center"
            style={{ color: '#c5d2b7' }}
          >
            Academic research and thought leadership exploring consciousness, identity, relationships, and the science of transformation.
          </motion.p>

          <div className="divider mx-auto" />
        </div>
      </section>

      {/* Essays Grid */}
      <section className="section px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1000px] mx-auto">
          <div className="space-y-16">
            {essays.map((essay, index) => (
              <motion.article
                key={essay.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="essay-card"
              >
                <div className="essay-header flex items-baseline gap-6 mb-6">
                  <span className="essay-number text-6xl font-light text-gold">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1">
                    <h2 className="h3 mb-3" style={{ color: '#e8e4dc' }}>{essay.title}</h2>
                    {essay.subtitle && (
                      <p className="text-lg text-accent mb-3 italic">{essay.subtitle}</p>
                    )}
                    <div className="essay-meta flex items-center gap-4 text-sm text-gray-400 flex-wrap">
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

                <p className="text-lg leading-relaxed mb-6" style={{ color: '#c5d2b7' }}>
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
      <section className="section gradient-dark text-center px-4 sm:px-6 lg:px-8">
        <div className="container-lg mx-auto">
          <h2 className="h2 mb-lg text-center mx-auto" style={{ color: '#e8e4dc' }}>
            Ready to Begin Your Journey?
          </h2>
          <p className="lead mb-xl max-w-2xl mx-auto text-center" style={{ color: '#c5d2b7' }}>
            Explore the complete Laboratory of Life series and start your transformation today.
          </p>
          <Link href="/books" className="btn btn-primary mx-auto">
            View Books
          </Link>
        </div>
      </section>

      <style jsx>{`
        .essay-card {
          background: rgba(10, 47, 46, 0.6);
          backdrop-filter: blur(40px) saturate(180%);
          -webkit-backdrop-filter: blur(40px) saturate(180%);
          border: 1.5px solid rgba(212, 175, 55, 0.3);
          border-left: 4px solid rgba(212, 175, 55, 0.6);
          border-radius: 24px;
          padding: 48px;
          box-shadow:
            0 20px 50px -12px rgba(0, 0, 0, 0.5),
            0 0 0 1.5px rgba(212, 175, 55, 0.18),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.1),
            0 50px 100px -20px rgba(212, 175, 55, 0.3);
          transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
          position: relative;
          overflow: hidden;
          animation: float 8s ease-in-out infinite;
        }

        .essay-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at 50% 50%,
            rgba(212, 175, 55, 0.15) 0%,
            transparent 70%
          );
          opacity: 0;
          transition: opacity 0.6s ease;
        }

        .essay-card:nth-child(1) { animation-delay: 0s; }
        .essay-card:nth-child(2) { animation-delay: -2s; }
        .essay-card:nth-child(3) { animation-delay: -4s; }
        .essay-card:nth-child(4) { animation-delay: -6s; }
        .essay-card:nth-child(5) { animation-delay: -1s; }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        .essay-card:hover {
          transform: translateY(-8px) scale(1.01);
          border-color: rgba(212, 175, 55, 0.5);
          border-left-color: #d4af37;
          box-shadow:
            0 30px 70px -12px rgba(0, 0, 0, 0.6),
            0 0 0 2px rgba(212, 175, 55, 0.3),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.15),
            0 60px 120px -20px rgba(212, 175, 55, 0.5),
            0 0 150px rgba(212, 175, 55, 0.3);
          animation-play-state: paused;
        }

        .essay-card:hover::before {
          opacity: 1;
        }

        @media (max-width: 768px) {
          .essay-card {
            padding: 24px 20px;
            border-radius: 16px;
            animation: none;
            margin: 0 auto;
            max-width: 100%;
          }

          .essay-card:hover {
            transform: translateY(-4px) scale(1.005);
          }

          .essay-header {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 16px;
          }

          .essay-number {
            font-size: 3rem;
            margin-bottom: 8px;
          }

          .essay-header > div {
            text-align: center;
            width: 100%;
          }

          .essay-header h2 {
            text-align: center;
          }

          .essay-meta {
            justify-content: center;
            font-size: 0.75rem;
          }

          .essay-card p {
            text-align: center;
          }

          .essay-card > div:not(.essay-header) {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .essay-card a {
            margin: 0 auto;
          }
        }

        @media (max-width: 480px) {
          .essay-card {
            padding: 20px 16px;
          }

          .essay-number {
            font-size: 2.5rem;
          }

          .essay-meta {
            font-size: 0.7rem;
            gap: 8px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .essay-card {
            animation: none;
          }
        }
      `}</style>
    </main>
  )
}
