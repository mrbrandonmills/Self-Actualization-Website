# CoursePreviewPanel - Component Tree

## Visual Component Hierarchy

```
<AnimatePresence>
  └── <Fragment> (when isOpen)
      ├── <Backdrop Overlay>
      │   └── motion.div
      │       ├── className: "fixed inset-0 bg-black/60"
      │       ├── onClick: onClose
      │       └── animations: fade in/out
      │
      └── <Main Panel>
          └── motion.div (slide-in container)
              └── <Glassmorphism Container>
                  │
                  ├── <Animated Liquid Header> (192px)
                  │   ├── <Swirling Gradient Layer>
                  │   │   └── 20s rotation + scale animation
                  │   │
                  │   ├── <Liquid Wave Layer>
                  │   │   └── 4s vertical oscillation
                  │   │
                  │   ├── <Floating Particles> (×12)
                  │   │   └── Random position + timing
                  │   │
                  │   ├── <Shimmer Overlay>
                  │   │   └── 3s linear sweep
                  │   │
                  │   └── <Close Button> (top-right)
                  │       └── X icon with rotate on hover
                  │
                  ├── <Content Section> (scrollable)
                  │   └── <Padding Container>
                  │       │
                  │       ├── <Title Section>
                  │       │   ├── Course Title (h2, gold)
                  │       │   └── Instructor Name (small)
                  │       │
                  │       ├── <Animated Divider>
                  │       │   └── Scale + shimmer animation
                  │       │
                  │       ├── <Description>
                  │       │   └── Gray-300 text
                  │       │
                  │       ├── <Stats Grid> (2 columns)
                  │       │   ├── <Modules Card>
                  │       │   │   ├── BookOpen icon
                  │       │   │   └── Module count
                  │       │   │
                  │       │   └── <Duration Card>
                  │       │       ├── Clock icon
                  │       │       └── Duration text
                  │       │
                  │       ├── <Badges>
                  │       │   ├── <Level Badge>
                  │       │   │   ├── Award icon
                  │       │   │   └── Level text
                  │       │   │
                  │       │   └── <Featured Badge> (conditional)
                  │       │       ├── Sparkles icon
                  │       │       └── "Featured" text
                  │       │
                  │       ├── <Enroll Button>
                  │       │   ├── Gold gradient background
                  │       │   ├── Shimmer animation overlay
                  │       │   ├── onClick: console.log
                  │       │   └── Hover/tap scale effects
                  │       │
                  │       └── <Money-Back Text>
                  │           └── Small gray text
                  │
                  └── <Bottom Glow Accent>
                      └── Horizontal gold line with glow
```

## Animation Timeline

### Panel Open (0-1.2s)
```
0.0s  ━ Backdrop fade-in starts (0-0.3s)
0.0s  ━ Panel slide-in starts (0-0.5s spring)
0.2s  ━ Title fade-in
0.3s  ━ Divider scale animation
0.4s  ━ Description fade-in
0.5s  ━ Stats grid fade-in
0.6s  ━ Level badge fade-in
0.7s  ━ Enroll button fade-in
0.8s  ━ Money-back text fade-in
```

### Continuous Loops
```
Liquid swirl:    0s → 20s → repeat
Liquid wave:     0s → 4s → repeat
Particles:       0s → 3-5s → repeat (randomized)
Header shimmer:  0s → 3s → repeat
Button shimmer:  0s → 2s → repeat
Divider shimmer: 0s → 2s → repeat
```

### Panel Close (0-0.3s)
```
0.0s  ━ Panel slide-out starts
0.0s  ━ Backdrop fade-out starts
0.3s  ━ Cleanup & unmount
```

## Data Flow

```
Parent Component
    │
    ├── selectedCourse: Course | null
    ├── isOpen: boolean
    ├── liquidColor: string (from getCourseColor)
    │
    ↓
CoursePreviewPanel
    │
    ├── useEffect (keyboard listener)
    ├── useEffect (scroll lock)
    │
    ├── Receives: course, isOpen, onClose, liquidColor
    │
    └── Renders: AnimatePresence
        └── Conditionally renders based on isOpen
            ├── Backdrop (onClick → onClose)
            └── Panel (ESC → onClose)
                └── Content populated from course
```

## Event Handlers

### User Events
```typescript
// Close Panel
onClose() → {
  setIsPanelOpen(false)
  setTimeout(() => setSelectedCourse(null), 300)
}

// Keyboard
onKeydown(ESC) → onClose()

// Click Outside
onClick(Backdrop) → onClose()

// Enroll (placeholder)
onClick(Button) → console.log(course.id)
```

### Side Effects
```typescript
useEffect(() => {
  if (isOpen) {
    // Add ESC listener
    document.addEventListener('keydown', handleEscape)
    
    // Lock body scroll
    document.body.style.overflow = 'hidden'
  }
  
  return () => {
    // Cleanup
    document.removeEventListener('keydown', handleEscape)
    document.body.style.overflow = 'unset'
  }
}, [isOpen])
```

## Style Layers

```
Layer 10: Close Button (z-10)
Layer 9:  Particle overlays
Layer 8:  Shimmer effects
Layer 7:  Content text
Layer 6:  Stat cards
Layer 5:  Background gradients
Layer 4:  Liquid animations
Layer 3:  Glassmorphism container
Layer 2:  Panel border/glow
Layer 1:  Backdrop (z-[100])
Layer 0:  Base panel (z-[101])
```

## Color System

```typescript
// Dynamic (prop-based)
liquidColor: string           // Header background
  ↓ Applied to:
  - Swirling gradient
  - Wave gradient
  - Particle container glow

// Static (theme-based)
Gold Primary: #C9A050        // Title, buttons, badges
Gold Border:  rgba(201,160,80,0.3)  // Panel border
Glass BG:     rgba(5,32,31,0.85)    // Panel background
Text Muted:   #9CA3AF        // Secondary text
White:        #FFFFFF        // Primary text
```

## Responsive Breakpoints

```css
/* Mobile First */
< 768px:
  - width: 100%
  - height: 100vh
  - padding: 2rem

/* Tablet */
≥ 768px:
  - width: 600px
  - height: 100vh
  - padding: 2.5rem
  - position: fixed right

/* Desktop */
≥ 1024px:
  - width: 700px
  - height: 100vh
  - padding: 2.5rem
  - position: fixed right
```

## Performance Notes

### GPU Accelerated
- transform (translate, scale, rotate)
- opacity
- backdrop-filter

### CPU Bound
- border-radius calculations
- gradient rendering
- shadow rendering

### Optimization Tips
- Use will-change on animated elements
- Reduce particle count on lower-end devices
- Simplify gradients for better performance
