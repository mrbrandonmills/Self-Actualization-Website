/**
 * Product Data - 3D Video Game Store
 * Different product types for the immersive shopping experience
 */

export type ProductType = 'book' | 'course' | 'bundle' | 'crystal' | 'scroll'

export type ProductCategory =
  | 'beginner'
  | 'intermediate'
  | 'advanced'
  | 'premium'
  | 'free'

export interface Product {
  id: string
  name: string
  type: ProductType
  category: ProductCategory
  price: number // in cents (e.g., 2999 = $29.99)
  description: string
  longDescription?: string
  image?: string

  // 3D scene properties
  glowColor: string // hex color for the glow
  position: [number, number, number] // 3D position in scene
  itemType: '📚' | '🧪' | '💎' | '📜' | '🕯️' // emoji for visual reference

  // Product details
  features?: string[]
  whatYouGet?: string[]
  author?: string
  duration?: string // for courses
  pages?: number // for books
  format?: 'digital' | 'physical' | 'both'

  // Sales/Marketing
  onSale?: boolean
  originalPrice?: number
  badge?: 'new' | 'bestseller' | 'limited' | 'free'

  // Inventory
  inStock: boolean
  limitedQuantity?: number

  // Stripe integration
  stripeProductId?: string
  stripePriceId?: string
}

// Sample products for the 3D laboratory store
export const products: Product[] = [
  // BOOKS
  {
    id: 'book-alchemy-of-mind',
    name: 'The Alchemy of Mind',
    type: 'book',
    category: 'beginner',
    price: 2999, // $29.99
    description: 'Transform your thoughts into gold with ancient wisdom and modern psychology.',
    longDescription: 'A comprehensive guide to mental mastery, blending stoic philosophy with cognitive behavioral techniques.',
    glowColor: '#4ade80', // Green
    position: [-4, -0.8, -2], // Lower left shelf - book position
    itemType: '📚',
    features: [
      '12 chapters of transformative wisdom',
      'Practical exercises and journal prompts',
      'Ancient philosophy meets modern neuroscience',
    ],
    whatYouGet: [
      'Digital PDF (optimized for all devices)',
      'Bonus: Guided meditation audio',
      'Lifetime access and updates',
    ],
    author: 'Dr. Brandon Mills',
    pages: 287,
    format: 'digital',
    badge: 'bestseller',
    inStock: true,
  },

  {
    id: 'book-stoic-foundation',
    name: 'The Stoic Foundation',
    type: 'book',
    category: 'intermediate',
    price: 3499, // $34.99
    description: 'Build unshakeable mental resilience with principles from Marcus Aurelius to modern day.',
    glowColor: '#3b82f6', // Blue
    position: [-4.5, 0.5, -2.5], // Mid-left shelf - book position
    itemType: '📚',
    author: 'Dr. Brandon Mills',
    pages: 342,
    format: 'digital',
    badge: 'new',
    inStock: true,
  },

  // COURSES (Bottles)
  {
    id: 'course-beginner-block-a',
    name: 'Foundation of Self-Mastery',
    type: 'course',
    category: 'beginner',
    price: 9700, // $97
    description: 'Master the fundamentals of personal transformation in 8 weeks.',
    glowColor: '#4ade80', // Green
    position: [-2.8, -0.5, -2.5], // Existing green bottle position
    itemType: '🧪',
    duration: '8 weeks',
    format: 'digital',
    features: [
      '8 comprehensive video modules',
      'Weekly live Q&A sessions',
      'Private community access',
      'Downloadable workbooks',
    ],
    inStock: true,
  },

  {
    id: 'course-intermediate-block-b',
    name: 'Advanced Mind Alchemy',
    type: 'course',
    category: 'intermediate',
    price: 19700, // $197
    description: 'Transform limiting beliefs into empowering truths through advanced techniques.',
    glowColor: '#3b82f6', // Blue
    position: [1.5, 0.8, -3], // Existing blue bottle position
    itemType: '🧪',
    duration: '12 weeks',
    format: 'digital',
    features: [
      '12 advanced training modules',
      'Bi-weekly coaching calls',
      'Inner circle mastermind access',
      'Certification upon completion',
    ],
    badge: 'bestseller',
    inStock: true,
  },

  {
    id: 'course-advanced-block-c',
    name: 'The Philosopher\'s Stone',
    type: 'course',
    category: 'advanced',
    price: 29700, // $297
    description: 'The ultimate transformation program for those ready to unlock their highest potential.',
    glowColor: '#a855f7', // Purple
    position: [3.2, 0.2, -2.8], // Existing purple bottle position
    itemType: '🧪',
    duration: '16 weeks',
    format: 'digital',
    features: [
      '16 elite training modules',
      'Weekly 1-on-1 coaching',
      'Lifetime mastermind access',
      'Implementation support team',
    ],
    badge: 'premium',
    inStock: true,
  },

  // BUNDLES (Crystals)
  {
    id: 'bundle-complete-library',
    name: 'Complete Wisdom Library',
    type: 'bundle',
    category: 'premium',
    price: 19700, // $197
    originalPrice: 29700, // Was $297
    description: 'Every book, every course, lifetime access to everything.',
    glowColor: '#d946ef', // Magenta/Pink
    position: [4.5, -0.3, -1.5], // Right side crystal position
    itemType: '💎',
    onSale: true,
    format: 'digital',
    whatYouGet: [
      'All 5 transformational books',
      'All 3 premium courses',
      'Lifetime updates for all products',
      'Private mastermind community',
      'Monthly live group coaching',
    ],
    badge: 'bestseller',
    inStock: true,
  },

  // FREE RESOURCES (Scrolls)
  {
    id: 'scroll-free-guide',
    name: 'Free Beginner\'s Guide to Self-Mastery',
    type: 'scroll',
    category: 'free',
    price: 0,
    description: 'Start your transformation journey with this comprehensive introduction.',
    glowColor: '#f59e0b', // Amber
    position: [-3.5, 1.5, -3.2], // Existing amber position (scroll on upper shelf)
    itemType: '📜',
    format: 'digital',
    pages: 47,
    badge: 'free',
    inStock: true,
    whatYouGet: [
      '47-page digital guide',
      '5 transformational exercises',
      'Email course series',
    ],
  },
]

// Helper functions
export function getProductsByType(type: ProductType): Product[] {
  return products.filter(p => p.type === type)
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter(p => p.category === category)
}

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
}

export function formatPrice(cents: number): string {
  if (cents === 0) return 'FREE'
  return `$${(cents / 100).toFixed(2)}`
}

export function getProductEmoji(type: ProductType): string {
  const emojiMap: Record<ProductType, string> = {
    book: '📚',
    course: '🧪',
    bundle: '💎',
    crystal: '💎',
    scroll: '📜',
  }
  return emojiMap[type]
}
