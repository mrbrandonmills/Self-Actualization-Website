'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BookGalleryItem } from './BookGalleryItem'
import { GalleryFilter } from './GalleryFilter'

gsap.registerPlugin(ScrollTrigger)

interface Book {
  id: string
  title: string
  subtitle: string
  category: string
  coverImage: string
  price: string
  featured?: boolean
  slug: string
  amazonUrl: string
  format?: string
}

interface BookGalleryProps {
  books: Book[]
  title?: string
  subtitle?: string
}

/**
 * BookGallery - House of Corto inspired gallery with Bartosz aesthetic
 *
 * Features:
 * - 2-column grid layout (desktop) → 1 column (mobile)
 * - Scale-from-zero reveals on scroll
 * - Category filtering with sage green accents
 * - Smooth 0.7s cubic-bezier transitions
 * - Text swap animations on hover
 */
export function BookGallery({ books, title, subtitle }: BookGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books)
  const galleryRef = useRef<HTMLDivElement>(null)

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(books.map(book => book.category)))]

  // Filter books by category
  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredBooks(books)
    } else {
      setFilteredBooks(books.filter(book => book.category === activeCategory))
    }
  }, [activeCategory, books])

  // GSAP scale-from-zero reveal animation (House of Corto style)
  useEffect(() => {
    if (!galleryRef.current) return

    const items = galleryRef.current.querySelectorAll('.gallery-item')

    items.forEach((item, index) => {
      gsap.fromTo(
        item,
        {
          scale: 0,
          opacity: 1,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
          },
          delay: index * 0.1, // Stagger effect
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [filteredBooks])

  return (
    <div className="book-gallery-container">
      {/* Header */}
      {(title || subtitle) && (
        <div className="gallery-header">
          {subtitle && (
            <p className="label text-accent mb-md">
              {subtitle}
            </p>
          )}
          {title && (
            <h2 className="h2 mb-xl">
              {title}
            </h2>
          )}
        </div>
      )}

      {/* Category Filter */}
      <GalleryFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* Gallery Grid */}
      <div ref={galleryRef} className="book-gallery-grid">
        {filteredBooks.map((book, index) => (
          <BookGalleryItem
            key={book.id}
            book={book}
            index={index}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredBooks.length === 0 && (
        <div className="gallery-empty">
          <p className="text-secondary">
            No books found in this category.
          </p>
        </div>
      )}

      <style jsx global>{`
        /* Gallery Container */
        .book-gallery-container {
          width: 100%;
          max-width: var(--max-width-2xl);
          margin: 0 auto;
          padding: var(--space-4xl) var(--space-xl);
        }

        /* Gallery Header */
        .gallery-header {
          text-align: center;
          margin-bottom: var(--space-4xl);
        }

        /* Gallery Grid - House of Corto 2-column layout */
        .book-gallery-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-2xl);
          margin-top: var(--space-3xl);
        }

        /* Gallery Items */
        .gallery-item {
          transform: scale(0);
          opacity: 1;
          will-change: transform;
        }

        /* Empty State */
        .gallery-empty {
          text-align: center;
          padding: var(--space-5xl) var(--space-xl);
        }

        /* Responsive - Tablet & Mobile */
        @media (max-width: 991px) {
          .book-gallery-grid {
            grid-template-columns: 1fr;
            gap: var(--space-xl);
          }

          .book-gallery-container {
            padding: var(--space-3xl) var(--space-lg);
          }
        }

        /* Mobile specific */
        @media (max-width: 640px) {
          .book-gallery-container {
            padding: var(--space-2xl) var(--space-md);
          }

          .gallery-header {
            margin-bottom: var(--space-2xl);
          }
        }
      `}</style>
    </div>
  )
}
