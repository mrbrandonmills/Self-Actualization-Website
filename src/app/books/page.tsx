'use client'

import { books, createAffiliateLink, formatBookPrice, AMAZON_ASSOCIATES_ID } from '@/data/books'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'

/**
 * Books Catalog Page - Clean & Simple
 * All books link directly to Amazon
 */
export default function BooksPage() {
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
            Premium Collection
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="h1 mb-lg text-center"
            style={{ textAlign: 'center' }}
          >
            Random Acts of
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
            Transform your reality with the complete Laboratory of Life series by Jesse Doherty & Brandon Mills.
          </motion.p>

          <div className="divider" />
        </div>
      </section>

      {/* Books Grid */}
      <section className="section">
        <div className="container-xl">
          <div className="books-grid">
            {books.map((book, index) => (
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
                  <h2 className="h3 mb-sm">{book.title}</h2>
                  <p className="text-accent mb-md">{book.subtitle}</p>
                  <p className="text-sm mb-lg line-clamp-3">{book.description.split('\n\n')[0]}</p>

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
      <section className="section gradient-dark text-center">
        <div className="container-lg">
          <h2 className="h2 mb-lg">
            Ready to Begin Your Journey?
          </h2>
          <p className="lead mb-xl max-w-2xl mx-auto">
            Each book is a carefully curated pathway to transformation and self-discovery.
          </p>
          <Link href="/" className="btn btn-primary">
            Return Home
          </Link>
        </div>
      </section>

      <style jsx>{`
        .books-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 48px;
          margin-bottom: 64px;
        }

        .book-card {
          background: rgba(212, 175, 55, 0.05);
          border: 1px solid rgba(212, 175, 55, 0.2);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .book-card:hover {
          transform: translateY(-8px);
          border-color: rgba(212, 175, 55, 0.4);
          box-shadow: 0 20px 60px rgba(212, 175, 55, 0.15);
        }

        .book-cover {
          position: relative;
          width: 100%;
          aspect-ratio: 2/3;
          overflow: hidden;
          background: linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(212,175,55,0.1) 100%);
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
          color: var(--color-gold);
          text-decoration: none;
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .format-btn:hover {
          background: rgba(212, 175, 55, 0.2);
          border-color: var(--color-gold);
          transform: translateX(4px);
        }

        .format-type {
          font-size: 16px;
          color: var(--color-text);
        }

        .format-price {
          font-size: 18px;
          font-weight: 600;
          color: var(--color-gold);
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .books-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }

          .book-info {
            padding: 24px;
          }
        }
      `}</style>
    </main>
  )
}
