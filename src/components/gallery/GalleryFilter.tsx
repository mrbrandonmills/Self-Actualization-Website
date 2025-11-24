'use client'

import { motion } from 'framer-motion'

interface GalleryFilterProps {
  categories: string[]
  activeCategory: string
  onCategoryChange: (category: string) => void
}

/**
 * GalleryFilter - Category filtering with House of Corto sage green accent
 *
 * Features:
 * - Sage green active state (#63692B)
 * - Smooth transitions
 * - Uppercase tracking
 * - Mobile responsive
 */
export function GalleryFilter({
  categories,
  activeCategory,
  onCategoryChange
}: GalleryFilterProps) {
  return (
    <div className="gallery-filter">
      <div className="filter-buttons">
        {categories.map((category) => {
          const isActive = activeCategory === category

          return (
            <motion.button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`filter-button ${isActive ? 'active' : ''}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          )
        })}
      </div>

      <style jsx global>{`
        /* Filter Container */
        .gallery-filter {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-bottom: var(--space-2xl);
        }

        /* Button Container */
        .filter-buttons {
          display: flex;
          gap: var(--space-sm);
          flex-wrap: wrap;
          justify-content: center;
        }

        /* Filter Button */
        .filter-button {
          padding: var(--space-sm) var(--space-lg);
          background: transparent;
          color: var(--color-text-secondary);
          border: 1px solid var(--color-ui-border);
          border-radius: var(--radius-full);
          font-family: var(--font-sans);
          font-size: var(--font-size-small);
          font-weight: var(--font-weight-medium);
          text-transform: uppercase;
          letter-spacing: var(--tracking-widest);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .filter-button:hover {
          color: var(--color-text-primary);
          border-color: var(--color-text-primary);
          background: var(--color-ui-hover);
        }

        /* Active State - Sage Green (House of Corto) */
        .filter-button.active {
          background: #63692B;  /* Corto sage green */
          color: #F2EFE7;       /* Corto light text */
          border-color: #63692B;
        }

        .filter-button.active:hover {
          background: #3E4F17;  /* Corto active hover */
          border-color: #3E4F17;
        }

        /* Focus State */
        .filter-button:focus-visible {
          outline: 2px solid var(--color-accent-gold);
          outline-offset: 4px;
        }

        /* Responsive */
        @media (max-width: 640px) {
          .filter-buttons {
            gap: var(--space-xs);
          }

          .filter-button {
            padding: var(--space-xs) var(--space-md);
            font-size: var(--font-size-xs);
          }
        }
      `}</style>
    </div>
  )
}
