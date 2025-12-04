# Alchemist's Laboratory - Component Structure

## Visual Hierarchy

```
┌─────────────────────────────────────────────────────────────────┐
│                    AlchemistLaboratory                          │
│                   (Canvas Wrapper + UI)                         │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │             AlchemistLaboratoryScene                      │ │
│  │              (3D Scene Logic)                             │ │
│  │                                                           │ │
│  │  ┌─────────────────────────────────────────────────────┐ │ │
│  │  │        LaboratoryEnvironment                        │ │ │
│  │  │                                                     │ │ │
│  │  │  • Dark reflective floor (meshStandardMaterial)    │ │ │
│  │  │  • Ambient light (teal glow)                       │ │ │
│  │  │  • Spotlight (golden, from above)                  │ │ │
│  │  │  • Point lights (green, blue, purple accents)     │ │ │
│  │  │  • Background instruments (microscope, scales)    │ │ │
│  │  │  • Sparkle particles (atmosphere)                 │ │ │
│  │  │  • Environment map (reflections)                  │ │ │
│  │  └─────────────────────────────────────────────────────┘ │ │
│  │                                                           │ │
│  │  ┌─────────────────────────────────────────────────────┐ │ │
│  │  │              Beaker3D (x6)                          │ │ │
│  │  │                                                     │ │ │
│  │  │  ┌──────────────────────────────────────────────┐ │ │ │
│  │  │  │  Golden Stopper (sphere)                     │ │ │ │
│  │  │  │  • meshStandardMaterial                      │ │ │ │
│  │  │  │  • Metalness: 0.9, Roughness: 0.1           │ │ │ │
│  │  │  │  • Emissive gold glow                       │ │ │ │
│  │  │  └──────────────────────────────────────────────┘ │ │ │
│  │  │                                                     │ │ │
│  │  │  ┌──────────────────────────────────────────────┐ │ │ │
│  │  │  │  Glass Cylinder (beaker)                     │ │ │ │
│  │  │  │  • meshPhysicalMaterial                      │ │ │ │
│  │  │  │  • Transmission: 0.9 (transparent)           │ │ │ │
│  │  │  │  • Clearcoat: 1.0 (glossy)                   │ │ │ │
│  │  │  │  • Click detection enabled                   │ │ │ │
│  │  │  └──────────────────────────────────────────────┘ │ │ │
│  │  │                                                     │ │ │
│  │  │  ┌──────────────────────────────────────────────┐ │ │ │
│  │  │  │  Swirling Liquid (cylinder)                  │ │ │ │
│  │  │  │  • meshPhysicalMaterial                      │ │ │ │
│  │  │  │  • Color: Level-based (green/blue/purple)    │ │ │ │
│  │  │  │  • Emissive glow effect                      │ │ │ │
│  │  │  │  • Rotation animation (swirl)                │ │ │ │
│  │  │  └──────────────────────────────────────────────┘ │ │ │
│  │  │                                                     │ │ │
│  │  │  ┌──────────────────────────────────────────────┐ │ │ │
│  │  │  │  Golden Glow (pointLight)                    │ │ │ │
│  │  │  │  • Intensity: 0-3 (hover dependent)          │ │ │ │
│  │  │  │  • Color: #D4AF37                            │ │ │ │
│  │  │  │  • Smooth lerp transition                    │ │ │ │
│  │  │  └──────────────────────────────────────────────┘ │ │ │
│  │  │                                                     │ │ │
│  │  │  ┌──────────────────────────────────────────────┐ │ │ │
│  │  │  │  Sparkle Particles (on hover)                │ │ │ │
│  │  │  │  • Count: 20                                 │ │ │ │
│  │  │  │  • Golden color                              │ │ │ │
│  │  │  │  • Conditional (not on mobile)               │ │ │ │
│  │  │  └──────────────────────────────────────────────┘ │ │ │
│  │  │                                                     │ │ │
│  │  │  ┌──────────────────────────────────────────────┐ │ │ │
│  │  │  │  Level Indicator Ring (on hover)             │ │ │ │
│  │  │  │  • Torus geometry                            │ │ │ │
│  │  │  │  • Floating animation                        │ │ │ │
│  │  │  │  • Color matches liquid level                │ │ │ │
│  │  │  └──────────────────────────────────────────────┘ │ │ │
│  │  └─────────────────────────────────────────────────────┘ │ │
│  │                                                           │ │
│  │  ┌─────────────────────────────────────────────────────┐ │ │
│  │  │          CameraController                           │ │ │
│  │  │                                                     │ │ │
│  │  │  • Smooth lerp to selected beaker (0.05 factor)   │ │ │
│  │  │  • Returns to default view when deselected        │ │ │
│  │  │  • Cinematic look-at transitions                  │ │ │
│  │  └─────────────────────────────────────────────────────┘ │ │
│  │                                                           │ │
│  │  ┌─────────────────────────────────────────────────────┐ │ │
│  │  │          OrbitControls                              │ │ │
│  │  │                                                     │ │ │
│  │  │  • Manual rotation (drag)                          │ │ │
│  │  │  • Zoom constraints (5-15 units)                   │ │ │
│  │  │  • Polar angle limits (45°-90°)                    │ │ │
│  │  │  • Damping enabled (smooth)                        │ │ │
│  │  │  • No pan, zoom disabled on mobile                │ │ │
│  │  └─────────────────────────────────────────────────────┘ │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │               UI Overlay Instructions                     │ │
│  │   "Click beakers to explore • Drag to rotate"            │ │
│  └───────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## Animation Flow

```
User Action          →  Animation Sequence
──────────────────────────────────────────────────────────────

Page Load           →  1. AlchemistLabLoader appears
                       2. Three.js initializes
                       3. Assets load
                       4. Loader fades out (0.8s)
                       5. Scene fades in

Hover Beaker        →  1. Beaker lifts +0.3 units (lerp 0.1)
                       2. Liquid swirl speed 2x (0.02 rad/frame)
                       3. Golden glow fades in (lerp 0.1)
                       4. Sparkles appear (20 particles)
                       5. Level ring floats above (torus)
                       6. Cursor changes to pointer

Click Beaker        →  1. onBeakerClick(courseId) callback
                       2. Camera lerps to beaker (0.05 factor)
                       3. Look-at target lerps to beaker
                       4. Selected state persists
                       5. Course details panel slides in (parent)

Hover End           →  1. Beaker returns to base Y (lerp 0.1)
                       2. Liquid swirl speed normal (0.01 rad/frame)
                       3. Golden glow fades out (lerp 0.1)
                       4. Sparkles disappear
                       5. Level ring fades out
                       6. Cursor returns to default

Click Same Beaker   →  1. Deselect beaker
                       2. Camera returns to default view (lerp 0.05)
                       3. Look-at returns to origin
                       4. Course details panel closes

Drag/Rotate         →  1. OrbitControls update camera
                       2. Damping smooths movement (factor 0.05)
                       3. Constraints enforced (zoom, polar angle)
```

## State Management

```
Component State:
┌─────────────────────────────────────────────┐
│  AlchemistLaboratory (parent)               │
│  • selectedCourseId: string | null          │
│  • onBeakerClick: (id) => void              │
└─────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────┐
│  AlchemistLaboratoryScene                   │
│  • localSelectedId: string | null           │
│  • isMobile: boolean                        │
│  • beakerPositions: [x,y,z][]              │
│  • selectedBeakerPosition: [x,y,z] | null  │
└─────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────┐
│  Beaker3D (individual)                      │
│  • isHovered: boolean                       │
│  • Refs: beakerRef, liquidRef, glowRef     │
└─────────────────────────────────────────────┘
```

## Props Flow

```
Page Component
    ↓
    courses: Course[]  ──────────────────┐
    onBeakerClick: fn  ──────────────────┤
    selectedCourseId: string | null  ────┤
                                         ↓
                            AlchemistLaboratory
                                         ↓
                          AlchemistLaboratoryScene
                                         ↓
                    ┌────────────────────┴────────────────────┐
                    ↓                                         ↓
            LaboratoryEnvironment                   Beaker3D (x6)
            • isMobile                              • course: Course
                                                    • position: [x,y,z]
                                                    • index: number
                                                    • onClick: fn
                                                    • isSelected: boolean
                                                    • isMobile: boolean
```

## Render Cycle (60fps)

```
useFrame Hook (every frame)
    ↓
Beaker3D:
  1. Calculate float offset: Math.sin(time * 0.5 + index) * 0.15
  2. Add hover lift: isHovered ? 0.3 : 0
  3. Update beaker Y position
  4. Rotate liquid: rotation.y += swirlingSpeed
  5. Lerp glow intensity: THREE.MathUtils.lerp(current, target, 0.1)
    ↓
CameraController:
  1. Get target position (selected beaker or default)
  2. Lerp camera position: camera.position.lerp(target, 0.05)
  3. Calculate look-at target
  4. Lerp look-at: currentLookAt.lerp(lookAtTarget, 0.05)
  5. Update camera: camera.lookAt(currentLookAt)
```

## Performance Profile

```
Desktop (High Quality)
├── Beakers: 6 × (stopper + glass + liquid + glow) = 24 meshes
├── Background: 2 instruments = 2 meshes
├── Floor: 1 mesh
├── Particles: 100 global + (6 × 20 hover) = 220 max
├── Lights: 1 ambient + 1 spotlight + 3 point + (6 × glow) = 11 max
├── Shadows: Enabled (2048×2048)
├── Environment: Night preset
└── Total Draw Calls: ~35-40

Mobile (Optimized)
├── Beakers: 6 × (stopper + glass + liquid + glow) = 24 meshes
├── Background: None (disabled)
├── Floor: 1 mesh
├── Particles: 50 global (hover disabled)
├── Lights: 1 ambient + 1 spotlight + 3 point + (6 × glow) = 11 max
├── Shadows: Simplified
├── Environment: Night preset
└── Total Draw Calls: ~25-30
```

## Color Mapping

```
Course Level  →  Liquid Color  →  RGB Value     →  Glow
────────────────────────────────────────────────────────
Beginner      →  Glowing Green →  #4ade80       →  rgba(74,222,128,0.6)
Intermediate  →  Electric Blue →  #3b82f6       →  rgba(59,130,246,0.6)
Advanced      →  Royal Purple  →  #a855f7       →  rgba(168,85,247,0.6)
```

---

**Visual Designer Notes:**

This structure ensures:
- **Modularity**: Each component has a single responsibility
- **Performance**: Conditional rendering based on state
- **Maintainability**: Clear parent-child relationships
- **Extensibility**: Easy to add new beaker types or effects
- **Debugging**: Isolated state and clear data flow

Every level of the hierarchy is optimized for smooth 60fps rendering while maintaining KASANÉ-level visual quality.
