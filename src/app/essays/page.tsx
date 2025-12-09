'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

/**
 * Essays Page - Clean & Beautiful
 * Liquid glass theme with gorgeous typography
 */

interface Essay {
  id: string
  title: string
  author: string
  excerpt: string
  pullQuote: string
  readTime: string
  date: string
  slug: string
}

const essays: Essay[] = [
  {
    id: '1',
    title: 'On the Nature of Time',
    author: 'Jesse Doherty & Brandon Mills',
    excerpt: 'Time, unlike space, refuses to be measured by the instruments we build. It bends, stretches, and sometimes disappears entirely when we need it most. In the Laboratory of Life, we learn to work with time rather than against it.',
    pullQuote: 'We don\'t lose time—we misplace our attention.',
    readTime: '8 min read',
    date: 'November 2024',
    slug: 'nature-of-time'
  },
  {
    id: '2',
    title: 'The Architecture of Memory',
    author: 'Jesse Doherty & Brandon Mills',
    excerpt: 'Our minds construct elaborate palaces to house the fragments of our past. But what happens when the foundation begins to crack? Self-actualization requires we rebuild our memories with intention.',
    pullQuote: 'Memory is not a photograph; it\'s a painting that changes with every viewing.',
    readTime: '12 min read',
    date: 'October 2024',
    slug: 'architecture-of-memory'
  },
  {
    id: '3',
    title: 'Engineering Your Patterns',
    author: 'Jesse Doherty & Brandon Mills',
    excerpt: 'Every one of us is trapped by problems we believe can\'t be solved. Some think they are stuck forever. Others keep trying random solutions, only to find themselves back where they started. The Laboratory teaches us to engineer new patterns.',
    pullQuote: 'Your patterns were learned. They can be unlearned.',
    readTime: '15 min read',
    date: 'September 2024',
    slug: 'engineering-patterns'
  }
]

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
            Thoughtful explorations of ideas that matter. Insights from the Laboratory of Life series.
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
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>{essay.author}</span>
                      <span>•</span>
                      <span>{essay.date}</span>
                      <span>•</span>
                      <span>{essay.readTime}</span>
                    </div>
                  </div>
                </div>

                <div className="pull-quote">
                  "{essay.pullQuote}"
                </div>

                <p className="text-lg leading-relaxed mb-6">
                  {essay.excerpt}
                </p>

                <Link
                  href={`/essays/${essay.slug}`}
                  className="inline-flex items-center gap-3 text-gold hover:text-yellow-400 transition-colors font-medium group"
                >
                  <span>Read Full Essay</span>
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

        .pull-quote {
          font-size: 28px;
          font-style: italic;
          color: var(--color-gold);
          margin: 32px 0;
          padding: 24px;
          background: rgba(212, 175, 55, 0.1);
          border-radius: 12px;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .essay-card {
            padding: 32px 24px;
          }

          .pull-quote {
            font-size: 22px;
            padding: 20px;
          }
        }
      `}</style>
    </main>
  )
}
