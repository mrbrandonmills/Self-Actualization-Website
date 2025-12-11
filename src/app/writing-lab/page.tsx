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
              The Writing Lab is where theory meets practice. We're preparing interactive experiences, writing exercises, and transformation tools that combine the science of self-actualization with practical transformation tools. Stay tuned!
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

      {/* Floating Essays Box - Pathway to Explore */}
      <section className="section px-4 sm:px-6 lg:px-8 pb-24">
        <div className="container-lg mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="h3 text-center mb-12"
            style={{ color: '#e8e4dc' }}
          >
            Explore the <span style={{ color: '#d4af37' }}>Research</span>
          </motion.h3>

          <Link href="/essays" className="essays-box-link">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="essays-box mx-auto"
            >
              <div className="essays-box-icon">📝</div>
              <div className="essays-box-content">
                <h3 className="essays-box-title">Academic Essays</h3>
                <p className="essays-box-subtitle">Deep dives into neuroscience, psychology, and the science of human transformation</p>
                <div className="essays-box-meta">
                  <span>5 Research Papers</span>
                  <span className="meta-separator">•</span>
                  <span>Brandon Mills</span>
                  <span className="meta-separator">•</span>
                  <span>San Diego City College</span>
                </div>
                <div className="essays-box-tags">
                  <span className="essay-tag">Neuroscience</span>
                  <span className="essay-tag">Psychology</span>
                  <span className="essay-tag">Quantum Mechanics</span>
                  <span className="essay-tag">Identity</span>
                </div>
                <div className="essays-box-cta">
                  <span>Explore Essays</span>
                  <span className="cta-arrow">→</span>
                </div>
              </div>
            </motion.div>
          </Link>
        </div>
      </section>

      <style jsx>{`
        .lab-card {
          background: linear-gradient(
            135deg,
            rgba(212, 175, 55, 0.1) 0%,
            rgba(212, 175, 55, 0.03) 50%,
            rgba(212, 175, 55, 0.1) 100%
          );
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          border: 1.5px solid rgba(212, 175, 55, 0.3);
          border-radius: 32px;
          padding: 80px 48px;
          box-shadow:
            0 20px 80px rgba(0, 0, 0, 0.5),
            0 0 0 1px rgba(212, 175, 55, 0.15) inset,
            0 40px 100px rgba(212, 175, 55, 0.15);
          max-width: 900px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
          overflow: hidden;
          transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .lab-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at 50% 0%,
            rgba(212, 175, 55, 0.2) 0%,
            transparent 50%
          );
          opacity: 0.5;
          pointer-events: none;
        }

        .lab-card:hover {
          transform: translateY(-8px) scale(1.01);
          border-color: rgba(212, 175, 55, 0.5);
          box-shadow:
            0 30px 100px rgba(0, 0, 0, 0.6),
            0 0 0 1px rgba(212, 175, 55, 0.25) inset,
            0 60px 120px rgba(212, 175, 55, 0.25);
        }

        .lab-card:hover::before {
          opacity: 1;
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

        /* FLOATING 3D ESSAYS BOX */
        .essays-box-link {
          display: block;
          text-decoration: none;
        }

        .essays-box {
          background: rgba(245, 239, 230, 0.12);
          backdrop-filter: blur(60px) saturate(200%);
          -webkit-backdrop-filter: blur(60px) saturate(200%);
          border: 2px solid rgba(168, 85, 247, 0.5);
          border-radius: 24px;
          padding: 48px;
          max-width: 700px;
          position: relative;
          transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
          box-shadow:
            0 30px 80px -15px rgba(0, 0, 0, 0.7),
            0 0 0 3px rgba(168, 85, 247, 0.3),
            inset 0 2px 0 0 rgba(255, 255, 255, 0.2),
            0 60px 140px -25px rgba(168, 85, 247, 0.6),
            0 0 200px rgba(168, 85, 247, 0.3);
          display: flex;
          align-items: flex-start;
          gap: 24px;
          cursor: pointer;
        }

        .essays-box::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(168,85,247,0.15) 0%, transparent 50%);
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: 0;
          pointer-events: none;
          border-radius: 24px;
        }

        .essays-box:hover {
          transform: translateY(-16px) scale(1.02);
          border-color: rgba(168, 85, 247, 0.7);
          background: rgba(245, 239, 230, 0.18);
          box-shadow:
            0 40px 100px -15px rgba(0, 0, 0, 0.8),
            0 0 0 4px rgba(168, 85, 247, 0.5),
            inset 0 3px 0 0 rgba(255, 255, 255, 0.3),
            0 80px 180px -25px rgba(168, 85, 247, 0.8),
            0 0 250px rgba(168, 85, 247, 0.5);
        }

        .essays-box:hover::before {
          opacity: 1;
        }

        .essays-box-icon {
          font-size: 64px;
          flex-shrink: 0;
          position: relative;
          z-index: 1;
        }

        .essays-box-content {
          flex: 1;
          position: relative;
          z-index: 1;
        }

        .essays-box-title {
          font-size: 28px;
          font-weight: 700;
          color: #e8e4dc;
          margin-bottom: 8px;
        }

        .essays-box-subtitle {
          font-size: 16px;
          color: #c5d2b7;
          line-height: 1.6;
          margin-bottom: 16px;
        }

        .essays-box-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          font-size: 14px;
          color: rgba(197, 210, 183, 0.8);
          margin-bottom: 20px;
        }

        .meta-separator {
          color: rgba(168, 85, 247, 0.5);
        }

        .essays-box-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 24px;
        }

        .essay-tag {
          padding: 6px 14px;
          background: rgba(168, 85, 247, 0.15);
          border: 1px solid rgba(168, 85, 247, 0.3);
          border-radius: 16px;
          font-size: 12px;
          font-weight: 500;
          color: #c4b5fd;
        }

        .essays-box-cta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 16px;
          font-weight: 600;
          color: #d4af37;
          transition: all 0.3s ease;
        }

        .cta-arrow {
          font-size: 20px;
          transition: transform 0.3s ease;
        }

        .essays-box:hover .cta-arrow {
          transform: translateX(8px);
        }

        @media (max-width: 768px) {
          .lab-card {
            padding: 48px 24px;
            border-radius: 16px;
          }

          .essays-box {
            flex-direction: column;
            text-align: center;
            align-items: center;
            padding: 32px 24px;
            /* Mobile performance optimizations */
            backdrop-filter: blur(20px) saturate(150%);
            -webkit-backdrop-filter: blur(20px) saturate(150%);
          }

          .essays-box-icon {
            font-size: 48px;
          }

          .essays-box-title {
            font-size: 22px;
          }

          .essays-box-meta {
            justify-content: center;
          }

          .essays-box-tags {
            justify-content: center;
          }

          .essays-box-cta {
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .lab-card {
            padding: 32px 16px;
          }

          .lab-card .text-8xl {
            font-size: 4rem;
          }

          .essays-box {
            padding: 24px 20px;
          }

          .essays-box-title {
            font-size: 20px;
          }

          .essays-box-subtitle {
            font-size: 14px;
          }

          .essay-tag {
            font-size: 11px;
            padding: 4px 10px;
          }
        }
      `}</style>
    </main>
  )
}
