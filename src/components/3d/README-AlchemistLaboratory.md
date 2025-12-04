# Alchemist's Laboratory 3D Scene

Award-winning 3D chemistry laboratory for the `/courses` page. Museum-quality KASANÉ-level experience.

## Overview

A jaw-dropping 3D scene featuring floating beakers representing courses in a dark teal laboratory environment. Each beaker contains swirling colored liquid indicating the course level, with golden accents and dramatic lighting.

## Features

### Visual Elements

**Beakers (6 total)**
- Glass cylinders with realistic transmission/transparency
- Swirling liquid with level-based colors:
  - Beginner: Glowing green (#4ade80)
  - Intermediate: Electric blue (#3b82f6)
  - Advanced: Royal purple (#a855f7)
- Golden stoppers/caps with metallic sheen
- Elegant arc formation arrangement
- Smooth floating animation with gentle bob

**Laboratory Environment**
- Dark teal (#05201f) reflective floor
- Dramatic golden spotlight from above
- Colored accent rim lights (green, blue, purple)
- Floating golden laboratory instruments (microscope, scales)
- Atmospheric particle effects (sparkles/dust motes)
- Environment mapping for realistic reflections

### Interactions

**Hover State**
- Beaker lifts +0.3 units smoothly
- Liquid swirls faster (2x speed)
- Golden point light appears (3 intensity)
- Glowing torus ring indicator appears
- Cursor changes to pointer
- Sparkle particles intensify

**Click State**
- Triggers `onBeakerClick(courseId)` callback
- Camera smoothly zooms to beaker
- Selected state persists until clicked again
- Course details panel appears (in parent component)

**Camera**
- OrbitControls for manual rotation
- Smooth lerp transitions to clicked beakers
- Constrained zoom (5-15 units)
- Constrained polar angle (45°-90°)
- Auto-returns to default view when deselected

### Performance

**GPU Optimization**
- Transform and opacity animations only (GPU-accelerated)
- Efficient shadow rendering (2048x2048 maps)
- Conditional rendering for mobile
- Reduced particle count on mobile
- High-performance WebGL settings
- Dynamic dpr (1-2) for retina displays

**Mobile Adaptations**
- Simplified beaker geometry
- Fewer particles (50 vs 100)
- No background instruments
- No sparkles on hover
- Disabled zoom controls
- Optimized shadow quality

## Usage

```tsx
import AlchemistLaboratory from '@/components/3d/AlchemistLaboratory'
import { courses } from '@/data/courses'

function CoursesPage() {
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null)

  return (
    <AlchemistLaboratory
      courses={courses}
      onBeakerClick={(courseId) => setSelectedCourseId(courseId)}
      selectedCourseId={selectedCourseId}
    />
  )
}
```

## Props Interface

```typescript
interface AlchemistLaboratoryProps {
  courses: Course[]          // Array of courses from @/data/courses
  onBeakerClick: (courseId: string) => void  // Click handler
  selectedCourseId?: string | null          // Currently selected course
}
```

## Component Structure

```
AlchemistLaboratory (Canvas wrapper)
├── AlchemistLaboratoryScene
│   ├── LaboratoryEnvironment
│   │   ├── Reflective floor
│   │   ├── Lighting (ambient, spotlights, point lights)
│   │   ├── Background instruments
│   │   └── Particle effects
│   ├── Beaker3D (x6)
│   │   ├── Golden stopper
│   │   ├── Glass cylinder
│   │   ├── Swirling liquid
│   │   ├── Glow light
│   │   ├── Sparkle particles
│   │   └── Level indicator ring
│   ├── CameraController
│   └── OrbitControls
```

## Technical Details

### Materials

**Glass Beaker**
- `meshPhysicalMaterial`
- transmission: 0.9 (highly transparent)
- metalness: 0.1
- roughness: 0.05
- clearcoat: 1.0 (glossy finish)
- opacity: 0.15

**Liquid**
- `meshPhysicalMaterial`
- transmission: 0.4
- emissive color matches base color
- emissiveIntensity: 0.3-0.6 (hover dependent)
- rotation animation for swirl effect

**Golden Elements**
- `meshStandardMaterial`
- color: #D4AF37
- metalness: 0.9
- roughness: 0.1-0.2
- emissive: #D4AF37
- emissiveIntensity: 0.2-0.5

### Animation Timing

- Float animation: 0.5 Hz sine wave
- Hover lift transition: 0.1 lerp factor
- Liquid swirl: 0.01 rad/frame (0.02 on hover)
- Glow fade: 0.1 lerp factor
- Camera movement: 0.05 lerp factor

### Beaker Positions

Arranged in elegant arc formation:
- Radius: 4 units from origin
- Arc: π radians (180°)
- Spacing: π / (courses.length + 1)
- Z-offset: -3 units (pushed back)

## Test Page

Visit `/alchemist-lab` to see the laboratory in action with:
- Full 3D interactive scene
- Animated header and instructions
- Selected course details panel
- Level legend
- Film grain overlay

## Dependencies

Required packages:
- `@react-three/fiber` - React renderer for Three.js
- `@react-three/drei` - Helpers (OrbitControls, Environment, Float, Sparkles)
- `three` - Core 3D library
- `framer-motion` - UI animations (test page only)

## Design Inspiration

- **Color Palette**: Dark teal laboratory (#05201f), gold accents (#D4AF37)
- **Lighting**: Dramatic spotlighting like luxury brand photography
- **Materials**: Realistic glass physics, metallic gold
- **Animation**: Smooth 60fps with spring physics
- **Quality Standard**: KASANÉ-level museum experience

## Future Enhancements

Potential additions:
- [ ] 3D text labels using Text3D (requires font JSON)
- [ ] Bubbles rising in liquid
- [ ] Steam particles from beaker tops
- [ ] Sound effects on hover/click
- [ ] More intricate background laboratory equipment
- [ ] Course progress indicator (fill level)
- [ ] VR support for immersive experience

## Files

- `/src/components/3d/AlchemistLaboratory.tsx` - Main component
- `/src/app/alchemist-lab/page.tsx` - Test/demo page
- `/src/data/courses.ts` - Course data structure

---

**Built with precision. Designed with elegance. Experienced with wonder.**
