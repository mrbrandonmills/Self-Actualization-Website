'use client'

import { BookGallery } from '@/components/gallery/BookGallery'
import { books } from '@/data/books'
import { CustomCursor } from '@/components/bartosz/CustomCursor'
import { VideoNoise } from '@/components/bartosz/VideoNoise'
import { MuseumEntrance } from '@/components/museum/MuseumEntrance'

/**
 * Books Catalog Page - Bartosz Dark + House of Corto Gallery
 *
 * Features:
 * - Bartosz dark aesthetic (#05201f background)
 * - House of Corto 2-column gallery
 * - Scale-from-zero reveals
 * - Category filtering with sage green
 * - Text swap hover animations
 */
export default function BooksPage() {
  return (
    <main className="min-h-screen bg-[var(--color-black-green)]">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Video Noise Overlay */}
      <VideoNoise />

      {/* Hero Section */}
      <section className="museum-section pt-32 pb-16">
        <div className="container-xl text-center">
          <p className="label text-accent mb-md animate-fade-in">
            Premium Collection
          </p>

          <h1 className="h1 mb-lg animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Transform Your
            <br />
            <span className="text-gold">Reality</span>
          </h1>

          <p className="lead max-w-2xl mx-auto mb-xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Curated books for self-actualization, personal growth, and transformational living.
          </p>

          {/* Divider */}
          <div className="divider animate-fade-in" style={{ animationDelay: '0.3s' }} />
        </div>
      </section>

      {/* Museum Entrance Portal */}
      <MuseumEntrance />

      {/* Gallery Section */}
      <section className="section">
        <BookGallery
          books={books}
          title="The Museum of Becoming"
          subtitle="Curated Collection"
        />
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
          <div className="flex gap-md justify-center flex-wrap">
            <button className="btn btn-primary">
              Explore All Books
            </button>
            <button className="btn btn-outline">
              View Featured
            </button>
          </div>
        </div>
      </section>

      <style jsx global>{`
        /* Page-specific animations */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-up {
          animation: slideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          opacity: 0;
        }
      `}</style>
    </main>
  )
}
