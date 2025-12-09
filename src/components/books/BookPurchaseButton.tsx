'use client'

/**
 * Book Purchase Button Component
 * Handles both Stripe checkout (for digital books) and Amazon affiliate links (for physical books)
 */

import { motion } from 'framer-motion'
import { Book, createAffiliateLink } from '@/data/books'
import { useCart } from '@/contexts/CartContext'
import { Product } from '@/data/products'

interface BookPurchaseButtonProps {
  book: Book
  className?: string
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  showIcon?: boolean
}

export function BookPurchaseButton({
  book,
  className = '',
  variant = 'primary',
  size = 'md',
  showIcon = true,
}: BookPurchaseButtonProps) {
  const { addToCart, isInCart } = useCart()

  // If this is an Amazon-only book, link to Amazon with affiliate tracking
  if (book.isAmazonOnly && book.amazonUrl) {
    const affiliateLink = createAffiliateLink(book.amazonUrl)

    return (
      <motion.a
        href={affiliateLink}
        target="_blank"
        rel="noopener noreferrer"
        className={`book-purchase-btn ${variant} ${size} ${className}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {showIcon && <span className="btn-icon">📚</span>}
        <span>View on Amazon</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="external-link-icon"
        >
          <path d="M6 3H3v10h10V10M8 8l6-6M10 2h4v4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        <style jsx>{`
          .book-purchase-btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-weight: 600;
            border-radius: 12px;
            transition: all 0.2s;
            text-decoration: none;
            cursor: pointer;
            position: relative;
          }

          .book-purchase-btn.primary {
            background: linear-gradient(135deg, #C9A050 0%, #8B7030 100%);
            border: 2px solid #D4AF37;
            color: #fff;
            box-shadow: 0 4px 16px rgba(201, 160, 80, 0.3);
          }

          .book-purchase-btn.primary:hover {
            box-shadow: 0 6px 24px rgba(201, 160, 80, 0.5);
          }

          .book-purchase-btn.secondary {
            background: rgba(212, 175, 55, 0.1);
            border: 2px solid rgba(212, 175, 55, 0.3);
            color: #D4AF37;
          }

          .book-purchase-btn.secondary:hover {
            background: rgba(212, 175, 55, 0.2);
            border-color: rgba(212, 175, 55, 0.5);
          }

          .book-purchase-btn.outline {
            background: transparent;
            border: 2px solid #D4AF37;
            color: #D4AF37;
          }

          .book-purchase-btn.outline:hover {
            background: rgba(212, 175, 55, 0.1);
          }

          .book-purchase-btn.sm {
            padding: 8px 16px;
            font-size: 14px;
          }

          .book-purchase-btn.md {
            padding: 12px 24px;
            font-size: 16px;
          }

          .book-purchase-btn.lg {
            padding: 16px 32px;
            font-size: 18px;
          }

          .btn-icon {
            font-size: 1.2em;
          }

          .external-link-icon {
            opacity: 0.7;
          }
        `}</style>
      </motion.a>
    )
  }

  // For Stripe-based books, add to cart
  const handleAddToCart = () => {
    // Convert Book to Product format for cart
    const product: Product = {
      id: book.id,
      name: book.title,
      type: 'book',
      category: 'beginner', // You can map book.category to product category
      price: book.price,
      description: book.description,
      glowColor: '#D4AF37',
      position: [0, 0, 0],
      itemType: '📚',
      format: 'digital',
      inStock: true,
      author: book.author,
      pages: 200, // You could add this to Book interface
    }

    addToCart(product)
  }

  const inCart = isInCart(book.id)

  return (
    <motion.button
      onClick={handleAddToCart}
      className={`book-purchase-btn ${variant} ${size} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      disabled={inCart}
    >
      {showIcon && <span className="btn-icon">{inCart ? '✓' : '🛒'}</span>}
      <span>{inCart ? 'Added to Cart' : 'Add to Cart'}</span>

      <style jsx>{`
        .book-purchase-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          border-radius: 12px;
          transition: all 0.2s;
          cursor: pointer;
          border: none;
          position: relative;
        }

        .book-purchase-btn:disabled {
          opacity: 0.6;
          cursor: default;
        }

        .book-purchase-btn.primary {
          background: linear-gradient(135deg, #C9A050 0%, #8B7030 100%);
          border: 2px solid #D4AF37;
          color: #fff;
          box-shadow: 0 4px 16px rgba(201, 160, 80, 0.3);
        }

        .book-purchase-btn.primary:hover:not(:disabled) {
          box-shadow: 0 6px 24px rgba(201, 160, 80, 0.5);
        }

        .book-purchase-btn.secondary {
          background: rgba(212, 175, 55, 0.1);
          border: 2px solid rgba(212, 175, 55, 0.3);
          color: #D4AF37;
        }

        .book-purchase-btn.secondary:hover:not(:disabled) {
          background: rgba(212, 175, 55, 0.2);
          border-color: rgba(212, 175, 55, 0.5);
        }

        .book-purchase-btn.outline {
          background: transparent;
          border: 2px solid #D4AF37;
          color: #D4AF37;
        }

        .book-purchase-btn.outline:hover:not(:disabled) {
          background: rgba(212, 175, 55, 0.1);
        }

        .book-purchase-btn.sm {
          padding: 8px 16px;
          font-size: 14px;
        }

        .book-purchase-btn.md {
          padding: 12px 24px;
          font-size: 16px;
        }

        .book-purchase-btn.lg {
          padding: 16px 32px;
          font-size: 18px;
        }

        .btn-icon {
          font-size: 1.2em;
        }
      `}</style>
    </motion.button>
  )
}
