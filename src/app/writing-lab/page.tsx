'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

/**
 * Writing Lab Page - Where transformation meets practice
 */

export default function WritingLabPage() {
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
            The Writing Lab
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="h1 mb-lg text-center"
            style={{ textAlign: 'center' }}
          >
            Your Life is the
            <br />
            <span className="text-gold">Laboratory</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lead max-w-2xl mx-auto mb-xl text-center"
            style={{ textAlign: 'center' }}
          >
            Where the science of self-actualization meets the art of transformation.
          </motion.p>

          <div className="divider" />
        </div>
      </section>

      {/* Coming Soon */}
      <section className="section">
        <div className="container-lg text-center">
          <div className="lab-card">
            <div className="text-8xl mb-6">🔬</div>
            <h2 className="h2 mb-lg">
              Experiments in <span className="text-gold">Progress</span>
            </h2>
            <p className="lead mb-xl max-w-2xl mx-auto">
              The Writing Lab is where theory meets practice. We're preparing interactive experiences, writing exercises, and transformation tools. Coming soon!
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
        .lab-card {
          background: rgba(212, 175, 55, 0.05);
          border: 2px solid rgba(212, 175, 55, 0.3);
          border-radius: 24px;
          padding: 80px 48px;
          box-shadow: 0 20px 80px rgba(0, 0, 0, 0.5),
                      0 0 40px rgba(212, 175, 55, 0.1);
        }

        @media (max-width: 768px) {
          .lab-card {
            padding: 48px 24px;
          }
        }
      `}</style>
    </main>
  )
}
