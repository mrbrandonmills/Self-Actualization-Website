'use client'

import { BookGallery } from '@/components/gallery/BookGallery'

/**
 * GALLERY TEST PAGE
 * House of Corto gallery techniques + Bartosz dark aesthetic
 */

// Sample book data
const sampleBooks = [
  {
    id: '1',
    title: 'The Path to Self-Actualization',
    subtitle: 'Unlock your highest potential and transform your reality',
    category: 'transformation',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=1200&fit=crop',
    price: 24.99,
    featured: true,
    slug: 'path-to-self-actualization',
  },
  {
    id: '2',
    title: 'Mindful Living',
    subtitle: 'Present-moment awareness and inner peace',
    category: 'mindfulness',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=1200&fit=crop',
    price: 19.99,
    slug: 'mindful-living',
  },
  {
    id: '3',
    title: 'The Creative Self',
    subtitle: 'Unlock your creative potential and authentic voice',
    category: 'creativity',
    coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800&h=1200&fit=crop',
    price: 22.99,
    slug: 'creative-self',
  },
  {
    id: '4',
    title: 'Emotional Intelligence',
    subtitle: 'Master your emotions and relationships',
    category: 'transformation',
    coverImage: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=1200&fit=crop',
    price: 21.99,
    slug: 'emotional-intelligence',
  },
  {
    id: '5',
    title: 'Zen Mastery',
    subtitle: 'Ancient wisdom for modern life',
    category: 'mindfulness',
    coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=1200&fit=crop',
    price: 18.99,
    featured: true,
    slug: 'zen-mastery',
  },
  {
    id: '6',
    title: 'Creative Flow State',
    subtitle: 'Enter peak performance and artistic expression',
    category: 'creativity',
    coverImage: 'https://images.unsplash.com/photo-1516414447565-b14be0adf13e?w=800&h=1200&fit=crop',
    price: 23.99,
    slug: 'creative-flow-state',
  },
]

export default function GalleryTestPage() {
  return (
    <div className="min-h-screen bg-[var(--color-black-green)]">
      {/* Hero Section */}
      <section className="museum-section gradient-dark">
        <div className="container-lg text-center">
          <p className="label text-accent mb-md">
            House of Corto Gallery
          </p>
          <h1 className="h1 mb-lg">
            Book Gallery
            <br />
            <span className="text-gold">Test Page</span>
          </h1>
          <p className="lead max-w-2xl mx-auto">
            2-column grid • Scale-from-zero reveals • Category filtering • Text swap animations
          </p>
        </div>
      </section>

      {/* Gallery Component */}
      <section className="section">
        <BookGallery
          books={sampleBooks}
          title="Curated Collection"
          subtitle="Featured Books"
        />
      </section>

      {/* Feature Showcase */}
      <section className="section gradient-forest">
        <div className="container-xl">
          <div className="text-center mb-4xl">
            <h2 className="h2 mb-lg">Gallery Features</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-lg">
            {/* Feature 1 */}
            <div className="card p-xl">
              <div className="mb-md">
                <span className="badge-gold">Corto Style</span>
              </div>
              <h3 className="h4 mb-md">2-Column Grid</h3>
              <p className="text-secondary small">
                Desktop: 2 columns, Tablet/Mobile: 1 column. Responsive breakpoint at 991px.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card p-xl">
              <div className="mb-md">
                <span className="badge-gold">Animation</span>
              </div>
              <h3 className="h4 mb-md">Scale Reveals</h3>
              <p className="text-secondary small">
                Images scale from 0 to 1 on scroll with 0.5s ease-out timing. Staggered by 0.1s.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card p-xl">
              <div className="mb-md">
                <span className="badge-gold">Interaction</span>
              </div>
              <h3 className="h4 mb-md">Text Swap Hover</h3>
              <p className="text-secondary small">
                Text slides up on hover with 0.8s ease timing. Overlay darkens for readability.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="card p-xl">
              <div className="mb-md">
                <span className="category-badge">Sage Green</span>
              </div>
              <h3 className="h4 mb-md">Category Badges</h3>
              <p className="text-secondary small">
                House of Corto sage green (#63692B) for categories. Gold for featured items.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="card p-xl">
              <div className="mb-md">
                <span className="badge">Filter</span>
              </div>
              <h3 className="h4 mb-md">Category Filtering</h3>
              <p className="text-secondary small">
                Click category buttons to filter books. Active state uses Corto sage green.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="card p-xl">
              <div className="mb-md">
                <span className="badge">Smooth</span>
              </div>
              <h3 className="h4 mb-md">Cubic Bezier</h3>
              <p className="text-secondary small">
                0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) for professional, smooth motion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="section">
        <div className="container-xl">
          <div className="text-center mb-4xl">
            <h2 className="h2 mb-lg">Technical Implementation</h2>
          </div>

          <div className="two-column gap-2xl">
            {/* Code Block 1 */}
            <div className="card-glass p-xl">
              <h3 className="h4 mb-md">CSS Grid Layout</h3>
              <pre className="text-xs text-secondary"><code>{`display: grid;
grid-template-columns: repeat(2, 1fr);
gap: var(--space-2xl);

/* Responsive */
@media (max-width: 991px) {
  grid-template-columns: 1fr;
}`}</code></pre>
            </div>

            {/* Code Block 2 */}
            <div className="card-glass p-xl">
              <h3 className="h4 mb-md">GSAP Scale Reveal</h3>
              <pre className="text-xs text-secondary"><code>{`gsap.fromTo(item, {
  scale: 0,
  opacity: 1
}, {
  scale: 1,
  duration: 0.5,
  ease: 'power2.out',
  scrollTrigger: {...}
})`}</code></pre>
            </div>

            {/* Code Block 3 */}
            <div className="card-glass p-xl">
              <h3 className="h4 mb-md">Text Swap Animation</h3>
              <pre className="text-xs text-secondary"><code>{`<motion.div
  initial={{ y: '100%' }}
  animate={{ y: isHovered ? '0%' : '100%' }}
  transition={{
    duration: 0.8,
    ease: 'easeOut'
  }}
/>`}</code></pre>
            </div>

            {/* Code Block 4 */}
            <div className="card-glass p-xl">
              <h3 className="h4 mb-md">Corto Colors</h3>
              <pre className="text-xs text-secondary"><code>{`/* Sage Green (Corto) */
background: #63692B;

/* Active State */
background: #3E4F17;

/* Light Text */
color: #F2EFE7;`}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        /* Category badge for feature showcase */
        .category-badge {
          display: inline-block;
          background: #63692B;
          color: #F2EFE7;
          padding: var(--space-xs) var(--space-sm);
          border-radius: var(--radius-full);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-medium);
          text-transform: uppercase;
          letter-spacing: var(--tracking-widest);
        }

        /* Code blocks */
        pre code {
          display: block;
          font-family: 'Monaco', 'Courier New', monospace;
          line-height: 1.6;
          overflow-x: auto;
        }
      `}</style>
    </div>
  )
}
