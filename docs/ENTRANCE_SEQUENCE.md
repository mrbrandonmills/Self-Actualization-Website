# CINEMATIC ENTRANCE SEQUENCE

## Overview

A **7-second cinematic entrance animation** that creates the feeling of "walking into a garden" - like being pulled forward through a magical portal into a Wes Anderson film. The entrance uses parallax layers, light tunnel effects, and camera dolly zoom techniques to create immersive depth.

---

## User Experience Timeline

```
0.0s - 1.0s:  White fog covers screen (anticipation)
1.0s - 2.0s:  Circular portal opens, revealing garden glimpse (reveal)
2.0s - 6.0s:  FORWARD MOTION - Camera dolly zoom into garden (immersion)
              ↳ Parallax layers scale outward at different speeds
              ↳ Foreground blurs as it "passes by" the camera
              ↳ Light tunnel radiates from center point
              ↳ Subtle camera shake for realism
6.0s - 7.0s:  Gentle deceleration to stop (arrival)
7.0s - 7.5s:  Entrance overlay fades out (transition)
7.5s+:        Normal interaction begins (user control)
```

---

## Components Architecture

### 1. EntranceSequence Component
**File**: `/src/components/entrance-sequence.tsx`

**Purpose**: Main orchestrator of the entrance animation. Handles all entrance phases and timing.

**Features**:
- 4 phases: fog → portal → walking → complete
- Mobile responsive (shorter 3s entrance on mobile)
- Light tunnel effect (12 rays on desktop, 8 on mobile)
- Portal glow with rotation and pulsing
- Vignette darkening during peak movement
- Camera shake effect (desktop only)
- Radial speed lines (desktop only)

**Props**:
```typescript
interface EntranceSequenceProps {
  onComplete: () => void      // Callback when entrance finishes
  enableMobile?: boolean       // Skip entrance on mobile if false
}
```

**Usage**:
```tsx
<EntranceSequence
  onComplete={() => setEntranceComplete(true)}
  enableMobile={true}
/>
```

---

### 2. ParallaxLayers Component
**File**: `/src/components/parallax-layers.tsx`

**Purpose**: Creates depth by moving layers at different speeds during entrance.

**Exports**:

#### `<ParallaxLayer>`
Individual depth layer that scales and translates during entrance.

```typescript
interface ParallaxLayerProps {
  children: ReactNode
  className?: string
  isEntering: boolean          // Triggers entrance animation
  depth: 'sky' | 'far' | 'mid' | 'foreground'
  duration?: number            // Animation duration (default: 4s)
}
```

**Depth Configuration**:
- **sky**: Scale 1.2x, no blur (slowest)
- **far**: Scale 1.5x, -50px Y offset
- **mid**: Scale 2x, -100px Y offset
- **foreground**: Scale 3x, -200px Y offset, 8px blur (fastest)

#### `<ParallaxContainer>`
Wrapper that provides overflow control and coordinates layers.

#### `<ParallaxElement>`
Individual elements that move independently (grass, particles).

```typescript
interface ParallaxElementProps {
  children: ReactNode
  className?: string
  isEntering: boolean
  speed?: number              // Movement speed multiplier (1 = normal)
  delay?: number              // Animation delay
  blur?: number               // Blur amount in pixels
}
```

#### `<DepthBlur>`
Creates depth-of-field effect by blurring edges during motion.

```typescript
interface DepthBlurProps {
  isActive: boolean           // Triggers blur effect
}
```

---

### 3. GardenPathSvg Component
**File**: `/src/components/garden-path-svg.tsx`

**Purpose**: SVG illustration of a converging perspective path that creates the illusion of depth.

**Features**:
- Perspective path lines (converging to vanishing point)
- 12 animated path stones with perspective scaling
- Grass borders on sides
- Shadow layers for depth
- Horizon glow effect
- Stone highlights and textures

**Props**:
```typescript
interface GardenPathSvgProps {
  isAnimating?: boolean       // Triggers animation sequence
  className?: string
}
```

**Usage**:
```tsx
<GardenPathSvg isAnimating={!isEntering} />
```

---

## Hero Component Integration

**File**: `/src/components/home/hero.tsx`

The Hero component has been enhanced to respond to the entrance animation:

```tsx
interface HeroProps {
  isEntering?: boolean         // Controls entrance animation state
}

export function Hero({ isEntering = false }: HeroProps) {
  // Component structure with 4 parallax layers:

  // Layer 1 (Sky): Sunlight rays, glow
  // Layer 2 (Far): Clouds, distant elements
  // Layer 3 (Mid): Garden path, river
  // Layer 4 (Foreground): Grass blades, close elements

  // All content elements fade out during entrance
  // Parallax layers animate in/out based on isEntering prop
}
```

**Key Changes**:
- Added `isEntering` prop to control entrance state
- Content (title, buttons, scroll indicator) hidden during entrance
- Parallax layers wrap existing visual elements
- Depth blur applied during entrance
- Garden path SVG integrated

---

## Page Orchestration

**File**: `/src/app/page.tsx`

The main page orchestrates the complete entrance experience:

```tsx
export default function HomePage() {
  const [entranceComplete, setEntranceComplete] = useState(false)
  const [showContent, setShowContent] = useState(false)

  // Sequence:
  // 1. EntranceSequence plays
  // 2. Hero responds with parallax
  // 3. After entrance: Video background + particles fade in
  // 4. Music player appears
}
```

**Component Loading Order**:
1. EntranceSequence (immediate, z-index: 100)
2. Hero (immediate, responds to entrance state)
3. VideoBackground (after entrance complete + 300ms delay)
4. ParticleBackground (after entrance complete + 300ms delay)
5. MusicPlayer (after entrance complete + 300ms delay)

---

## CSS Animations

**File**: `/src/app/globals.css`

New keyframe animations added:

### radial-blur
Creates speed effect with blur during fast motion
```css
@keyframes radial-blur {
  0%   { filter: blur(0px); transform: scale(1); }
  50%  { filter: blur(12px); transform: scale(1.5); }
  100% { filter: blur(0px); transform: scale(1); }
}
```

### vignette-pulse
Darkens edges during peak movement
```css
@keyframes vignette-pulse {
  0%, 100% { box-shadow: inset 0 0 0 rgba(0,0,0,0); }
  50%      { box-shadow: inset 0 0 200px rgba(0,0,0,0.3); }
}
```

### camera-shake
Subtle camera shake for realism
```css
@keyframes camera-shake {
  /* 10 steps of small x/y translations */
}
```

### portal-rotate
Rotating portal ring effect
```css
@keyframes portal-rotate {
  0%   { transform: rotate(0deg) scale(1); }
  50%  { transform: rotate(180deg) scale(1.05); }
  100% { transform: rotate(360deg) scale(1); }
}
```

### light-tunnel
Light rays converging to center
```css
@keyframes light-tunnel {
  0%   { opacity: 0; transform: scaleY(0); }
  50%  { opacity: 1; transform: scaleY(1); }
  100% { opacity: 0; transform: scaleY(0.8); }
}
```

### fog-dissipate
Fog dissolving effect
```css
@keyframes fog-dissipate {
  0%   { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(1.2); }
}
```

### portal-open
Circular reveal animation
```css
@keyframes portal-open {
  0%   { clip-path: circle(0% at 50% 50%); opacity: 0; }
  100% { clip-path: circle(100% at 50% 50%); opacity: 1; }
}
```

### dolly-zoom
Forward camera motion effect
```css
@keyframes dolly-zoom {
  0%   { transform: scale(1) translateZ(0); }
  100% { transform: scale(2) translateZ(100px); }
}
```

---

## Performance Optimizations

### GPU Acceleration
All moving elements use `transform` and `opacity` only (GPU-accelerated):
- No `left`, `top`, `width`, `height` animations
- `will-change: transform` on moving elements
- `backface-visibility: hidden` to prevent flicker

### Mobile Optimization
```typescript
// Shorter entrance on mobile
const timings = isMobile
  ? {
      portal: 500,      // 0.5s
      walking: 1000,    // 1s
      complete: 3000,   // 3s (vs 7s desktop)
      fadeOut: 3500,    // 3.5s
    }
  : { /* desktop timings */ }

// Fewer visual effects
const rayCount = isMobile ? 8 : 12          // Fewer light rays
const enableShake = !isMobile                // No camera shake
const enableSpeedLines = !isMobile           // No speed lines
```

### Reduced Motion Support
Respects user's motion preferences:
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Responsive Behavior

### Desktop (> 1024px)
- Full 7-second entrance
- 12 light tunnel rays
- All parallax layers
- Camera shake effect
- Radial speed lines
- Full blur effects

### Tablet (768px - 1024px)
- 5-second entrance
- 8 light tunnel rays
- 3 parallax layers
- No camera shake
- Simplified effects

### Mobile (< 768px)
- 3-second entrance
- No light tunnel
- 2 parallax layers
- Minimal blur
- Performance-focused

---

## Customization Options

### Disable Entrance on Mobile
```tsx
<EntranceSequence
  onComplete={() => setEntranceComplete(true)}
  enableMobile={false}  // Skip entrance on mobile devices
/>
```

### Adjust Entrance Duration
Edit timings in `/src/components/entrance-sequence.tsx`:
```typescript
const timings = {
  portal: 1000,     // Time before portal opens
  walking: 2000,    // Time before forward motion starts
  complete: 7000,   // Time when motion stops
  fadeOut: 7500,    // Time when overlay fades out
}
```

### Modify Parallax Speeds
Edit depth config in `/src/components/parallax-layers.tsx`:
```typescript
const depthConfig = {
  foreground: {
    scale: 3,      // Increase for more dramatic effect
    y: -200,       // Vertical translation
    blur: 8,       // Blur amount in pixels
    delay: 0.3,    // Animation delay
  },
  // ...
}
```

### Change Portal Colors
Edit portal glow in `/src/components/entrance-sequence.tsx`:
```typescript
// Replace rgba(184, 212, 200, ...) with your color
background: 'radial-gradient(circle, rgba(YOUR_R, YOUR_G, YOUR_B, 0.4) 0%, transparent 70%)'
```

---

## Accessibility Considerations

### Keyboard Navigation
- Entrance animation does not interfere with keyboard focus
- All interactive elements become accessible after entrance completes
- Focus is not trapped during entrance

### Screen Readers
- Entrance is purely visual, no content changes
- All content is present in DOM from start
- No ARIA live regions needed

### Motion Preferences
- Respects `prefers-reduced-motion` CSS media query
- Entrance can be disabled on mobile for performance
- User can refresh page to skip entrance (future enhancement)

### Performance
- Entrance overlay is removed from DOM after completion
- No memory leaks from animation timers
- Cleanup functions in useEffect hooks

---

## Testing Checklist

- [ ] Desktop entrance plays smoothly (60fps)
- [ ] Mobile entrance is shorter (3s) and performant
- [ ] Tablet entrance works at medium settings
- [ ] Parallax layers move at correct speeds
- [ ] Light tunnel effect appears during walk-in
- [ ] Portal glow rotates and pulses correctly
- [ ] Camera shake is subtle (desktop only)
- [ ] Vignette darkens during peak movement
- [ ] Fog dissolves cleanly
- [ ] Garden path stones animate in sequence
- [ ] Video background fades in after entrance
- [ ] Particle system appears after entrance
- [ ] Music player appears after entrance
- [ ] Hero content fades in correctly
- [ ] No jank or frame drops
- [ ] No console errors
- [ ] Reduced motion preference respected
- [ ] Works on Safari, Chrome, Firefox, Edge
- [ ] Works on iOS Safari
- [ ] Works on Android Chrome

---

## Future Enhancements

### Skip Button
Add option to skip entrance animation:
```tsx
<button
  onClick={() => setEntranceComplete(true)}
  className="fixed top-4 right-4 z-[101] text-sm opacity-50 hover:opacity-100"
>
  Skip Intro →
</button>
```

### Sound Effects
Add ambient sound during entrance:
```tsx
// In EntranceSequence component
useEffect(() => {
  if (phase === 'walking') {
    const audio = new Audio('/sounds/whoosh.mp3')
    audio.volume = 0.3
    audio.play()
  }
}, [phase])
```

### LocalStorage Remember
Remember if user has seen entrance before:
```tsx
const [hasSeenEntrance, setHasSeenEntrance] = useState(() => {
  return localStorage.getItem('hasSeenEntrance') === 'true'
})

useEffect(() => {
  if (entranceComplete) {
    localStorage.setItem('hasSeenEntrance', 'true')
  }
}, [entranceComplete])

// Skip if already seen
if (hasSeenEntrance) {
  return <HomePage skipEntrance={true} />
}
```

### Preloader
Show loading progress during asset preload:
```tsx
const [assetsLoaded, setAssetsLoaded] = useState(false)

useEffect(() => {
  // Preload critical assets
  const images = ['/hero-bg.jpg', '/path.svg']
  Promise.all(images.map(src => {
    const img = new Image()
    img.src = src
    return img.decode()
  })).then(() => setAssetsLoaded(true))
}, [])

// Start entrance only when assets ready
{assetsLoaded && <EntranceSequence ... />}
```

---

## Troubleshooting

### Entrance Not Playing
1. Check `entranceComplete` state is initially `false`
2. Verify `onComplete` callback is wired up correctly
3. Check browser console for errors
4. Ensure Framer Motion is installed

### Jank or Low FPS
1. Reduce number of parallax layers on mobile
2. Decrease light ray count
3. Disable camera shake and speed lines
4. Use simpler blur effects
5. Check for other animations running simultaneously

### Portal Not Appearing
1. Verify portal phase timing is correct
2. Check z-index stacking (entrance should be z-[100])
3. Inspect portal glow CSS (may need higher opacity)
4. Check for conflicting overflow:hidden on parents

### Parallax Not Working
1. Ensure `isEntering` prop is passed to Hero
2. Verify ParallaxLayer components are in correct order
3. Check transform values aren't being overridden
4. Confirm Framer Motion animations are not disabled

---

## Credits

**Design Inspiration**:
- Wes Anderson films (The Grand Budapest Hotel, Moonrise Kingdom)
- Luxury brands (Louis Vuitton, Hermès, Gucci)
- Museum websites (MoMA, Louvre, Tate Modern)

**Technical Inspiration**:
- Framer Motion parallax examples
- Apple product launch pages
- Linear.app entrance animations
- Awwwards Site of the Day winners

**Animation Principles**:
- Disney's 12 Principles of Animation
- Material Design motion guidelines
- iOS Human Interface Guidelines

---

**Version**: 1.0.0
**Last Updated**: 2025-11-22
**Maintained By**: Visual Designer (Agent 3)
