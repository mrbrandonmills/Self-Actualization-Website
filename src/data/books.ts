/**
 * Books Data - The Self Actualized Life
 * Amazon Affiliate Integration
 * Associates ID: selfactualize.life-20
 */

export interface Book {
  id: string
  title: string
  subtitle: string
  description: string
  coverImage: string
  price: string
  category: 'Philosophy' | 'Psychology' | 'Practice' | 'Laboratory'
  slug: string
  author?: string
  featured?: boolean
  amazonUrl: string
  format?: string
  publishDate?: string
}

// Amazon Associates ID for affiliate tracking
export const AMAZON_ASSOCIATES_ID = 'selfactualize.life-20'

/**
 * Helper function to create Amazon affiliate link
 */
export function createAffiliateLink(amazonUrl: string): string {
  try {
    const url = new URL(amazonUrl)
    url.searchParams.set('tag', AMAZON_ASSOCIATES_ID)
    return url.toString()
  } catch (error) {
    console.error('Invalid Amazon URL:', amazonUrl)
    return amazonUrl
  }
}

export const books: Book[] = [
  {
    id: 'random-acts-building-blocks-a-b',
    title: 'Random Acts of Self-Actualization',
    subtitle: 'Building Block A & Building Block B - Foundations of Self-Actualization',
    description: 'Every one of us is trapped by problems we believe can\'t be solved. Some think they are stuck forever. Others keep trying random solutions, only to find themselves back where they started. Both are right. Until now.\n\nThis laboratory of life welcomes all the lost wisdom of the Ancients blended with the psychology and philosophy of the modern world. That includes everything from, how they built up cities, and how we ended beyond them. Most importantly, we can discover what continues to stick with us no matter how we wish it wouldn\'t.\n\nBuilding Blocks A and B are the foundational laboratories every person needs for a powerful, sustainable, and addictive self-actualization. Block A helps us engineer new patterns using what you already know. Block B lays the foundation of how to make the right judgments in an increasingly turbulent world.',
    coverImage: '/textures/books/front-cover-highres.png',
    price: '$9.99',
    category: 'Laboratory',
    slug: 'random-acts-building-blocks-a-b',
    author: 'Rock Q Cool Box',
    featured: true,
    amazonUrl: 'https://www.amazon.com/Random-Acts-Self-Actualization-Building-Addictive-ebook/dp/B0DRDXCJZQ/ref=sr_1_1',
    format: 'Kindle',
    publishDate: '2024',
  },
  {
    id: 'random-acts-block-b',
    title: 'Random Acts of Self-Actualization',
    subtitle: 'Block B - The Laboratory of Judgment',
    description: 'Block B lays the foundation of how to make the right judgments in an increasingly turbulent world. Learn to structure your decision-making processes and navigate complexity with confidence.\n\nThis is the second building block in the Laboratory of Life series, focusing on developing the critical thinking and judgment skills necessary for self-actualization in modern times.',
    coverImage: '/textures/books/back-cover-text.png',
    price: '$9.99',
    category: 'Laboratory',
    slug: 'random-acts-block-b',
    author: 'Rock Q Cool Box',
    featured: true,
    amazonUrl: 'https://www.amazon.com/Random-Acts-Self-Actualization-Block-B-ebook/dp/B0DSY6Z4YP/ref=sr_1_2',
    format: 'Kindle',
    publishDate: '2024',
  },
  {
    id: 'block-c-laboratory-of-living',
    title: 'BLOCK C: THE LABORATORY OF LIVING',
    subtitle: 'Random Acts of Self-Actualization',
    description: 'Block C introduces how to structure our social ecosystems in such a way that not only accelerates self-actualization but assures transformation feels momentum, not uphill struggle.\n\nThe final building block completes the Laboratory of Life trilogy, showing you how to engineer your environment and relationships for sustainable growth and transformation.',
    coverImage: '/textures/books/front-cover-highres.png',
    price: '$9.99',
    category: 'Laboratory',
    slug: 'block-c-laboratory-of-living',
    author: 'Rock Q Cool Box',
    featured: true,
    amazonUrl: 'https://www.amazon.com/BLOCK-LABORATORY-LIVING-Random-Self-Actualization-ebook/dp/B0G3VGJM1F/ref=sr_1_3',
    format: 'Kindle',
    publishDate: '2024',
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
