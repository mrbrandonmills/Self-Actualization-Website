export interface PageConfig {
  id: string
  texture: string
  startPos: [number, number, number]  // [x, y, z]
  endPos: [number, number, number]
  startRot: [number, number, number]  // [pitch, yaw, roll] in radians
  endRot: [number, number, number]
  timing: {
    start: number  // 0.0 to 1.0 (scroll progress)
    end: number
  }
}

// 10 pages with varied trajectories (add 5 more after testing)
export const pageChoreography: PageConfig[] = [
  // Cover - flies left and forward
  {
    id: 'cover',
    texture: '/books/blocks-a-b/page-01-cover.jpg',
    startPos: [0, 0, 0],
    endPos: [-8, 2, 15],
    startRot: [0, 0, 0],
    endRot: [0, 0.2, 0.3],
    timing: { start: 0.0, end: 1.0 }
  },

  // Page 2 - flies right and up
  {
    id: 'page-2',
    texture: '/books/blocks-a-b/page-02.jpg',
    startPos: [0, 0, -0.1],
    endPos: [6, 4, 10],
    startRot: [0, 0, 0],
    endRot: [0.3, 0.5, 0],
    timing: { start: 0.1, end: 0.9 }
  },

  // Page 3 - flies left, down, backward
  {
    id: 'page-3',
    texture: '/books/blocks-a-b/page-03.jpg',
    startPos: [0, 0, -0.2],
    endPos: [-3, -5, -10],
    startRot: [0, 0, 0],
    endRot: [0, 0.8, 0.1],
    timing: { start: 0.15, end: 0.85 }
  },

  // Page 4 - flies right, down, forward
  {
    id: 'page-4',
    texture: '/books/blocks-a-b/page-04.jpg',
    startPos: [0, 0, -0.3],
    endPos: [5, -3, 8],
    startRot: [0, 0, 0],
    endRot: [-0.4, 0.3, 0.2],
    timing: { start: 0.2, end: 0.8 }
  },

  // Page 5 - flies up dramatically
  {
    id: 'page-5',
    texture: '/books/blocks-a-b/page-05.jpg',
    startPos: [0, 0, -0.4],
    endPos: [0, 8, 12],
    startRot: [0, 0, 0],
    endRot: [0.5, 0, 0],
    timing: { start: 0.25, end: 0.75 }
  },

  // Page 6 - flies backward dramatically
  {
    id: 'page-6',
    texture: '/books/blocks-a-b/page-06.jpg',
    startPos: [0, 0, -0.5],
    endPos: [2, 1, -15],
    startRot: [0, 0, 0],
    endRot: [0, -0.6, 0],
    timing: { start: 0.3, end: 0.7 }
  },

  // Page 7 - flies left and rotates
  {
    id: 'page-7',
    texture: '/books/blocks-a-b/page-07.jpg',
    startPos: [0, 0, -0.6],
    endPos: [-7, 0, 5],
    startRot: [0, 0, 0],
    endRot: [0.2, 0.9, 0.4],
    timing: { start: 0.35, end: 0.65 }
  },

  // Page 8 - flies right, up, forward
  {
    id: 'page-8',
    texture: '/books/blocks-a-b/page-08.jpg',
    startPos: [0, 0, -0.7],
    endPos: [8, 5, 14],
    startRot: [0, 0, 0],
    endRot: [-0.3, -0.4, -0.2],
    timing: { start: 0.4, end: 0.6 }
  },

  // Page 9 - flies down dramatically
  {
    id: 'page-9',
    texture: '/books/blocks-a-b/page-09.jpg',
    startPos: [0, 0, -0.8],
    endPos: [-2, -7, 6],
    startRot: [0, 0, 0],
    endRot: [0.6, 0.2, -0.3],
    timing: { start: 0.45, end: 0.55 }
  },

  // Page 10 - flies forward and spins
  {
    id: 'page-10',
    texture: '/books/blocks-a-b/page-10.jpg',
    startPos: [0, 0, -0.9],
    endPos: [1, 3, 18],
    startRot: [0, 0, 0],
    endRot: [0, 1.2, 0.5],
    timing: { start: 0.5, end: 0.5 }
  },

  // Page 11 - dramatic left sweep
  {
    id: 'page-11',
    texture: '/books/blocks-a-b/page-11.jpg',
    startPos: [0, 0, -1.0],
    endPos: [-10, 3, 7],
    startRot: [0, 0, 0],
    endRot: [0.4, 0.7, 0.6],
    timing: { start: 0.55, end: 0.95 }
  },

  // Page 12 - upward spiral
  {
    id: 'page-12',
    texture: '/books/blocks-a-b/page-12.jpg',
    startPos: [0, 0, -1.1],
    endPos: [3, 10, 11],
    startRot: [0, 0, 0],
    endRot: [0.8, -0.3, 0.2],
    timing: { start: 0.6, end: 0.9 }
  },

  // Page 13 - backward dive
  {
    id: 'page-13',
    texture: '/books/blocks-a-b/page-13.jpg',
    startPos: [0, 0, -1.2],
    endPos: [-4, -2, -18],
    startRot: [0, 0, 0],
    endRot: [-0.5, -0.9, -0.4],
    timing: { start: 0.65, end: 0.85 }
  },

  // Page 14 - right arc
  {
    id: 'page-14',
    texture: '/books/blocks-a-b/page-14.jpg',
    startPos: [0, 0, -1.3],
    endPos: [9, 2, 13],
    startRot: [0, 0, 0],
    endRot: [0.2, -0.8, -0.3],
    timing: { start: 0.7, end: 0.8 }
  },

  // Page 15 - final scatter
  {
    id: 'page-15',
    texture: '/books/blocks-a-b/page-15.jpg',
    startPos: [0, 0, -1.4],
    endPos: [0, 6, 20],
    startRot: [0, 0, 0],
    endRot: [0.3, 1.5, 0.7],
    timing: { start: 0.75, end: 1.0 }
  },
]

// Helper function to interpolate position/rotation
export function interpolate(
  start: [number, number, number],
  end: [number, number, number],
  progress: number
): [number, number, number] {
  return [
    start[0] + (end[0] - start[0]) * progress,
    start[1] + (end[1] - start[1]) * progress,
    start[2] + (end[2] - start[2]) * progress,
  ]
}

// Map global scroll progress to page-specific progress
export function getPageProgress(
  scrollProgress: number,
  timing: { start: number; end: number }
): number {
  if (scrollProgress < timing.start) return 0
  if (scrollProgress > timing.end) return 1

  return (scrollProgress - timing.start) / (timing.end - timing.start)
}
