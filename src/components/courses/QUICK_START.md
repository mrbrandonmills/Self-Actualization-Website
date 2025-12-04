# CoursePreviewPanel - Quick Start Guide

## 1-Minute Integration

### Copy this code into your component:

```tsx
'use client'

import { useState } from 'react'
import { CoursePreviewPanel } from '@/components/courses/CoursePreviewPanel'
import { Course } from '@/data/courses'
import { getCourseColor } from '@/lib/rainbow-colors'

export default function YourPage() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [courseIndex, setCourseIndex] = useState(0)

  const openPreview = (course: Course, index: number) => {
    setSelectedCourse(course)
    setCourseIndex(index)
    setIsPanelOpen(true)
  }

  const closePreview = () => {
    setIsPanelOpen(false)
    setTimeout(() => setSelectedCourse(null), 300)
  }

  return (
    <>
      {/* Your content with click handler */}
      <div onClick={() => openPreview(someCourse, 0)}>
        Click me
      </div>

      {/* The panel */}
      <CoursePreviewPanel
        course={selectedCourse}
        isOpen={isPanelOpen}
        onClose={closePreview}
        liquidColor={getCourseColor(courseIndex).base}
      />
    </>
  )
}
```

## Demo Page

Visit: `http://localhost:3000/course-preview-demo`

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `course` | `Course \| null` | Yes | Course data to display |
| `isOpen` | `boolean` | Yes | Panel visibility state |
| `onClose` | `() => void` | Yes | Callback when panel closes |
| `liquidColor` | `string` | Yes | Hex color for liquid header |

## Features

- Holographic glassmorphism design
- Animated liquid header (swirling, waves, particles)
- Slide-in/out animations
- Click outside to close
- Escape key support
- Body scroll lock
- Fully responsive
- Accessible

## File Locations

- Component: `/src/components/courses/CoursePreviewPanel.tsx`
- Demo: `/src/app/course-preview-demo/page.tsx`
- Docs: `/src/components/courses/CoursePreviewPanel.README.md`
- Integration: `/src/components/courses/INTEGRATION.md`

## Need Help?

1. Check the README for full documentation
2. View the demo page for working examples
3. Read INTEGRATION.md for detailed setup guides
4. Check COMPONENT_TREE.md for architecture details
