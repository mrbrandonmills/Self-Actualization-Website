'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Particle Field Component
 * Floating particles that create atmosphere and depth
 */

interface ParticleFieldProps {
  count?: number;
  radius?: number;
  color?: string;
  opacity?: number;
}

export default function ParticleField({
  count = 500,
  radius = 20,
  color = '#FFD700',
  opacity = 0.6,
}: ParticleFieldProps) {
  const particlesRef = useRef<THREE.Points>(null);

  // Generate particle positions
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Spherical distribution
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * Math.random();

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }

    return positions;
  }, [count, radius]);

  // Animate particles
  useFrame((state) => {
    if (!particlesRef.current) return;

    // Gentle rotation
    particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;

    // Subtle floating motion
    const positions = particlesRef.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions.array[i3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.002;
    }
    positions.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlePositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color={color}
        transparent
        opacity={opacity}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
