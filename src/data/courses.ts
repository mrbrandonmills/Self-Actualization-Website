/**
 * Courses Data
 * Sample course catalog for The Self Actualized Life
 */

export interface Course {
  id: string
  title: string
  description: string
  instructor: string
  duration: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  price: number
  thumbnail: string
  modules: number
  slug: string
  featured?: boolean
  enrolled?: boolean
  progress?: number
}

export const courses: Course[] = [
  // BLOCK A: Laboratory of Foundations - Engineering New Patterns
  {
    id: 'block-a-1',
    title: 'Block A: Engineering Your Patterns',
    description: 'Every one of us is trapped by problems we believe can\'t be solved. Block A helps you engineer new patterns using what you already know. Discover how to escape cycles that keep pulling you back and build sustainable transformation from the ground up.',
    instructor: 'Rock Q Cool Box',
    duration: '6 weeks',
    level: 'Beginner',
    price: 197,
    thumbnail: '',
    modules: 8,
    slug: 'block-a-engineering-patterns',
    featured: true,
  },
  {
    id: 'block-a-2',
    title: 'Block A: Ancient Wisdom Meets Modern Psychology',
    description: 'This laboratory welcomes all the lost wisdom of the Ancients blended with the psychology and philosophy of the modern world. Learn how civilizations rose, how we moved beyond them, and most importantly—what continues to stick with us no matter how we wish it wouldn\'t.',
    instructor: 'Rock Q Cool Box',
    duration: '5 weeks',
    level: 'Beginner',
    price: 177,
    thumbnail: '',
    modules: 7,
    slug: 'block-a-ancient-wisdom',
    featured: true,
  },

  // BLOCK B: Laboratory of Judgment - Navigating Turbulence
  {
    id: 'block-b-1',
    title: 'Block B: The Art of Right Judgment',
    description: 'Block B lays the foundation of how to make the right judgments in an increasingly turbulent world. Master the skill of clear decision-making when everything around you is uncertain, chaotic, and constantly shifting.',
    instructor: 'Rock Q Cool Box',
    duration: '8 weeks',
    level: 'Intermediate',
    price: 297,
    thumbnail: '',
    modules: 10,
    slug: 'block-b-right-judgment',
    featured: true,
  },
  {
    id: 'block-b-2',
    title: 'Block B: Structuring Decisions in Chaos',
    description: 'Learn to structure your decision-making processes with precision and confidence. When the world spins faster and complexity multiplies, this course teaches you to anchor in clarity and navigate with unshakeable wisdom.',
    instructor: 'Rock Q Cool Box',
    duration: '7 weeks',
    level: 'Intermediate',
    price: 267,
    thumbnail: '',
    modules: 9,
    slug: 'block-b-decisions-chaos',
  },

  // BLOCK C: Laboratory of Living - Social Ecosystems
  {
    id: 'block-c-1',
    title: 'Block C: Engineering Your Social Ecosystem',
    description: 'Block C introduces how to structure our social ecosystems in such a way that not only accelerates self-actualization but assures transformation feels like momentum, not uphill struggle. Design relationships and environments that propel you forward.',
    instructor: 'Rock Q Cool Box',
    duration: '10 weeks',
    level: 'Advanced',
    price: 397,
    thumbnail: '',
    modules: 12,
    slug: 'block-c-social-ecosystem',
    featured: true,
  },
  {
    id: 'block-c-2',
    title: 'Block C: Momentum Over Struggle',
    description: 'The final laboratory completes your transformation. Learn to make sustainable growth feel effortless by architecting your environment, relationships, and daily rhythms. Experience transformation as a wave you ride, not a mountain you climb.',
    instructor: 'Rock Q Cool Box',
    duration: '12 weeks',
    level: 'Advanced',
    price: 497,
    thumbnail: '',
    modules: 15,
    slug: 'block-c-momentum',
  },
]

// Helper function to get courses by level
export function getCoursesByLevel(level: Course['level'] | 'All'): Course[] {
  if (level === 'All') {
    return courses
  }
  return courses.filter((course) => course.level === level)
}

// Helper function to get featured courses
export function getFeaturedCourses(): Course[] {
  return courses.filter((course) => course.featured)
}

// Helper function to get course by slug
export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((course) => course.slug === slug)
}

export default courses
