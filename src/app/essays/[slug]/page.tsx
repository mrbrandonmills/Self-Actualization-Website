'use client'

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { essays, getEssayBySlug } from '@/data/essays'

/**
 * Dynamic Essay Detail Page
 * Displays full essay content with liquid glass styling
 */

interface EssayPageProps {
  params: {
    slug: string
  }
}

export default function EssayPage({ params }: EssayPageProps) {
  const essay = getEssayBySlug(params.slug)

  // Handle 404 if essay doesn't exist
  if (!essay) {
    notFound()
  }

  // Category emoji mapping
  const categoryEmoji: Record<string, string> = {
    'Psychology': '🧠',
    'Neuroscience': '🔬',
    'Philosophy': '💭',
    'Communication': '💬',
    'Identity': '🎭'
  }

  return (
    <main className="min-h-screen bg-[var(--color-black-green)]">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container-lg mx-auto">
          <div
            initial={{ opacity: 0, y: 20 }}
            
            className="text-center mb-12"
          >
            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[rgba(212,175,55,0.15)] border border-[rgba(212,175,55,0.3)] rounded-full text-sm text-gold mb-6">
              <span>{categoryEmoji[essay.category] || '📄'}</span>
              <span>{essay.category}</span>
            </div>

            {/* Title */}
            <h1 className="h1 mb-6 text-center mx-auto max-w-4xl">
              {essay.title}
            </h1>

            {/* Subtitle */}
            {essay.subtitle && (
              <p className="text-xl md:text-2xl text-accent italic mb-8 max-w-3xl mx-auto text-center">
                {essay.subtitle}
              </p>
            )}

            {/* Metadata */}
            <div className="flex items-center justify-center gap-3 md:gap-4 text-sm md:text-base text-gray-400 flex-wrap mb-6">
              <span className="font-medium text-gold">{essay.author}</span>
              {essay.coAuthors && essay.coAuthors.length > 0 && (
                <>
                  <span>•</span>
                  <span>with {essay.coAuthors.join(', ')}</span>
                </>
              )}
              <span>•</span>
              <span>{essay.publishDate}</span>
              <span>•</span>
              <span>{essay.readingTime}</span>
              <span>•</span>
              <span>{essay.pageCount} pages</span>
            </div>

            {/* Institution */}
            {essay.institution && (
              <div className="text-sm text-accent mb-2 text-center">
                {essay.institution}
                {essay.course && ` • ${essay.course}`}
              </div>
            )}

            <div className="divider mx-auto mt-12" />
          </div>
        </div>
      </section>

      {/* Abstract Section - Liquid Glass Card */}
      <section className="section px-4 sm:px-6 lg:px-8">
        <div className="container-lg mx-auto">
          <div
            
            
            
            className="liquid-glass-card"
          >
            <h2 className="h3 mb-6 text-center md:text-left">Abstract</h2>
            <p className="text-lg leading-relaxed text-gray-300 text-center md:text-left">
              {essay.abstract}
            </p>
          </div>
        </div>
      </section>

      {/* Tags Section */}
      <section className="section px-4 sm:px-6 lg:px-8">
        <div className="container-lg mx-auto">
          <div
            
            
            
            className="liquid-glass-card"
          >
            <h3 className="h4 mb-6 text-center md:text-left">Research Topics</h3>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {essay.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 text-sm bg-[rgba(212,175,55,0.15)] border border-[rgba(212,175,55,0.3)] text-gold rounded-full hover:bg-[rgba(212,175,55,0.25)] transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="section gradient-dark px-4 sm:px-6 lg:px-8">
        <div className="container-lg mx-auto">
          <div
            
            
            
            className="liquid-glass-card text-center"
          >
            <div className="text-6xl mb-6">📚</div>
            <h2 className="h2 mb-6">Interested in This Research?</h2>
            <p className="text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              This essay is part of The Laboratory of Life series, where we explore the science and practice of self-actualization through rigorous research and lived experience.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center flex-wrap">
              {essay.pdfPath && (
                <Link
                  href={essay.pdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary w-full sm:w-auto"
                >
                  Download Full PDF
                </Link>
              )}
              <Link href="/essays" className="btn btn-outline w-full sm:w-auto">
                View All Essays
              </Link>
              <Link href="/books" className="btn btn-outline w-full sm:w-auto">
                Explore Books
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Essays Section */}
      <section className="section px-4 sm:px-6 lg:px-8">
        <div className="container-lg mx-auto">
          <h2 className="h2 mb-xl text-center">
            More <span className="text-gold">Research</span>
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            {essays
              .filter((e) => e.slug !== essay.slug)
              .slice(0, 2)
              .map((relatedEssay, index) => (
                <article
                  key={relatedEssay.id}
                  
                  
                  
                  className="related-essay-card liquid-glass-card"
                >
                  {/* Category Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[rgba(212,175,55,0.15)] border border-[rgba(212,175,55,0.3)] rounded-full text-xs text-gold mb-4">
                    <span>{categoryEmoji[relatedEssay.category] || '📄'}</span>
                    <span>{relatedEssay.category}</span>
                  </div>

                  <h3 className="h4 mb-3 text-center md:text-left">{relatedEssay.title}</h3>
                  {relatedEssay.subtitle && (
                    <p className="text-sm text-accent mb-4 italic text-center md:text-left">
                      {relatedEssay.subtitle}
                    </p>
                  )}

                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-4 flex-wrap justify-center md:justify-start">
                    <span>{relatedEssay.author}</span>
                    <span>•</span>
                    <span>{relatedEssay.readingTime}</span>
                    <span>•</span>
                    <span>{relatedEssay.pageCount} pages</span>
                  </div>

                  <p className="text-sm leading-relaxed mb-4 line-clamp-3 text-center md:text-left">
                    {relatedEssay.abstract}
                  </p>

                  <Link
                    href={`/essays/${relatedEssay.slug}`}
                    className="inline-flex items-center gap-2 text-gold hover:text-yellow-400 transition-colors text-sm font-medium group mx-auto md:mx-0"
                  >
                    <span>Read Essay</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </article>
              ))}
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
            circle at 50% 50%,
            rgba(212, 175, 55, 0.15) 0%,
            transparent 70%
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

        .related-essay-card {
          animation: float 6s ease-in-out infinite;
        }

        .related-essay-card:nth-child(2) {
          animation-delay: -3s;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .related-essay-card:hover {
          animation-play-state: paused;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Mobile Responsive Styles */
        @media (max-width: 768px) {
          .liquid-glass-card {
            padding: 24px 20px;
            border-radius: 16px;
          }

          .related-essay-card {
            animation: none;
            text-align: center;
          }

          .related-essay-card h3,
          .related-essay-card p,
          .related-essay-card .flex {
            text-align: center;
            justify-content: center;
          }

          .related-essay-card a {
            display: flex;
            justify-content: center;
            margin: 0 auto;
          }

          /* Button stacking on small screens */
          .btn {
            width: 100%;
            max-width: 100%;
            justify-content: center;
          }

          /* Ensure proper centering */
          h1, h2, h3, h4 {
            text-align: center;
          }

          .divider {
            margin-left: auto;
            margin-right: auto;
          }
        }

        @media (max-width: 480px) {
          .liquid-glass-card {
            padding: 20px 16px;
          }

          h1 {
            font-size: 1.75rem;
            line-height: 1.2;
          }

          .text-xl {
            font-size: 1rem;
          }

          .h2 {
            font-size: 1.5rem;
          }

          .h3 {
            font-size: 1.25rem;
          }

          .h4 {
            font-size: 1.1rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .related-essay-card {
            animation: none;
          }
        }
      `}</style>
    </main>
  )
}
