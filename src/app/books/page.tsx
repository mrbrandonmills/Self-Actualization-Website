'use client'

import { motion } from 'framer-motion'
import { BookCard } from '@/components/books/book-card'
import { books, Book } from '@/data/books'
import { useState } from 'react'

type CategoryFilter = 'All' | Book['category']

const categories: CategoryFilter[] = ['All', 'Philosophy', 'Psychology', 'Practice']

/**
 * Books Catalog Page
 * Bento-style masonry grid with luxury filtering and animations
 */
export default function BooksPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All')

  // Filter books by selected category
  const filteredBooks = activeCategory === 'All'
    ? books
    : books.filter(book => book.category === activeCategory)

  return (
    <main className="min-h-screen pt-24 pb-16" style={{ background: '#F5EFE6', color: '#3A3A3A' }}>
      {/* Page header */}
      <section className="px-4 sm:px-6 lg:px-16 mb-12 md:mb-16">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Page title */}
          <motion.h1
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ color: '#3A3A3A' }}
          >
            Premium{' '}
            <span className="inline-block bg-gradient-to-r from-[#B8D4C8] via-[#9EC5AB] to-[#B8D4C8] bg-clip-text text-transparent">
              Books
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl mb-8 max-w-2xl mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ color: '#6B7A7A' }}
          >
            Transformative literature for self-actualization
          </motion.p>

          {/* Pastel divider */}
          <motion.div
            className="w-24 h-px mx-auto mb-12"
            style={{ background: 'linear-gradient(to right, transparent, #B8D4C8, transparent)' }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Category filters */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-3 md:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {categories.map((category, index) => {
              const isActive = activeCategory === category

              return (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className="px-6 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-400 relative overflow-hidden"
                  style={isActive ? {
                    background: '#B8D4C8',
                    color: '#3A3A3A',
                    border: '2px solid rgba(158, 197, 171, 0.5)',
                    boxShadow: '0 4px 12px rgba(184, 212, 200, 0.3)',
                  } : {
                    background: 'rgba(245, 239, 230, 0.6)',
                    color: '#6B7A7A',
                    border: '2px solid rgba(58, 58, 58, 0.1)',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.5 + index * 0.1,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">{category}</span>
                </motion.button>
              )
            })}
          </motion.div>
        </motion.div>
      </section>

      {/* Books count indicator */}
      <motion.div
        className="px-4 sm:px-6 lg:px-16 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <p className="text-center text-sm text-gray-500 uppercase tracking-widest">
          {filteredBooks.length} {filteredBooks.length === 1 ? 'Book' : 'Books'} Found
        </p>
      </motion.div>

      {/* Books grid - Bento style masonry layout */}
      <section className="px-4 sm:px-6 lg:px-16">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          layout
          transition={{
            layout: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
          }}
        >
          {filteredBooks.map((book, index) => (
            <motion.div
              key={book.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                layout: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.4 }
              }}
            >
              <BookCard book={book} index={index} />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty state */}
        {filteredBooks.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xl text-gray-500 mb-4">No books found in this category</p>
            <button
              onClick={() => setActiveCategory('All')}
              className="px-6 py-3 rounded-full glass-button text-sm font-medium tracking-wide hover:text-[#8A9A5B] transition-colors duration-300"
            >
              View All Books
            </button>
          </motion.div>
        )}
      </section>

      {/* Bottom spacing */}
      <div className="h-16 md:h-24" />

      {/* Decorative background elements - Wes Anderson pastels */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
        {/* Pastel glow orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(184, 212, 200, 0.15) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(232, 180, 184, 0.12) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-80 h-80 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(244, 232, 193, 0.1) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
            delay: 5
          }}
        />
      </div>
    </main>
  )
}
