'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

/**
 * About Page - Meet the Alchemists
 * Liquid Glass Theme with floating cards
 */

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--color-black-green)]">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container-xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="label text-accent mb-md mx-auto text-center"
            style={{ color: '#d4af37' }}
          >
            The Alchemists
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="h1 mb-lg text-center mx-auto"
            style={{ color: '#e8e4dc' }}
          >
            About
            <br />
            <span style={{ color: '#d4af37', fontWeight: 700 }}>The Laboratory of Life</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lead max-w-2xl mx-auto mb-xl text-center"
            style={{ color: '#c5d2b7' }}
          >
            Where science meets soul. Where research becomes reality. Where transformation is not just studied—it's lived.
          </motion.p>

          <div className="divider mx-auto" />
        </div>
      </section>

      {/* Mission Statement - Liquid Glass */}
      <section className="section px-4 sm:px-6 lg:px-8">
        <div className="container-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="liquid-glass-card mx-auto"
          >
            <div className="text-8xl mb-6 text-center">⚗️</div>
            <h2 className="h2 mb-lg text-center mx-auto" style={{ color: '#e8e4dc' }}>
              The <span style={{ color: '#d4af37', fontWeight: 700 }}>Laboratory</span> Philosophy
            </h2>
            <p className="text-lg leading-relaxed mb-6 text-center" style={{ color: '#c5d2b7' }}>
              Self-actualization isn't a destination—it's an ongoing experiment in conscious living. The Laboratory of Life was born from a simple conviction: that the most profound transformation happens when we treat our lives as living laboratories, where every experience becomes data, every challenge becomes research, and every insight becomes actionable wisdom.
            </p>
            <p className="text-lg leading-relaxed text-center" style={{ color: '#c5d2b7' }}>
              We bridge the gap between academic rigor and practical application, between cutting-edge neuroscience and ancient wisdom, between theory and lived experience. This is where psychology meets philosophy, where quantum mechanics meets consciousness, where research papers transform into real-world results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Section - Floating Liquid Glass Cards */}
      <section className="section px-4 sm:px-6 lg:px-8">
        <div className="container-lg mx-auto">
          <h2 className="h2 mb-xl text-center mx-auto" style={{ color: '#e8e4dc' }}>
            Meet the <span style={{ color: '#d4af37', fontWeight: 700 }}>Alchemists</span>
          </h2>

          <div className="team-grid">
            {/* Brandon Mills */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="team-card liquid-glass-card"
            >
              <div className="flex items-start gap-6 mb-6">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center text-5xl flex-shrink-0">
                  🧪
                </div>
                <div className="flex-1">
                  <h3 className="h3 mb-3">Brandon Mills</h3>
                  <p className="text-accent text-lg mb-4">Lead Researcher & Author</p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="https://www.instagram.com/MRBRANDONMILLS/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                    >
                      <span>Instagram</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </a>
                    <a
                      href="https://medium.com/@MrBrandonMills"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                    >
                      <span>Medium</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </a>
                    <a
                      href="https://www.brandonmills.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                    >
                      <span>Website</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </a>
                    <a
                      href="https://www.pinterest.com/07rf3bhvd5xvl2i5hazape6lg461mc/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                    >
                      <span>Pinterest</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <p className="text-lg leading-relaxed mb-6">
                Brandon Mills is a researcher, writer, and transformation specialist whose work bridges neuroscience, psychology, and quantum mechanics. His research spans consciousness studies, identity formation, and the neurological basis of self-actualization. A student at San Diego City College, Brandon's academic papers have explored topics from quantum-coherent brain states to the psychology of fundamentalism, from archetypal identity models to the neuroscience of codependency.
              </p>

              <div className="bg-[rgba(212,175,55,0.1)] border border-[rgba(212,175,55,0.3)] rounded-lg p-6">
                <p className="text-sm text-accent mb-2 uppercase tracking-wide">Research Focus</p>
                <div className="flex flex-wrap gap-2">
                  {['Neuroscience', 'Quantum Consciousness', 'Identity & Archetypes', 'Self-Actualization', 'Psychology'].map((tag) => (
                    <span key={tag} className="px-3 py-1 text-xs bg-[rgba(212,175,55,0.15)] text-gold rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Jesse Doherty */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="team-card liquid-glass-card"
            >
              <div className="flex items-start gap-6 mb-6">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center text-5xl flex-shrink-0">
                  🔬
                </div>
                <div className="flex-1">
                  <h3 className="h3 mb-3">Jesse Doherty</h3>
                  <p className="text-accent text-lg mb-4">Collaborator & Co-Creator</p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="https://www.instagram.com/JESSEADOHERTY/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                    >
                      <span>Instagram</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              <p className="text-lg leading-relaxed mb-6">
                Jesse Doherty brings a unique perspective to the Laboratory of Life, combining practical wisdom with transformational insight. As a key collaborator, Jesse helps translate complex research into accessible, actionable guidance that empowers individuals on their self-actualization journey.
              </p>

              <div className="bg-[rgba(212,175,55,0.1)] border border-[rgba(212,175,55,0.3)] rounded-lg p-6">
                <p className="text-sm text-accent mb-2 uppercase tracking-wide">Expertise</p>
                <div className="flex flex-wrap gap-2">
                  {['Transformation', 'Personal Development', 'Practical Wisdom', 'Integration'].map((tag) => (
                    <span key={tag} className="px-3 py-1 text-xs bg-[rgba(212,175,55,0.15)] text-gold rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Approach - Liquid Glass */}
      <section className="section gradient-dark px-4 sm:px-6 lg:px-8">
        <div className="container-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="liquid-glass-card mx-auto"
          >
            <h2 className="h2 mb-lg text-center mx-auto">
              Our <span className="text-gold">Approach</span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="h4 mb-4 text-gold">Research-Backed</h3>
                <p className="text-base leading-relaxed">
                  Every concept is grounded in peer-reviewed research, academic rigor, and cutting-edge science from neuroscience to quantum mechanics.
                </p>
              </div>

              <div className="text-center">
                <div className="text-6xl mb-4">🧬</div>
                <h3 className="h4 mb-4 text-gold">Experientially Tested</h3>
                <p className="text-base leading-relaxed">
                  We don't just study transformation—we live it. Every teaching is battle-tested through years of personal experimentation and real-world application.
                </p>
              </div>

              <div className="text-center">
                <div className="text-6xl mb-4">⚡</div>
                <h3 className="h4 mb-4 text-gold">Practically Applied</h3>
                <p className="text-base leading-relaxed">
                  Theory without practice is philosophy. We bridge the gap between insight and action, research and results, understanding and embodiment.
                </p>
              </div>

              <div className="text-center">
                <div className="text-6xl mb-4">📊</div>
                <h3 className="h4 mb-4 text-gold">Measurably Effective</h3>
                <p className="text-base leading-relaxed">
                  Real transformation is quantifiable. We track outcomes through data-driven metrics, demonstrating how scientific self-actualization creates measurable, lasting change in your life.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section text-center px-4 sm:px-6 lg:px-8">
        <div className="container-lg mx-auto">
          <h2 className="h2 mb-lg mx-auto text-center">
            Ready to Join the <span className="text-gold">Laboratory?</span>
          </h2>
          <p className="lead mb-xl max-w-2xl mx-auto text-center">
            Explore our research, books, and courses. Transform your life through the scientific art of self-actualization.
          </p>
          <div className="flex gap-4 justify-center flex-wrap mx-auto">
            <Link href="/essays" className="btn btn-primary">
              Read Research
            </Link>
            <Link href="/books" className="btn btn-outline">
              View Books
            </Link>
            <Link href="/courses" className="btn btn-outline">
              Explore Courses
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        .liquid-glass-card {
          background: linear-gradient(
            135deg,
            rgba(212, 175, 55, 0.08) 0%,
            rgba(212, 175, 55, 0.03) 50%,
            rgba(212, 175, 55, 0.08) 100%
          );
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(212, 175, 55, 0.2);
          border-radius: 24px;
          padding: 48px;
          box-shadow:
            0 8px 32px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(212, 175, 55, 0.1) inset,
            0 20px 60px rgba(212, 175, 55, 0.05);
          transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
          position: relative;
          overflow: hidden;
        }

        .liquid-glass-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            rgba(212, 175, 55, 0.15) 0%,
            transparent 50%
          );
          opacity: 0;
          transition: opacity 0.6s ease;
        }

        .liquid-glass-card:hover {
          transform: translateY(-4px);
          border-color: rgba(212, 175, 55, 0.4);
          box-shadow:
            0 16px 64px rgba(0, 0, 0, 0.4),
            0 0 0 1px rgba(212, 175, 55, 0.2) inset,
            0 32px 80px rgba(212, 175, 55, 0.15);
        }

        .liquid-glass-card:hover::before {
          opacity: 1;
        }

        .team-grid {
          display: grid;
          gap: 32px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .team-card {
          animation: float 6s ease-in-out infinite;
        }

        .team-card:nth-child(2) {
          animation-delay: -3s;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .social-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          background: rgba(212, 175, 55, 0.1);
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-radius: 20px;
          color: var(--color-gold);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .social-link:hover {
          background: rgba(212, 175, 55, 0.2);
          border-color: var(--color-gold);
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          /* Hero text centering */
          .h1, .lead {
            text-align: center !important;
          }

          /* Liquid glass cards - better mobile padding */
          .liquid-glass-card {
            padding: 24px 20px;
            border-radius: 16px;
          }

          /* Team grid - stack vertically */
          .team-grid {
            display: flex;
            flex-direction: column;
            gap: 24px;
          }

          /* Team card layout - center everything */
          .team-card {
            text-align: center;
            animation: none; /* Disable floating on mobile for better performance */
          }

          /* Avatar and bio section - stack vertically and center */
          .team-card .flex {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            gap: 16px !important;
          }

          /* Avatar sizing on mobile */
          .team-card .flex > div:first-child {
            width: 96px !important;
            height: 96px !important;
            font-size: 3rem !important;
          }

          /* Team member info - center alignment */
          .team-card .flex .flex-1 {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          /* Headings center alignment */
          .team-card .h3 {
            text-align: center;
          }

          /* Social links - center and wrap properly */
          .team-card .flex-wrap {
            justify-content: center !important;
          }

          .social-link {
            font-size: 13px;
            padding: 6px 12px;
          }

          /* Research focus and expertise boxes */
          .team-card .bg-\[rgba\(212\,175\,55\,0\.1\)\] {
            padding: 16px;
            text-align: center;
          }

          /* Bio text alignment */
          .team-card p {
            text-align: center;
          }

          /* Approach section grid - stack on mobile */
          .grid.md\:grid-cols-3 {
            grid-template-columns: 1fr;
            gap: 32px;
          }

          /* CTA buttons - better mobile layout */
          .flex.gap-4.justify-center {
            flex-direction: column;
            align-items: center;
          }

          .flex.gap-4.justify-center .btn {
            width: 100%;
            max-width: 280px;
          }
        }
      `}</style>
    </main>
  )
}
