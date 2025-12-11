'use client'

import { books, createAffiliateLink, formatBookPrice } from '@/data/books'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'
import styles from './books.module.css'

/**
 * Books Catalog Page - Floating Liquid Glass Design
 * Uses CSS Modules for the beautiful glass effect
 */
export default function BooksPage() {
  return (
    <main className="min-h-screen bg-[var(--color-black-green)]">
      {/* Hero Section */}
      <section className={`${styles.heroSection} pt-32 pb-16 px-4 sm:px-6 lg:px-8`}>
        <div className="container-xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`label text-accent mb-md ${styles.heroLabel} mx-auto text-center`}
            style={{ color: '#d4af37' }}
          >
            Premium Collection
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`h1 mb-lg text-center ${styles.heroTitle} mx-auto`}
            style={{ color: '#e8e4dc' }}
          >
            Random Acts of
            <br />
            <span className="text-gold" style={{ color: '#d4af37' }}>Self-Actualization</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`lead max-w-2xl mx-auto mb-xl text-center ${styles.heroDescription}`}
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
          <div className={styles.booksGrid}>
            {books.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={styles.bookCard}
              >
                {/* Book Cover */}
                <div className={styles.bookCover}>
                  <Image
                    src={book.coverImage}
                    alt={`${book.title} - ${book.subtitle}`}
                    width={400}
                    height={600}
                    className="w-full h-auto"
                  />
                </div>

                {/* Book Info */}
                <div className={styles.bookInfo}>
                  <h2 className="h3 mb-sm" style={{ color: '#e8e4dc' }}>{book.title}</h2>
                  <p className="text-accent mb-md" style={{ color: '#d4af37' }}>{book.subtitle}</p>
                  <p className={`text-sm mb-lg ${styles.lineClamp3}`} style={{ color: '#c5d2b7' }}>{book.description.split('\n\n')[0]}</p>

                  {/* Format Options */}
                  <div className={styles.formatButtons}>
                    {book.formats.map((format) => {
                      const amazonLink = createAffiliateLink(format.amazonUrl)
                      return (
                        <motion.a
                          key={format.type}
                          href={amazonLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.formatBtn}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span className={styles.formatType} style={{ color: '#c5d2b7' }}>{format.type}</span>
                          <span className={styles.formatPrice} style={{ color: '#d4af37' }}>{formatBookPrice(format.price)}</span>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2">
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
      <section className={`section gradient-dark text-center px-4 sm:px-6 lg:px-8 ${styles.gradientDark}`}>
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
    </main>
  )
}
