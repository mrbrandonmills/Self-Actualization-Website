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
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container-xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="label text-accent mb-md text-center mx-auto"
            style={{ color: '#d4af37' }}
          >
            The Writing Lab
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="h1 mb-lg text-center mx-auto"
            style={{ color: '#e8e4dc' }}
          >
            Your Life is the
            <br />
            <span style={{ color: '#d4af37', fontWeight: 700 }}>Laboratory</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lead max-w-2xl mx-auto mb-xl text-center"
            style={{ color: '#c5d2b7' }}
          >
            Where the science of self-actualization meets the art of transformation.
          </motion.p>

          <div className="divider mx-auto" />
        </div>
      </section>

      {/* Coming Soon */}
      <section className="section px-4 sm:px-6 lg:px-8">
        <div className="container-lg mx-auto text-center">
          <div className="lab-card mx-auto">
            <div className="text-8xl mb-6 text-center">🔬</div>
            <h2 className="h2 mb-lg text-center mx-auto" style={{ color: '#e8e4dc' }}>
              Experiments in <span style={{ color: '#d4af37', fontWeight: 700 }}>Progress</span>
            </h2>
            <p className="lead mb-xl max-w-2xl mx-auto text-center" style={{ color: '#c5d2b7' }}>
              The Writing Lab is where theory meets practice. We're preparing interactive experiences, writing exercises, and transformation tools. Coming soon!
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
        .lab-card {
          background: rgba(212, 175, 55, 0.05);
          border: 2px solid rgba(212, 175, 55, 0.3);
          border-radius: 24px;
          padding: 80px 48px;
          box-shadow: 0 20px 80px rgba(0, 0, 0, 0.5),
                      0 0 40px rgba(212, 175, 55, 0.1);
          max-width: 900px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .lab-card h2 {
          text-align: center;
          margin-left: auto;
          margin-right: auto;
        }

        .lab-card p {
          text-align: center;
        }

        .lab-card .flex {
          width: 100%;
          justify-content: center;
        }

        @media (max-width: 768px) {
          .lab-card {
            padding: 48px 24px;
            border-radius: 16px;
          }
        }

        @media (max-width: 480px) {
          .lab-card {
            padding: 32px 16px;
          }

          .lab-card .text-8xl {
            font-size: 4rem;
          }
        }
      `}</style>
    </main>
  )
}
