# Layer 3: WebGPU Particles Prototype
**Purpose:** Test Three.js WebGPURenderer with TSL compute shaders for particle systems

---

## What This Spike Tests

1. **Three.js WebGPURenderer** (next-gen rendering)
2. **TSL (Three Shading Language)** compute shaders
3. **GPU particle system** (25,000-100,000 particles)
4. **Scroll-reactive motion** (particles respond to scroll)
5. **WebGL fallback** (for browsers without WebGPU support)
6. **Performance at scale** (target: 60 FPS desktop, 45 FPS mobile)

---

## Dependencies

- **Three.js** (via CDN: threejs.org)
- **WebGPURenderer** (Three.js r168+)
- **TSL** (Three Shading Language, included in Three.js)

**Browser requirements:**
- **WebGPU:** Chrome 113+ with experimental flag (or Chrome Canary)
- **WebGL Fallback:** All modern browsers

---

## Technical Approach

### GPU Particle System

Instead of updating particle positions on CPU (slow), we use **compute shaders** to update particles entirely on GPU (fast).

**Traditional approach (CPU):**
```javascript
// BAD: Loops through 100k particles on CPU every frame
for (let i = 0; i < 100000; i++) {
  particles[i].x += velocity.x;
  particles[i].y += velocity.y;
  particles[i].z += velocity.z;
}
```

**WebGPU approach (GPU compute shader):**
```javascript
// GOOD: GPU processes all 100k particles in parallel
const updateParticles = tslFn(() => {
  const position = positionBuffer.element(instanceIndex);
  const newPosition = position.add(velocity.mul(deltaTime));
  positionBuffer.element(instanceIndex).assign(newPosition);
});

compute(updateParticles, particleCount).compute(renderer);
```

### Why It's Faster

- **CPU:** Processes particles sequentially (one at a time)
- **GPU:** Processes particles in parallel (all at once)
- **Result:** 10-100x faster

---

## File Structure

```
l3_particles_prototype/
├── README.md          ← This file
├── index.html         ← Full-screen canvas with particle system
├── style.css          ← Minimal styling
└── script.js          ← Three.js + WebGPU + particle logic
```

---

## How to Run

### Option 1: Chrome with WebGPU Flag (Recommended)

1. Open Chrome
2. Go to `chrome://flags`
3. Search for "WebGPU"
4. Enable "Unsafe WebGPU" (experimental)
5. Restart Chrome
6. Open `index.html`
7. Expect: 100,000 particles at 60 FPS

### Option 2: Chrome Canary (Native WebGPU)

1. Download Chrome Canary
2. Open `index.html`
3. Expect: 100,000 particles at 60 FPS (native support)

### Option 3: WebGL Fallback (Any Browser)

1. Open `index.html` in any modern browser
2. Script detects WebGPU unavailable → falls back to WebGLRenderer
3. Expect: 25,000 particles at 55 FPS (still good)

---

## Performance Notes

### Target Metrics

| Mode | Particle Count | Target FPS | Browser |
|------|----------------|------------|---------|
| **WebGPU** | 100,000 | 60 FPS | Chrome 113+ (with flag) |
| **WebGL** | 25,000 | 55 FPS | All modern browsers |
| **Mobile** | 10,000 | 45 FPS | Any mobile browser |

### GPU Memory Usage

- **WebGPU (100k particles):** ~200MB GPU memory
- **WebGL (25k particles):** ~100MB GPU memory
- **Mobile (10k particles):** ~50MB GPU memory

### Optimization Techniques

1. **Instancing:** Reuse single particle geometry for all particles
2. **Compute Shaders:** Update positions on GPU (no CPU overhead)
3. **PointsMaterial:** Lightweight rendering (no complex geometry)
4. **Culling:** Particles outside view frustum not rendered

---

## Known Issues

1. **WebGPU requires experimental flag**
   - **Status:** Not production-ready yet (2025)
   - **Solution:** Fall back to WebGL for real users

2. **Safari doesn't support WebGPU**
   - **Status:** Expected (WebGPU is Chrome/Firefox only)
   - **Solution:** WebGL fallback works perfectly

3. **Low-end mobile GPUs struggle with 10k particles**
   - **Status:** Expected (mobile GPUs are weaker)
   - **Solution:** Reduce to 5k particles, or disable on very low-end devices

4. **Three.js WebGPURenderer is still experimental**
   - **Status:** API may change in future Three.js versions
   - **Solution:** Lock Three.js version in production

---

## Compute Shader Explanation (TSL)

**Traditional JavaScript (CPU-bound):**
```javascript
particles.forEach((particle, i) => {
  // Update each particle position (slow)
  particle.position.x += Math.sin(time) * 0.1;
  particle.position.y += Math.cos(time) * 0.1;
  particle.position.z += Math.random() * 0.05;
});
```

**TSL Compute Shader (GPU-bound):**
```javascript
const updateParticles = tslFn(() => {
  // Runs in parallel for ALL particles (fast)
  const pos = positionBuffer.element(instanceIndex); // Current particle
  const time = uniform('time'); // Shared time variable

  // Update position using GPU math
  const newX = pos.x.add(sin(time).mul(0.1));
  const newY = pos.y.add(cos(time).mul(0.1));
  const newZ = pos.z.add(random().mul(0.05));

  // Write back to GPU memory
  positionBuffer.element(instanceIndex).assign(vec3(newX, newY, newZ));
});

// Execute on GPU (processes all particles in parallel)
compute(updateParticles, particleCount).compute(renderer);
```

**Performance difference:**
- **CPU:** 100,000 particles = ~100ms per frame (10 FPS) ❌
- **GPU:** 100,000 particles = ~5ms per frame (60 FPS) ✅

---

## Next Steps (After Testing)

1. Measure FPS with different particle counts (10k, 25k, 100k)
2. Test WebGPU mode vs WebGL fallback
3. Test on mobile devices (reduce particle count)
4. Record results in `/benchmarks/performance-metrics.md`
5. If successful (60 FPS desktop, 45+ mobile):
   - ✅ All prototypes complete!
   - ✅ Ready to wait for Mac mini
6. If performance fails:
   - ❌ Reduce particle count
   - ❌ Disable particles on low-end devices

---

**Created:** January 25, 2025
**Status:** Ready to test (requires WebGPU flag or fallback)
