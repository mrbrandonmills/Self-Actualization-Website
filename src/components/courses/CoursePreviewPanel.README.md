# CoursePreviewPanel Component

A stunning holographic panel component that displays course details with cinematic animations and glassmorphism effects. Designed to feel like a hologram from a sci-fi movie.

## Visual Design

### Glassmorphism Effect
- **Background**: `rgba(5, 32, 31, 0.85)` with 40px backdrop blur
- **Border**: 1px solid `rgba(201, 160, 80, 0.3)` (gold accent)
- **Shadow**: Dramatic multi-layer gold glow
- **Dark teal base** matching laboratory aesthetic

### Animated Liquid Header
- Swirling gradient effect matching beaker color
- Floating particles animation (12 particles)
- Wave animation with 4s ease-in-out loop
- Shimmer overlay with linear sweep
- Height: 192px (12rem)

## Component API

```typescript
interface CoursePreviewPanelProps {
  course: Course | null;      // Course data to display
  isOpen: boolean;            // Panel visibility state
  onClose: () => void;        // Callback when panel closes
  liquidColor: string;        // Hex color for liquid header (matches beaker)
}
```

## Features

### Animations
- ✅ **Slide-in from right**: Spring animation (damping: 30, stiffness: 300)
- ✅ **Liquid swirling**: 20s rotation + scaling loop
- ✅ **Liquid wave**: 4s vertical oscillation
- ✅ **Floating particles**: Randomized 3-5s loops with opacity/scale
- ✅ **Shimmer effect**: 3s linear sweep on header
- ✅ **Content fade-in**: Staggered delays (0.2s - 0.8s)
- ✅ **Button shimmer**: Continuous 2s sweep on enroll button
- ✅ **Exit animation**: Slide out to right

### Interactions
- ✅ **Close button**: Top-right X with rotate animation on hover
- ✅ **Click outside**: Closes panel via backdrop
- ✅ **Escape key**: Keyboard shortcut to close
- ✅ **Body scroll lock**: Prevents background scrolling when open
- ✅ **Enroll button**: Console log (enrollment flow placeholder)
- ✅ **Hover effects**: Scale animations on interactive elements

### Accessibility
- ✅ **ARIA labels**: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`
- ✅ **Keyboard navigation**: Escape key support
- ✅ **Focus management**: Auto-focuses panel when opened
- ✅ **Screen reader friendly**: Semantic HTML structure

### Responsive Design
- **Mobile (< 768px)**: Full screen overlay
- **Desktop (≥ 768px)**: 600px wide slide-out panel
- **Large Desktop (≥ 1024px)**: 700px wide panel

## Layout Structure

```
┌─────────────────────────────┐
│  [Animated Liquid Header]   │ ← 192px height
│    - Swirling effects       │
│    - Floating particles     │
│    - Shimmer overlay        │
│    [✕ Close Button]         │
├─────────────────────────────┤
│  Course Title (Gold)        │ ← 3xl/4xl serif
│  By Instructor Name         │ ← Small uppercase
│  ─────────────────          │ ← Animated divider
│                             │
│  Description (gray-300)     │ ← Base/lg text
│                             │
│  ┌─────────┬─────────┐     │
│  │📚 Modules│⏱Duration│     │ ← Stats grid
│  └─────────┴─────────┘     │
│                             │
│  💎 Level Badge             │ ← Gold gradient
│  ✨ Featured (optional)     │ ← Purple gradient
│                             │
│  [Enroll Now - $XXX]        │ ← Gold gradient button
│   30-Day Money-Back         │ ← Small text
│                             │
└─────────────────────────────┘
```

## Usage Examples

### Basic Integration

```tsx
import { CoursePreviewPanel } from '@/components/courses/CoursePreviewPanel'
import { getCourseColor } from '@/lib/rainbow-colors'
import { useState } from 'react'

function MyComponent() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [isPanelOpen, setIsPanelOpen] = useState(false)

  const handleOpenPreview = (course: Course, index: number) => {
    setSelectedCourse(course)
    setIsPanelOpen(true)
  }

  const handleClosePreview = () => {
    setIsPanelOpen(false)
    setTimeout(() => setSelectedCourse(null), 300)
  }

  return (
    <>
      {/* Your trigger element */}
      <button onClick={() => handleOpenPreview(someCourse, 0)}>
        View Course
      </button>

      {/* The preview panel */}
      <CoursePreviewPanel
        course={selectedCourse}
        isOpen={isPanelOpen}
        onClose={handleClosePreview}
        liquidColor={getCourseColor(0).base}
      />
    </>
  )
}
```

### With Beaker Component

```tsx
// In your beaker click handler:
const handleBeakerClick = (course: Course, index: number) => {
  setSelectedCourse(course)
  setIsPanelOpen(true)
}

// Get the matching liquid color
const liquidColor = getCourseColor(courseIndex).base

<CoursePreviewPanel
  course={selectedCourse}
  isOpen={isPanelOpen}
  onClose={handleClosePreview}
  liquidColor={liquidColor}
/>
```

## Customization

### Liquid Header Colors
The `liquidColor` prop accepts any valid CSS color. Use `getCourseColor(index).base` to match beaker colors:

```tsx
// Rainbow colors cycle through:
const COURSE_COLORS = [
  '#FCD34D', // Golden Hour
  '#C084FC', // Violet Sky
  '#5EEAD4', // Seafoam
  '#F9A8D4', // Cherry Blossom
  '#BEF264', // Lime Zest
  '#7DD3FC', // Sky Blue
]
```

### Animation Timings
Adjust in the component if needed:
- Panel slide: `damping: 30, stiffness: 300`
- Liquid rotation: `duration: 20s`
- Particle animation: `3-5s` (randomized)
- Content stagger: `0.2s - 0.8s` delays

## Technical Details

### Dependencies
- `framer-motion`: Animations and transitions
- `lucide-react`: Icons (X, BookOpen, Clock, Award, Sparkles)
- `@/data/courses`: Course type definitions
- `@/lib/rainbow-colors`: Color utilities

### Performance Optimizations
- **AnimatePresence**: Smooth mount/unmount animations
- **Backdrop blur**: Hardware-accelerated CSS filter
- **Transform animations**: GPU-accelerated (no layout thrashing)
- **Conditional rendering**: Panel only renders when `isOpen` is true
- **Cleanup**: Removes event listeners and scroll lock on unmount

### Browser Support
- Modern browsers with backdrop-filter support
- Fallback: Works without blur on older browsers
- CSS Grid: IE11+ (or use flexbox fallback)

## Styling Classes

### Custom Scrollbar
```css
.scrollbar-thin {
  scrollbar-width: thin;
}

.scrollbar-track-transparent {
  scrollbar-color: rgba(201, 160, 80, 0.3) transparent;
}
```

### Gold Color Tokens (Tailwind)
```js
gold: {
  500: '#C9A050',
  600: '#B89040',
}
```

## Future Enhancements

### Planned Features
- [ ] Course curriculum accordion
- [ ] Preview video player
- [ ] Instructor bio section
- [ ] Related courses carousel
- [ ] Student testimonials
- [ ] Enrollment form integration
- [ ] Payment processing
- [ ] Progress tracking for enrolled students
- [ ] Certificate preview
- [ ] Share course functionality

### Animation Ideas
- [ ] Particle trail on mouse movement
- [ ] 3D perspective tilt on liquid header
- [ ] Ripple effect on button click
- [ ] Typewriter effect for description
- [ ] Lottie animation integration
- [ ] WebGL liquid simulation

## Accessibility Checklist

- [x] Keyboard navigation (Escape to close)
- [x] ARIA labels and roles
- [x] Focus management
- [x] Screen reader announcements
- [x] Sufficient color contrast
- [x] Touch targets (44px minimum)
- [ ] Focus visible styles
- [ ] Reduced motion support
- [ ] High contrast mode support

## Design Tokens

```typescript
// Colors
const GLASS_BG = 'rgba(5, 32, 31, 0.85)'
const GOLD_BORDER = 'rgba(201, 160, 80, 0.3)'
const GOLD_PRIMARY = '#C9A050'
const TEXT_MUTED = '#9CA3AF'

// Shadows
const GOLD_GLOW = `
  0 0 60px rgba(201, 160, 80, 0.4),
  0 20px 100px rgba(201, 160, 80, 0.3),
  inset 0 0 80px rgba(201, 160, 80, 0.1)
`

// Backdrop
const BLUR = '40px'
```

## Quality Standard

This component meets luxury, cinematic quality standards:
- Smooth 60fps animations
- Dramatic visual effects
- Museum-quality presentation
- Professional typography hierarchy
- Consistent spacing system
- Accessible and inclusive design
