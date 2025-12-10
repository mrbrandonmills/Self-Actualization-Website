/**
 * Courses Data
 * AI-Native Course Platform for Self-Actualize Life
 * 6 courses across 3 blocks with AI tutors
 */

export interface CourseWeek {
  weekNumber: number
  title: string
  theme: string
  lessonCount: number
}

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
  icon?: string
  category?: string
  themeColor?: 'green' | 'blue' | 'purple' | 'gold' | 'cyan' | 'rose'
  // Extended fields for AI-native platform
  weeks: number
  lessonsPerWeek: number
  lessonDuration: string
  blockType: 'A' | 'B' | 'C'
  transformationPromise: string
  learningOutcomes: string[]
  weekStructure: CourseWeek[]
  certificateTitle: string
}

export interface CourseBundle {
  id: string
  title: string
  description: string
  price: number
  originalPrice: number
  savings: number
  courseIds: string[]
}

export const courses: Course[] = [
  // BLOCK A: Foundations - Personal Pattern Work
  {
    id: 'course-1',
    title: 'Engineering Your Patterns',
    description: 'Break free from the autopilot patterns that control your life. This course reveals the unconscious programs running in your mind and gives you the tools to rewrite them. Through understanding communication breakdowns and the addiction matrix, you\'ll engineer new neural pathways for lasting change.',
    instructor: 'Brandon Mills & Jesse Doherty',
    duration: '6 weeks',
    level: 'Beginner',
    price: 97,
    thumbnail: '/images/courses/engineering-patterns.jpg',
    modules: 6,
    slug: 'engineering-your-patterns',
    featured: true,
    icon: '🧬',
    category: 'Pattern Engineering',
    themeColor: 'green',
    weeks: 6,
    lessonsPerWeek: 5,
    lessonDuration: '15-20 min',
    blockType: 'A',
    transformationPromise: 'Understand the unconscious patterns controlling your life and learn to engineer new ones. Break free from autopilot living and design responses that serve your growth.',
    learningOutcomes: [
      'Recognize the 4 stages of unconscious-to-conscious living',
      'Identify your personal addiction matrix and emotional triggers',
      'Master the pause between stimulus and response',
      'Build new neural pathways through deliberate pattern interruption',
      'Develop a sustainable practice for ongoing self-observation'
    ],
    weekStructure: [
      { weekNumber: 1, title: 'The Autopilot Problem', theme: 'Recognizing unconscious patterns', lessonCount: 5 },
      { weekNumber: 2, title: 'Communication Breakdown', theme: 'How patterns create friction', lessonCount: 5 },
      { weekNumber: 3, title: 'The Addiction Matrix', theme: 'Understanding what hooks us', lessonCount: 5 },
      { weekNumber: 4, title: 'Breaking the Loop', theme: 'Pattern interruption techniques', lessonCount: 5 },
      { weekNumber: 5, title: 'Engineering New Responses', theme: 'Building conscious alternatives', lessonCount: 5 },
      { weekNumber: 6, title: 'Integration & Practice', theme: 'Sustainable transformation', lessonCount: 5 }
    ],
    certificateTitle: 'ENGINEERING YOUR PATTERNS: A 6-Week Journey in Conscious Pattern Design'
  },
  {
    id: 'course-2',
    title: 'The Self-Actualization Process',
    description: 'Move beyond fixing yourself to actualizing yourself. This course reveals the path from seeking external completion to discovering the wholeness already within. Learn how relationships, technology, and consciousness work together to accelerate your evolution.',
    instructor: 'Brandon Mills & Jesse Doherty',
    duration: '6 weeks',
    level: 'Beginner',
    price: 97,
    thumbnail: '/images/courses/self-actualization.jpg',
    modules: 6,
    slug: 'self-actualization-process',
    featured: true,
    icon: '🌱',
    category: 'Consciousness Evolution',
    themeColor: 'gold',
    weeks: 6,
    lessonsPerWeek: 5,
    lessonDuration: '15-20 min',
    blockType: 'A',
    transformationPromise: 'Shift from seeking external completion to recognizing the wholeness within. Learn to use relationships and technology as tools for consciousness evolution rather than escape.',
    learningOutcomes: [
      'Understand the difference between self-improvement and self-actualization',
      'Move from transactional to transformational relationships',
      'Use technology intentionally as a consciousness tool',
      'Develop the observer stance for emotional intelligence',
      'Build authentic connections that support growth'
    ],
    weekStructure: [
      { weekNumber: 1, title: 'Beyond Self-Improvement', theme: 'The actualization paradigm shift', lessonCount: 5 },
      { weekNumber: 2, title: 'Wholeness Within', theme: 'Ending the search for completion', lessonCount: 5 },
      { weekNumber: 3, title: 'Conscious Relationships', theme: 'From transaction to transformation', lessonCount: 5 },
      { weekNumber: 4, title: 'Technology as Tool', theme: 'Intentional digital engagement', lessonCount: 5 },
      { weekNumber: 5, title: 'The Observer Stance', theme: 'Emotional intelligence development', lessonCount: 5 },
      { weekNumber: 6, title: 'Living Actualized', theme: 'Integration and forward path', lessonCount: 5 }
    ],
    certificateTitle: 'THE SELF-ACTUALIZATION PROCESS: A 6-Week Journey in Conscious Evolution'
  },

  // BLOCK B: Judgment - Pattern Recognition & Decision Making
  {
    id: 'course-3',
    title: 'The Art of Right Judgment',
    description: 'Develop sophisticated pattern recognition skills that transform how you see yourself and others. Move from reactive triggers to conscious responses, and build communities that support rather than hinder your evolution.',
    instructor: 'Brandon Mills & Jesse Doherty',
    duration: '6 weeks',
    level: 'Intermediate',
    price: 97,
    thumbnail: '/images/courses/right-judgment.jpg',
    modules: 6,
    slug: 'art-of-right-judgment',
    featured: true,
    icon: '⚖️',
    category: 'Pattern Recognition',
    themeColor: 'blue',
    weeks: 6,
    lessonsPerWeek: 5,
    lessonDuration: '15-20 min',
    blockType: 'B',
    transformationPromise: 'Develop sophisticated pattern recognition skills, transform triggers into growth opportunities, and build authentic communities that support conscious evolution.',
    learningOutcomes: [
      'Master the Observer Stance for pattern recognition',
      'Transform triggers into growth opportunities',
      'Build emotional intelligence through neural pathway training',
      'Create conscious community with intentional curation',
      'Navigate the paradox of growth and isolation'
    ],
    weekStructure: [
      { weekNumber: 1, title: 'The Awakening to Patterns', theme: 'Learning to see what was always there', lessonCount: 5 },
      { weekNumber: 2, title: 'The Architecture of Response', theme: 'Understanding triggers and reactions', lessonCount: 5 },
      { weekNumber: 3, title: 'The Tools of Transformation', theme: 'Building your practical toolkit', lessonCount: 5 },
      { weekNumber: 4, title: 'Building Conscious Community', theme: 'From isolation to supported evolution', lessonCount: 5 },
      { weekNumber: 5, title: 'Integration Across Domains', theme: 'Professional, personal, and family', lessonCount: 5 },
      { weekNumber: 6, title: 'The Evolution of Practice', theme: 'From learning to living', lessonCount: 5 }
    ],
    certificateTitle: 'THE ART OF RIGHT JUDGMENT: A 6-Week Course in Pattern Recognition & Conscious Community'
  },
  {
    id: 'course-4',
    title: 'Structuring Decisions in Chaos',
    description: 'Learn to bridge generational and consciousness gaps, implement sustainable awareness practices, and become a translator between different frequencies in an increasingly chaotic world. Master decision-making when everything around you is uncertain.',
    instructor: 'Brandon Mills & Jesse Doherty',
    duration: '6 weeks',
    level: 'Intermediate',
    price: 97,
    thumbnail: '/images/courses/decisions-chaos.jpg',
    modules: 6,
    slug: 'structuring-decisions-chaos',
    featured: false,
    icon: '🌪️',
    category: 'Decision Architecture',
    themeColor: 'cyan',
    weeks: 6,
    lessonsPerWeek: 5,
    lessonDuration: '15-20 min',
    blockType: 'B',
    transformationPromise: 'Learn to bridge generational and consciousness gaps, implement sustainable awareness practices, and become a translator between frequencies in a chaotic world.',
    learningOutcomes: [
      'Bridge generational gaps with patience and demonstration',
      'Use technology to support consciousness, not escape it',
      'Find sustainable methods for your unique journey',
      'Build and contribute to growth networks',
      'Navigate plateaus and continue evolving'
    ],
    weekStructure: [
      { weekNumber: 1, title: 'The Wisdom of Patience', theme: 'Understanding generational patterns', lessonCount: 5 },
      { weekNumber: 2, title: 'The Technology Paradox', theme: 'Using technology for consciousness', lessonCount: 5 },
      { weekNumber: 3, title: 'The Art of Implementation', theme: 'Moving from theory to practice', lessonCount: 5 },
      { weekNumber: 4, title: 'The Community Connection', theme: 'Building growth networks', lessonCount: 5 },
      { weekNumber: 5, title: 'The Evolution of Practice', theme: 'Progress, plateaus, and growth', lessonCount: 5 },
      { weekNumber: 6, title: 'The Bridge to Conscious Living', theme: 'Integration and path forward', lessonCount: 5 }
    ],
    certificateTitle: 'STRUCTURING DECISIONS IN CHAOS: A 6-Week Course in Bridging Gaps & Collective Evolution'
  },

  // BLOCK C: Living - Advanced Integration & Transformation
  {
    id: 'course-5',
    title: 'The Laboratory of Living',
    description: 'Treat your life as research, not waiting for gurus. Learn to document transformation in real-time, discover moments of permission that collapse limitations, use technology as a mirror for consciousness, and navigate the awakening crisis that follows recognition.',
    instructor: 'Brandon Mills & Jesse Doherty',
    duration: '8 weeks',
    level: 'Advanced',
    price: 97,
    thumbnail: '/images/courses/laboratory-living.jpg',
    modules: 8,
    slug: 'laboratory-of-living',
    featured: true,
    icon: '🔬',
    category: 'Conscious Research',
    themeColor: 'purple',
    weeks: 8,
    lessonsPerWeek: 5,
    lessonDuration: '15-20 min',
    blockType: 'C',
    transformationPromise: 'Learn to treat your life as research, discover moments of permission that collapse limitations, use technology as a mirror for consciousness, and navigate the awakening crisis that follows recognition.',
    learningOutcomes: [
      'Develop the researcher mindset for self-examination',
      'Understand moments of permission that collapse barriers',
      'Use technology as a mirror for consciousness',
      'Navigate the awakening crisis with framework and support',
      'Build a personal laboratory practice for ongoing transformation'
    ],
    weekStructure: [
      { weekNumber: 1, title: 'Welcome to the Laboratory', theme: 'Treating life as research', lessonCount: 5 },
      { weekNumber: 2, title: 'Moments of Permission', theme: 'How breakthrough collapses barriers', lessonCount: 5 },
      { weekNumber: 3, title: 'Permission in Collective Consciousness', theme: 'Individual breakthrough touches collective', lessonCount: 5 },
      { weekNumber: 4, title: 'Technology as Mirror', theme: 'Using technology to see patterns', lessonCount: 5 },
      { weekNumber: 5, title: 'The Phone Experiment', theme: 'Personal technology experiments', lessonCount: 5 },
      { weekNumber: 6, title: 'AI as External Mirror', theme: 'Using AI to see blind spots', lessonCount: 5 },
      { weekNumber: 7, title: 'The Awakening Crisis', theme: 'What happens after you see', lessonCount: 5 },
      { weekNumber: 8, title: 'From Crisis to Action', theme: 'Working with crisis consciously', lessonCount: 5 }
    ],
    certificateTitle: 'THE LABORATORY OF LIVING: An 8-Week Journey in Conscious Research'
  },
  {
    id: 'course-6',
    title: 'Conscious Integration',
    description: 'Master conscious transformation without ideal conditions. Learn to bridge generational and cultural gaps, and develop archetypal fluidity - the capacity to move between identity states consciously while maintaining a coherent center.',
    instructor: 'Brandon Mills & Jesse Doherty',
    duration: '8 weeks',
    level: 'Advanced',
    price: 97,
    thumbnail: '/images/courses/conscious-integration.jpg',
    modules: 8,
    slug: 'conscious-integration',
    featured: true,
    icon: '🔮',
    category: 'Transformation Mastery',
    themeColor: 'rose',
    weeks: 8,
    lessonsPerWeek: 5,
    lessonDuration: '15-20 min',
    blockType: 'C',
    transformationPromise: 'Master conscious transformation without ideal conditions, learn to bridge generational and cultural gaps, and develop archetypal fluidity - the capacity to move between identity states consciously.',
    learningOutcomes: [
      'Transform without ideal conditions',
      'Develop the skill of frequency translation',
      'Understand the widest generational gap in history',
      'Master the core pattern of conscious evolution',
      'Build archetypal fluidity with coherent center'
    ],
    weekStructure: [
      { weekNumber: 1, title: 'Transformation Without Safety Net', theme: 'How to transform when conditions aren\'t ideal', lessonCount: 5 },
      { weekNumber: 2, title: 'Real Stories of Transformation', theme: 'Learning from documented transformation', lessonCount: 5 },
      { weekNumber: 3, title: 'The Skill of Translation', theme: 'Learning to bridge frequencies', lessonCount: 5 },
      { weekNumber: 4, title: 'The Generational Gap', theme: 'Bridging the widest gap in history', lessonCount: 5 },
      { weekNumber: 5, title: 'The Integration Framework', theme: 'How everything connects', lessonCount: 5 },
      { weekNumber: 6, title: 'Multiple Archetypes, One Consciousness', theme: 'Developing conscious fluidity', lessonCount: 5 },
      { weekNumber: 7, title: 'Your First Experiment', theme: 'Putting it all together', lessonCount: 5 },
      { weekNumber: 8, title: 'The Invitation Forward', theme: 'What comes next', lessonCount: 5 }
    ],
    certificateTitle: 'CONSCIOUS INTEGRATION: An 8-Week Journey in Archetypal Fluidity'
  }
]

// Course Bundle - All 6 courses
export const courseBundle: CourseBundle = {
  id: 'complete-bundle',
  title: 'Complete Laboratory Collection',
  description: 'All 6 courses in the Random Acts of Self-Actualization series. From pattern engineering to conscious integration, this bundle gives you the complete transformation toolkit at a significant savings.',
  price: 300,
  originalPrice: 582, // 6 x $97
  savings: 282,
  courseIds: [
    'engineering-your-patterns',
    'self-actualization-process',
    'art-of-right-judgment',
    'structuring-decisions-chaos',
    'laboratory-of-living',
    'conscious-integration'
  ]
}

// Helper function to get courses by level
export function getCoursesByLevel(level: Course['level'] | 'All'): Course[] {
  if (level === 'All') {
    return courses
  }
  return courses.filter((course) => course.level === level)
}

// Helper function to get courses by block
export function getCoursesByBlock(block: Course['blockType']): Course[] {
  return courses.filter((course) => course.blockType === block)
}

// Helper function to get featured courses
export function getFeaturedCourses(): Course[] {
  return courses.filter((course) => course.featured)
}

// Helper function to get course by slug
export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((course) => course.slug === slug)
}

// Helper function to get course by ID
export function getCourseById(id: string): Course | undefined {
  return courses.find((course) => course.id === id)
}

// Get total lesson count for a course
export function getTotalLessons(course: Course): number {
  return course.weeks * course.lessonsPerWeek
}

// Get bundle courses
export function getBundleCourses(): Course[] {
  return courseBundle.courseIds
    .map(slug => getCourseBySlug(slug))
    .filter((course): course is Course => course !== undefined)
}

export default courses
