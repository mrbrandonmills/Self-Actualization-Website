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
  {
    id: '1',
    title: 'Foundations of Self-Awareness',
    description: 'Begin your transformative journey by developing deep self-awareness. Learn fundamental practices to observe your thoughts, emotions, and patterns with clarity and compassion.',
    instructor: 'Dr. Marcus Stone',
    duration: '4 weeks',
    level: 'Beginner',
    price: 149,
    thumbnail: '', // Will use gradient placeholder
    modules: 6,
    slug: 'foundations-of-self-awareness',
    featured: true,
  },
  {
    id: '2',
    title: 'Advanced Consciousness Studies',
    description: 'Explore the deepest aspects of human consciousness through philosophy, neuroscience, and contemplative practices. A comprehensive journey into the nature of awareness itself.',
    instructor: 'Dr. Elena Martinez',
    duration: '12 weeks',
    level: 'Advanced',
    price: 499,
    thumbnail: '',
    modules: 12,
    slug: 'advanced-consciousness-studies',
    featured: true,
  },
  {
    id: '3',
    title: 'Practical Mindfulness',
    description: 'Master the art of presence in daily life. Learn evidence-based mindfulness techniques that reduce stress, enhance focus, and cultivate lasting inner peace.',
    instructor: 'Alexandra Sun',
    duration: '6 weeks',
    level: 'Intermediate',
    price: 249,
    thumbnail: '',
    modules: 8,
    slug: 'practical-mindfulness',
    featured: true,
  },
  {
    id: '4',
    title: 'The Art of Authenticity',
    description: 'Discover and express your true self with confidence. Break free from societal conditioning and learn to live authentically aligned with your deepest values.',
    instructor: 'Michael Rivers',
    duration: '3 weeks',
    level: 'Beginner',
    price: 129,
    thumbnail: '',
    modules: 5,
    slug: 'the-art-of-authenticity',
  },
  {
    id: '5',
    title: 'Mastering Your Mind',
    description: 'Advanced cognitive training for peak mental performance. Integrate cutting-edge neuroscience with ancient wisdom to unlock your full intellectual and creative potential.',
    instructor: 'Dr. Sarah Chen',
    duration: '10 weeks',
    level: 'Advanced',
    price: 599,
    thumbnail: '',
    modules: 15,
    slug: 'mastering-your-mind',
  },
  {
    id: '6',
    title: 'Living with Purpose',
    description: 'Clarify your life purpose and create a roadmap for meaningful contribution. Discover what truly matters and align your daily actions with your deepest calling.',
    instructor: 'Dr. James Whitmore',
    duration: '8 weeks',
    level: 'Intermediate',
    price: 349,
    thumbnail: '',
    modules: 10,
    slug: 'living-with-purpose',
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
