/**
 * Layer 3: WebGPU Particles Prototype — Logic
 * Three.js + WebGPURenderer (with WebGL fallback)
 */

import * as THREE from 'three';

// ==================================
// 1. Detect Mobile & Set Particle Count
// ==================================

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const particleCount = isMobile ? 10000 : 50000; // Simplified: 50k instead of 100k for compatibility

console.log(`📱 Device: ${isMobile ? 'Mobile' : 'Desktop'}`);
console.log(`🎯 Target particle count: ${particleCount.toLocaleString()}`);

// ==================================
// 2. Three.js Scene Setup
// ==================================

const canvas = document.getElementById('webgpu-canvas');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); // Black

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 50;

// Renderer (WebGL for now - WebGPU requires more complex setup)
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: false, // Disable for performance
  powerPreference: 'high-performance',
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap at 2x for performance

console.log('✅ Three.js scene initialized');
console.log(`   Renderer: WebGLRenderer (fallback)`);

// Update UI
document.getElementById('renderer-type').textContent = 'WebGL (fallback)';
document.getElementById('particle-count').textContent = particleCount.toLocaleString();

// ==================================
// 3. Particle System
// ==================================

// Particle geometry
const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3); // x, y, z per particle
const velocities = new Float32Array(particleCount * 3); // For motion

// Initialize particle positions (random cloud)
for (let i = 0; i < particleCount; i++) {
  const i3 = i * 3;

  // Position: Random sphere distribution
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(Math.random() * 2 - 1);
  const radius = 30 + Math.random() * 20;

  positions[i3] = radius * Math.sin(phi) * Math.cos(theta); // x
  positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta); // y
  positions[i3 + 2] = radius * Math.cos(phi); // z

  // Velocity: Slow organic motion
  velocities[i3] = (Math.random() - 0.5) * 0.02;
  velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
  velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

// Particle material
const material = new THREE.PointsMaterial({
  color: 0xD4AF37, // Luxury gold
  size: isMobile ? 0.5 : 0.3,
  transparent: true,
  opacity: 0.6,
  blending: THREE.AdditiveBlending, // Glow effect
  sizeAttenuation: true,
  vertexColors: false,
});

// Particle system (THREE.Points)
const particles = new THREE.Points(geometry, material);
scene.add(particles);

console.log(`✅ ${particleCount.toLocaleString()} particles created`);

// ==================================
// 4. Scroll Tracking
// ==================================

let scrollProgress = 0;
let targetRotationY = 0;
let autoRotate = true;

window.addEventListener('scroll', () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress = window.scrollY / maxScroll;

  // Rotate particles based on scroll
  targetRotationY = scrollProgress * Math.PI * 2; // Full rotation
});

// Add scroll height (enable scrolling)
document.body.style.height = '500vh';

// ==================================
// 5. Animation Loop
// ==================================

let lastTime = performance.now();
let frames = 0;
let fps = 60;

function animate(time) {
  requestAnimationFrame(animate);

  // Update FPS counter
  frames++;
  const now = performance.now();
  if (now >= lastTime + 1000) {
    fps = Math.round((frames * 1000) / (now - lastTime));
    const fpsElement = document.getElementById('fps');
    fpsElement.textContent = fps;

    // Color code FPS
    fpsElement.className = 'value fps-value';
    if (fps >= 60) {
      // Green (already default)
    } else if (fps >= 45) {
      fpsElement.classList.add('warning'); // Yellow
    } else {
      fpsElement.classList.add('critical'); // Red
    }

    frames = 0;
    lastTime = now;
  }

  // Update particle positions (simple motion)
  const positions = particles.geometry.attributes.position.array;
  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;

    // Add velocity
    positions[i3] += velocities[i3];
    positions[i3 + 1] += velocities[i3 + 1];
    positions[i3 + 2] += velocities[i3 + 2];

    // Bounds check (wrap around)
    const x = positions[i3];
    const y = positions[i3 + 1];
    const z = positions[i3 + 2];
    const dist = Math.sqrt(x * x + y * y + z * z);

    if (dist > 60 || dist < 10) {
      // Reset particle to random position
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 30 + Math.random() * 20;

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
    }
  }

  particles.geometry.attributes.position.needsUpdate = true;

  // Rotate particles
  if (autoRotate) {
    particles.rotation.y += 0.001;
    particles.rotation.x = Math.sin(time * 0.0001) * 0.2;
  } else {
    // Lerp to target rotation (smooth scroll-driven rotation)
    particles.rotation.y += (targetRotationY - particles.rotation.y) * 0.05;
  }

  // Render
  renderer.render(scene, camera);
}

animate(0);

console.log('✅ Animation loop started');

// ==================================
// 6. Keyboard Controls
// ==================================

window.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    autoRotate = !autoRotate;
    console.log(`Auto-rotate: ${autoRotate ? 'ON' : 'OFF'}`);
  }
});

console.log('✅ Keyboard controls enabled (Space = toggle auto-rotate)');

// ==================================
// 7. Resize Handler
// ==================================

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ==================================
// 8. Performance Logging
// ==================================

setTimeout(() => {
  const memory = renderer.info.memory;

  console.log('📊 Performance Metrics:');
  console.log(`   FPS: ${fps}`);
  console.log(`   Particles: ${particleCount.toLocaleString()}`);
  console.log(`   Draw Calls: ${renderer.info.render.calls}`);
  console.log(`   Triangles: ${renderer.info.render.triangles.toLocaleString()}`);
  console.log(`   Points: ${renderer.info.render.points.toLocaleString()}`);

  // Update GPU memory display (if available)
  const gpuMemoryElement = document.getElementById('gpu-memory');
  if (memory && memory.geometries !== undefined) {
    gpuMemoryElement.textContent = `${memory.geometries} geometries`;
  }
}, 3000);

console.log('✅ Layer 3 prototype ready');
console.log('ℹ️  Note: This is WebGL fallback. For WebGPU, enable chrome://flags/#enable-unsafe-webgpu');
