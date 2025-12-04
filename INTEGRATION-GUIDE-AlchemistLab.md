# Alchemist's Laboratory - Integration Guide

## Quick Start

The Alchemist's Laboratory 3D scene is ready to use! Here's how to integrate it.

## Option 1: Replace Existing Courses Page

To completely replace the current courses page with the 3D laboratory:

1. **Backup current page** (optional):
```bash
mv src/app/courses/page.tsx src/app/courses/page.tsx.backup
```

2. **Copy the test page**:
```bash
cp src/app/alchemist-lab/page.tsx src/app/courses/page.tsx
```

3. **Done!** Visit `/courses` to see the 3D laboratory.

## Option 2: Add as Section to Existing Page

To add the 3D laboratory as a hero section above the current course grid:

### Update `/src/app/courses/page.tsx`:

```tsx
'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { CourseCard } from '@/components/courses/course-card'
import { courses, Course } from '@/data/courses'
import { useState } from 'react'

// Dynamic import for 3D scene (avoid SSR)
const AlchemistLaboratory = dynamic(
  () => import('@/components/3d/AlchemistLaboratory'),
  { ssr: false }
)

type LevelFilter = 'All' | Course['level']
const levels: LevelFilter[] = ['All', 'Beginner', 'Intermediate', 'Advanced']

export default function CoursesPage() {
  const [activeLevel, setActiveLevel] = useState<LevelFilter>('All')
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null)

  const filteredCourses = activeLevel === 'All'
    ? courses
    : courses.filter(course => course.level === activeLevel)

  const handleBeakerClick = (courseId: string) => {
    setSelectedCourseId(courseId)
    // Optional: Scroll to course details
    const element = document.getElementById(`course-${courseId}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <main className="min-h-screen">
      {/* 3D Laboratory Hero Section */}
      <section className="h-screen relative">
        <AlchemistLaboratory
          courses={courses}
          onBeakerClick={handleBeakerClick}
          selectedCourseId={selectedCourseId}
        />

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Traditional Course Grid Section */}
      <section className="pt-24 pb-16" style={{ background: '#EDE3D3', color: '#3A3A3A' }}>
        {/* ... rest of existing courses page code ... */}
        {/* (page header, filters, course grid) */}
      </section>
    </main>
  )
}
```

## Option 3: Toggle Between Views

Add a view switcher to toggle between 3D and grid views:

```tsx
'use client'

import { useState } from 'react'
// ... imports

export default function CoursesPage() {
  const [view, setView] = useState<'3d' | 'grid'>('3d')
  // ... rest of state

  return (
    <main className="min-h-screen">
      {/* View toggle button */}
      <button
        onClick={() => setView(view === '3d' ? 'grid' : '3d')}
        className="fixed top-24 right-8 z-50 px-6 py-3 rounded-full bg-[#D4AF37] text-[#05201f] font-medium"
      >
        {view === '3d' ? '📋 Grid View' : '🧪 Lab View'}
      </button>

      {/* Conditional rendering */}
      {view === '3d' ? (
        <AlchemistLaboratory
          courses={courses}
          onBeakerClick={handleBeakerClick}
          selectedCourseId={selectedCourseId}
        />
      ) : (
        // ... existing course grid
      )}
    </main>
  )
}
```

## Test First

Before integrating into `/courses`, test at:
- **Test Page**: `/alchemist-lab`
- Verify interactions work
- Test on mobile devices
- Check performance

## Performance Notes

### Desktop
- Smooth 60fps animations
- Full particle effects
- Background laboratory instruments
- Shadow rendering enabled

### Mobile (< 768px)
- Simplified geometry
- Reduced particle count (50 vs 100)
- No background instruments
- Optimized shadows
- Zoom disabled

### Loading
- Uses `dynamic` import with `ssr: false`
- Shows loading state during Three.js initialization
- Lazy loads 3D dependencies

## Customization

### Colors

Edit beaker liquid colors in `/src/components/3d/AlchemistLaboratory.tsx`:

```tsx
const getLiquidColor = (level: Course['level']): string => {
  switch (level) {
    case 'Beginner':
      return '#4ade80' // Change this
    case 'Intermediate':
      return '#3b82f6' // Change this
    case 'Advanced':
      return '#a855f7' // Change this
  }
}
```

### Beaker Arrangement

Modify arc formation:

```tsx
const beakerPositions = useMemo(() => {
  const radius = 4 // Distance from center
  const angleStep = Math.PI / (courses.length + 1)
  // ... calculation
}, [courses.length])
```

### Lighting

Adjust spotlight intensity and colors in `LaboratoryEnvironment`:

```tsx
<spotLight
  position={[0, 8, 0]}
  intensity={2} // Brightness
  color="#D4AF37" // Color
  // ... other props
/>
```

## Browser Support

Tested on:
- Chrome/Edge (Chromium) 90+
- Firefox 88+
- Safari 14+
- Mobile Safari iOS 14+
- Chrome Android 90+

Requires WebGL 2.0 support.

## Troubleshooting

### Black screen
- Check browser console for errors
- Verify Three.js dependencies installed
- Ensure WebGL is enabled

### Poor performance
- Reduce particle count
- Disable shadows
- Simplify geometry
- Lower `dpr` setting

### Click not working
- Check `pointer-events` CSS
- Verify `onClick` handler attached
- Test with browser DevTools

### Course data not showing
- Verify `@/data/courses` import path
- Check course array structure
- Console log courses prop

## Files Created

1. `/src/components/3d/AlchemistLaboratory.tsx` - Main 3D scene component
2. `/src/app/alchemist-lab/page.tsx` - Test/demo page
3. `/src/components/3d/README-AlchemistLaboratory.md` - Component documentation
4. `/INTEGRATION-GUIDE-AlchemistLab.md` - This file

## Next Steps

1. Test at `/alchemist-lab` ✓
2. Choose integration option
3. Update `/courses` page
4. Test on mobile
5. Deploy!

---

**Questions?** Check the README or test page for reference implementation.

**Design Standard**: KASANÉ-level museum quality. Every pixel matters.
