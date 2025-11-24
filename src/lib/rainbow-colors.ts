/**
 * Rainbow Color Mapping for Cards
 * Each book and course gets a unique vibrant color
 */

// Rainbow color palette
const rainbow = {
  coralSunset: '#FF6B6B',
  lavenderDream: '#A78BFA',
  peachyKeen: '#FDBA74',
  oceanBreeze: '#67E8F9',
  mintFresh: '#6EE7B7',
  roseGarden: '#FB7185',
  goldenHour: '#FCD34D',
  skyBlue: '#7DD3FC',
  violetSky: '#C084FC',
  seafoam: '#5EEAD4',
  cherryBlossom: '#F9A8D4',
  limeZest: '#BEF264',
}

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
  switch (route) {
    case '/books':
      return rainbow.coralSunset
    case '/courses':
      return rainbow.lavenderDream
    case '/writing-lab':
      return rainbow.mintFresh
    case '/blog':
      return rainbow.peachyKeen
    case '/about':
      return rainbow.oceanBreeze
    default:
      return rainbow.coralSunset // default
  }
}

/**
 * Generate gradient background for card
 */
export function getCardGradient(color: string | { base: string; glow: string }) {
  const baseColor = typeof color === 'string' ? color : color.base;
  return `linear-gradient(135deg, ${baseColor} 0%, ${baseColor}dd 50%, ${baseColor}aa 100%)`
}
