# Quick Reference: Luxury Web Code Patterns

**Purpose:** Production-ready code snippets extracted from luxury web experience research
**Audience:** Frontend developers implementing the book museum
**Last Updated:** November 24, 2025

---

## TABLE OF CONTENTS

1. [Smooth Scroll Setup](#smooth-scroll-setup)
2. [GSAP Scroll Animations](#gsap-scroll-animations)
3. [CSS 3D Book Effects](#css-3d-book-effects)
4. [Three.js Scene Setup](#threejs-scene-setup)
5. [Image Optimization](#image-optimization)
6. [Animation Timing Functions](#animation-timing-functions)
7. [Responsive Patterns](#responsive-patterns)
8. [Performance Optimization](#performance-optimization)
9. [View Transitions API](#view-transitions-api)
10. [AI Integration Patterns](#ai-integration-patterns)

---

## 1. SMOOTH SCROLL SETUP

### Lenis + GSAP Integration (Obys Pattern)

```javascript
// /lib/smooth-scroll.ts
'use client'

import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false, // IMPORTANT: iOS compatibility
      touchMultiplier: 2,
      infinite: false
    })

    // Sync with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    // Handle anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault()
        const target = document.querySelector(anchor.getAttribute('href'))
        if (target) {
          lenis.scrollTo(target, { offset: 0, duration: 1.5 })
        }
      })
    })

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])
}
```

### Usage in Layout

```typescript
// /app/layout.tsx
'use client'

import { useSmoothScroll } from '@/lib/smooth-scroll'

export default function RootLayout({ children }) {
  useSmoothScroll()

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

---

## 2. GSAP SCROLL ANIMATIONS

### Fade In on Scroll

```javascript
// Basic fade in
gsap.from('.fade-element', {
  opacity: 0,
  y: 50,
  duration: 1,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.fade-element',
    start: 'top 80%', // Animation starts when element is 80% from top
    toggleActions: 'play none none reverse'
  }
})
```

### Staggered Animations

```javascript
// Stagger multiple elements
gsap.from('.book-card', {
  opacity: 0,
  y: 100,
  stagger: 0.1, // 0.1s delay between each element
  duration: 0.8,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.book-grid',
    start: 'top 70%'
  }
})
```

### Pinned Scroll Section

```javascript
// Pin section while content scrolls
gsap.timeline({
  scrollTrigger: {
    trigger: '.pinned-section',
    start: 'top top',
    end: '+=100%', // Duration of pin
    pin: true,
    scrub: 1 // Smooth scrubbing
  }
})
.to('.content', { opacity: 1, scale: 1 })
.to('.background', { scale: 1.2 }, '<') // '<' means start with previous
```

### Horizontal Scroll Timeline

```javascript
// Horizontal scrolling gallery
const sections = gsap.utils.toArray('.panel')

gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: 'none',
  scrollTrigger: {
    trigger: '.container',
    pin: true,
    scrub: 1,
    snap: 1 / (sections.length - 1),
    end: () => '+=' + document.querySelector('.container').offsetWidth
  }
})
```

### Image Reveal with Clip Path

```javascript
// Cinematic image reveal
gsap.from('.book-image', {
  clipPath: 'inset(100% 0 0 0)',
  scale: 1.2,
  duration: 1.5,
  ease: 'expo.out',
  scrollTrigger: {
    trigger: '.book-reveal',
    start: 'top 80%',
    end: 'center center',
    scrub: 1
  }
})
```

---

## 3. CSS 3D BOOK EFFECTS

### Book Page Turn Effect

```css
/* Book container */
.book-3d {
  perspective: 1500px;
  perspective-origin: 50% 50%;
}

.book-page {
  position: absolute;
  width: 300px;
  height: 400px;
  transform-style: preserve-3d;
  transform-origin: left center;
  transition: transform 1.2s cubic-bezier(0.4, 0, 0.2, 1);
  backface-visibility: hidden;
  will-change: transform;
}

.book-page.turning {
  transform: rotateY(-180deg);
}

/* Page shadow for depth */
.book-page::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, rgba(0,0,0,0.3), transparent);
  opacity: 0;
  transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
}

.book-page.turning::after {
  opacity: 1;
}
```

### Book Card Hover (3D Tilt)

```css
.book-card {
  transform-style: preserve-3d;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.book-card:hover {
  transform: perspective(1000px) rotateY(10deg) rotateX(5deg) scale(1.05);
}

.book-card-inner {
  transform: translateZ(50px);
}

.book-card-shadow {
  position: absolute;
  bottom: -20px;
  width: 100%;
  height: 20px;
  background: radial-gradient(ellipse, rgba(0,0,0,0.5), transparent);
  filter: blur(10px);
  transform: translateZ(-50px);
}
```

### Accordion 3D Effect

```css
.accordion-item {
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.accordion-item.expanded {
  transform: perspective(1200px) rotateX(-5deg) translateZ(30px);
}

.accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.accordion-item.expanded .accordion-content {
  max-height: 500px; /* Adjust as needed */
}
```

---

## 4. THREE.JS SCENE SETUP

### Basic Scene Configuration

```javascript
// /components/ThreeScene.tsx
import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export function ThreeScene() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf2efe7)

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 5

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mountRef.current.appendChild(renderer.domElement)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    // Animation loop
    function animate() {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Resize handler
    function handleResize() {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      mountRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="three-scene" />
}
```

### React Three Fiber (Recommended)

```javascript
// /components/BookScene.tsx
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF } from '@react-three/drei'
import { Suspense } from 'react'

function Book({ url }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} scale={0.5} />
}

export function BookScene() {
  return (
    <Canvas camera={{ position: [0, 2, 5], fov: 75 }}>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      {/* Environment */}
      <Environment preset="studio" />

      {/* 3D Content */}
      <Suspense fallback={null}>
        <Book url="/models/book.glb" />
      </Suspense>

      {/* Controls */}
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        minDistance={2}
        maxDistance={10}
      />
    </Canvas>
  )
}
```

### Particle System

```javascript
// Floating particles for atmosphere
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Particles({ count = 1000 }) {
  const points = useRef()

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }

    return positions
  }, [count])

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#cccccc"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}
```

---

## 5. IMAGE OPTIMIZATION

### Next.js Image Component

```typescript
// Optimized image with blur placeholder
import Image from 'next/image'

export function BookCover({ src, alt, priority = false }) {
  return (
    <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
        priority={priority}
        quality={85}
      />
    </div>
  )
}
```

### Progressive Image Loading

```javascript
// /components/ProgressiveImage.tsx
import { useState, useEffect } from 'react'

export function ProgressiveImage({ lowResSrc, highResSrc, alt }) {
  const [src, setSrc] = useState(lowResSrc)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.src = highResSrc
    img.onload = () => {
      setSrc(highResSrc)
      setIsLoaded(true)
    }
  }, [highResSrc])

  return (
    <img
      src={src}
      alt={alt}
      className={`transition-opacity duration-500 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
    />
  )
}
```

### Responsive Image Sets

```html
<!-- HTML approach -->
<picture>
  <source
    media="(min-width: 1200px)"
    srcset="/images/book-2048w.webp"
    type="image/webp"
  />
  <source
    media="(min-width: 768px)"
    srcset="/images/book-1280w.webp"
    type="image/webp"
  />
  <source
    media="(min-width: 768px)"
    srcset="/images/book-1280w.jpg"
  />
  <img
    src="/images/book-640w.jpg"
    alt="Book cover"
    loading="lazy"
    decoding="async"
  />
</picture>
```

---

## 6. ANIMATION TIMING FUNCTIONS

### Professional Easing Curves

```javascript
// /lib/easing.ts
export const easing = {
  // Luxury smooth (House of Corto pattern)
  luxury: 'cubic-bezier(0.4, 0.0, 0.2, 1)',

  // Expo out (dramatic reveals)
  expoOut: 'cubic-bezier(0.16, 1, 0.3, 1)',

  // Bounce (playful interactions)
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',

  // Lenis-like smooth
  lenis: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',

  // Material Design
  standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  deceleration: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
  acceleration: 'cubic-bezier(0.4, 0.0, 1, 1)',

  // Custom
  elastic: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)'
}

// Usage in CSS
.element {
  transition: transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1);
}
```

### Duration Standards

```css
/* /styles/animations.css */
:root {
  --duration-instant: 0.1s;
  --duration-fast: 0.2s;
  --duration-normal: 0.3s;
  --duration-moderate: 0.5s;
  --duration-slow: 0.8s;
  --duration-slower: 1.2s;
  --duration-slowest: 2s;
}

/* Usage examples */
.micro-interaction {
  transition: all var(--duration-fast) cubic-bezier(0.4, 0, 0.2, 1);
}

.card-hover {
  transition: all var(--duration-moderate) cubic-bezier(0.4, 0, 0.2, 1);
}

.page-transition {
  transition: all var(--duration-slower) cubic-bezier(0.4, 0, 0.2, 1);
}

.hero-reveal {
  animation: fadeIn var(--duration-slowest) cubic-bezier(0.16, 1, 0.3, 1);
}
```

---

## 7. RESPONSIVE PATTERNS

### Mobile-First Grid

```css
/* Mobile-first book grid */
.book-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 1rem;
}

/* Tablet */
@media (min-width: 640px) {
  .book-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    padding: 2rem;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .book-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    padding: 3rem;
  }
}

/* Large desktop */
@media (min-width: 1440px) {
  .book-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 2.5rem;
    max-width: 1600px;
    margin: 0 auto;
  }
}
```

### Fluid Typography

```css
/* Clamp for responsive font sizing */
.heading-1 {
  font-size: clamp(2rem, 5vw + 1rem, 6rem);
  line-height: 1.1;
}

.heading-2 {
  font-size: clamp(1.5rem, 3vw + 1rem, 4rem);
  line-height: 1.2;
}

.body {
  font-size: clamp(1rem, 0.5vw + 0.875rem, 1.25rem);
  line-height: 1.6;
}

.caption {
  font-size: clamp(0.75rem, 0.5vw + 0.625rem, 1rem);
  line-height: 1.4;
}
```

### Container Queries (Modern Approach)

```css
/* Component responds to container, not viewport */
.book-card-container {
  container-type: inline-size;
  container-name: book-card;
}

/* Small container */
@container book-card (max-width: 300px) {
  .book-card {
    grid-template-columns: 1fr;
  }

  .book-cover {
    aspect-ratio: 3/4;
  }
}

/* Large container */
@container book-card (min-width: 500px) {
  .book-card {
    grid-template-columns: 200px 1fr;
    gap: 2rem;
  }

  .book-details {
    padding: 1.5rem;
  }
}
```

### Device-Adaptive JavaScript

```javascript
// /lib/device-detection.ts
export function getDeviceCapabilities() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(
    navigator.userAgent
  )
  const isLowPowerMode = navigator.connection?.saveData
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches
  const hasTouch = 'ontouchstart' in window

  return {
    isMobile,
    isLowPowerMode,
    prefersReducedMotion,
    hasTouch,
    // Capability levels
    enableSmoothScroll: !isMobile && !prefersReducedMotion,
    enable3D: !isMobile && !isLowPowerMode,
    enableParticles: !isMobile && !isLowPowerMode,
    enableVideoBackground: !isMobile && !isLowPowerMode,
    animationDuration: prefersReducedMotion ? 0 : 1
  }
}

// Usage
const capabilities = getDeviceCapabilities()

if (capabilities.enable3D) {
  initThreeJS()
} else {
  document.body.classList.add('css-only')
}
```

---

## 8. PERFORMANCE OPTIMIZATION

### Code Splitting

```typescript
// Dynamic imports for heavy components
import dynamic from 'next/dynamic'

const BookViewer3D = dynamic(() => import('@/components/BookViewer3D'), {
  loading: () => <LoadingSkeleton />,
  ssr: false // Client-only for Three.js
})

const HeavyAnimation = dynamic(
  () => import('@/components/HeavyAnimation'),
  {
    loading: () => <div>Loading...</div>
  }
)

// Lazy load on interaction
const AICompanion = dynamic(() => import('@/components/AICompanion'), {
  ssr: false
})

export function BookPage() {
  const [showAI, setShowAI] = useState(false)

  return (
    <div>
      <BookContent />
      <button onClick={() => setShowAI(true)}>Open AI Companion</button>
      {showAI && <AICompanion />}
    </div>
  )
}
```

### GPU Acceleration

```css
/* Force GPU acceleration */
.gpu-accelerated {
  will-change: transform, opacity;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}

/* Use transform instead of position */
.animate-position {
  /* BAD - causes reflow */
  /* left: 100px; */
  /* top: 50px; */

  /* GOOD - uses GPU */
  transform: translate(100px, 50px);
}

/* Optimize font rendering */
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
```

### Intersection Observer for Lazy Effects

```javascript
// /hooks/useIntersectionObserver.ts
import { useEffect, useRef, useState } from 'react'

export function useIntersectionObserver(options = {}) {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        // Unobserve after first intersection
        if (elementRef.current) {
          observer.unobserve(elementRef.current)
        }
      }
    }, {
      threshold: 0.1,
      ...options
    })

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [options])

  return { elementRef, isVisible }
}

// Usage
export function LazyComponent() {
  const { elementRef, isVisible } = useIntersectionObserver()

  return (
    <div ref={elementRef}>
      {isVisible && <HeavyContent />}
    </div>
  )
}
```

### Preload Critical Assets

```typescript
// /app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Preload hero image */}
        <link
          rel="preload"
          href="/images/hero.webp"
          as="image"
          type="image/webp"
        />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://api.openai.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

---

## 9. VIEW TRANSITIONS API

### Basic Implementation

```javascript
// /lib/view-transitions.ts
export function navigateWithTransition(url: string, callback: () => void) {
  // Check for browser support
  if (!document.startViewTransition) {
    callback()
    return
  }

  // Start transition
  document.startViewTransition(async () => {
    callback()
  })
}

// Usage
import { navigateWithTransition } from '@/lib/view-transitions'

function handleNavigation() {
  navigateWithTransition('/books/1984', () => {
    // Update DOM or navigate
    router.push('/books/1984')
  })
}
```

### CSS Transitions

```css
/* Enable cross-document transitions (MPA) */
@view-transition {
  navigation: auto;
}

/* Customize default transition */
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 0.4s;
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

::view-transition-old(root) {
  animation-name: fadeOut;
}

::view-transition-new(root) {
  animation-name: fadeIn;
}

/* Named transitions for specific elements */
.book-cover {
  view-transition-name: book-cover;
}

.book-title {
  view-transition-name: book-title;
}

/* Custom animation for book cover */
::view-transition-old(book-cover),
::view-transition-new(book-cover) {
  animation-duration: 0.6s;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
}

/* Slide transition */
@keyframes slideOut {
  to {
    transform: translateX(-100%);
    opacity: 0;
  }
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
}

::view-transition-old(root) {
  animation: slideOut 0.4s cubic-bezier(0.4, 0, 1, 1);
}

::view-transition-new(root) {
  animation: slideIn 0.4s cubic-bezier(0, 0, 0.2, 1);
}
```

---

## 10. AI INTEGRATION PATTERNS

### Streaming Responses

```typescript
// /app/api/ai-companion/route.ts
import { OpenAI } from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(request: Request) {
  const { message, context } = await request.json()

  const stream = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      {
        role: 'system',
        content: 'You are a knowledgeable literary companion...'
      },
      { role: 'user', content: message }
    ],
    stream: true
  })

  // Create ReadableStream for streaming response
  const encoder = new TextEncoder()

  const readableStream = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content || ''
        controller.enqueue(encoder.encode(text))
      }
      controller.close()
    }
  })

  return new Response(readableStream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    }
  })
}
```

### Client-Side Streaming

```typescript
// /components/AICompanion.tsx
'use client'

import { useState } from 'react'

export function AICompanion() {
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  async function askQuestion(question: string) {
    setLoading(true)
    setResponse('')

    const res = await fetch('/api/ai-companion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: question })
    })

    const reader = res.body?.getReader()
    const decoder = new TextDecoder()

    while (true) {
      const { done, value } = await reader!.read()
      if (done) break

      const text = decoder.decode(value)
      setResponse((prev) => prev + text)
    }

    setLoading(false)
  }

  return (
    <div className="ai-companion">
      <input
        type="text"
        onKeyPress={(e) => {
          if (e.key === 'Enter') askQuestion(e.currentTarget.value)
        }}
      />
      <div className="response">{response}</div>
      {loading && <LoadingIndicator />}
    </div>
  )
}
```

### Semantic Search

```typescript
// /app/api/semantic-search/route.ts
import { OpenAIEmbeddings } from '@langchain/openai'
import { PineconeStore } from '@langchain/pinecone'
import { Pinecone } from '@pinecone-database/pinecone'

export async function POST(request: Request) {
  const { query, filters } = await request.json()

  // Initialize Pinecone
  const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY })
  const index = pinecone.Index('book-embeddings')

  // Create embeddings
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY
  })

  // Search
  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex: index,
    namespace: 'books'
  })

  const results = await vectorStore.similaritySearch(query, 10, filters)

  return Response.json({ results })
}
```

### Caching Strategy

```typescript
// /lib/ai-cache.ts
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN
})

export async function getCachedAIResponse(
  cacheKey: string,
  generator: () => Promise<string>,
  ttl = 86400 // 24 hours
): Promise<string> {
  // Check cache
  const cached = await redis.get<string>(cacheKey)
  if (cached) return cached

  // Generate response
  const response = await generator()

  // Cache for future requests
  await redis.set(cacheKey, response, { ex: ttl })

  return response
}

// Usage
const summary = await getCachedAIResponse(
  `book-summary-${bookId}`,
  async () => {
    const completion = await openai.chat.completions.create({...})
    return completion.choices[0].message.content
  }
)
```

---

## QUICK TIPS

### Performance Checklist

- [ ] Images optimized with Next.js Image component
- [ ] Code split with dynamic imports
- [ ] Critical CSS inlined
- [ ] Fonts preloaded
- [ ] GPU acceleration on animated elements
- [ ] Lazy load below-the-fold content
- [ ] Intersection Observer for expensive animations
- [ ] AI responses cached aggressively
- [ ] Mobile experience simplified
- [ ] Reduced motion preference respected

### Accessibility Checklist

- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Alt text on all images
- [ ] ARIA labels on interactive elements
- [ ] Color contrast 4.5:1 minimum
- [ ] Animations respect prefers-reduced-motion
- [ ] Screen reader tested
- [ ] Semantic HTML used
- [ ] Form validation accessible
- [ ] Skip navigation link present

### SEO Checklist

- [ ] Server-side rendering enabled
- [ ] Dynamic metadata generation
- [ ] Structured data (Schema.org)
- [ ] XML sitemap
- [ ] robots.txt configured
- [ ] Open Graph tags
- [ ] Twitter Cards
- [ ] Semantic heading hierarchy
- [ ] Descriptive URLs
- [ ] Internal linking strategy

---

**DOCUMENT STATUS:** Reference guide complete

**USAGE:** Copy/paste code patterns into your project

**MAINTENANCE:** Update as new patterns emerge

**QUESTIONS:** Contact Technical Researcher
