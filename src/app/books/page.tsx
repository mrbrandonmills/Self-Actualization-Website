'use client'

import { books, createAffiliateLink, formatBookPrice, AMAZON_ASSOCIATES_ID } from '@/data/books'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'

/**
 * Books Catalog Page - Clean & Simple
 * All books link directly to Amazon
 * Mobile order: Trilogy, Block C, Block B, Block A
 */
export default function BooksPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Mobile: Trilogy first, then C, B, A (reverse order)
  // Desktop: Original order (A, B, C, Trilogy)
  const orderedBooks = isMobile ? [...books].reverse() : books;

  return (
    <main className="min-h-screen bg-[var(--color-black-green)]">
      {/* Hero Section */}
      <section className="hero-section pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container-xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="label text-accent mb-md hero-label mx-auto text-center"
            style={{ color: '#d4af37' }}
          >
            Premium Collection
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="h1 mb-lg text-center hero-title mx-auto"
            style={{ color: '#e8e4dc' }}
          >
            Random Acts of
            <br />
            <span style={{ color: '#d4af37', fontWeight: 700 }}>Self-Actualization</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lead max-w-2xl mx-auto mb-xl text-center hero-description"
            style={{ color: '#c5d2b7' }}
          >
            Transform your reality with the complete Laboratory of Life series by Jesse Doherty & Brandon Mills.
          </motion.p>

          <div className="divider mx-auto" />
        </div>
      </section>

      {/* Books Grid */}
      <section className="section px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1600px] mx-auto">
          <div className="books-grid">
            {orderedBooks.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="book-card"
              >
                {/* Book Cover */}
                <div className="book-cover">
                  <Image
                    src={book.coverImage}
                    alt={`${book.title} - ${book.subtitle}`}
                    width={400}
                    height={600}
                    className="w-full h-auto"
                  />
                </div>

                {/* Book Info */}
                <div className="book-info">
                  <h2 className="h3 mb-sm" style={{ color: '#e8e4dc' }}>{book.title}</h2>
                  <p className="text-accent mb-md">{book.subtitle}</p>
                  <p className="text-sm mb-lg line-clamp-3" style={{ color: '#c5d2b7' }}>{book.description.split('\n\n')[0]}</p>

                  {/* Format Options */}
                  <div className="format-buttons">
                    {book.formats.map((format) => {
                      const amazonLink = createAffiliateLink(format.amazonUrl)
                      return (
                        <motion.a
                          key={format.type}
                          href={amazonLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="format-btn"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span className="format-type">{format.type}</span>
                          <span className="format-price">{formatBookPrice(format.price)}</span>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                          </svg>
                        </motion.a>
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section gradient-dark text-center px-4 sm:px-6 lg:px-8">
        <div className="container-lg mx-auto">
          <h2 className="h2 mb-lg mx-auto text-center" style={{ color: '#e8e4dc' }}>
            Ready to Begin Your Journey?
          </h2>
          <p className="lead mb-xl max-w-2xl mx-auto text-center" style={{ color: '#c5d2b7' }}>
            Each book is a carefully curated pathway to transformation and self-discovery.
          </p>
          <Link href="/" className="btn btn-primary mx-auto">
            Return Home
          </Link>
        </div>
      </section>

      <style jsx>{`
        /* Hero Section */
        .hero-section {
          padding-top: 128px;
          padding-bottom: 64px;
        }

        .hero-label,
        .hero-title,
        .hero-description {
          text-align: center;
        }

        .hero-label {
          color: #d4af37 !important;
        }

        .hero-title,
        .hero-title.h1,
        h1.hero-title {
          color: #e8e4dc !important;
        }

        .hero-title :global(.text-gold),
        .hero-title :global(span.text-gold) {
          color: #d4af37 !important;
        }

        .hero-description,
        .hero-description.lead,
        p.hero-description {
          color: #c5d2b7 !important;
        }

        /* Books Grid */
        .books-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
          margin-bottom: 64px;
          margin-left: auto;
          margin-right: auto;
          width: 100%;
          padding: 0 20px;
        }

        .book-card {
          background: rgba(10, 47, 46, 0.6);
          backdrop-filter: blur(40px) saturate(180%);
          -webkit-backdrop-filter: blur(40px) saturate(180%);
          border: 1.5px solid rgba(212, 175, 55, 0.3);
          border-radius: 24px;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
          box-shadow:
            0 20px 50px -12px rgba(0, 0, 0, 0.5),
            0 0 0 1.5px rgba(212, 175, 55, 0.18),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.1),
            0 50px 100px -20px rgba(212, 175, 55, 0.3);
          position: relative;
        }

        .book-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at 50% 0%,
            rgba(212, 175, 55, 0.2) 0%,
            transparent 50%
          );
          opacity: 0;
          transition: opacity 0.6s ease;
          pointer-events: none;
          z-index: 1;
        }

        .book-card:hover {
          transform: translateY(-12px);
          border-color: rgba(212, 175, 55, 0.5);
          box-shadow:
            0 30px 70px -12px rgba(0, 0, 0, 0.6),
            0 0 0 2px rgba(212, 175, 55, 0.3),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.15),
            0 60px 120px -20px rgba(212, 175, 55, 0.5),
            0 0 150px rgba(212, 175, 55, 0.3);
        }

        .book-card:hover::before {
          opacity: 1;
        }

        .book-cover {
          position: relative;
          width: 100%;
          aspect-ratio: 2/3;
          overflow: hidden;
          background: #ffffff;
        }

        .book-cover :global(img) {
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .book-card:hover .book-cover :global(img) {
          transform: scale(1.05);
        }

        .book-info {
          padding: 32px;
        }

        .book-info h2 {
          color: #c5d2b7;
        }

        .book-info .text-accent {
          color: #d4af37;
        }

        .book-info .text-sm {
          color: #a3b18a;
        }

        .format-buttons {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .format-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 24px;
          background: rgba(212, 175, 55, 0.1);
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-radius: 12px;
          color: #d4af37;
          text-decoration: none;
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .format-btn:hover {
          background: rgba(212, 175, 55, 0.2);
          border-color: #d4af37;
          transform: translateX(4px);
        }

        .format-type {
          font-size: 16px;
          color: #c5d2b7;
        }

        .format-price {
          font-size: 18px;
          font-weight: 600;
          color: #d4af37;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Tablet Breakpoint */
        @media (max-width: 1024px) {
          .books-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 32px;
          }
        }

        /* Mobile Breakpoint */
        @media (max-width: 768px) {
          /* Hero Section Mobile */
          .hero-section {
            padding-top: 96px;
            padding-bottom: 48px;
            padding-left: 20px;
            padding-right: 20px;
          }

          .hero-label {
            text-align: center;
            margin-left: auto;
            margin-right: auto;
          }

          .hero-title {
            text-align: center;
            margin-left: auto;
            margin-right: auto;
            padding-left: 16px;
            padding-right: 16px;
          }

          .hero-description {
            text-align: center;
            margin-left: auto;
            margin-right: auto;
            padding-left: 16px;
            padding-right: 16px;
            max-width: 100%;
          }

          /* Books Grid Mobile */
          .books-grid {
            grid-template-columns: 1fr;
            gap: 24px;
            padding-left: 16px;
            padding-right: 16px;
            margin: 0 auto;
          }

          /* Book Card - Center Everything */
          .book-card {
            text-align: center;
            margin: 0 auto;
            max-width: 100%;
          }

          .book-card:hover {
            transform: translateY(-4px);
          }

          /* Book Info - Better Mobile Padding */
          .book-info {
            padding: 24px 20px;
          }

          /* Center All Text Content */
          .book-info h2 {
            text-align: center;
          }

          .book-info p {
            text-align: center;
          }

          /* Format Buttons - Center Alignment */
          .format-buttons {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
          }

          .format-btn {
            width: 100%;
            max-width: 320px;
            margin: 0 auto;
          }

          /* CTA Section Mobile */
          .gradient-dark .container-lg {
            padding-left: 20px;
            padding-right: 20px;
          }

          .gradient-dark h2 {
            text-align: center;
            padding-left: 16px;
            padding-right: 16px;
          }

          .gradient-dark p {
            text-align: center;
            padding-left: 16px;
            padding-right: 16px;
          }
        }

        /* Extra Small Mobile Breakpoint */
        @media (max-width: 480px) {
          /* Hero Section Extra Small */
          .hero-section {
            padding-top: 80px;
            padding-bottom: 32px;
          }

          .hero-title {
            font-size: 2rem;
            line-height: 1.2;
          }

          /* Books Grid Extra Small */
          .books-grid {
            gap: 20px;
            padding-left: 12px;
            padding-right: 12px;
          }

          .book-card {
            border-radius: 12px;
          }

          .book-info {
            padding: 20px 16px;
          }

          .format-btn {
            padding: 14px 20px;
            font-size: 14px;
          }

          .format-type {
            font-size: 14px;
          }

          .format-price {
            font-size: 16px;
          }
        }
      `}</style>
    </main>
  )
}
