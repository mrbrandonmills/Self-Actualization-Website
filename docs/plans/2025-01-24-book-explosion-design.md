# Cinematic Book Explosion Experience - Design Document

**Date:** January 24, 2025
**Project:** Self Actualization Website
**Feature:** 3D Book Layer Explosion with Dynamic Camera Flight
**Book:** Random Acts of Self-Actualization - Blocks A & B

---

## Overview

A jaw-dropping 3D experience where book pages explode in choreographed directions while a dynamic camera flies through the layers. Users scroll to control the animation timeline, revealing glimpses of book content through gaps in the floating pages.

**Inspiration:**
- Kasane Keyboard (kasane-keyboard.com) - Accordion layering effect
- Monolith Project (themonolithproject.net) - Dynamic camera choreography
- Library Obys (library.obys.agency) - Camera roll and perspective changes

**Experience Route:** `/books/blocks-a-b` (or `/experience`)

---

## User Experience Flow

1. **Landing (Scroll 0%):** User sees closed book with vintage cover visible
2. **Scrolling Down:** Triggers coordinated page explosion and camera flight
3. **Mid-Journey (Scroll 50%):** Camera weaves between floating pages, revealing content glimpses
4. **End State (Scroll 100%):** Elevated overview of all pages suspended in 3D space
5. **Reversible:** User can scroll up to replay animation backwards

**Key Differentiator:** Avoids "neurotypical left-to-right" book opening - pages fly in all directions (left, right, up, down, forward, backward) creating artistic, non-obvious choreography.

---

## Technical Architecture

### Technology Stack

**Core 3D:**
- React Three Fiber (already installed)
- @react-three/drei (already installed)
- @react-three/postprocessing (already installed)
- @react-spring/three (already installed)

**Animation:**
- GSAP or Framer Motion for complex camera paths
- Custom scroll hook mapping scroll position to timeline (0-1)

**Content Preparation:**
- Extract 10-15 curated pages from PDF as high-res images
- Pages selected for visual interest (diagrams, illustrations, key concepts)

### File Structure

```
src/
├── app/
│   └── books/
│       └── blocks-a-b/
│           └── page.tsx                 # Main experience page (500vh scroll)
├── components/
│   └── book-explosion/
│       ├── BookExplosionScene.tsx       # Main 3D canvas & lighting
│       ├── BookPage.tsx                 # Individual page component
│       ├── CameraChoreography.tsx       # Camera animation system
│       └── PageChoreography.ts          # Page movement configuration
├── hooks/
│   └── useScrollProgress.ts             # Reuse existing scroll tracker
└── public/
    └── books/
        └── blocks-a-b/
            ├── page-01-cover.jpg        # Extracted page images
            ├── page-02.jpg
            └── ... (10-15 total)
```

---

## 3D Page Design

### Geometry

Each page is a **PlaneGeometry** with:
- Standard book dimensions (matching PDF aspect ratio)
- Slight curve/bend for realism (optional)
- Double-sided rendering (visible from both sides)
- Slight thickness using thin BoxGeometry for edge visibility

### Materials (Video Game-Quality PBR)

**MeshPhysicalMaterial (Advanced Rendering):**

**Base Properties:**
- Front face: 4K texture from extracted PDF page
- Back face: Procedural parchment with noise texture
- Roughness: 0.7 (realistic matte paper)
- Metalness: 0 (paper is non-metallic)

**Advanced PBR Features:**
- **Normal Maps:** Procedural paper fiber texture for micro-detail
- **Roughness Maps:** Varied roughness for realistic surface variation
- **Ambient Occlusion:** Baked AO maps for crevice darkening
- **Transmission:** 0.05 for slight light pass-through (paper translucency)
- **Thickness:** 0.1 for subsurface scattering
- **Clearcoat:** 0.05 on vintage pages for aged patina
- **Sheen:** 0.1 for velvet-like fiber reflection

**Hyperrealistic Details:**
- Edge wear and tear (alpha transparency on corners)
- Procedural aging (sepia tones, stains)
- Micro-scratches and imperfections
- Page curl physics at corners
- Real-time shadows with PCF soft shadows (2048x2048 maps)

### Page Choreography Examples

Each page has pre-programmed trajectory:

```typescript
const pageChoreography = [
  {
    id: 'cover',
    startPos: [0, 0, 0],
    endPos: [-8, 2, 15],      // Left + up + forward
    rotation: [0, 0, 0.2],     // Slight tilt
    timing: { start: 0.0, end: 1.0 }
  },
  {
    id: 'page-2',
    startPos: [0, 0, -0.1],
    endPos: [6, 4, 10],        // Right + up + forward
    rotation: [0.3, 0.5, 0],   // Rotate in space
    timing: { start: 0.1, end: 0.9 }
  },
  {
    id: 'page-3',
    startPos: [0, 0, -0.2],
    endPos: [-3, -5, -10],     // Left + down + backward
    rotation: [0, 0.8, 0.1],
    timing: { start: 0.15, end: 0.85 }
  },
  // ... 7-12 more pages with varied trajectories
]
```

**Key Design Choice:** Asymmetric, varied directions create artistic chaos. No predictable pattern.

---

## Camera Choreography

### Camera Path (Synced to Scroll Progress)

**Phase 1: Opening (0-20%)**
- Start: `[0, 0, 20]` (front view of closed book)
- Action: Slow dolly forward
- Effect: Building anticipation

**Phase 2: First Explosion (20-40%)**
- Pages begin splitting
- Camera banks left, roll angle: -15°
- Creates disorienting cinematic entry

**Phase 3: Through The Layers (40-60%)**
- Camera spirals around vertical axis
- Path: `[x, y, z]` → `[-x, y+5, z-10]`
- Weaves between floating pages
- **Key moment:** Passes through gap revealing content glimpse

**Phase 4: Dramatic Roll (60-80%)**
- Barrel roll 180° while flying forward
- Like airplane maneuver
- Pages fully separated and floating
- Perspective completely inverts

**Phase 5: Final Reveal (80-100%)**
- Pull back to elevated rear view: `[0, 15, 30]`
- All pages visible in exploded state
- Slow rotation around the sculpture
- Triumphant overview

### Technical Implementation

```typescript
function getCameraPosition(scrollProgress: number): [number, number, number] {
  // GSAP timeline with custom easing
  // Keyframe interpolation
  // Returns [x, y, z] position
}

function getCameraRotation(scrollProgress: number): [number, number, number] {
  // Returns [pitch, yaw, roll] in radians
}

function getCameraLookAt(scrollProgress: number): [number, number, number] {
  // Camera doesn't always look at center
  // LookAt point also animates
}
```

---

## Lighting System (Cinematic Video Game Quality)

### HDRI Environment Mapping

**Base Illumination:**
- **HDRI Probe:** Museum hall or studio lighting (.hdr file)
- Environment intensity: 1.5
- Provides realistic ambient bounce light
- Creates natural reflections on page surfaces

### Multi-Light Setup

**1. Key Light (Cinematic Three-Point)**
- Type: Spotlight with penumbra
- Position: `[10, 15, 10]` (upper right, 45° angle)
- Intensity: 3.5 (brighter for drama)
- Color temperature: 3200K (warm)
- Casts high-quality PCF soft shadows (2048x2048)
- Shadow bias: 0.0001 for precision

**2. Rim Lights (Edge Separation)**
- Two directional lights from opposite sides
- Gold tint: `#C9A050` (brand color)
- Intensity: 2.0
- Creates luminous halos around page edges
- Enhances 3D depth perception

**3. Fill Light (Shadow Softening)**
- Position: Opposite key light
- Intensity: 0.8
- Blue tint: `#7BA8D1` (cool color theory)
- Reduces harsh shadow contrast

**4. Dynamic Point Light (Camera-Follow)**
- Attached to camera position
- Intensity: 1.5
- Color: Warm white `#FFF8E7`
- Creates cinematic "flashlight" exploration

**5. God Rays / Volumetric Light (Optional)**
- Spotlight with visible beam through fog
- Creates atmospheric depth
- Dramatic when passing through page layers

### Advanced Shadows

**Shadow Quality:**
- PCF Soft Shadows (Percentage Closer Filtering)
- Shadow map size: 2048x2048 (high quality)
- Shadow camera frustum optimized per light
- Contact hardening (shadows sharper at contact, softer at distance)

**Shadow Dynamics:**
- Pages cast shadows on each other
- Shadow intensity fades as pages separate (distance-based)
- Real-time ambient occlusion for crevice darkening
- Screen-space reflections for glossy surfaces

---

## Visual Effects (Post-Processing)

**Effect Composer:**

1. **Bloom**
   - Intensity: 1.0
   - Soft glow on page edges
   - Enhances gold accents

2. **Depth of Field**
   - Focus distance: Dynamic based on camera
   - Near pages sharp, distant pages blur
   - Mimics real camera focus

3. **Vignette**
   - Darkens corners
   - Cinematic framing
   - Intensity: 0.3

4. **Film Grain (Optional)**
   - Vintage texture
   - Matches book aesthetic
   - Subtle: 0.1 opacity

### Background

- Color: `#05201f` (Bartosz dark forest)
- Subtle fog: `#031614` for atmospheric depth
- Fog range: 20-100 units

---

## Data Flow

### Scroll → Animation Pipeline

```typescript
// 1. Track scroll position
const scrollProgress = useScrollProgress() // 0.0 to 1.0

// 2. Interpolate page positions
pages.forEach(page => {
  const config = pageChoreography[page.id]
  const localProgress = mapRange(
    scrollProgress,
    config.timing.start,
    config.timing.end,
    0,
    1
  )

  page.position = lerp(config.startPos, config.endPos, localProgress)
  page.rotation = lerp(config.startRot, config.endRot, localProgress)
})

// 3. Update camera
camera.position = getCameraPosition(scrollProgress)
camera.rotation = getCameraRotation(scrollProgress)
camera.lookAt = getCameraLookAt(scrollProgress)
```

### Configuration File

```typescript
// src/components/book-explosion/PageChoreography.ts

export interface PageConfig {
  id: string
  startPos: [number, number, number]
  endPos: [number, number, number]
  startRot: [number, number, number]
  endRot: [number, number, number]
  timing: { start: number; end: number }
  texture: string
}

export const pageChoreography: PageConfig[] = [
  // ... 10-15 page configurations
]

export const cameraKeyframes = [
  { time: 0.0, position: [0, 0, 20], rotation: [0, 0, 0] },
  { time: 0.2, position: [0, 0, 15], rotation: [0, 0, -0.3] },
  // ... camera path keyframes
]
```

---

## Performance Optimizations

### Page Textures
- **Lazy loading:** Load images as user scrolls
- **LOD (Level of Detail):** Lower resolution for distant pages
- **Mipmapping:** Automatic by Three.js

### Rendering
- **Frustum culling:** Don't render pages outside camera view
- **Shadow optimization:** Reduced shadow map size (1024 vs 2048)
- **RequestAnimationFrame batching:** Smooth 60fps

### Loading Strategy
```typescript
// Progressive enhancement
1. Load cover immediately (critical)
2. Load next 3 pages (visible early)
3. Lazy load remaining pages as scroll approaches
```

---

## Content Preparation Pipeline

### PDF Page Extraction

**Steps:**
1. Open full book PDF in image editor or PDF tool
2. Identify 10-15 most visually striking pages:
   - Cover (required)
   - Pages with diagrams (Vitruvian man, brain, etc.)
   - Pages with key illustrations
   - Chapter title pages
   - Visually balanced throughout book
3. Export each page as high-res JPG (1200px width minimum)
4. Optimize file size (compression: 80-85% quality)
5. Save to `/public/books/blocks-a-b/page-{number}.jpg`

**Naming Convention:**
- `page-01-cover.jpg`
- `page-02.jpg`
- `page-05.jpg`
- ... (non-sequential is fine - we pick best pages)

---

## Error Handling & Edge Cases

### Performance Degradation
- Detect low FPS (< 30fps)
- Automatically reduce:
  - Shadow quality
  - Texture resolution
  - Post-processing effects
- Show "Low Performance" mode option

### Mobile Devices
- Simplified choreography (fewer pages)
- Touch scroll still works
- Reduced effects for battery life
- Option to view static gallery instead

### Accessibility
- Keyboard navigation (arrow keys control scroll)
- "Skip animation" button to jump to end
- Alt text on all page images
- Screen reader announces progress milestones

---

## Testing Strategy

### Visual Testing
1. Choreography preview (without scroll, automated playback)
2. Check all camera angles for clipping/occlusion
3. Verify page content glimpses are visible
4. Test lighting at all scroll positions

### Performance Testing
1. Target 60fps on M1 MacBook Pro
2. Target 30fps+ on older devices
3. Memory usage < 500MB
4. Load time < 3 seconds

### User Testing
1. Is direction of movement clear?
2. Does choreography feel intentional vs random?
3. Can users control pace comfortably?
4. Do glimpses of content create curiosity?

---

## Future Enhancements

### Phase 2 Ideas
- Click on page mid-flight to "freeze" and read full content
- Multiple books with different choreographies
- Sound design (page rustling, whoosh sounds)
- Seasonal variations (different lighting/fog)
- VR mode for immersive exploration

### Analytics to Track
- Average scroll depth (do users complete experience?)
- Scroll-back rate (do they replay?)
- Page click-through rate (if interactive)
- Performance metrics per device type

---

## Implementation Checklist

- [ ] Extract 10-15 curated pages from PDF
- [ ] Set up page route with 500vh scroll
- [ ] Create BookExplosionScene component
- [ ] Build BookPage component with materials
- [ ] Configure PageChoreography data
- [ ] Implement CameraChoreography system
- [ ] Add multi-light setup
- [ ] Integrate post-processing effects
- [ ] Add loading states and lazy loading
- [ ] Performance optimization pass
- [ ] Mobile testing and responsive adjustments
- [ ] Accessibility features
- [ ] Deploy and test on Vercel

---

**Status:** Design validated and ready for implementation
**Next Step:** Create isolated git worktree and detailed implementation plan
