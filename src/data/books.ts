/**
 * Books Data
 * Sample book catalog for The Self Actualized Life
 */

export interface Book {
  id: string
  title: string
  subtitle: string
  description: string
  coverImage: string
  price: number
  category: 'Philosophy' | 'Psychology' | 'Practice'
  slug: string
  author?: string
  featured?: boolean
}

export const books: Book[] = [
  {
    id: '1',
    title: 'The Authentic Path',
    subtitle: 'Discovering Your True Self',
    description: 'A profound exploration of authenticity and self-discovery. Learn to shed societal masks and embrace your genuine nature through philosophical wisdom and practical exercises.',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=1200&fit=crop&q=80',
    price: 29,
    category: 'Philosophy',
    slug: 'the-authentic-path',
    author: 'Dr. Marcus Stone',
    featured: true,
  },
  {
    id: '2',
    title: 'Mind Mastery',
    subtitle: 'The Psychology of Peak Performance',
    description: 'Unlock your mental potential through cutting-edge neuroscience and time-tested psychological principles. Transform your thinking patterns and achieve extraordinary results.',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=1200&fit=crop&q=80',
    price: 34,
    category: 'Psychology',
    slug: 'mind-mastery',
    author: 'Dr. Sarah Chen',
    featured: true,
  },
  {
    id: '3',
    title: 'Daily Practices',
    subtitle: 'Rituals for Self-Actualization',
    description: 'Transform your life through powerful daily rituals. Simple, science-backed practices that compound into extraordinary personal growth over time.',
    coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800&h=1200&fit=crop&q=80',
    price: 24,
    category: 'Practice',
    slug: 'daily-practices',
    author: 'Michael Rivers',
  },
  {
    id: '4',
    title: 'Becoming Whole',
    subtitle: 'Integration and Inner Harmony',
    description: 'Navigate the journey of integration where all aspects of self unite in harmony. A philosophical guide to wholeness, completeness, and inner peace.',
    coverImage: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=1200&fit=crop&q=80',
    price: 39,
    category: 'Philosophy',
    slug: 'becoming-whole',
    author: 'Dr. Elena Martinez',
    featured: true,
  },
  {
    id: '5',
    title: 'The Inner Journey',
    subtitle: 'Mapping Your Psychological Landscape',
    description: 'Explore the depths of your psyche with expert guidance. Understand your shadows, embrace your light, and navigate the complex terrain of human consciousness.',
    coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=1200&fit=crop&q=80',
    price: 29,
    category: 'Psychology',
    slug: 'the-inner-journey',
    author: 'Dr. James Whitmore',
  },
  {
    id: '6',
    title: 'Conscious Living',
    subtitle: 'Mindfulness in Modern Life',
    description: 'Bring awareness to every moment. Practical techniques for maintaining presence, clarity, and purpose in the chaos of contemporary existence.',
    coverImage: 'https://images.unsplash.com/photo-1516414447565-b14be0adf13e?w=800&h=1200&fit=crop&q=80',
    price: 27,
    category: 'Practice',
    slug: 'conscious-living',
    author: 'Alexandra Sun',
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
