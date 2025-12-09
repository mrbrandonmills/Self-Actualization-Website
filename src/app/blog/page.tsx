'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

/**
 * Blog Page - Updates from The Laboratory
 */

export default function BlogPage() {
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
            The Laboratory Blog
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="h1 mb-lg text-center"
            style={{ textAlign: 'center' }}
          >
            Updates from
            <br />
            <span className="text-gold">The Laboratory</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lead max-w-2xl mx-auto mb-xl text-center"
            style={{ textAlign: 'center' }}
          >
            Insights, experiments, and discoveries from our journey of self-actualization.
          </motion.p>

          <div className="divider" />
        </div>
      </section>

      {/* Coming Soon */}
      <section className="section">
        <div className="container-lg text-center">
          <div className="coming-soon-card">
            <div className="text-8xl mb-6">⚗️</div>
            <h2 className="h2 mb-lg">
              New Content <span className="text-gold">Brewing</span>
            </h2>
            <p className="lead mb-xl max-w-2xl mx-auto">
              We're crafting thoughtful content about self-actualization, personal growth, and the science of transformation. Check back soon!
            </p>
            <div className="flex gap-md justify-center flex-wrap">
              <Link href="/essays" className="btn btn-primary">
                Read Essays
              </Link>
              <Link href="/books" className="btn btn-outline">
                View Books
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .coming-soon-card {
          background: rgba(212, 175, 55, 0.05);
          border: 2px solid rgba(212, 175, 55, 0.3);
          border-radius: 24px;
          padding: 80px 48px;
          box-shadow: 0 20px 80px rgba(0, 0, 0, 0.5),
                      0 0 40px rgba(212, 175, 55, 0.1);
        }

        @media (max-width: 768px) {
          .coming-soon-card {
            padding: 48px 24px;
          }
        }
      `}</style>
    </main>
  )
}
