/**
 * Essays & Research Papers Data - The Self Actualized Life
 * Academic research and thought leadership
 */

export interface Essay {
  id: string
  title: string
  subtitle?: string
  author: string
  coAuthors?: string[]
  publishDate: string
  category: 'Psychology' | 'Neuroscience' | 'Philosophy' | 'Communication' | 'Identity'
  abstract: string
  readingTime: string
  slug: string
  featured?: boolean
  institution?: string
  course?: string
  tags: string[]
  pdfPath?: string // Path to full PDF if available
  pageCount: number
}

export const essays: Essay[] = [
  {
    id: 'quantum-coherent-state',
    title: 'Self-Actualization as a Quantum-Coherent State',
    subtitle: 'Bridging Neuroscience and Quantum Mechanics',
    author: 'Brandon Mills',
    publishDate: 'October 28, 2024',
    category: 'Neuroscience',
    abstract: 'This paper proposes that self-actualization corresponds to quantum-coherent brain states characterized by gamma-frequency neural synchrony. Integrating Jungian individuation, Maslow\'s hierarchy, and cutting-edge neuroscience research, we present an experimental framework combining EEG/MEG measurements, gamma stimulation interventions, and real-time neurofeedback. The hypothesis suggests that individuals experiencing self-actualization exhibit enhanced 40 Hz gamma coherence, reduced neural entropy, and increased cross-frequency coupling—marking a shift from fragmented to unified conscious experience.',
    readingTime: '45 min read',
    slug: 'quantum-coherent-state',
    featured: true,
    institution: 'San Diego City College',
    tags: ['Neuroscience', 'Quantum Mechanics', 'Self-Actualization', 'EEG', 'Gamma Oscillations', 'Consciousness'],
    pdfPath: '/docs/essays/Self-Actualization as a Quantum-Coherent State_ Bridging Neuroscience and Quantum Mechanics - Brandon Mills.pdf',
    pageCount: 47
  },
  {
    id: 'codependency-interpersonal-communication',
    title: 'The Role of Codependency in Interpersonal Communication',
    subtitle: 'A Journey from Awareness to Healing',
    author: 'Brandon Mills',
    publishDate: 'November 14, 2023',
    category: 'Communication',
    abstract: 'An exploration of codependency as one of society\'s most insidious yet overlooked addictions. This paper examines codependency through comprehensive literature review and personal narrative, investigating how individuals can foster healthy relationships through heightened awareness. Drawing from 17 months of 12-step recovery work and weekly counseling, the research illuminates patterns, characteristics, and factors leading to codependency, while providing practical pathways to recovery through self-care, boundary-setting, and addressing childhood trauma.',
    readingTime: '12 min read',
    slug: 'codependency-interpersonal-communication',
    featured: true,
    institution: 'San Diego City College',
    course: 'COMS 135: Interpersonal Communications',
    tags: ['Codependency', 'Relationships', 'Attachment Theory', 'Recovery', 'Communication', 'Boundaries'],
    pdfPath: '/docs/essays/Codependency Essay.pdf',
    pageCount: 12
  },
  {
    id: 'archetype-of-fluidity',
    title: 'The Archetype of Fluidity',
    subtitle: 'A Machine Learning Framework for Modeling Identity as Dynamic Archetypal States',
    author: 'Brandon Mills',
    publishDate: '2024',
    category: 'Identity',
    abstract: 'This paper proposes a machine learning framework for modeling identity not as fixed roles but as dynamic movements through archetypal states. Using archetypal analysis, clustering algorithms, and temporal sequence analysis, we examine how individuals—from cheerleaders to corporate executives—embody bright and shadow traits across different contexts. Rather than viewing archetypes as categorical boxes, this framework treats them as testable hypotheses about human behavior patterns, offering a computational lens on Jungian psychology and modern identity formation.',
    readingTime: '15 min read',
    slug: 'archetype-of-fluidity',
    featured: true,
    institution: 'San Diego City College',
    course: 'PSYC 255',
    tags: ['Machine Learning', 'Identity', 'Archetypes', 'Psychology', 'Computational Models', 'Jung'],
    pdfPath: '/docs/essays/The Archetype of Fluidity A Machine Learning Framework for Modeling Identity as Dynamic Archetypal States.pdf',
    pageCount: 10
  },
  {
    id: 'psychological-pathways-fundamentalism',
    title: 'Psychological Pathways of Christian Fundamentalism',
    subtitle: 'A Mixed-Methods Study of Cognition, Upbringing, and Sociopolitical Behavior',
    author: 'Brandon Mills',
    publishDate: '2024',
    category: 'Psychology',
    abstract: 'A comprehensive mixed-methods investigation into the psychological mechanisms reinforcing fundamentalist belief systems. This research combines quantitative surveys (N≈400) with in-depth qualitative interviews (n≈30) across Evangelical, Orthodox, and Catholic fundamentalist communities. Employing regression analysis, structural equation modeling, machine learning classification, and NLP sentiment analysis, the study explores how cognitive patterns, childhood upbringing, and sociopolitical behaviors interweave to sustain fundamentalist worldviews—and what interventions might promote cognitive flexibility.',
    readingTime: '8 min read',
    slug: 'psychological-pathways-fundamentalism',
    featured: false,
    tags: ['Psychology', 'Religion', 'Cognitive Science', 'Mixed Methods', 'Fundamentalism', 'Research Design'],
    pdfPath: '/docs/essays/Psychological Pathways of Christian Fundamentalism A Mixed-Methods Study of Cognition, Upbringing, and Sociopolitical Behavior (1).pdf',
    pageCount: 5
  },
  {
    id: 'environmental-racism-rhetorical-analysis',
    title: 'Environmental Racism',
    subtitle: 'A Rhetorical Analysis of John Oliver\'s "Last Week Tonight" Episode',
    author: 'Brandon Mills',
    publishDate: 'October 2, 2023',
    category: 'Communication',
    abstract: 'A critical rhetorical analysis examining how John Oliver\'s "Last Week Tonight" exposes environmental racism through political satire. This essay analyzes Oliver\'s claims, evidence, and persuasive techniques in demonstrating how Black communities face disproportionate exposure to pollution, toxic waste, and hazardous facilities. From Cancer Alley in Louisiana to Shingle Mountain in Texas, the analysis reveals how redlining, zoning laws, and systemic racism create "sacrifice zones" where communities of color are trapped in environmental death traps—with life expectancies 15 years shorter than their white counterparts.',
    readingTime: '10 min read',
    slug: 'environmental-racism-rhetorical-analysis',
    featured: false,
    institution: 'San Diego City College',
    course: 'English 101',
    tags: ['Environmental Racism', 'Rhetorical Analysis', 'Political Satire', 'Social Justice', 'Systemic Racism', 'Media Studies'],
    pdfPath: '/docs/essays/Enviromental Racism -Rhetorical Analysis Essay.pdf',
    pageCount: 8
  }
]

// Helper function to get essays by category
export function getEssaysByCategory(category: Essay['category'] | 'All'): Essay[] {
  if (category === 'All') {
    return essays
  }
  return essays.filter((essay) => essay.category === category)
}

// Helper function to get featured essays
export function getFeaturedEssays(): Essay[] {
  return essays.filter((essay) => essay.featured)
}

// Helper function to get essay by slug
export function getEssayBySlug(slug: string): Essay | undefined {
  return essays.find((essay) => essay.slug === slug)
}

// Helper function to get essays by author
export function getEssaysByAuthor(authorName: string): Essay[] {
  return essays.filter((essay) =>
    essay.author === authorName ||
    essay.coAuthors?.includes(authorName)
  )
}

// Helper function to get essays by tag
export function getEssaysByTag(tag: string): Essay[] {
  return essays.filter((essay) => essay.tags.includes(tag))
}

// Get all unique tags
export function getAllTags(): string[] {
  const tagSet = new Set<string>()
  essays.forEach((essay) => {
    essay.tags.forEach((tag) => tagSet.add(tag))
  })
  return Array.from(tagSet).sort()
}

// Get all unique categories
export function getAllCategories(): Essay['category'][] {
  const categories = new Set<Essay['category']>()
  essays.forEach((essay) => categories.add(essay.category))
  return Array.from(categories)
}

export default essays
