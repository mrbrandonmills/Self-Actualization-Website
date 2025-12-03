/**
 * Block A Flip Book Test Page
 * Demo of interactive flip book with 19 pages
 */

'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FlipBook } from '@/components/books/FlipBook';
import { createAffiliateLink } from '@/data/books';

export default function BlockATestPage() {
  const [isOpen, setIsOpen] = useState(false);

  // Block A - 19 pages
  const blockAPages = Array.from({ length: 19 }, (_, i) => `/books/block-a/${i + 1}.png`);

  const amazonUrl = 'https://www.amazon.com/Random-Acts-Self-Actualization-Building-Addictive-ebook/dp/B0DRDXCJZQ/ref=sr_1_1';

  return (
    <main className="min-h-screen bg-[#f5f3ef] flex items-center justify-center p-8">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold text-[#05201f] mb-4">
          Block A Flip Book Test
        </h1>
        <p className="text-xl text-[#05201f]/70 mb-8">
          Click the button below to preview the interactive flip book for Random Acts of Self-Actualization: Building Block A
        </p>

        {/* Book Preview Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8 hover:shadow-[0_20px_60px_rgba(201,160,80,0.3)] transition-all duration-500">
          <div className="aspect-[3/4] relative mb-6 overflow-hidden rounded-lg">
            <img
              src="/books/block-a/1.png"
              alt="Block A Cover"
              className="w-full h-full object-contain"
            />
          </div>

          <h2 className="text-2xl font-serif mb-2">
            Random Acts of Self-Actualization
          </h2>
          <p className="text-lg text-[#C9A050] mb-4">
            Building Block A: Breaking Free from Addictive Patterns
          </p>
          <p className="text-sm text-gray-600 mb-6">
            By Jesse Doherty & Brandon Mills
          </p>

          <button
            onClick={() => setIsOpen(true)}
            className="px-8 py-4 bg-gradient-to-r from-[#C9A050] to-[#d4af37] text-white font-bold rounded-lg hover:shadow-[0_8px_30px_rgba(201,160,80,0.6)] transition-all duration-300 hover:-translate-y-1"
          >
            📖 Preview Book (19 Pages)
          </button>
        </div>

        <div className="text-sm text-gray-500 space-y-2">
          <p>✨ Features:</p>
          <ul className="list-none space-y-1">
            <li>→ Realistic page flip animations</li>
            <li>→ Keyboard navigation (←/→ arrows)</li>
            <li>→ Click "Next" or drag to flip pages</li>
            <li>→ Amazon affiliate link on last page</li>
            <li>→ Full-screen immersive experience</li>
          </ul>
        </div>
      </div>

      {/* Flip Book Modal */}
      <AnimatePresence>
        {isOpen && (
          <FlipBook
            pages={blockAPages}
            bookTitle="Random Acts of Self-Actualization: Building Block A"
            amazonUrl={createAffiliateLink(amazonUrl)}
            onClose={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
