# CoursePreviewPanel Integration Guide

## Quick Start: Adding to Courses Page

### Step 1: Update your courses page with state management

```tsx
'use client'

import { useState } from 'react'
import { CourseCard } from '@/components/courses/course-card'
import { CoursePreviewPanel } from '@/components/courses/CoursePreviewPanel'
import { courses, Course } from '@/data/courses'
import { getCourseColor } from '@/lib/rainbow-colors'

export default function CoursesPage() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleCourseClick = (course: Course, index: number) => {
    setSelectedCourse(course)
    setSelectedIndex(index)
    setIsPanelOpen(true)
  }

  const handleClosePanel = () => {
    setIsPanelOpen(false)
    // Delay clearing course to allow exit animation
    setTimeout(() => setSelectedCourse(null), 300)
  }

  return (
    <div className="min-h-screen bg-[#05201F]">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-serif text-gold-500 mb-12">
          Course Catalog
        </h1>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div
              key={course.id}
              onClick={() => handleCourseClick(course, index)}
              className="cursor-pointer"
            >
              <CourseCard course={course} index={index} />
            </div>
          ))}
        </div>
      </div>

      {/* Preview Panel */}
      <CoursePreviewPanel
        course={selectedCourse}
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
        liquidColor={getCourseColor(selectedIndex).base}
      />
    </div>
  )
}
```

### Step 2: Modify CourseCard to support click event

Update `/src/components/courses/course-card.tsx`:

```tsx
// Add onClick prop to CourseCardProps
interface CourseCardProps {
  course: Course
  index: number
  onClick?: () => void  // Add this
}

// Add onClick to component
export function CourseCard({ course, index, onClick }: CourseCardProps) {
  // ... existing code ...

  return (
    <motion.div
      onClick={onClick}  // Add this
      // ... rest of the props
    >
      {/* ... existing JSX ... */}
    </motion.div>
  )
}
```

## Integration with Beaker Component

If you have a beaker/laboratory component:

```tsx
interface BeakerProps {
  course: Course
  index: number
  onBeakerClick: (course: Course, index: number) => void
}

function CourseBeaker({ course, index, onBeakerClick }: BeakerProps) {
  const liquidColor = getCourseColor(index).base

  return (
    <div
      className="beaker-container cursor-pointer"
      onClick={() => onBeakerClick(course, index)}
    >
      {/* Your beaker SVG/component */}
      <div
        className="liquid"
        style={{ backgroundColor: liquidColor }}
      />
      <div className="label">{course.title}</div>
    </div>
  )
}

// In parent component:
function Laboratory() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [liquidColor, setLiquidColor] = useState('#C9A050')

  const handleBeakerClick = (course: Course, index: number) => {
    setSelectedCourse(course)
    setLiquidColor(getCourseColor(index).base)
    setIsPanelOpen(true)
  }

  return (
    <>
      <div className="beakers-grid">
        {courses.map((course, index) => (
          <CourseBeaker
            key={course.id}
            course={course}
            index={index}
            onBeakerClick={handleBeakerClick}
          />
        ))}
      </div>

      <CoursePreviewPanel
        course={selectedCourse}
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        liquidColor={liquidColor}
      />
    </>
  )
}
```

## Global State Management (Optional)

For complex applications, use a global state store:

### Using Zustand

```tsx
// store/coursePreview.ts
import { create } from 'zustand'
import { Course } from '@/data/courses'

interface CoursePreviewState {
  selectedCourse: Course | null
  isPanelOpen: boolean
  liquidColor: string
  openPreview: (course: Course, color: string) => void
  closePreview: () => void
}

export const useCoursePreview = create<CoursePreviewState>((set) => ({
  selectedCourse: null,
  isPanelOpen: false,
  liquidColor: '#C9A050',
  openPreview: (course, color) =>
    set({ selectedCourse: course, isPanelOpen: true, liquidColor: color }),
  closePreview: () => set({ isPanelOpen: false }),
}))

// In your component:
import { useCoursePreview } from '@/store/coursePreview'

function CourseCard({ course, index }: CourseCardProps) {
  const { openPreview } = useCoursePreview()
  const color = getCourseColor(index).base

  return (
    <div onClick={() => openPreview(course, color)}>
      {/* ... */}
    </div>
  )
}

// Layout component (renders panel globally):
function RootLayout({ children }) {
  const { selectedCourse, isPanelOpen, liquidColor, closePreview } =
    useCoursePreview()

  return (
    <>
      {children}
      <CoursePreviewPanel
        course={selectedCourse}
        isOpen={isPanelOpen}
        onClose={closePreview}
        liquidColor={liquidColor}
      />
    </>
  )
}
```

### Using React Context

```tsx
// context/CoursePreviewContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react'
import { Course } from '@/data/courses'

interface CoursePreviewContextType {
  selectedCourse: Course | null
  isPanelOpen: boolean
  liquidColor: string
  openPreview: (course: Course, color: string) => void
  closePreview: () => void
}

const CoursePreviewContext = createContext<CoursePreviewContextType | null>(null)

export function CoursePreviewProvider({ children }: { children: ReactNode }) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [liquidColor, setLiquidColor] = useState('#C9A050')

  const openPreview = (course: Course, color: string) => {
    setSelectedCourse(course)
    setLiquidColor(color)
    setIsPanelOpen(true)
  }

  const closePreview = () => {
    setIsPanelOpen(false)
    setTimeout(() => setSelectedCourse(null), 300)
  }

  return (
    <CoursePreviewContext.Provider
      value={{ selectedCourse, isPanelOpen, liquidColor, openPreview, closePreview }}
    >
      {children}
    </CoursePreviewContext.Provider>
  )
}

export const useCoursePreview = () => {
  const context = useContext(CoursePreviewContext)
  if (!context) {
    throw new Error('useCoursePreview must be used within CoursePreviewProvider')
  }
  return context
}
```

## Customization Examples

### Custom Liquid Colors

```tsx
// Match brand colors
const CUSTOM_COLORS = {
  beginner: '#6EE7B7',    // Mint green
  intermediate: '#FCD34D', // Gold
  advanced: '#C084FC',     // Purple
}

const liquidColor = CUSTOM_COLORS[course.level.toLowerCase()]
```

### Custom Panel Width

```tsx
// In CoursePreviewPanel.tsx, modify the motion.div className:
className="fixed inset-y-0 right-0 z-[101] w-full md:w-[800px] lg:w-[900px]"
// Adjust breakpoints as needed
```

### Disable Scroll Lock

```tsx
// Remove these lines from useEffect:
document.body.style.overflow = 'hidden'
// and
document.body.style.overflow = 'unset'
```

### Custom Enroll Handler

```tsx
<CoursePreviewPanel
  course={selectedCourse}
  isOpen={isPanelOpen}
  onClose={handleClosePanel}
  liquidColor={liquidColor}
  onEnroll={(course) => {
    // Your custom enrollment logic
    router.push(`/checkout?course=${course.id}`)
  }}
/>

// Update CoursePreviewPanel props:
interface CoursePreviewPanelProps {
  // ... existing props
  onEnroll?: (course: Course) => void
}

// In the component:
onClick={() => {
  if (onEnroll) {
    onEnroll(course)
  } else {
    console.log('Enrolling in course:', course.id)
  }
}}
```

## Testing

### Manual Testing Checklist

- [ ] Panel opens when clicking course/beaker
- [ ] Panel closes when clicking X button
- [ ] Panel closes when clicking backdrop
- [ ] Panel closes when pressing Escape
- [ ] Liquid animation plays smoothly
- [ ] Particles float naturally
- [ ] Shimmer effect works
- [ ] Content stagger animation works
- [ ] Enroll button logs to console
- [ ] Responsive on mobile (full screen)
- [ ] Responsive on desktop (slide-out)
- [ ] Body scroll locks when open
- [ ] Body scroll restores when closed
- [ ] No animation jank
- [ ] Colors match beaker/card colors

### Browser Testing

- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## Troubleshooting

### Panel doesn't open
- Check that `isOpen` state is being set to `true`
- Verify z-index is high enough (should be 100+)
- Check for console errors

### Animations are choppy
- Reduce particle count (currently 12)
- Simplify liquid rotation duration
- Check device performance

### Colors don't match
- Ensure using `getCourseColor(index).base`
- Check that index is correct course index
- Verify liquidColor prop is being passed

### Backdrop blur not working
- Some browsers don't support backdrop-filter
- Add fallback: `background: rgba(5, 32, 31, 0.95)` (more opaque)

## Performance Optimization

### Lazy Loading

```tsx
import dynamic from 'next/dynamic'

const CoursePreviewPanel = dynamic(
  () => import('@/components/courses/CoursePreviewPanel'),
  { ssr: false }
)
```

### Memoization

```tsx
import { memo } from 'react'

export const CoursePreviewPanel = memo(function CoursePreviewPanel({
  course,
  isOpen,
  onClose,
  liquidColor,
}: CoursePreviewPanelProps) {
  // ... component code
})
```

## Next Steps

1. **Implement enrollment flow** - Replace console.log with actual enrollment
2. **Add course curriculum** - Expand panel to show module details
3. **Add preview video** - Integrate video player in header
4. **Add testimonials** - Show student reviews
5. **Analytics tracking** - Track panel opens, enrollments
6. **A/B testing** - Test different CTAs, colors, layouts
