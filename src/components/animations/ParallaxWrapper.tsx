/**
 * ParallaxWrapper - Cinematic Parallax Depth Effect
 * Creates multi-layered parallax animations for premium depth
 * Inspired by award-winning sites with scroll-driven parallax
 */

'use client';

import React, { useRef, useEffect, ReactNode } from 'react';
import { gsap } from '@/lib/gsap';

interface ParallaxWrapperProps {
  children: ReactNode;
  speed?: number; // 0 to 1, where 0.5 is default, <0.5 is slower, >0.5 is faster
  direction?: 'up' | 'down' | 'left' | 'right';
  scale?: boolean; // Whether to also scale the element
  rotate?: boolean; // Whether to add subtle rotation
  className?: string;
  disabled?: boolean; // Disable parallax on mobile if needed
}

export function ParallaxWrapper({
  children,
  speed = 0.5,
  direction = 'up',
  scale = false,
  rotate = false,
  className = '',
  disabled = false,
}: ParallaxWrapperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled || !wrapperRef.current) return;

    const element = wrapperRef.current;

    // Calculate movement based on direction
    const getMovement = (progress: number) => {
      const distance = (progress - 0.5) * 200 * speed;

      switch (direction) {
        case 'up':
          return { y: -distance, x: 0 };
        case 'down':
          return { y: distance, x: 0 };
        case 'left':
          return { x: -distance, y: 0 };
        case 'right':
          return { x: distance, y: 0 };
        default:
          return { y: -distance, x: 0 };
      }
    };

    // ScrollTrigger for parallax effect
    gsap.to(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top bottom', // Start when element enters bottom of viewport
        end: 'bottom top', // End when element exits top of viewport
        scrub: 1, // Smooth scrubbing
        onUpdate: (self) => {
          const progress = self.progress;
          const movement = getMovement(progress);

          // Apply transforms
          const transforms = [
            `translate3d(${movement.x}px, ${movement.y}px, 0)`,
          ];

          // Optional scale effect
          if (scale) {
            const scaleValue = 1 + (progress - 0.5) * 0.1;
            transforms.push(`scale(${scaleValue})`);
          }

          // Optional rotation effect
          if (rotate) {
            const rotateValue = (progress - 0.5) * 5; // -2.5deg to 2.5deg
            transforms.push(`rotate(${rotateValue}deg)`);
          }

          element.style.transform = transforms.join(' ');
        },
      },
    });

    return () => {
      // Cleanup
      const trigger = gsap.getTweensOf(element)[0]?.scrollTrigger;
      if (trigger) trigger.kill();
    };
  }, [speed, direction, scale, rotate, disabled]);

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={{
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}

/**
 * ParallaxLayer - For creating multi-layered parallax scenes
 * Usage: Stack multiple ParallaxLayers with different speeds
 */
interface ParallaxLayerProps {
  children: ReactNode;
  depth?: 1 | 2 | 3 | 4 | 5; // 1 is furthest/slowest, 5 is closest/fastest
  className?: string;
}

export function ParallaxLayer({
  children,
  depth = 3,
  className = '',
}: ParallaxLayerProps) {
  // Convert depth to speed (1 = 0.2, 5 = 1.0)
  const speed = depth * 0.2;

  return (
    <ParallaxWrapper speed={speed} className={className}>
      {children}
    </ParallaxWrapper>
  );
}
