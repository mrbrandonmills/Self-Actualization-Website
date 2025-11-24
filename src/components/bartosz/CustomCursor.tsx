'use client';

import { useEffect, useState } from 'react';
import { effects } from '@/lib/bartosz-design-tokens';

type CursorState = 'default' | 'hover' | 'bookInspect' | 'text';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState<CursorState>('default');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = 'none';

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement;

      // Determine cursor state based on hover target
      if (target.closest('.book-pedestal')) {
        setCursorState('bookInspect');
      } else if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setCursorState('hover');
      } else if (
        target.tagName === 'P' ||
        target.tagName === 'H1' ||
        target.tagName === 'H2' ||
        target.tagName === 'H3' ||
        target.closest('p') ||
        target.closest('h1') ||
        target.closest('h2')
      ) {
        setCursorState('text');
      } else {
        setCursorState('default');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  const cursorStyle = effects.cursor[cursorState === 'text' ? 'default' : cursorState];

  return (
    <div
      className="custom-cursor"
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        width: cursorStyle.width,
        height: cursorStyle.height,
        background: cursorStyle.background,
        backdropFilter: cursorStyle.backdropFilter,
        WebkitBackdropFilter: cursorStyle.backdropFilter,
        borderRadius: '50%',
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        zIndex: 9999,
        opacity: isVisible ? 1 : 0,
        mixBlendMode: cursorState === 'bookInspect' ? 'screen' : 'normal',
      }}
    >
      {/* Inner dot for bookInspect state */}
      {cursorState === 'bookInspect' && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '4px',
            height: '4px',
            background: '#C9A050',
            borderRadius: '50%',
            boxShadow: '0 0 20px rgba(201, 160, 80, 0.8)',
          }}
        />
      )}
    </div>
  );
}
