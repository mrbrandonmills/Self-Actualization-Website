# Fragments to Wholeness - Award-Winning 3D Book Experience

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create an award-worthy scroll experience where the book cover deconstructs into layers, orbits in 3D space, then reconstructs - visualizing the journey of self-actualization.

**Architecture:** React Three Fiber scene with GSAP ScrollTrigger choreography. Book cover split into 5 layers (background, circles, Vitruvian Man, brain, text) positioned in 3D depth. Custom shaders for displacement effects. Postprocessing for bloom/chromatic aberration. Synchronized typography reveals.

**Tech Stack:** React Three Fiber, @react-three/drei, @react-three/postprocessing, GSAP ScrollTrigger, Custom WebGL shaders, Lenis smooth scroll

---

## Phase 1: Layer Extraction & Asset Preparation

### Task 1.1: Extract Book Cover Layers

**Objective:** Split the book cover PNG into 5 separate transparent PNGs for 3D layering

**Files:**
- Source: `/Volumes/Super Mastery/Self-Actualization-Website/public/textures/books/block-a-b-cover.png`
- Create: `public/textures/layers/background.png`
- Create: `public/textures/layers/circles.png`
- Create: `public/textures/layers/vitruvian-man.png`
- Create: `public/textures/layers/brain.png`
- Create: `public/textures/layers/text.png`

**Step 1: Use Canva or AI image tool to extract layers**

Option A - Canva:
1. Upload block-a-b-cover.png to Canva
2. Use "Background Remover" and selection tools to isolate each element
3. Export each as transparent PNG at 2048x2048

Option B - Use Photoshop/GIMP:
1. Use magic wand/lasso to select each element
2. Copy to new layer
3. Export each layer as PNG

Option C - AI-assisted (Recommended for speed):
```bash
# Use Photopea (free online) or similar
# Select and extract:
# - Background (tan gradient)
# - Geometric circles/Sacred geometry overlay
# - Vitruvian Man figure
# - Brain illustration
# - Text ("RANDOM ACTS OF SELF-ACTUALIZATION" etc)
```

**Step 2: Optimize extracted images**

```bash
cd '/Volumes/Super Mastery/Self-Actualization-Website/public/textures/layers'

# Optimize PNGs (install if needed: brew install pngquant)
pngquant --quality=80-95 --ext .png --force *.png
```

**Step 3: Commit layer assets**

```bash
cd '/Volumes/Super Mastery/Self-Actualization-Website'
git add public/textures/layers/
git commit -m "feat: extract book cover into 5 layers for 3D depth

- background.png: Tan gradient base
- circles.png: Sacred geometry overlays
- vitruvian-man.png: Da Vinci figure
- brain.png: Brain illustration with mechanical elements
- text.png: Title and body text

Each layer 2048x2048 transparent PNG for WebGL rendering"
```

---

## Phase 2: Core 3D Scene Architecture

### Task 2.1: Install Required Dependencies

**Files:**
- Modify: `package.json`

**Step 1: Install 3D and animation packages**

```bash
cd '/Volumes/Super Mastery/Self-Actualization-Website'

npm install @react-three/postprocessing @react-three/drei three@latest gsap
```

**Step 2: Verify installation**

Run: `npm list @react-three/postprocessing @react-three/drei gsap`
Expected: All packages listed with versions

**Step 3: Commit dependency updates**

```bash
git add package.json package-lock.json
git commit -m "deps: add postprocessing, drei, and gsap for 3D experience"
```

---

### Task 2.2: Create Base Scene Component

**Files:**
- Create: `src/components/3d/FragmentsToWholeness/index.tsx`
- Create: `src/components/3d/FragmentsToWholeness/types.ts`

**Step 1: Create types file**

File: `src/components/3d/FragmentsToWholeness/types.ts`

```typescript
export interface FragmentsToWholenessProps {
  scrollProgress: number;
}

export interface LayerData {
  name: string;
  texturePath: string;
  initialPosition: [number, number, number];
  initialRotation: [number, number, number];
  initialScale: number;
}

export interface Act {
  startProgress: number;
  endProgress: number;
  name: string;
}

export const LAYERS: LayerData[] = [
  {
    name: 'background',
    texturePath: '/textures/layers/background.png',
    initialPosition: [0, 0, -5],
    initialRotation: [0, 0, 0],
    initialScale: 1.0,
  },
  {
    name: 'circles',
    texturePath: '/textures/layers/circles.png',
    initialPosition: [0, 0, -3],
    initialRotation: [0, 0, 0],
    initialScale: 1.0,
  },
  {
    name: 'vitruvian-man',
    texturePath: '/textures/layers/vitruvian-man.png',
    initialPosition: [0, 0, -1],
    initialRotation: [0, 0, 0],
    initialScale: 1.0,
  },
  {
    name: 'brain',
    texturePath: '/textures/layers/brain.png',
    initialPosition: [0, 0, 1],
    initialRotation: [0, 0, 0],
    initialScale: 1.0,
  },
  {
    name: 'text',
    texturePath: '/textures/layers/text.png',
    initialPosition: [0, 0, 3],
    initialRotation: [0, 0, 0],
    initialScale: 1.0,
  },
];

export const ACTS: Act[] = [
  { startProgress: 0, endProgress: 0.33, name: 'chaos' },
  { startProgress: 0.33, endProgress: 0.66, name: 'understanding' },
  { startProgress: 0.66, endProgress: 1.0, name: 'integration' },
];
```

**Step 2: Create base scene component**

File: `src/components/3d/FragmentsToWholeness/index.tsx`

```typescript
'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { FragmentsToWholenessProps, LAYERS, ACTS } from './types';

export function FragmentsToWholeness({ scrollProgress }: FragmentsToWholenessProps) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  // Determine current act
  const currentAct = ACTS.find(
    (act) => scrollProgress >= act.startProgress && scrollProgress < act.endProgress
  ) || ACTS[ACTS.length - 1];

  const actProgress = THREE.MathUtils.clamp(
    (scrollProgress - currentAct.startProgress) /
    (currentAct.endProgress - currentAct.startProgress),
    0,
    1
  );

  useFrame(() => {
    if (!cameraRef.current) return;

    // Camera movement based on scroll
    const targetZ = 15 - scrollProgress * 10; // 15 to 5
    cameraRef.current.position.z += (targetZ - cameraRef.current.position.z) * 0.05;

    cameraRef.current.lookAt(0, 0, 0);
  });

  return (
    <>
      <perspectiveCamera
        ref={cameraRef}
        position={[0, 0, 15]}
        fov={50}
      />

      {/* Lighting - cinematic 3-point setup */}
      <ambientLight intensity={0.3} />

      {/* Key light */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.5}
        color="#ffffff"
      />

      {/* Rim light */}
      <directionalLight
        position={[-5, 3, -5]}
        intensity={0.6}
        color="#4169E1"
      />

      {/* Fill light */}
      <pointLight
        position={[0, -3, 3]}
        intensity={0.4}
        color="#FFD700"
      />

      {/* Dark background */}
      <mesh position={[0, 0, -30]}>
        <planeGeometry args={[50, 50]} />
        <meshBasicMaterial color="#0a0a0a" />
      </mesh>

      {/* Layers will be added here */}
      <group>
        {/* Placeholder for layers */}
      </group>
    </>
  );
}
```

**Step 3: Commit base scene**

```bash
git add src/components/3d/FragmentsToWholeness/
git commit -m "feat: create base 3D scene with camera and lighting

- Types for layers, acts, and props
- Cinematic 3-point lighting setup
- Camera movement tied to scroll progress
- Dark background plane"
```

---

### Task 2.3: Create Layer Component with Texture Loading

**Files:**
- Create: `src/components/3d/FragmentsToWholeness/Layer.tsx`

**Step 1: Create Layer component**

File: `src/components/3d/FragmentsToWholeness/Layer.tsx`

```typescript
'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { LayerData } from './types';

interface LayerProps extends LayerData {
  scrollProgress: number;
  actName: 'chaos' | 'understanding' | 'integration';
  actProgress: number;
}

export function Layer({
  name,
  texturePath,
  initialPosition,
  initialRotation,
  initialScale,
  scrollProgress,
  actName,
  actProgress,
}: LayerProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Load texture with error handling
  const texture = useTexture(texturePath, (tex) => {
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.generateMipmaps = true;
  });

  // Calculate layer dimensions (4:3 aspect ratio)
  const layerWidth = 6;
  const layerHeight = (layerWidth * texture.image?.height) / texture.image?.width || 4.5;

  useFrame((state) => {
    if (!meshRef.current || !groupRef.current) return;

    const time = state.clock.elapsedTime;

    // Base position
    groupRef.current.position.set(...initialPosition);
    groupRef.current.rotation.set(...initialRotation);
    groupRef.current.scale.setScalar(initialScale);

    // Act-specific animations (placeholder - will be enhanced)
    if (actName === 'chaos') {
      // Subtle breathing effect
      const breath = Math.sin(time * 0.5 + initialPosition[2]) * 0.02;
      groupRef.current.scale.setScalar(initialScale * (1 + breath));
    }

    // Opacity based on distance to camera
    const material = meshRef.current.material as THREE.MeshStandardMaterial;
    const distanceToCamera = groupRef.current.position.z - (15 - scrollProgress * 10);
    const opacity = THREE.MathUtils.clamp(1 - Math.abs(distanceToCamera) / 20, 0.3, 1);
    material.opacity = opacity;
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} castShadow>
        <planeGeometry args={[layerWidth, layerHeight]} />
        <meshStandardMaterial
          map={texture}
          transparent
          opacity={1}
          side={THREE.DoubleSide}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
}
```

**Step 2: Integrate Layer components into scene**

File: `src/components/3d/FragmentsToWholeness/index.tsx`

```typescript
// Add import at top
import { Layer } from './Layer';

// Replace placeholder group with:
<group>
  {LAYERS.map((layer) => (
    <Layer
      key={layer.name}
      {...layer}
      scrollProgress={scrollProgress}
      actName={currentAct.name as 'chaos' | 'understanding' | 'integration'}
      actProgress={actProgress}
    />
  ))}
</group>
```

**Step 3: Commit layer system**

```bash
git add src/components/3d/FragmentsToWholeness/
git commit -m "feat: add textured layer components with depth positioning

- Texture loading with mipmaps for quality
- Dynamic layer sizing based on texture aspect ratio
- Distance-based opacity for depth perception
- Subtle breathing animation placeholder
- All 5 layers rendering in 3D space"
```

---

## Phase 3: Act 1 - Chaos (Fragmentation)

### Task 3.1: Implement Fragmentation Animation

**Files:**
- Modify: `src/components/3d/FragmentsToWholeness/Layer.tsx`
- Create: `src/components/3d/FragmentsToWholeness/animations/chaos.ts`

**Step 1: Create chaos animation module**

File: `src/components/3d/FragmentsToWholeness/animations/chaos.ts`

```typescript
import * as THREE from 'three';

export interface ChaosAnimationParams {
  actProgress: number;
  layerIndex: number;
  totalLayers: number;
  time: number;
}

export function calculateChaosTransform(
  params: ChaosAnimationParams,
  initialPosition: [number, number, number]
): {
  position: THREE.Vector3;
  rotation: THREE.Euler;
  scale: number;
} {
  const { actProgress, layerIndex, totalLayers, time } = params;

  // Staggered fragmentation - outer layers break first
  const layerDelay = (totalLayers - layerIndex) * 0.15;
  const localProgress = THREE.MathUtils.clamp((actProgress - layerDelay) / 0.7, 0, 1);

  // Explosion direction based on layer index
  const angle = (layerIndex / totalLayers) * Math.PI * 2;
  const radius = localProgress * 5; // How far layers explode outward

  // Easing: Start slow, accelerate, then decelerate
  const eased = Math.sin(localProgress * Math.PI * 0.5); // Ease out sine

  const position = new THREE.Vector3(
    initialPosition[0] + Math.cos(angle) * radius * eased,
    initialPosition[1] + Math.sin(angle) * radius * eased * 0.5,
    initialPosition[2] + (layerIndex - totalLayers / 2) * localProgress * 2
  );

  // Rotation - layers tumble as they separate
  const rotation = new THREE.Euler(
    Math.sin(time * 0.5 + layerIndex) * localProgress * Math.PI * 0.5,
    Math.cos(time * 0.3 + layerIndex) * localProgress * Math.PI * 0.5,
    Math.sin(time * 0.7 + layerIndex) * localProgress * Math.PI * 0.3
  );

  // Scale - layers shrink slightly as they separate
  const scale = 1 - localProgress * 0.2;

  return { position, rotation, scale };
}
```

**Step 2: Apply chaos animation to Layer component**

File: `src/components/3d/FragmentsToWholeness/Layer.tsx`

```typescript
// Add import
import { calculateChaosTransform } from './animations/chaos';

// In useFrame, replace chaos placeholder with:
if (actName === 'chaos') {
  const layerIndex = LAYERS.findIndex((l) => l.name === name);
  const transform = calculateChaosTransform(
    {
      actProgress,
      layerIndex,
      totalLayers: LAYERS.length,
      time,
    },
    initialPosition
  );

  groupRef.current.position.copy(transform.position);
  groupRef.current.rotation.copy(transform.rotation);
  groupRef.current.scale.setScalar(transform.scale);
}
```

**Step 3: Test chaos animation**

Run: `npm run dev`
Navigate to site and scroll to 0-33%
Expected: Layers gradually separate, tumble, and move outward in circular pattern

**Step 4: Commit chaos animation**

```bash
git add src/components/3d/FragmentsToWholeness/
git commit -m "feat: implement Act 1 chaos fragmentation animation

- Staggered layer separation (outer layers first)
- Circular explosion pattern with easing
- Tumbling rotation on 3 axes
- Scale reduction as layers separate
- Smooth sine-based easing for organic feel"
```

---

### Task 3.2: Add Displacement Shader for Organic Tearing

**Files:**
- Create: `src/components/3d/FragmentsToWholeness/shaders/displacementShader.ts`
- Modify: `src/components/3d/FragmentsToWholeness/Layer.tsx`

**Step 1: Create displacement shader**

File: `src/components/3d/FragmentsToWholeness/shaders/displacementShader.ts`

```typescript
export const displacementVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uDisplacement;
  uniform float uTime;

  // Simplex noise function
  vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }

  vec4 mod289(vec4 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }

  vec4 permute(vec4 x) {
    return mod289(((x*34.0)+1.0)*x);
  }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = inversesqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vUv = uv;
    vPosition = position;

    // Calculate noise-based displacement
    float noise = snoise(vec3(position.xy * 2.0, uTime * 0.5));
    vec3 displaced = position + normal * noise * uDisplacement;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
  }
`;

export const displacementFragmentShader = `
  uniform sampler2D uTexture;
  uniform float uOpacity;
  uniform float uDisplacement;
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    vec4 texColor = texture2D(uTexture, vUv);

    // Edge detection for tear effect
    float edge = smoothstep(0.0, 0.1, uDisplacement) *
                 (1.0 - smoothstep(0.9, 1.0, length(vUv - 0.5) * 2.0));

    // Glow at edges when tearing
    vec3 glowColor = vec3(1.0, 0.84, 0.0); // Gold
    vec3 finalColor = mix(texColor.rgb, glowColor, edge * 0.3);

    gl_FragColor = vec4(finalColor, texColor.a * uOpacity);
  }
`;
```

**Step 2: Add shader material to Layer**

File: `src/components/3d/FragmentsToWholeness/Layer.tsx`

```typescript
// Add imports
import { displacementVertexShader, displacementFragmentShader } from './shaders/displacementShader';

// In component, create shader material
const shaderMaterial = useMemo(
  () =>
    new THREE.ShaderMaterial({
      vertexShader: displacementVertexShader,
      fragmentShader: displacementFragmentShader,
      uniforms: {
        uTexture: { value: texture },
        uOpacity: { value: 1.0 },
        uDisplacement: { value: 0.0 },
        uTime: { value: 0.0 },
      },
      transparent: true,
      side: THREE.DoubleSide,
    }),
  [texture]
);

// In useFrame, update uniforms for chaos act
if (actName === 'chaos') {
  // ... existing chaos code ...

  // Add shader displacement
  shaderMaterial.uniforms.uDisplacement.value = actProgress * 0.5;
  shaderMaterial.uniforms.uTime.value = time;
  shaderMaterial.uniforms.uOpacity.value = opacity;
}

// Update mesh to use shader material
<mesh ref={meshRef} material={shaderMaterial} castShadow>
  <planeGeometry args={[layerWidth, layerHeight, 32, 32]} />
</mesh>
```

**Step 3: Test displacement shader**

Run: `npm run dev`
Navigate and scroll to chaos section
Expected: Layers appear to tear organically with golden edge glow

**Step 4: Commit displacement shader**

```bash
git add src/components/3d/FragmentsToWholeness/
git commit -m "feat: add organic displacement shader for tearing effect

- Simplex noise-based vertex displacement
- Golden edge glow when fragmenting
- Smooth transition controlled by act progress
- High-poly geometry (32x32) for smooth deformation"
```

---

## Phase 4: Act 2 - Understanding (Orbital Mechanics)

### Task 4.1: Implement Orbital Animation

**Files:**
- Create: `src/components/3d/FragmentsToWholeness/animations/understanding.ts`
- Modify: `src/components/3d/FragmentsToWholeness/Layer.tsx`

**Step 1: Create understanding animation module**

File: `src/components/3d/FragmentsToWholeness/animations/understanding.ts`

```typescript
import * as THREE from 'three';

export interface UnderstandingAnimationParams {
  actProgress: number;
  layerIndex: number;
  totalLayers: number;
  time: number;
}

export function calculateUnderstandingTransform(
  params: UnderstandingAnimationParams
): {
  position: THREE.Vector3;
  rotation: THREE.Euler;
  scale: number;
} {
  const { actProgress, layerIndex, totalLayers, time } = params;

  // Each layer orbits in its own unique pattern
  const layerAngleOffset = (layerIndex / totalLayers) * Math.PI * 2;
  const orbitRadius = 8 + layerIndex * 0.5; // Layers orbit at different radii

  // Orbital speed varies per layer
  const orbitSpeed = 0.5 + layerIndex * 0.1;

  // Calculate orbital position
  const angle = time * orbitSpeed + layerAngleOffset;
  const x = Math.cos(angle) * orbitRadius * actProgress;
  const y = Math.sin(angle * 0.7) * orbitRadius * 0.5 * actProgress; // Elliptical orbit
  const z = Math.sin(angle) * orbitRadius * actProgress;

  const position = new THREE.Vector3(x, y, z);

  // Rotation - layers slowly spin while orbiting
  const rotation = new THREE.Euler(
    time * 0.2 + layerIndex,
    time * 0.3 + layerAngleOffset,
    time * 0.15
  );

  // Scale - slightly larger during orbit
  const scale = 1 + Math.sin(actProgress * Math.PI) * 0.2;

  return { position, rotation, scale };
}

// Connection lines between orbiting layers
export interface ConnectionLine {
  start: THREE.Vector3;
  end: THREE.Vector3;
  opacity: number;
}

export function calculateConnectionLines(
  layerPositions: THREE.Vector3[],
  actProgress: number
): ConnectionLine[] {
  const lines: ConnectionLine[] = [];
  const fadeIn = THREE.MathUtils.smoothstep(actProgress, 0.2, 0.5);
  const fadeOut = 1 - THREE.MathUtils.smoothstep(actProgress, 0.7, 1.0);
  const opacity = fadeIn * fadeOut;

  // Connect each layer to the next
  for (let i = 0; i < layerPositions.length - 1; i++) {
    lines.push({
      start: layerPositions[i],
      end: layerPositions[i + 1],
      opacity,
    });
  }

  // Connect last to first (complete the cycle)
  if (layerPositions.length > 0) {
    lines.push({
      start: layerPositions[layerPositions.length - 1],
      end: layerPositions[0],
      opacity,
    });
  }

  return lines;
}
```

**Step 2: Add understanding animation to Layer**

File: `src/components/3d/FragmentsToWholeness/Layer.tsx`

```typescript
// Add import
import { calculateUnderstandingTransform } from './animations/understanding';

// In useFrame, add understanding case
else if (actName === 'understanding') {
  const layerIndex = LAYERS.findIndex((l) => l.name === name);
  const transform = calculateUnderstandingTransform({
    actProgress,
    layerIndex,
    totalLayers: LAYERS.length,
    time,
  });

  groupRef.current.position.copy(transform.position);
  groupRef.current.rotation.copy(transform.rotation);
  groupRef.current.scale.setScalar(transform.scale);

  // Disable displacement shader during orbit
  shaderMaterial.uniforms.uDisplacement.value = 0;
  shaderMaterial.uniforms.uTime.value = time;
  shaderMaterial.uniforms.uOpacity.value = 1.0;
}
```

**Step 3: Create connection lines component**

File: `src/components/3d/FragmentsToWholeness/ConnectionLines.tsx`

```typescript
'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Line } from '@react-three/drei';

interface ConnectionLinesProps {
  layerPositions: THREE.Vector3[];
  actProgress: number;
  actName: string;
}

export function ConnectionLines({ layerPositions, actProgress, actName }: ConnectionLinesProps) {
  const lineRefs = useRef<THREE.Line[]>([]);

  // Only show in understanding act
  if (actName !== 'understanding' || layerPositions.length === 0) {
    return null;
  }

  const fadeIn = THREE.MathUtils.smoothstep(actProgress, 0.2, 0.5);
  const fadeOut = 1 - THREE.MathUtils.smoothstep(actProgress, 0.7, 1.0);
  const opacity = fadeIn * fadeOut;

  return (
    <group>
      {layerPositions.map((start, i) => {
        const end = layerPositions[(i + 1) % layerPositions.length];

        return (
          <Line
            key={i}
            points={[start, end]}
            color="#FFD700"
            lineWidth={2}
            transparent
            opacity={opacity}
          />
        );
      })}
    </group>
  );
}
```

**Step 4: Integrate connection lines**

File: `src/components/3d/FragmentsToWholeness/index.tsx`

```typescript
// Add state to track layer positions
const [layerPositions, setLayerPositions] = React.useState<THREE.Vector3[]>([]);

// After layers, add connection lines
<ConnectionLines
  layerPositions={layerPositions}
  actProgress={actProgress}
  actName={currentAct.name}
/>
```

**Step 5: Test orbital animation**

Run: `npm run dev`
Scroll to 33-66% section
Expected: Layers orbit in elliptical paths with golden connection lines

**Step 6: Commit orbital mechanics**

```bash
git add src/components/3d/FragmentsToWholeness/
git commit -m "feat: implement Act 2 understanding orbital animation

- Each layer orbits at unique radius and speed
- Elliptical orbit paths for visual interest
- Layers spin while orbiting (dual rotation)
- Golden connection lines linking layers
- Smooth fade in/out of connections
- Scale pulse effect during orbit"
```

---

## Phase 5: Act 3 - Integration (Reformation)

### Task 5.1: Implement Reformation Animation

**Files:**
- Create: `src/components/3d/FragmentsToWholeness/animations/integration.ts`
- Modify: `src/components/3d/FragmentsToWholeness/Layer.tsx`

**Step 1: Create integration animation module**

File: `src/components/3d/FragmentsToWholeness/animations/integration.ts`

```typescript
import * as THREE from 'three';

export interface IntegrationAnimationParams {
  actProgress: number;
  layerIndex: number;
  totalLayers: number;
  time: number;
  initialPosition: [number, number, number];
}

export function calculateIntegrationTransform(
  params: IntegrationAnimationParams
): {
  position: THREE.Vector3;
  rotation: THREE.Euler;
  scale: number;
} {
  const { actProgress, layerIndex, totalLayers, time, initialPosition } = params;

  // Spiral convergence - layers spiral inward to center
  const spiralRadius = (1 - actProgress) * 8; // Start at 8, converge to 0
  const spiralAngle = actProgress * Math.PI * 4 + layerIndex; // Multiple rotations

  // Target position (slightly offset from original for transformation)
  const targetOffset = new THREE.Vector3(
    0,
    layerIndex * 0.1 - (totalLayers * 0.1) / 2, // Vertical stack
    layerIndex * 0.3 - (totalLayers * 0.3) / 2  // Slight depth
  );

  // Current spiral position
  const spiralX = Math.cos(spiralAngle) * spiralRadius;
  const spiralY = Math.sin(spiralAngle * 0.5) * spiralRadius * 0.5;
  const spiralZ = Math.sin(spiralAngle) * spiralRadius;

  // Interpolate from spiral to target
  const eased = Math.pow(actProgress, 2); // Ease in quad
  const position = new THREE.Vector3(
    THREE.MathUtils.lerp(spiralX, targetOffset.x, eased),
    THREE.MathUtils.lerp(spiralY, targetOffset.y, eased),
    THREE.MathUtils.lerp(spiralZ, targetOffset.z, eased)
  );

  // Rotation - align flat as they reform
  const rotation = new THREE.Euler(
    (1 - eased) * Math.PI * 2,
    (1 - eased) * Math.PI * 3,
    0
  );

  // Scale - grow larger as they reform (transformed state)
  const scale = THREE.MathUtils.lerp(1, 1.5, actProgress);

  return { position, rotation, scale };
}
```

**Step 2: Add integration animation to Layer**

File: `src/components/3d/FragmentsToWholeness/Layer.tsx`

```typescript
// Add import
import { calculateIntegrationTransform } from './animations/integration';

// In useFrame, add integration case
else if (actName === 'integration') {
  const layerIndex = LAYERS.findIndex((l) => l.name === name);
  const transform = calculateIntegrationTransform({
    actProgress,
    layerIndex,
    totalLayers: LAYERS.length,
    time,
    initialPosition,
  });

  groupRef.current.position.copy(transform.position);
  groupRef.current.rotation.copy(transform.rotation);
  groupRef.current.scale.setScalar(transform.scale);

  // Re-enable displacement with inverse effect (healing)
  shaderMaterial.uniforms.uDisplacement.value = (1 - actProgress) * 0.3;
  shaderMaterial.uniforms.uTime.value = time;
  shaderMaterial.uniforms.uOpacity.value = 1.0;
}
```

**Step 3: Commit integration animation**

```bash
git add src/components/3d/FragmentsToWholeness/
git commit -m "feat: implement Act 3 integration reformation animation

- Spiral convergence pattern bringing layers together
- Layers align flat and stack vertically
- Ease-in quad for satisfying conclusion
- Scale increase to 1.5x (transformed/elevated state)
- Displacement shader reverses (healing effect)
- Multiple spiral rotations for visual drama"
```

---

## Phase 6: Visual Effects & Post-Processing

### Task 6.1: Add Bloom and Chromatic Aberration

**Files:**
- Modify: `src/components/3d/InfiniteJourney.tsx`

**Step 1: Wrap scene in post-processing effects**

File: `src/components/3d/InfiniteJourney.tsx`

```typescript
// Add imports
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { FragmentsToWholeness } from './FragmentsToWholeness';

// Replace current return with:
return (
  <>
    <FragmentsToWholeness scrollProgress={scrollProgress} />

    <EffectComposer>
      {/* Bloom - creates glow around bright elements */}
      <Bloom
        intensity={0.5}
        luminanceThreshold={0.6}
        luminanceSmoothing={0.9}
        height={300}
        opacity={1}
        blendFunction={BlendFunction.SCREEN}
      />

      {/* Chromatic Aberration - subtle RGB split for cinematic feel */}
      <ChromaticAberration
        offset={[0.001, 0.001]}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>

    {/* Subtle background stars */}
    <Stars
      radius={100}
      depth={50}
      count={2000}
      factor={2}
      saturation={0}
      fade
      speed={0.3}
    />
  </>
);
```

**Step 2: Test postprocessing**

Run: `npm run dev`
Expected: Subtle glow around golden elements, slight RGB fringing

**Step 3: Commit postprocessing**

```bash
git add src/components/3d/InfiniteJourney.tsx
git commit -m "feat: add bloom and chromatic aberration postprocessing

- Bloom effect creates ethereal glow on golden elements
- Chromatic aberration adds cinematic RGB split
- Subtle stars in deep background
- Performance-optimized with lower bloom resolution"
```

---

## Phase 7: Typography Integration

### Task 7.1: Create Synchronized Text Reveals

**Files:**
- Create: `src/components/ScrollText/ActText.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create text component**

File: `src/components/ScrollText/ActText.tsx`

```typescript
'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface ActTextProps {
  scrollProgress: number;
}

interface TextBlock {
  act: number;
  title: string;
  subtitle: string;
  startProgress: number;
  endProgress: number;
}

const TEXT_BLOCKS: TextBlock[] = [
  {
    act: 1,
    title: 'Chaos',
    subtitle: 'Every journey begins with fragmentation',
    startProgress: 0.05,
    endProgress: 0.28,
  },
  {
    act: 2,
    title: 'Understanding',
    subtitle: 'Discovering the parts of yourself',
    startProgress: 0.38,
    endProgress: 0.61,
  },
  {
    act: 3,
    title: 'Integration',
    subtitle: 'Wholeness. Transformation. Actualization.',
    startProgress: 0.71,
    endProgress: 0.95,
  },
];

export function ActText({ scrollProgress }: ActTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-10 flex items-center justify-center"
    >
      {TEXT_BLOCKS.map((block) => {
        const isActive =
          scrollProgress >= block.startProgress &&
          scrollProgress <= block.endProgress;

        const localProgress =
          (scrollProgress - block.startProgress) /
          (block.endProgress - block.startProgress);

        const opacity = isActive
          ? Math.sin(Math.min(localProgress, 1) * Math.PI)
          : 0;

        const translateY = isActive ? 0 : 20;

        return (
          <div
            key={block.act}
            className="absolute text-center"
            style={{
              opacity,
              transform: `translateY(${translateY}px)`,
              transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            <h2 className="text-6xl font-serif text-white mb-4 tracking-wider">
              {block.title}
            </h2>
            <p className="text-xl font-sans text-gray-300 max-w-2xl">
              {block.subtitle}
            </p>
          </div>
        );
      })}
    </div>
  );
}
```

**Step 2: Integrate text into page**

File: `src/app/page.tsx`

```typescript
// Add import
import { ActText } from '@/components/ScrollText/ActText';

// Inside main scroll container, before Canvas:
<ActText scrollProgress={scrollProgress} />
```

**Step 3: Test text reveals**

Run: `npm run dev`
Scroll through each act
Expected: Text fades in smoothly at start of each act, fades out at end

**Step 4: Commit typography system**

```bash
git add src/components/ScrollText/ src/app/page.tsx
git commit -m "feat: add synchronized typography for each act

- Act titles and subtitles fade in/out with scroll
- Sine-based opacity for smooth transitions
- Serif for titles, sans-serif for subtitles
- Positioned center screen with pointer-events disabled
- Synchronized with act progress timing"
```

---

## Phase 8: Particle Systems

### Task 8.1: Add Golden Particles During Transformation

**Files:**
- Create: `src/components/3d/FragmentsToWholeness/GoldenParticles.tsx`
- Modify: `src/components/3d/FragmentsToWholeness/index.tsx`

**Step 1: Create particle system**

File: `src/components/3d/FragmentsToWholeness/GoldenParticles.tsx`

```typescript
'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface GoldenParticlesProps {
  actName: string;
  actProgress: number;
}

export function GoldenParticles({ actName, actProgress }: GoldenParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 1000;

  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Random spherical distribution
      const radius = Math.random() * 15;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      // Golden color
      colors[i3] = 1.0;
      colors[i3 + 1] = 0.84;
      colors[i3 + 2] = 0.0;

      sizes[i] = Math.random() * 0.1 + 0.05;
    }

    return { positions, colors, sizes };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.elapsedTime;
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

    // Particle behavior changes per act
    if (actName === 'chaos') {
      // Particles explode outward
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const x = particles.positions[i3];
        const y = particles.positions[i3 + 1];
        const z = particles.positions[i3 + 2];

        const distance = Math.sqrt(x * x + y * y + z * z);
        const expansion = actProgress * 5;

        positions[i3] = x * (1 + expansion / distance);
        positions[i3 + 1] = y * (1 + expansion / distance);
        positions[i3 + 2] = z * (1 + expansion / distance);
      }
    } else if (actName === 'understanding') {
      // Particles orbit
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const angle = time * 0.5 + i * 0.01;
        const radius = 10 + Math.sin(time + i * 0.1) * 2;

        positions[i3] = Math.cos(angle) * radius;
        positions[i3 + 1] = Math.sin(angle * 0.7) * radius * 0.5;
        positions[i3 + 2] = Math.sin(angle) * radius;
      }
    } else if (actName === 'integration') {
      // Particles converge to center
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const x = particles.positions[i3];
        const y = particles.positions[i3 + 1];
        const z = particles.positions[i3 + 2];

        const convergence = actProgress;
        positions[i3] = x * (1 - convergence);
        positions[i3 + 1] = y * (1 - convergence);
        positions[i3 + 2] = z * (1 - convergence);
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  // Opacity based on act
  const opacity = actName === 'chaos' ? actProgress :
                  actName === 'understanding' ? 0.8 :
                  1 - actProgress * 0.5;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={particles.colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particleCount}
          array={particles.sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={opacity}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
```

**Step 2: Integrate particles**

File: `src/components/3d/FragmentsToWholeness/index.tsx`

```typescript
// Add import
import { GoldenParticles } from './GoldenParticles';

// Add after layers
<GoldenParticles actName={currentAct.name} actProgress={actProgress} />
```

**Step 3: Test particles**

Run: `npm run dev`
Expected: Golden particles explode (chaos), orbit (understanding), converge (integration)

**Step 4: Commit particle system**

```bash
git add src/components/3d/FragmentsToWholeness/
git commit -m "feat: add golden particle system for visual magic

- 1000 particles with act-specific behaviors
- Chaos: particles explode outward with layers
- Understanding: particles orbit in harmony
- Integration: particles converge to center
- Additive blending for ethereal glow
- Opacity modulation per act"
```

---

## Phase 9: Audio System (Optional)

### Task 9.1: Add Ambient Audio

**Files:**
- Create: `src/components/Audio/AmbientAudio.tsx`
- Create: `public/audio/chaos.mp3` (placeholder)
- Create: `public/audio/understanding.mp3` (placeholder)
- Create: `public/audio/integration.mp3` (placeholder)

**Step 1: Create audio component**

File: `src/components/Audio/AmbientAudio.tsx`

```typescript
'use client';

import React, { useEffect, useRef, useState } from 'react';

interface AmbientAudioProps {
  actName: string;
  actProgress: number;
  enabled: boolean;
}

const AUDIO_FILES = {
  chaos: '/audio/chaos.mp3',
  understanding: '/audio/understanding.mp3',
  integration: '/audio/integration.mp3',
};

export function AmbientAudio({ actName, actProgress, enabled }: AmbientAudioProps) {
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Preload audio files
    Object.entries(AUDIO_FILES).forEach(([name, src]) => {
      const audio = new Audio(src);
      audio.loop = true;
      audio.volume = 0;
      audioRefs.current[name] = audio;
    });
    setIsLoaded(true);

    return () => {
      // Cleanup
      Object.values(audioRefs.current).forEach((audio) => {
        audio.pause();
        audio.src = '';
      });
    };
  }, []);

  useEffect(() => {
    if (!isLoaded || !enabled) return;

    // Crossfade between tracks
    Object.entries(audioRefs.current).forEach(([name, audio]) => {
      if (name === actName) {
        // Fade in current act audio
        if (audio.paused) audio.play();
        audio.volume = Math.min(actProgress, 0.3); // Max volume 0.3
      } else {
        // Fade out other audio
        audio.volume = Math.max(audio.volume - 0.05, 0);
        if (audio.volume === 0) audio.pause();
      }
    });
  }, [actName, actProgress, enabled, isLoaded]);

  return null; // No visual component
}

// Toggle button component
export function AudioToggle() {
  const [enabled, setEnabled] = useState(false);

  return (
    <button
      onClick={() => setEnabled(!enabled)}
      className="fixed bottom-4 right-4 z-50 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full backdrop-blur-sm transition-colors"
      aria-label={enabled ? 'Mute audio' : 'Enable audio'}
    >
      {enabled ? '🔊' : '🔇'}
    </button>
  );
}
```

**Step 2: Add audio toggle to page**

File: `src/app/page.tsx`

```typescript
// Add imports
import { AmbientAudio, AudioToggle } from '@/components/Audio/AmbientAudio';
import { useState } from 'react';

// Add state
const [audioEnabled, setAudioEnabled] = useState(false);

// Add to render
<AmbientAudio actName={currentAct} actProgress={actProgress} enabled={audioEnabled} />
<AudioToggle enabled={audioEnabled} onToggle={setAudioEnabled} />
```

**Step 3: Note about audio files**

```markdown
NOTE: Audio files are placeholders. For production:
1. Commission or license ambient soundscapes
2. Chaos: Crackling, breaking, tension-building sounds
3. Understanding: Harmonic humming, resonant tones
4. Integration: Uplifting, harmonic convergence
5. Use tools like Ableton Live or hire a sound designer
```

**Step 4: Commit audio system**

```bash
git add src/components/Audio/ src/app/page.tsx
git commit -m "feat: add toggleable ambient audio system

- Crossfade between act-specific soundscapes
- Volume controlled by act progress
- Toggle button (fixed bottom-right)
- Preloading and cleanup handling
- Max volume 0.3 for subtlety
- Audio files are placeholders (need real assets)"
```

---

## Phase 10: Mobile Optimization

### Task 10.1: Responsive Performance Adjustments

**Files:**
- Create: `src/hooks/useDeviceCapabilities.ts`
- Modify: `src/components/3d/FragmentsToWholeness/index.tsx`

**Step 1: Create device detection hook**

File: `src/hooks/useDeviceCapabilities.ts`

```typescript
'use client';

import { useEffect, useState } from 'react';

interface DeviceCapabilities {
  isMobile: boolean;
  isTablet: boolean;
  isLowPerformance: boolean;
  pixelRatio: number;
}

export function useDeviceCapabilities(): DeviceCapabilities {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>({
    isMobile: false,
    isTablet: false,
    isLowPerformance: false,
    pixelRatio: 1,
  });

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isTablet = /iPad|Android/i.test(navigator.userAgent) && window.innerWidth > 768;

    // Detect low performance devices
    const cores = navigator.hardwareConcurrency || 4;
    const memory = (navigator as any).deviceMemory || 4;
    const isLowPerformance = cores < 4 || memory < 4;

    const pixelRatio = Math.min(window.devicePixelRatio, isMobile ? 2 : 2.5);

    setCapabilities({
      isMobile,
      isTablet,
      isLowPerformance,
      pixelRatio,
    });
  }, []);

  return capabilities;
}
```

**Step 2: Apply performance optimizations**

File: `src/components/3d/FragmentsToWholeness/index.tsx`

```typescript
// Add import
import { useDeviceCapabilities } from '@/hooks/useDeviceCapabilities';

// In component
const capabilities = useDeviceCapabilities();

// Adjust settings based on device
const particleCount = capabilities.isMobile ? 200 : capabilities.isLowPerformance ? 500 : 1000;
const geometryDetail = capabilities.isMobile ? 16 : 32; // Lower poly on mobile
const enableShaders = !capabilities.isLowPerformance;

// Pass to child components
<GoldenParticles
  actName={currentAct.name}
  actProgress={actProgress}
  particleCount={particleCount}
/>

<Layer
  {...layer}
  geometryDetail={geometryDetail}
  enableShaders={enableShaders}
  // ... other props
/>
```

**Step 3: Adjust Canvas settings**

File: `src/app/page.tsx`

```typescript
// In Canvas component
<Canvas
  gl={{
    antialias: !capabilities.isMobile,
    powerPreference: 'high-performance',
    alpha: false,
  }}
  dpr={capabilities.pixelRatio}
  performance={{ min: 0.5 }}
>
```

**Step 4: Test on mobile**

1. Open DevTools
2. Toggle device toolbar (Cmd+Shift+M)
3. Test on various devices
Expected: Smooth 60fps on mobile, reduced particle count, lower poly

**Step 5: Commit mobile optimizations**

```bash
git add src/hooks/ src/components/3d/ src/app/
git commit -m "perf: mobile optimization with device detection

- useDeviceCapabilities hook detects mobile/tablet/low-perf
- Reduce particles: 1000 (desktop) → 500 (low-perf) → 200 (mobile)
- Lower geometry detail: 32 segments → 16 on mobile
- Disable shaders on low-performance devices
- Clamp pixel ratio to 2x on mobile
- Disable antialiasing on mobile for performance"
```

---

## Phase 11: Final Polish & Micro-Interactions

### Task 11.1: Add Cursor-Follow Effect

**Files:**
- Create: `src/components/3d/FragmentsToWholeness/MouseInfluence.tsx`
- Modify: `src/components/3d/FragmentsToWholeness/Layer.tsx`

**Step 1: Create mouse tracking**

File: `src/components/3d/FragmentsToWholeness/MouseInfluence.tsx`

```typescript
'use client';

import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

export const mousePosition = new THREE.Vector2(0, 0);

export function MouseInfluence() {
  const { size } = useThree();

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse position to -1 to 1
      mousePosition.x = (event.clientX / size.width) * 2 - 1;
      mousePosition.y = -(event.clientY / size.height) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [size]);

  return null;
}
```

**Step 2: Apply mouse influence to layers**

File: `src/components/3d/FragmentsToWholeness/Layer.tsx`

```typescript
// Import
import { mousePosition } from './MouseInfluence';

// In useFrame, add subtle mouse parallax
const mouseInfluence = new THREE.Vector3(
  mousePosition.x * 0.5,
  mousePosition.y * 0.5,
  0
);

// Apply to position with damping
groupRef.current.position.x += (mouseInfluence.x - groupRef.current.position.x + transform.position.x) * 0.05;
groupRef.current.position.y += (mouseInfluence.y - groupRef.current.position.y + transform.position.y) * 0.05;
```

**Step 3: Commit cursor interaction**

```bash
git add src/components/3d/FragmentsToWholeness/
git commit -m "feat: add subtle cursor-follow parallax effect

- Layers respond to mouse movement
- Normalized mouse position (-1 to 1)
- Smooth damping for natural feel
- 0.5x influence multiplier for subtlety
- No effect on mobile (mouse-only)"
```

---

### Task 11.2: Loading Experience

**Files:**
- Create: `src/components/Loading/LoadingScreen.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create loading screen**

File: `src/components/Loading/LoadingScreen.tsx`

```typescript
'use client';

import React, { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';

export function LoadingScreen() {
  const { progress, active } = useProgress();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!active && progress === 100) {
      // Delay hiding for smooth transition
      const timer = setTimeout(() => setVisible(false), 500);
      return () => clearTimeout(timer);
    }
  }, [active, progress]);

  if (!visible) return null;

  const opacity = active ? 1 : 0;

  return (
    <div
      className="fixed inset-0 z-50 bg-black flex items-center justify-center transition-opacity duration-500"
      style={{ opacity }}
    >
      <div className="text-center">
        <div className="mb-8">
          <svg
            className="animate-spin h-16 w-16 text-gold mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
        <p className="text-white text-2xl font-serif tracking-wider">
          {progress.toFixed(0)}%
        </p>
        <p className="text-gray-400 text-sm mt-2">Loading transformation...</p>
      </div>
    </div>
  );
}
```

**Step 2: Add loading screen to page**

File: `src/app/page.tsx`

```typescript
// Import
import { LoadingScreen } from '@/components/Loading/LoadingScreen';

// Add to render (outside Canvas)
<LoadingScreen />
```

**Step 3: Commit loading experience**

```bash
git add src/components/Loading/ src/app/page.tsx
git commit -m "feat: add elegant loading screen

- Spinning golden loader icon
- Percentage display
- 'Loading transformation...' subtitle
- Smooth fade out when complete
- 500ms delay before hiding for polish"
```

---

### Task 11.3: Scroll Indicator

**Files:**
- Create: `src/components/UI/ScrollIndicator.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create scroll indicator**

File: `src/components/UI/ScrollIndicator.tsx`

```typescript
'use client';

import React from 'react';

interface ScrollIndicatorProps {
  scrollProgress: number;
}

export function ScrollIndicator({ scrollProgress }: ScrollIndicatorProps) {
  // Hide when scrolled
  const opacity = 1 - Math.min(scrollProgress * 5, 1);

  if (scrollProgress > 0.2) return null;

  return (
    <div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 text-center transition-opacity duration-300"
      style={{ opacity }}
    >
      <p className="text-white/60 text-sm mb-2 tracking-widest">SCROLL TO BEGIN</p>
      <div className="animate-bounce">
        <svg
          className="w-6 h-6 mx-auto text-white/40"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>
  );
}
```

**Step 2: Add to page**

File: `src/app/page.tsx`

```typescript
<ScrollIndicator scrollProgress={scrollProgress} />
```

**Step 3: Commit scroll indicator**

```bash
git add src/components/UI/ src/app/page.tsx
git commit -m "feat: add scroll indicator for initial state

- 'SCROLL TO BEGIN' text
- Animated bouncing arrow
- Fades out after 20% scroll
- Hidden after user starts scrolling"
```

---

## Phase 12: Final Testing & Deployment

### Task 12.1: Performance Audit

**Files:**
- Create: `docs/performance-report.md`

**Step 1: Run Lighthouse audit**

```bash
# Build production
npm run build

# Serve production build
npm start

# Open Chrome DevTools → Lighthouse
# Run audit with Performance, Accessibility, Best Practices
```

**Step 2: Document findings**

File: `docs/performance-report.md`

```markdown
# Performance Audit Report

Date: [Current Date]

## Lighthouse Scores

- Performance: [Score]/100
- Accessibility: [Score]/100
- Best Practices: [Score]/100

## Key Metrics

- First Contentful Paint: [Time]ms
- Largest Contentful Paint: [Time]ms
- Time to Interactive: [Time]ms
- Cumulative Layout Shift: [Score]

## Optimizations Applied

1. Texture compression and mipmaps
2. Particle count reduction on mobile
3. Geometry LOD based on device
4. Shader simplification on low-end devices
5. Pixel ratio clamping
6. Proper cleanup of WebGL resources

## Known Issues

[List any remaining performance concerns]

## Recommendations

[Any further optimization opportunities]
```

**Step 3: Commit performance report**

```bash
git add docs/performance-report.md
git commit -m "docs: add performance audit report"
```

---

### Task 12.2: Cross-Browser Testing

**Step 1: Test on all major browsers**

Browsers to test:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

**Step 2: Document compatibility**

File: `docs/browser-compatibility.md`

```markdown
# Browser Compatibility Report

## Tested Browsers

- ✅ Chrome 120+ (Desktop/Mobile)
- ✅ Firefox 121+ (Desktop)
- ✅ Safari 17+ (Desktop/Mobile)
- ✅ Edge 120+ (Desktop)

## Known Issues

[List any browser-specific bugs]

## Fallbacks

- WebGL not supported: Show static image
- Reduced motion preference: Disable animations
- Low memory: Reduce particle count further
```

**Step 3: Commit compatibility report**

```bash
git add docs/browser-compatibility.md
git commit -m "docs: browser compatibility testing results"
```

---

### Task 12.3: Final Deployment

**Step 1: Verify all commits**

```bash
git log --oneline --graph
```

Expected: Clean commit history with descriptive messages

**Step 2: Push to deployment**

```bash
cd '/Volumes/Super Mastery/Self-Actualization-Website'
git push origin main
```

**Step 3: Monitor deployment**

Wait for Vercel deployment, check:
- Build succeeds
- No runtime errors
- Textures load correctly
- Animations smooth

**Step 4: Final commit**

```bash
git commit --allow-empty -m "🎉 launch: Fragments to Wholeness experience complete

Award-winning 3D book transformation journey:
- Three-act narrative structure (Chaos → Understanding → Integration)
- Custom WebGL shaders for organic effects
- Particle systems with act-specific behaviors
- Synchronized typography reveals
- Cinematic postprocessing (bloom + chromatic aberration)
- Mobile-optimized performance
- Cursor-follow micro-interactions
- Ambient audio system (toggleable)
- Loading experience
- Cross-browser tested

Ready for Awwwards submission."
```

---

## Summary

This implementation plan creates a **museum-quality** 3D experience:

### Technical Excellence
- 5 layered textures with depth separation
- Custom displacement shaders for organic tearing
- GSAP-choreographed animations across 3 acts
- Particle systems with 1000+ particles
- Bloom + chromatic aberration postprocessing
- Mobile optimizations (200-1000 particles depending on device)

### Artistic Vision
- **Act 1 - Chaos**: Layers fragment and tumble outward
- **Act 2 - Understanding**: Orbital mechanics with golden connection lines
- **Act 3 - Integration**: Spiral convergence into transformed wholeness

### Polish
- Synchronized typography fading in/out per act
- Cursor-follow parallax (desktop only)
- Ambient audio with crossfading (optional)
- Loading screen with progress
- Scroll indicator
- Performance monitoring

### Little Touches That Win Awards
- Golden edge glow when layers tear
- Particles match act behavior (explode/orbit/converge)
- Breathing animation on intact book
- Distance-based layer opacity
- Staggered layer separation timing
- Elliptical orbits (not circles)
- Healing effect in Act 3 (reverse displacement)

**Total Implementation Time: ~16-20 hours** (assuming assets are ready)

---

**Plan complete and saved to `docs/plans/2025-01-02-fragments-to-wholeness.md`.**

**Two execution options:**

**1. Subagent-Driven (this session)** - I dispatch fresh subagent per task, review between tasks, fast iteration with quality gates

**2. Parallel Session (separate)** - Open new session with executing-plans skill, batch execution with checkpoints

**Which approach?**
