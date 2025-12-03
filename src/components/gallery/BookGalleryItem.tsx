'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { createAffiliateLink } from '@/data/books'

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

interface BookGalleryItemProps {
  book: Book
  index: number
}

/**
 * BookGalleryItem - Individual book card with Amazon affiliate integration
 *
 * Features:
 * - Text swap animation on hover (0.8s ease)
 * - Lift effect with 0.7s cubic-bezier
 * - Sage green category badge
 * - Amazon affiliate links with target="_blank"
 * - Smooth transitions matching Corto aesthetic
 */
export function BookGalleryItem({ book }: BookGalleryItemProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Create Amazon affiliate link with tracking
  const amazonLink = createAffiliateLink(book.amazonUrl)

  return (
    <a
      href={amazonLink}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <motion.div
        className="gallery-item"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{
          y: -8,
        }}
        transition={{
          duration: 0.7,
          ease: [0.25, 0.46, 0.45, 0.94], // House of Corto cubic-bezier
        }}
      >
        <div className="gallery-item-inner">
          {/* Book Cover Image */}
          <div className="gallery-item-image">
            <Image
              src={book.coverImage}
              alt={book.title}
              fill
              className="object-cover"
              sizes="(max-width: 991px) 100vw, 50vw"
            />

            {/* Overlay that darkens on hover */}
            <motion.div
              className="gallery-item-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            />

            {/* Category Badge - Sage Green (Corto style) */}
            <div className="category-badge">
              {book.category}
            </div>

            {/* Featured Badge */}
            {book.featured && (
              <div className="featured-badge">
                Featured
              </div>
            )}
          </div>

          {/* Text Content - Swaps up on hover */}
          <motion.div
            className="gallery-item-content"
            initial={{ y: '100%' }}
            animate={{ y: isHovered ? '0%' : '100%' }}
            transition={{
              duration: 0.8,
              ease: 'easeOut',
            }}
          >
            <div className="gallery-item-text">
              <h3 className="gallery-item-title">
                {book.title}
              </h3>
              <p className="gallery-item-subtitle">
                {book.subtitle}
              </p>
              <div className="gallery-item-footer">
                <div className="gallery-item-price">
                  <span className="price-amount">{book.price}</span>
                  {book.format && (
                    <span className="price-label">{book.format}</span>
                  )}
                </div>
                <button className="amazon-cta">
                  View on Amazon →
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </a>
  )
}

// Styles are now global
export const BookGalleryItemStyles = () => (
  <>
    <style jsx global>{`
          /* Gallery Item Container */
          .gallery-item-inner {
            position: relative;
            width: 100%;
            aspect-ratio: 3 / 4;
            overflow: hidden;
            border-radius: var(--radius-xl);
            background: var(--color-dark-green);
            cursor: pointer;
          }

          /* Image Container */
          .gallery-item-image {
            position: relative;
            width: 100%;
            height: 100%;
          }

          /* Dark Overlay on Hover */
          .gallery-item-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(
              180deg,
              rgba(5, 32, 31, 0) 0%,
              rgba(5, 32, 31, 0.7) 50%,
              rgba(5, 32, 31, 0.95) 100%
            );
            z-index: 1;
          }

          /* Category Badge - Sage Green (House of Corto) */
          .category-badge {
            position: absolute;
            top: var(--space-lg);
            left: var(--space-lg);
            background: #63692B;  /* Corto sage green */
            color: #F2EFE7;       /* Corto light text */
            padding: var(--space-xs) var(--space-sm);
            border-radius: var(--radius-full);
            font-size: var(--font-size-xs);
            font-weight: var(--font-weight-medium);
            text-transform: uppercase;
            letter-spacing: var(--tracking-widest);
            z-index: 2;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
          }

          /* Featured Badge - Gold */
          .featured-badge {
            position: absolute;
            top: var(--space-lg);
            right: var(--space-lg);
            background: var(--color-accent-gold);
            color: var(--color-black-green);
            padding: var(--space-xs) var(--space-sm);
            border-radius: var(--radius-full);
            font-size: var(--font-size-xs);
            font-weight: var(--font-weight-medium);
            text-transform: uppercase;
            letter-spacing: var(--tracking-widest);
            z-index: 2;
          }

          /* Text Content Container */
          .gallery-item-content {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: var(--space-xl);
            z-index: 3;
          }

          /* Text Inner Wrapper */
          .gallery-item-text {
            color: var(--color-text-primary);
          }

          /* Title */
          .gallery-item-title {
            font-family: var(--font-serif);
            font-size: var(--font-size-h4);
            font-weight: var(--font-weight-light);
            line-height: var(--line-height-tight);
            letter-spacing: var(--tracking-tight);
            margin-bottom: var(--space-sm);
          }

          /* Subtitle */
          .gallery-item-subtitle {
            font-size: var(--font-size-small);
            color: var(--color-text-secondary);
            line-height: var(--line-height-normal);
            margin-bottom: var(--space-md);
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          /* Footer with Price and CTA */
          .gallery-item-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: var(--space-md);
            flex-wrap: wrap;
          }

          /* Price */
          .gallery-item-price {
            display: flex;
            align-items: baseline;
            gap: var(--space-xs);
            flex-shrink: 0;
          }

          .price-amount {
            font-size: var(--font-size-h4);
            font-weight: var(--font-weight-light);
            color: var(--color-accent-gold);
          }

          .price-label {
            font-size: var(--font-size-xs);
            color: var(--color-text-tertiary);
            text-transform: uppercase;
            letter-spacing: var(--tracking-wider);
          }

          /* Amazon CTA Button */
          .amazon-cta {
            display: inline-flex;
            align-items: center;
            gap: var(--space-xs);
            padding: var(--space-sm) var(--space-md);
            background: var(--color-accent-gold);
            color: var(--color-black-green);
            border: none;
            border-radius: var(--radius-md);
            font-size: var(--font-size-small);
            font-weight: var(--font-weight-semibold);
            text-transform: uppercase;
            letter-spacing: var(--tracking-wide);
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
            white-space: nowrap;
          }

          .amazon-cta:hover {
            background: #d4af37;
            transform: translateX(4px);
          }

          /* Responsive */
          @media (max-width: 640px) {
            .gallery-item-inner {
              aspect-ratio: 4 / 5;
            }

            .category-badge,
            .featured-badge {
              top: var(--space-md);
              left: var(--space-md);
              font-size: 0.625rem;
              padding: 0.25rem 0.5rem;
            }

            .featured-badge {
              right: var(--space-md);
              left: auto;
            }

            .gallery-item-content {
              padding: var(--space-lg);
            }

            .gallery-item-title {
              font-size: var(--font-size-h5);
            }

            .gallery-item-footer {
              flex-direction: column;
              align-items: flex-start;
              gap: var(--space-sm);
            }

            .amazon-cta {
              width: 100%;
              justify-content: center;
            }
          }
        `}</style>
  </>
)
