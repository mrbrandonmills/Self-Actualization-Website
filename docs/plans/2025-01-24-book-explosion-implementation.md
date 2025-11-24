# Cinematic Book Explosion 3D Experience - Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a hyperrealistic 3D book page explosion with cinematic camera flight, scroll-driven timeline, and video game-quality rendering.

**Architecture:** React Three Fiber scene with 10-15 book pages as textured planes, pre-choreographed split directions, dynamic camera path with roll/bank/circle movements, PBR materials, and advanced lighting with post-processing effects.

**Tech Stack:** React Three Fiber, @react-three/drei, @react-three/postprocessing, GSAP, MeshPhysicalMaterial, custom scroll hook

---

## Task 1: Extract Book Pages from PDF

**Goal:** Extract 10-15 visually striking pages from the full book PDF as high-resolution images.

**Files:**
- Create: `public/books/blocks-a-b/` (directory)
- Create: Multiple image files in that directory

**Step 1: Create directory for book assets**

```bash
cd ~/.config/superpowers/worktrees/Self-Actualization-Website/feature/book-explosion-3d
mkdir -p public/books/blocks-a-b
```

**Step 2: Extract pages using PDF tool**

Since the PDF is too large (176MB) to read directly, we need to extract pages manually or programmatically.

Option A (Manual - Recommended for quality control):
1. Open `/Users/brandon/Downloads/Blocks A & B  FULL digital wCover.pdf` in Preview or Adobe Acrobat
2. Select 10-15 visually striking pages:
   - Page 1 (Cover) - REQUIRED
   - Pages with diagrams (Vitruvian man, brain illustrations, etc.)
   - Chapter title pages
   - Pages with key illustrations
   - Spread evenly throughout book
3. Export each as JPG at 1200px width, 80-85% quality
4. Name them: `page-01-cover.jpg`, `page-02.jpg`, `page-05.jpg`, etc.

Option B (Programmatic with pdf-poppler):
```bash
# Install poppler if needed
brew install poppler

# Extract specific pages (adjust page numbers after manual review)
pdftoppm -jpeg -r 300 -f 1 -l 1 "/Users/brandon/Downloads/Blocks A & B  FULL digital wCover.pdf" public/books/blocks-a-b/page-01-cover
pdftoppm -jpeg -r 300 -f 5 -l 5 "/Users/brandon/Downloads/Blocks A & B  FULL digital wCover.pdf" public/books/blocks-a-b/page-02
# ... repeat for 8-13 more pages
```

**Step 3: Verify images exist**

```bash
ls -lh public/books/blocks-a-b/
```

Expected: 10-15 JPG files, each 200-500KB

**Step 4: Commit assets**

```bash
git add public/books/blocks-a-b/
git commit -m "feat: add book page assets for 3D explosion"
```

---

## Task 2: Create Page Route and Basic Structure

**Goal:** Set up the `/books/blocks-a-b` route with scroll-driven 3D canvas.

**Files:**
- Create: `src/app/books/blocks-a-b/page.tsx`

**Step 1: Create route directory**

```bash
mkdir -p src/app/books/blocks-a-b
```

**Step 2: Create page component**

File: `src/app/books/blocks-a-b/page.tsx`

```typescript
'use client'

export default function BookExplosionPage() {
  return (
    <main className="book-explosion-page">
      {/* 3D Scene will go here */}
      <div className="scene-container" />

      {/* Scroll spacer for timeline control */}
      <div className="scroll-spacer" />

      {/* Instructions overlay */}
      <div className="instructions">
        <h2>Scroll to Explore</h2>
        <p>Experience the book in 3D space</p>
      </div>

      <style jsx>{`
        .book-explosion-page {
          position: relative;
          background: #05201f;
          overflow-x: hidden;
        }

        .scene-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          z-index: 1;
        }

        .scroll-spacer {
          position: relative;
          height: 500vh;
          z-index: 0;
          pointer-events: none;
        }

        .instructions {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
          text-align: center;
          color: var(--color-text-primary);
          pointer-events: none;
          opacity: 0.8;
          transition: opacity 0.5s ease;
        }

        .instructions h2 {
          font-family: var(--font-serif);
          font-size: var(--font-size-h2);
          color: var(--color-accent-gold);
          margin-bottom: var(--space-md);
        }

        .instructions p {
          font-family: var(--font-sans);
          font-size: var(--font-size-body);
          text-transform: uppercase;
          letter-spacing: var(--tracking-widest);
        }
      `}</style>
    </main>
  )
}
```

**Step 3: Test route loads**

```bash
npm run dev
# Visit: http://localhost:3000/books/blocks-a-b
```

Expected: Dark page with "Scroll to Explore" text, 500vh tall

**Step 4: Commit route foundation**

```bash
git add src/app/books/blocks-a-b/page.tsx
git commit -m "feat: create book explosion page route"
```

---

## Task 3: Create Page Choreography Configuration

**Goal:** Define movement paths for each book page.

**Files:**
- Create: `src/components/book-explosion/PageChoreography.ts`

**Step 1: Create component directory**

```bash
mkdir -p src/components/book-explosion
```

**Step 2: Create choreography configuration**

File: `src/components/book-explosion/PageChoreography.ts`

```typescript
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
```

**Step 3: Commit choreography config**

```bash
git add src/components/book-explosion/PageChoreography.ts
git commit -m "feat: add page choreography configuration"
```

---

## Task 4: Create Individual Book Page Component

**Goal:** Build reusable 3D page component with PBR materials.

**Files:**
- Create: `src/components/book-explosion/BookPage.tsx`

**Step 1: Install GSAP for smooth animations**

```bash
npm install gsap
```

**Step 2: Create BookPage component**

File: `src/components/book-explosion/BookPage.tsx`

```typescript
import { useRef, useMemo } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import * as THREE from 'three'
import { PageConfig, getPageProgress, interpolate } from './PageChoreography'

interface BookPageProps {
  config: PageConfig
  scrollProgress: number
}

export function BookPage({ config, scrollProgress }: BookPageProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  // Load page texture
  const texture = useLoader(TextureLoader, config.texture)

  // Calculate page-specific progress
  const pageProgress = getPageProgress(scrollProgress, config.timing)

  // Interpolate position and rotation
  const currentPos = interpolate(config.startPos, config.endPos, pageProgress)
  const currentRot = interpolate(config.startRot, config.endRot, pageProgress)

  // Update mesh transform every frame for smooth animation
  useFrame(() => {
    if (!meshRef.current) return

    meshRef.current.position.set(...currentPos)
    meshRef.current.rotation.set(...currentRot)
  })

  return (
    <mesh
      ref={meshRef}
      position={currentPos}
      rotation={currentRot}
      castShadow
      receiveShadow
    >
      {/* Book page geometry - standard aspect ratio */}
      <planeGeometry args={[3, 4]} />

      {/* Hyperrealistic PBR material */}
      <meshPhysicalMaterial
        map={texture}
        side={THREE.DoubleSide}

        // PBR properties for realism
        roughness={0.7}
        metalness={0}

        // Advanced features
        transmission={0.05}  // Slight light pass-through
        thickness={0.1}      // For subsurface scattering
        clearcoat={0.05}     // Aged patina
        sheen={0.1}          // Velvet fiber reflection

        // Lighting response
        envMapIntensity={1.5}
      />
    </mesh>
  )
}
```

**Step 3: Commit BookPage component**

```bash
git add src/components/book-explosion/BookPage.tsx package.json package-lock.json
git commit -m "feat: create hyperrealistic BookPage component with PBR materials"
```

---

## Task 5: Create Camera Choreography System

**Goal:** Implement dynamic camera path with banks, rolls, and circles.

**Files:**
- Create: `src/components/book-explosion/CameraChoreography.tsx`

**Step 1: Define camera keyframes**

File: `src/components/book-explosion/CameraChoreography.tsx`

```typescript
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface CameraKeyframe {
  time: number  // 0.0 to 1.0 (scroll progress)
  position: [number, number, number]
  rotation: [number, number, number]  // pitch, yaw, roll
  lookAt: [number, number, number]
}

const cameraKeyframes: CameraKeyframe[] = [
  // Opening - front view
  {
    time: 0.0,
    position: [0, 0, 20],
    rotation: [0, 0, 0],
    lookAt: [0, 0, 0]
  },

  // Dolly forward
  {
    time: 0.2,
    position: [0, 0, 15],
    rotation: [0, 0, -0.3],  // Bank left
    lookAt: [0, 0, 0]
  },

  // First explosion - bank left
  {
    time: 0.4,
    position: [-5, 3, 10],
    rotation: [0.2, 0.3, -0.3],
    lookAt: [0, 2, 0]
  },

  // Through the layers - spiral
  {
    time: 0.6,
    position: [5, 5, 5],
    rotation: [0.3, -0.5, 0.5],
    lookAt: [-2, 2, 0]
  },

  // Dramatic roll
  {
    time: 0.8,
    position: [0, 8, 8],
    rotation: [0.5, 0, 3.14],  // 180° barrel roll
    lookAt: [0, 0, 0]
  },

  // Final reveal - elevated rear view
  {
    time: 1.0,
    position: [0, 15, 30],
    rotation: [0.4, 0, 0],
    lookAt: [0, 5, 0]
  },
]

interface CameraChoreographyProps {
  scrollProgress: number
}

export function CameraChoreography({ scrollProgress }: CameraChoreographyProps) {
  const { camera } = useThree()

  useFrame(() => {
    // Find surrounding keyframes
    let prevKeyframe = cameraKeyframes[0]
    let nextKeyframe = cameraKeyframes[cameraKeyframes.length - 1]

    for (let i = 0; i < cameraKeyframes.length - 1; i++) {
      if (
        scrollProgress >= cameraKeyframes[i].time &&
        scrollProgress <= cameraKeyframes[i + 1].time
      ) {
        prevKeyframe = cameraKeyframes[i]
        nextKeyframe = cameraKeyframes[i + 1]
        break
      }
    }

    // Calculate interpolation factor
    const range = nextKeyframe.time - prevKeyframe.time
    const localProgress = range > 0
      ? (scrollProgress - prevKeyframe.time) / range
      : 0

    // Smooth easing (ease-in-out cubic)
    const eased = localProgress < 0.5
      ? 4 * localProgress * localProgress * localProgress
      : 1 - Math.pow(-2 * localProgress + 2, 3) / 2

    // Interpolate position
    const newPos = new THREE.Vector3(
      THREE.MathUtils.lerp(prevKeyframe.position[0], nextKeyframe.position[0], eased),
      THREE.MathUtils.lerp(prevKeyframe.position[1], nextKeyframe.position[1], eased),
      THREE.MathUtils.lerp(prevKeyframe.position[2], nextKeyframe.position[2], eased)
    )

    // Interpolate rotation
    const newRot = new THREE.Euler(
      THREE.MathUtils.lerp(prevKeyframe.rotation[0], nextKeyframe.rotation[0], eased),
      THREE.MathUtils.lerp(prevKeyframe.rotation[1], nextKeyframe.rotation[1], eased),
      THREE.MathUtils.lerp(prevKeyframe.rotation[2], nextKeyframe.rotation[2], eased)
    )

    // Interpolate lookAt target
    const newLookAt = new THREE.Vector3(
      THREE.MathUtils.lerp(prevKeyframe.lookAt[0], nextKeyframe.lookAt[0], eased),
      THREE.MathUtils.lerp(prevKeyframe.lookAt[1], nextKeyframe.lookAt[1], eased),
      THREE.MathUtils.lerp(prevKeyframe.lookAt[2], nextKeyframe.lookAt[2], eased)
    )

    // Apply to camera
    camera.position.copy(newPos)
    camera.rotation.copy(newRot)
    camera.lookAt(newLookAt)
  })

  return null
}
```

**Step 2: Commit camera choreography**

```bash
git add src/components/book-explosion/CameraChoreography.tsx
git commit -m "feat: implement dynamic camera choreography with keyframes"
```

---

## Task 6: Create Main 3D Scene Component

**Goal:** Assemble all pieces into complete scene with lighting and effects.

**Files:**
- Create: `src/components/book-explosion/BookExplosionScene.tsx`

**Step 1: Create scene component**

File: `src/components/book-explosion/BookExplosionScene.tsx`

```typescript
'use client'

import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom, DepthOfField, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { BookPage } from './BookPage'
import { CameraChoreography } from './CameraChoreography'
import { pageChoreography } from './PageChoreography'
import { useScrollProgress } from '@/hooks/useScrollProgress'

export function BookExplosionScene() {
  const scrollProgress = useScrollProgress()

  return (
    <Canvas
      shadows
      camera={{
        position: [0, 0, 20],
        fov: 50,
      }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
      }}
    >
      {/* Background - Bartosz Dark */}
      <color attach="background" args={['#05201f']} />

      {/* Atmospheric fog */}
      <fog attach="fog" args={['#031614', 20, 100]} />

      {/* === LIGHTING SYSTEM === */}

      {/* HDRI Environment for realistic bounce light */}
      <Environment
        preset="city"
        background={false}
        blur={0.5}
      />

      {/* Key Light - Cinematic three-point */}
      <spotLight
        position={[10, 15, 10]}
        intensity={3.5}
        angle={0.5}
        penumbra={0.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={0.0001}
        color="#FFF8E7"  // Warm
      />

      {/* Rim Light 1 - Left */}
      <directionalLight
        position={[-10, 5, 5]}
        intensity={2.0}
        color="#C9A050"  // Gold
      />

      {/* Rim Light 2 - Right */}
      <directionalLight
        position={[10, 5, -5]}
        intensity={2.0}
        color="#C9A050"  // Gold
      />

      {/* Fill Light - Opposite key */}
      <directionalLight
        position={[-10, -5, -10]}
        intensity={0.8}
        color="#7BA8D1"  // Cool blue
      />

      {/* Dynamic camera-follow light */}
      <pointLight
        position={[0, 2, 20]}
        intensity={1.5}
        color="#FFF8E7"
        distance={30}
      />

      {/* === BOOK PAGES === */}
      {pageChoreography.map((config) => (
        <BookPage
          key={config.id}
          config={config}
          scrollProgress={scrollProgress}
        />
      ))}

      {/* === CAMERA SYSTEM === */}
      <CameraChoreography scrollProgress={scrollProgress} />

      {/* Orbit controls for debugging (disable in production) */}
      <OrbitControls
        enabled={false}
        enableDamping
        dampingFactor={0.05}
      />

      {/* === POST-PROCESSING EFFECTS === */}
      <EffectComposer>
        {/* Bloom - Soft glow */}
        <Bloom
          intensity={1.0}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          blendFunction={BlendFunction.ADD}
        />

        {/* Depth of Field - Cinematic focus */}
        <DepthOfField
          focusDistance={0.02}
          focalLength={0.05}
          bokehScale={2}
        />

        {/* Vignette - Frame darkening */}
        <Vignette
          offset={0.3}
          darkness={0.5}
        />
      </EffectComposer>
    </Canvas>
  )
}
```

**Step 2: Commit scene component**

```bash
git add src/components/book-explosion/BookExplosionScene.tsx
git commit -m "feat: create main BookExplosionScene with lighting and effects"
```

---

## Task 7: Integrate Scene Into Page

**Goal:** Connect 3D scene to page route.

**Files:**
- Modify: `src/app/books/blocks-a-b/page.tsx`

**Step 1: Import and render scene**

Replace the contents of `src/app/books/blocks-a-b/page.tsx`:

```typescript
'use client'

import { BookExplosionScene } from '@/components/book-explosion/BookExplosionScene'

export default function BookExplosionPage() {
  return (
    <main className="book-explosion-page">
      {/* 3D Scene */}
      <div className="scene-container">
        <BookExplosionScene />
      </div>

      {/* Scroll spacer for timeline control */}
      <div className="scroll-spacer" />

      {/* Instructions overlay */}
      <div className="instructions">
        <h2>Random Acts of Self-Actualization</h2>
        <p>Scroll to explore the book in 3D space</p>
      </div>

      <style jsx>{`
        .book-explosion-page {
          position: relative;
          background: #05201f;
          overflow-x: hidden;
        }

        .scene-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          z-index: 1;
        }

        .scroll-spacer {
          position: relative;
          height: 500vh;
          z-index: 0;
          pointer-events: none;
        }

        .instructions {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
          text-align: center;
          color: var(--color-text-primary);
          pointer-events: none;
          opacity: 0.8;
          transition: opacity 0.5s ease;
        }

        .book-explosion-page:hover .instructions {
          opacity: 0.3;
        }

        .instructions h2 {
          font-family: var(--font-serif);
          font-size: var(--font-size-h2);
          color: var(--color-accent-gold);
          margin-bottom: var(--space-md);
          letter-spacing: var(--tracking-tight);
        }

        .instructions p {
          font-family: var(--font-sans);
          font-size: var(--font-size-small);
          color: var(--color-text-secondary);
          text-transform: uppercase;
          letter-spacing: var(--tracking-widest);
        }
      `}</style>
    </main>
  )
}
```

**Step 2: Test the experience**

```bash
npm run dev
# Visit: http://localhost:3000/books/blocks-a-b
# Scroll down to see pages explode and camera fly
```

Expected:
- Book pages visible in 3D space
- Scrolling causes coordinated explosion
- Camera flies through with dramatic movements
- Lighting creates depth and shadows
- Bloom/DOF effects visible

**Step 3: Commit integration**

```bash
git add src/app/books/blocks-a-b/page.tsx
git commit -m "feat: integrate BookExplosionScene into page route"
```

---

## Task 8: Add Remaining 5 Pages

**Goal:** Complete the 10-15 page count for richer layering.

**Files:**
- Modify: `src/components/book-explosion/PageChoreography.ts`

**Step 1: Add 5 more page configurations**

Append to the `pageChoreography` array in `PageChoreography.ts`:

```typescript
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
```

**Step 2: Verify all 15 texture paths exist**

```bash
ls -1 public/books/blocks-a-b/ | wc -l
```

Expected: 15 (or adjust choreography to match actual page count)

**Step 3: Test with additional pages**

```bash
npm run dev
# Visit: http://localhost:3000/books/blocks-a-b
# Scroll through - should see richer, more complex explosion
```

**Step 4: Commit additional pages**

```bash
git add src/components/book-explosion/PageChoreography.ts
git commit -m "feat: add 5 more pages for richer 3D layering (15 total)"
```

---

## Task 9: Performance Optimization Pass

**Goal:** Ensure smooth 60fps on target devices.

**Files:**
- Modify: `src/components/book-explosion/BookExplosionScene.tsx`
- Modify: `src/components/book-explosion/BookPage.tsx`

**Step 1: Add texture optimization to BookPage**

In `BookPage.tsx`, update texture loading:

```typescript
// After texture loading
const texture = useLoader(TextureLoader, config.texture)

// Add optimization
useMemo(() => {
  texture.anisotropy = 16  // Better quality at angles
  texture.minFilter = THREE.LinearMipmapLinearFilter
  texture.magFilter = THREE.LinearFilter
  texture.generateMipmaps = true
}, [texture])
```

**Step 2: Add frustum culling hint**

In `BookExplosionScene.tsx`, update Canvas props:

```typescript
<Canvas
  shadows
  camera={{ position: [0, 0, 20], fov: 50 }}
  gl={{
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance',
    stencil: false,  // Disable if not needed
    depth: true,
  }}
  dpr={[1, 2]}  // Limit pixel ratio to 2x max
  performance={{ min: 0.5 }}  // Auto-throttle if FPS drops
>
```

**Step 3: Test FPS**

```bash
npm run dev
# Visit: http://localhost:3000/books/blocks-a-b
# Open DevTools > Performance
# Record while scrolling
# Check FPS stays above 30 (ideally 60)
```

**Step 4: Commit optimizations**

```bash
git add src/components/book-explosion/BookPage.tsx src/components/book-explosion/BookExplosionScene.tsx
git commit -m "perf: optimize textures and rendering for 60fps"
```

---

## Task 10: Build and Deploy

**Goal:** Verify production build and deploy to Vercel.

**Step 1: Run production build**

```bash
npm run build
```

Expected: Build completes successfully, no errors

**Step 2: Test production build locally**

```bash
npm start
# Visit: http://localhost:3000/books/blocks-a-b
```

Expected: Works identically to dev mode

**Step 3: Commit final changes**

```bash
git add .
git commit -m "feat: complete book explosion 3D experience

- 15 page explosion with cinematic choreography
- Dynamic camera with banks, rolls, circles
- PBR materials with advanced lighting
- Post-processing effects (Bloom, DOF, Vignette)
- Optimized for 60fps performance
- Scroll-driven timeline control

Route: /books/blocks-a-b"
```

**Step 4: Push and deploy**

```bash
git push origin feature/book-explosion-3d
```

Then either:
- Create PR on GitHub and merge to main
- Or deploy directly: `npx vercel --prod`

---

## Verification Checklist

After implementation, verify:

- [ ] All 15 page images load correctly
- [ ] Scrolling controls animation smoothly (no janks)
- [ ] Pages explode in varied directions (not predictable)
- [ ] Camera flies with dramatic movements (banks, rolls)
- [ ] Lighting creates realistic depth and shadows
- [ ] Post-processing effects are visible (bloom, DOF)
- [ ] Performance stays above 30fps (ideally 60)
- [ ] Works on both desktop and mobile
- [ ] Build completes without errors
- [ ] Deployed version matches local

---

## Notes for Engineer

**If pages don't appear:**
- Check that texture paths in PageChoreography.ts match actual filenames in public/books/blocks-a-b/
- Verify images are JPG format (not PNG)
- Check browser console for 404 errors

**If camera doesn't move:**
- Verify useScrollProgress hook is working (check console.log(scrollProgress))
- Ensure scroll spacer has height: 500vh
- Check CameraChoreography is receiving scrollProgress prop

**If performance is poor:**
- Reduce texture resolution (resize JPGs to 800px width)
- Decrease shadow map size from 2048 to 1024
- Disable some post-processing effects
- Reduce page count from 15 to 10

**If lighting looks wrong:**
- Adjust light intensities in BookExplosionScene
- Check HDRI environment is loading
- Verify MeshPhysicalMaterial properties in BookPage

**Testing URLs:**
- Dev: http://localhost:3000/books/blocks-a-b
- Prod: https://your-site.vercel.app/books/blocks-a-b
