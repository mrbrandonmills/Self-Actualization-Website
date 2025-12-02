'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { EffectComposer, Bloom, DepthOfField, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Book3D from './Book3D';
import ParticleField from './ParticleField';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// PROFESSIONAL EASING FUNCTIONS (Cinema-quality)
const ease = {
  // Cubic easing - smooth and natural
  inOutCubic: (t: number) => t < 0.5 ? 4 * t * t * t : 1 + (--t) * (2 * t) * (2 * t),
  outCubic: (t: number) => 1 + (--t) * t * t,
  inCubic: (t: number) => t * t * t,

  // Quartic - more dramatic
  inOutQuart: (t: number) => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t,
  outQuart: (t: number) => 1 - (--t) * t * t * t,

  // Exponential - very cinematic
  outExpo: (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
  inOutExpo: (t: number) => {
    if (t === 0 || t === 1) return t;
    if (t < 0.5) return Math.pow(2, 20 * t - 10) / 2;
    return (2 - Math.pow(2, -20 * t + 10)) / 2;
  },

  // Back easing - overshoot effect
  outBack: (t: number) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
};

/**
 * Ghost Fade 3D Scene
 * Three.js scene with 3 book instances (2 ghosts + 1 primary)
 * Cinematic 5-stage convergence animation driven by scroll
 */

interface GhostFade3DSceneProps {
  scrollSpacerId: string; // ID of the scroll spacer element
  pageIndex?: number; // For multi-page layouts
}

export default function GhostFade3DScene({
  scrollSpacerId,
  pageIndex = 0,
}: GhostFade3DSceneProps) {
  // Refs for Three.js objects
  const bookRef = useRef<THREE.Group>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  // Camera state - EPIC FLY-THROUGH (Kasane style)
  const [cameraPosition, setCameraPosition] = useState({
    x: 0,
    y: 2,
    z: 50, // Start FAR back for dramatic approach
  });

  // Single book state
  const [bookState, setBookState] = useState({
    opacity: 1,
    position: [0, -2, 0] as [number, number, number],
    rotation: [0, 0, 0] as [number, number, number],
    scale: 1.0,
    openAmount: 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const scrollSpacer = document.getElementById(scrollSpacerId);
    if (!scrollSpacer) {
      console.error(`Scroll spacer not found: #${scrollSpacerId}`);
      return;
    }

    console.log('🎬 Setting up EPIC KASANE-STYLE JOURNEY (10 stages)...');

    // ================================
    // MASTER ANIMATION: 10-Stage Epic Journey
    // ================================

    gsap.to({}, {
      scrollTrigger: {
        trigger: scrollSpacer,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 3, // Smoother for longer journey
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;

          // ============================================
          // CAMERA: Cinematic with professional easing
          // ============================================
          let camX = 0; // Always centered
          let camY = 3; // Constant height
          let camZ;

          if (progress < 0.30) {
            // STAGE 1-3: Smooth approach with outExpo easing
            const p = ease.outExpo(progress / 0.30);
            camZ = 45 - p * 25; // 45 → 20 (cinematic slow-down)
          } else if (progress < 0.70) {
            // STAGE 4-7: Hold steady for main action
            camZ = 20; // LOCKED - let book do all the work!
          } else {
            // STAGE 8-10: Final zoom with inOutCubic
            const p = ease.inOutCubic((progress - 0.70) / 0.30);
            camZ = 20 - p * 6; // 20 → 14 (smooth final approach)
          }

          setCameraPosition({ x: camX, y: camY, z: camZ });

          // ============================================
          // BOOK: Cinematic transformation with easing
          // ============================================
          let bookY, bookRotX, bookRotY, bookRotZ, bookScale, openAmount;

          if (progress < 0.15) {
            // STAGE 1-2: Magical lift with outBack easing (overshoot)
            const p = ease.outBack(progress / 0.15);
            bookY = -2 + p * 2; // -2 → 0 (slight bounce at top)
            bookRotX = 0;
            bookRotY = 0;
            bookRotZ = 0;
            bookScale = 1.0;
            openAmount = 0;
          } else if (progress < 0.30) {
            // STAGE 3: Opening with inOutCubic
            const p = ease.inOutCubic((progress - 0.15) / 0.15);
            bookY = 0;
            bookRotX = -p * 0.15; // Gentle tilt
            bookRotY = 0;
            bookRotZ = 0;
            bookScale = 1.0 + ease.outCubic(p) * 0.2; // 1.0 → 1.2 (smooth grow)
            openAmount = ease.inOutCubic(p) * 0.7; // 0 → 0.7 (smooth open)
          } else if (progress < 0.55) {
            // STAGE 4-5: CINEMATIC PAGE FLIPPING with natural motion
            const p = (progress - 0.30) / 0.25;
            const easedP = ease.inOutCubic(p);
            bookY = 0 + Math.sin(easedP * Math.PI * 3) * 0.15; // Gentle float
            bookRotX = -0.15;
            bookRotY = 0;
            bookRotZ = Math.sin(easedP * Math.PI * 4) * 0.05; // Subtle sway
            bookScale = 1.2;
            // Professional page flip with acceleration/deceleration
            openAmount = 0.7 + Math.sin(easedP * Math.PI * 6) * 0.2;
          } else if (progress < 0.75) {
            // STAGE 6-7: Smooth rotation with inOutQuart
            const p = ease.inOutQuart((progress - 0.55) / 0.20);
            bookY = 0;
            bookRotX = -0.15 + p * 0.15; // Level out
            bookRotY = p * Math.PI; // 0° → 180° (cinematic rotation)
            bookRotZ = 0;
            bookScale = 1.2;
            openAmount = 0.7 * (1 - ease.outCubic(p)); // Close smoothly
          } else {
            // STAGE 8-10: Final hero with outExpo (dramatic arrival)
            const p = ease.outExpo((progress - 0.75) / 0.25);
            bookY = 0;
            bookRotX = 0;
            bookRotY = Math.PI; // FRONT COVER facing camera
            bookRotZ = 0;
            bookScale = 1.2 + p * 0.3; // 1.2 → 1.5 (dramatic grow)
            openAmount = 0; // Closed
          }

          setBookState({
            opacity: 1,
            position: [0, bookY, 0],
            rotation: [bookRotX, bookRotY, bookRotZ],
            scale: bookScale,
            openAmount: openAmount,
          });
        },
      },
    });

    console.log('✅ CINEMA-QUALITY 3D BOOK ANIMATION:');
    console.log('   🎬 2500vh cinematic scroll journey');
    console.log('   📚 Book: Lift (outBack) → Open (inOutCubic) → Flip (natural motion) → Rotate (inOutQuart) → Hero (outExpo)');
    console.log('   🎥 Camera: Professional easing (outExpo → locked → inOutCubic)');
    console.log('   🎨 Post-FX: Bloom + DOF + Vignette + Chromatic Aberration');
    console.log('   💎 Materials: PBR with envMap reflections (roughness 0.4-0.6, metalness 0.02-0.05)');
    console.log('   💡 Lighting: Award-winning 3-point + 2 accents + spotlight (2K shadows)');
    console.log('   📐 Easing: Cubic, Quartic, Expo, Back (NO linear interpolation)');
    console.log('   ✨ Particles: 900 volumetric with additive blending');
    console.log('   🎯 Quality: Cinema-grade (not kid emulation)');

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [scrollSpacerId, pageIndex]);

  return (
    <div className="fixed inset-0 pointer-events-none">
      <Canvas
        shadows
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
      >
        {/* Camera - FLY-THROUGH SPACE (Kasane/Timothy style) */}
        <PerspectiveCamera
          ref={cameraRef}
          makeDefault
          position={[cameraPosition.x, cameraPosition.y, cameraPosition.z]}
          fov={55}
        />
        {/* Make camera always look at book center */}
        {cameraRef.current && cameraRef.current.lookAt(0, 0, 0)}

        {/* CINEMATIC LIGHTING: Award-winning three-point + accents */}

        {/* KEY LIGHT: Warm golden hero light (main illumination) */}
        <directionalLight
          position={[12, 18, 10]}
          intensity={3.2}
          castShadow
          shadow-mapSize-width={2048} // Higher quality shadows
          shadow-mapSize-height={2048}
          shadow-camera-far={60}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
          shadow-bias={-0.0001}
          color="#FFA500" // Warm golden orange
        />

        {/* FILL LIGHT: Cool blue from opposite side (cinematic contrast) */}
        <directionalLight
          position={[-10, 8, 8]}
          intensity={1.8}
          color="#4169E1" // Royal blue fill
        />

        {/* RIM/BACK LIGHT: Strong magenta from behind (dramatic separation) */}
        <directionalLight
          position={[0, 6, -18]}
          intensity={2.5}
          color="#FF1493" // Deep pink rim
        />

        {/* TOP/HAIR LIGHT: Soft golden from above (luxury feel) */}
        <spotLight
          position={[0, 25, 0]}
          intensity={1.5}
          angle={Math.PI / 6}
          penumbra={0.5}
          color="#FFD700" // Golden top light
          castShadow
        />

        {/* ACCENT LIGHTS: Volumetric atmosphere */}
        <pointLight
          position={[15, 2, 5]}
          intensity={2.0}
          distance={35}
          decay={2}
          color="#FF6B6B" // Warm red accent
        />

        <pointLight
          position={[-15, 2, 5]}
          intensity={1.8}
          distance={35}
          decay={2}
          color="#4ECDC4" // Cool cyan accent
        />

        {/* AMBIENT: Subtle purple base (not pure black) */}
        <ambientLight intensity={0.3} color="#2D1B3D" />

        {/* Environment map (realistic reflections) */}
        <Environment preset="studio" />

        {/* PARTICLE FIELDS - Increased for epic journey */}
        <ParticleField count={400} radius={30} color="#FFD700" opacity={0.5} />
        <ParticleField count={300} radius={22} color="#00CED1" opacity={0.4} />
        <ParticleField count={200} radius={15} color="#FF69B4" opacity={0.3} />

        {/* SINGLE BOOK - Magical Animation */}
        <Book3D
          ref={bookRef}
          opacity={bookState.opacity}
          position={bookState.position}
          rotation={bookState.rotation}
          scale={bookState.scale}
          coverTexturePath="/textures/blocks-combined-01.png"
          coverColor="#C8B089"
          isGhost={false}
          openAmount={bookState.openAmount}
        />

        {/* Simplified ground plane for shadows */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -6, 0]}
          receiveShadow
        >
          <planeGeometry args={[40, 40]} />
          <shadowMaterial opacity={0.3} color="#000000" />
        </mesh>

        {/* Orbit Controls (disabled for production, enabled for debugging) */}
        {/* <OrbitControls enableZoom={false} enablePan={false} /> */}

        {/* POST-PROCESSING: Award-winning cinematic effects */}
        <EffectComposer multisampling={8}>
          {/* Bloom - glowing highlights (luxury feel) */}
          <Bloom
            intensity={0.8}
            luminanceThreshold={0.3}
            luminanceSmoothing={0.9}
            mipmapBlur
          />

          {/* Depth of Field - cinematic focus (bokeh) */}
          <DepthOfField
            focusDistance={0.02}
            focalLength={0.05}
            bokehScale={3}
            height={700}
          />

          {/* Vignette - film-like darkening at edges */}
          <Vignette
            offset={0.3}
            darkness={0.6}
            eskil={false}
          />

          {/* Chromatic Aberration - subtle lens distortion */}
          <ChromaticAberration
            offset={[0.0015, 0.0015]}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
