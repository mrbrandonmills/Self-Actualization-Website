/**
 * Books Data - The Self Actualized Life
 * All books link to Amazon for purchase
 */

export interface BookFormat {
  type: 'Kindle' | 'Paperback' | 'Hardcover'
  price: number // Price in cents
  amazonUrl: string
}

export interface Book {
  id: string
  title: string
  subtitle: string
  description: string
  coverImage: string
  category: 'Philosophy' | 'Psychology' | 'Practice' | 'Laboratory'
  slug: string
  author?: string
  featured?: boolean
  publishDate?: string
  formats: BookFormat[] // Multiple purchase options
}

// Amazon Associates ID for affiliate tracking
export const AMAZON_ASSOCIATES_ID = 'selfactualize.life-20'

/**
 * Helper function to create Amazon affiliate link
 */
export function createAffiliateLink(amazonUrl?: string): string {
  if (!amazonUrl) return ''

  try {
    const url = new URL(amazonUrl)
    url.searchParams.set('tag', AMAZON_ASSOCIATES_ID)
    return url.toString()
  } catch (error) {
    console.error('Invalid Amazon URL:', amazonUrl)
    return amazonUrl
  }
}

/**
 * Format price for display
 */
export function formatBookPrice(priceInCents: number): string {
  return `$${(priceInCents / 100).toFixed(2)}`
}

export const books: Book[] = [
  {
    id: 'random-acts-block-a',
    title: 'Random Acts of Self-Actualization',
    subtitle: 'Building Block A - Engineering Your Patterns',
    description: 'Every one of us is trapped by problems we believe can\'t be solved. Some think they are stuck forever. Others keep trying random solutions, only to find themselves back where they started. Both are right. Until now.\n\nBlock A helps us engineer new patterns using what you already know. This foundational laboratory shows you how to break free from limiting patterns and create powerful, sustainable change in your life.',
    coverImage: '/books/block-a/cover.png',
    category: 'Laboratory',
    slug: 'random-acts-block-a',
    author: 'Jesse Doherty & Brandon Mills',
    featured: true,
    publishDate: '2024',
    formats: [
      {
        type: 'Kindle',
        price: 799,
        amazonUrl: 'https://a.co/d/55Ji8n2'
      }
    ]
  },
  {
    id: 'random-acts-block-b',
    title: 'Random Acts of Self-Actualization',
    subtitle: 'Block B - The Laboratory of Judgment',
    description: 'Block B lays the foundation of how to make the right judgments in an increasingly turbulent world. Learn to structure your decision-making processes and navigate complexity with confidence.\n\nThis is the second building block in the Laboratory of Life series, focusing on developing the critical thinking and judgment skills necessary for self-actualization in modern times.',
    coverImage: '/books/block-b/cover.png',
    category: 'Laboratory',
    slug: 'random-acts-block-b',
    author: 'Jesse Doherty & Brandon Mills',
    featured: true,
    publishDate: '2024',
    formats: [
      {
        type: 'Kindle',
        price: 999,
        amazonUrl: 'https://a.co/d/iQ1Jo7x'
      }
    ]
  },
  {
    id: 'block-c-laboratory-of-living',
    title: 'Random Acts of Self-Actualization',
    subtitle: 'Block C - The Laboratory of Living',
    description: 'Block C introduces how to structure our social ecosystems in such a way that not only accelerates self-actualization but assures transformation feels momentum, not uphill struggle.\n\nThe final building block completes the Laboratory of Life trilogy, showing you how to engineer your environment and relationships for sustainable growth and transformation.',
    coverImage: '/books/block-c/cover.png',
    category: 'Laboratory',
    slug: 'block-c-laboratory-of-living',
    author: 'Jesse Doherty & Brandon Mills',
    featured: true,
    publishDate: '2024',
    formats: [
      {
        type: 'Kindle',
        price: 999,
        amazonUrl: 'https://a.co/d/dlrbP4e'
      }
    ]
  },
  {
    id: 'trilogy-complete-collection',
    title: 'Random Acts of Self-Actualization',
    subtitle: 'The Complete Trilogy - All Three Building Blocks',
    description: 'The complete Laboratory of Life trilogy in one stunning collection. Transform your reality with all three building blocks: Engineering Your Patterns (Block A), The Laboratory of Judgment (Block B), and The Laboratory of Living (Block C).\n\nThis comprehensive collection provides the complete roadmap for sustainable, powerful self-actualization. Get all three books together and save.',
    coverImage: '/books/trilogy/cover.png',
    category: 'Laboratory',
    slug: 'trilogy-complete-collection',
    author: 'Jesse Doherty & Brandon Mills',
    featured: true,
    publishDate: '2024',
    formats: [
      {
        type: 'Paperback',
        price: 2299,
        amazonUrl: 'https://a.co/d/dmDroo2'
      },
      {
        type: 'Hardcover',
        price: 3299,
        amazonUrl: 'https://a.co/d/dVUQFdC'
      }
    ]
  },
]

// Helper function to get books by category
export function getBooksByCategory(category: Book['category'] | 'All'): Book[] {
  if (category === 'All') {
    return books
  }
  return books.filter((book) => book.category === category)
}

// Helper function to get featured books
export function getFeaturedBooks(): Book[] {
  return books.filter((book) => book.featured)
}

// Helper function to get book by slug
export function getBookBySlug(slug: string): Book | undefined {
  return books.find((book) => book.slug === slug)
}

export default books
