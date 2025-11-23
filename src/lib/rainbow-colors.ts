/**
 * Rainbow Color Mapping for Cards
 * Each book and course gets a unique vibrant color
 */

import { designTokens } from './design-tokens'

const { rainbow } = designTokens.colors

// Book card color mapping (6 unique colors)
const BOOK_COLORS = [
  rainbow.coralSunset,      // #FF6B6B - Coral Sunset
  rainbow.lavenderDream,    // #A78BFA - Lavender Dream
  rainbow.peachyKeen,       // #FDBA74 - Peachy Keen
  rainbow.oceanBreeze,      // #67E8F9 - Ocean Breeze
  rainbow.mintFresh,        // #6EE7B7 - Mint Fresh
  rainbow.roseGarden,       // #FB7185 - Rose Garden
]

// Course card color mapping (6 unique colors)
const COURSE_COLORS = [
  rainbow.goldenHour,       // #FCD34D - Golden Hour
  rainbow.violetSky,        // #C084FC - Violet Sky
  rainbow.seafoam,          // #5EEAD4 - Seafoam
  rainbow.cherryBlossom,    // #F9A8D4 - Cherry Blossom
  rainbow.limeZest,         // #BEF264 - Lime Zest
  rainbow.skyBlue,          // #7DD3FC - Sky Blue
]

/**
 * Get unique color for book card based on index
 */
export function getBookColor(index: number) {
  return BOOK_COLORS[index % BOOK_COLORS.length]
}

/**
 * Get unique color for course card based on index
 */
export function getCourseColor(index: number) {
  return COURSE_COLORS[index % COURSE_COLORS.length]
}

/**
 * Get navigation link color by route
 */
export function getNavColor(route: string): string {
  const { navColors } = designTokens.colors

  switch (route) {
    case '/books':
      return navColors.books
    case '/courses':
      return navColors.courses
    case '/writing-lab':
      return navColors.writingLab
    case '/blog':
      return navColors.blog
    case '/about':
      return navColors.about
    default:
      return navColors.books // default
  }
}

/**
 * Generate gradient background for card
 */
export function getCardGradient(color: { base: string; glow: string }) {
  return `linear-gradient(135deg, ${color.base} 0%, ${color.base}dd 50%, ${color.base}aa 100%)`
}
