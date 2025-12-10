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
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container-xl text-center mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="label text-accent mb-md text-center mx-auto"
            style={{ color: '#d4af37' }}
          >
            The Laboratory Blog
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="h1 mb-lg text-center mx-auto"
            style={{ color: '#e8e4dc' }}
          >
            Updates from
            <br />
            <span style={{ color: '#d4af37', fontWeight: 700 }}>The Laboratory</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lead max-w-2xl mx-auto mb-xl text-center"
            style={{ color: '#c5d2b7' }}
          >
            Insights, experiments, and discoveries from our journey of self-actualization.
          </motion.p>

          <div className="divider mx-auto" />
        </div>
      </section>

      {/* Coming Soon */}
      <section className="section px-4 sm:px-6 lg:px-8">
        <div className="container-lg text-center mx-auto">
          <div className="coming-soon-card mx-auto">
            <div className="text-8xl mb-6 text-center">⚗️</div>
            <h2 className="h2 mb-lg text-center mx-auto" style={{ color: '#e8e4dc' }}>
              New Content <span style={{ color: '#d4af37', fontWeight: 700 }}>Brewing</span>
            </h2>
            <p className="lead mb-xl max-w-2xl mx-auto text-center" style={{ color: '#c5d2b7' }}>
              We're crafting thoughtful content about self-actualization, personal growth, and the science of transformation. Check back soon!
            </p>
            <div className="flex gap-md justify-center flex-wrap mx-auto">
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
          max-width: 800px;
          margin: 0 auto;
        }

        @media (max-width: 1200px) {
          .coming-soon-card {
            max-width: 700px;
          }
        }

        @media (max-width: 768px) {
          .coming-soon-card {
            padding: 48px 24px;
            border-radius: 16px;
            max-width: 100%;
            margin: 0 auto;
          }

          .coming-soon-card .text-8xl {
            font-size: 4rem;
          }

          .coming-soon-card .h2 {
            text-align: center;
          }

          .coming-soon-card p {
            text-align: center;
          }

          .coming-soon-card .flex {
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .coming-soon-card {
            padding: 32px 16px;
            border-radius: 16px;
          }

          .coming-soon-card .text-8xl {
            font-size: 3rem;
            margin-bottom: 16px;
          }

          .coming-soon-card .btn {
            width: 100%;
            max-width: 240px;
          }
        }
      `}</style>
    </main>
  )
}
