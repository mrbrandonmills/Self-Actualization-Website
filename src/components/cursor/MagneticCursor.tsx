/**
 * Magnetic Cursor - Premium Interactive Cursor Effect
 * Creates a custom cursor that magnetically pulls toward interactive elements
 * Seen on award-winning sites like Apple, Awwwards winners
 */

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';

export function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!cursorRef.current || !cursorDotRef.current) return;

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    // Smooth cursor follow with GSAP
    const moveCursor = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: 'power2.out',
      });

      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
    };

    // Magnetic effect on hoverable elements
    const handleMouseEnter = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const bounds = target.getBoundingClientRect();

      setIsHovering(true);

      const onMove = (e: MouseEvent) => {
        const x = e.clientX - bounds.left - bounds.width / 2;
        const y = e.clientY - bounds.top - bounds.height / 2;

        // Pull cursor toward element center with magnetic effect
        gsap.to(cursor, {
          x: e.clientX + x * 0.3,
          y: e.clientY + y * 0.3,
          duration: 0.3,
          ease: 'power2.out',
        });

        // Scale up cursor
        gsap.to(cursor, {
          scale: 1.5,
          duration: 0.3,
        });
      };

      const onLeave = () => {
        setIsHovering(false);
        target.removeEventListener('mousemove', onMove as any);
        target.removeEventListener('mouseleave', onLeave);

        gsap.to(cursor, {
          scale: 1,
          duration: 0.3,
        });
      };

      target.addEventListener('mousemove', onMove as any);
      target.addEventListener('mouseleave', onLeave);
    };

    // Add magnetic effect to all interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [data-magnetic], .cursor-magnetic'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
    });

    // Track mouse movement
    window.addEventListener('mousemove', moveCursor);

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
      });
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      {/* Outer cursor ring */}
      <div
        ref={cursorRef}
        className="magnetic-cursor"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '40px',
          height: '40px',
          border: `2px solid ${isHovering ? 'var(--accent-warm)' : 'var(--olive-dark)'}`,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          transition: 'border-color 0.3s ease, opacity 0.3s ease',
          opacity: 0.6,
          mixBlendMode: 'difference',
        }}
      />

      {/* Inner cursor dot */}
      <div
        ref={cursorDotRef}
        className="magnetic-cursor-dot"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          backgroundColor: isHovering ? 'var(--accent-warm)' : 'var(--olive-dark)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 10000,
          transform: 'translate(-50%, -50%)',
          transition: 'background-color 0.3s ease',
        }}
      />
    </>
  );
}
