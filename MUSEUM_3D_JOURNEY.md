# 3D Museum Journey System

**Video Game-Level Quality Implementation**

## Overview

Complete 3D museum experience with:
- 8 sculptural stop markers
- Scroll-based camera flight
- Museum-quality lighting
- Particle effects
- Post-processing (Bloom, ChromaticAberration, DepthOfField)
- Mouse proximity interactions
- Negative space depth visibility

## Stop Markers (8 Total)

### 1. WORK (3D Camera)
- Gold metallic camera body
- Glass lens with transmission
- 500 floating particles
- Spotlight casting shadows
- Rotates slowly (2 RPM)
- Hover: Tilts toward mouse, particles swarm

### 2. GALLERY (Picture Frame Portal)
- Ornate gold frame with normal mapping
- Swirling portal shader inside
- 1000 depth-of-field particles
- Hover: Portal rotates, particles form images

### 3. BLOG (3D Book with Glow)
- Transfer glow effect
- Pages that turn
- Floating text particles
- Hover: Book opens, reveals essays

### 4. MEDITATION (3D Lotus)
- Iridescent petals
- Subtle breathing animation
- Calming particle aura
- Hover: Petals unfold

### 5. SHOP (3D Bag with Glow)
- Transfer glow effect
- Luxury material (leather/metal)
- Product particles orbiting
- Hover: Bag opens, shows items

### 6. MIND TOOLS (3D Brain with Glow)
- Transfer glow effect
- Semi-transparent iridescent brain
- 50 glowing neural pathways pulsing
- Holographic scan lines
- 2000 particle "thought clouds"
- Hover: Synapses fire, thoughts coalesce

### 7. ABOUT (3D Profile)
- Silhouette or portrait bust
- Gold rim lighting
- Story particles
- Hover: Profile rotates

### 8. CONTACT (3D Envelope)
- Folded paper material
- Gold wax seal
- Message particles
- Hover: Envelope opens

## Technical Stack

```typescript
@react-three/fiber      // React renderer for Three.js
@react-three/drei       // Helpers (OrbitControls, Environment, etc.)
@react-three/postprocessing // Effects (Bloom, ChromaticAberration, DOF)
three                   // Core 3D library
```

## Post-Processing Effects

```typescript
<EffectComposer>
  <Bloom
    intensity={1.5}
    luminanceThreshold={0.1}
    luminanceSmoothing={0.9}
  />
  <ChromaticAberration
    offset={[0.002, 0.002]} // Glass prism effect
  />
  <DepthOfField
    focusDistance={0.01}
    focalLength={0.02}
    bokehScale={3}
  />
</EffectComposer>
```

## Materials

### Gold Metallic (WORK, GALLERY frames)
```typescript
<MeshPhysicalMaterial
  color="#D4AF37"
  metalness={0.9}
  roughness={0.1}
  envMapIntensity={1.5}
  clearcoat={1.0}
/>
```

### Glass/Transparent (lenses, brain)
```typescript
<MeshPhysicalMaterial
  color="#ffffff"
  metalness={0}
  roughness={0}
  transmission={1.0}  // Fully transparent
  thickness={0.5}
  ior={1.5}           // Glass refraction
/>
```

### Iridescent (brain, lotus)
```typescript
<MeshPhysicalMaterial
  color="#3B82F6"
  metalness={0.5}
  roughness={0.2}
  transmission={0.7}  // Semi-transparent
  thickness={2}
  clearcoat={1}
  iridescence={1}     // Rainbow shimmer
  iridescenceIOR={1.3}
/>
```

## Lighting Setup

```typescript
// Museum spotlight
<spotLight
  position={[5, 5, 5]}
  intensity={2}
  angle={0.3}
  penumbra={0.5}
  castShadow
/>

// Rim lighting
<directionalLight
  position={[-5, 5, -5]}
  intensity={1}
  color="#ffffff"
/>

// Ambient
<ambientLight intensity={0.2} />

// Environment map
<Environment
  files="/hdri/museum_hall.hdr"
  background
  blur={0.5}
/>
```

## Camera Flight System

```typescript
useFrame((state) => {
  // Get scroll position (0-1)
  const scrollProgress = window.scrollY / (document.body.scrollHeight - window.innerHeight)

  // Calculate camera position along journey path
  const journeyLength = stops.length * 10 // 10 units between stops
  const cameraZ = -scrollProgress * journeyLength

  // Smooth transition
  state.camera.position.lerp(
    new Vector3(0, 2, cameraZ),
    0.1
  )

  // Look ahead slightly
  state.camera.lookAt(0, 2, cameraZ - 5)
})
```

## Mouse Proximity Lighting

```typescript
function StopMarker({ position }) {
  const lightRef = useRef()
  const meshRef = useRef()

  useFrame((state) => {
    const mouse = state.mouse
    const meshPos = meshRef.current.position.clone()
    meshPos.project(state.camera)

    const dist = mouse.distanceTo(new Vector2(meshPos.x, meshPos.y))

    // Closer mouse = brighter light
    lightRef.current.intensity = 5 / (dist + 1)

    // Tilt toward mouse
    meshRef.current.rotation.x = mouse.y * 0.3
    meshRef.current.rotation.y = mouse.x * 0.3
  })

  return (
    <>
      <mesh ref={meshRef} position={position}>
        {/* Stop marker geometry */}
      </mesh>
      <pointLight ref={lightRef} position={position} />
    </>
  )
}
```

## Particle Systems

### Halo Particles (around each stop)
```typescript
function ParticleHalo({ count = 500, color = "#D4AF37" }) {
  const points = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const radius = 2 + Math.random() * 1
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)
    }
    return positions
  }, [count])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={color}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}
```

## Transfer Glow Effect

Stops: BLOG, SHOP, MIND TOOLS

```typescript
function TransferGlow() {
  return (
    <mesh>
      {/* Stop marker model */}
      <boxGeometry />
      <meshPhysicalMaterial
        emissive="#D4AF37"
        emissiveIntensity={2}
      />

      {/* Glow sphere */}
      <mesh scale={1.2}>
        <sphereGeometry />
        <meshBasicMaterial
          color="#D4AF37"
          transparent
          opacity={0.3}
        />
      </mesh>
    </mesh>
  )
}
```

## Negative Space & Depth

```typescript
// Fog for depth perception
<fog attach="fog" args={['#031614', 10, 100]} />

// Ground plane for shadows
<mesh
  rotation={[-Math.PI / 2, 0, 0]}
  position={[0, -5, 0]}
  receiveShadow
>
  <planeGeometry args={[1000, 1000]} />
  <shadowMaterial opacity={0.3} />
</mesh>

// Background color matching Bartosz
<color attach="background" args={['#05201f']} />
```

## Performance Optimizations

```typescript
// Use LOD for distant stops
<LOD distances={[0, 10, 20]}>
  <HighDetailModel distance={0} />
  <MediumDetailModel distance={10} />
  <LowDetailModel distance={20} />
</LOD>

// Frustum culling
gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Instance meshes for particles
<instancedMesh args={[geometry, material, 500]} />
```

## File Structure

```
src/
├── components/
│   └── museum3d/
│       ├── MuseumScene.tsx          # Main 3D scene
│       ├── CameraFlight.tsx         # Scroll-based camera
│       ├── PostProcessing.tsx       # Effect composer
│       └── stops/
│           ├── WorkStop.tsx         # Camera sculpture
│           ├── GalleryStop.tsx      # Picture frame
│           ├── BlogStop.tsx         # Book with glow
│           ├── MeditationStop.tsx   # Lotus
│           ├── ShopStop.tsx         # Bag with glow
│           ├── MindToolsStop.tsx    # Brain with glow
│           ├── AboutStop.tsx        # Profile
│           └── ContactStop.tsx      # Envelope
├── hooks/
│   └── useMuseumScroll.ts          # Scroll tracking
└── app/
    └── journey/
        └── page.tsx                 # 3D journey page
```

## Next Steps

1. ✅ Install Three.js ecosystem
2. Create MuseumScene component
3. Build WorkStop (camera) as proof of concept
4. Add post-processing effects
5. Implement camera flight system
6. Build remaining 7 stops
7. Add particle systems
8. Integrate mouse proximity lighting
9. Performance optimization
10. Deploy to production

**Status:** Ready to build! 🚀
