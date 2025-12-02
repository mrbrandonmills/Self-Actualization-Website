/**
 * Container Component - Award-Winning 2026 Design System
 * Responsive container with generous white space
 */

import React from 'react';

export interface ContainerProps {
  children: React.ReactNode;
  width?: 'text' | 'prose' | 'narrow' | 'wide' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
}

export function Container({
  children,
  width = 'prose',
  padding = '2xl',
  className = '',
}: ContainerProps) {
  const widthStyles = {
    text: 'max-w-[var(--content-width-text)]',
    prose: 'max-w-[var(--content-width-prose)]',
    narrow: 'max-w-[var(--content-width-narrow)]',
    wide: 'max-w-[var(--content-width-wide)]',
    full: 'max-w-full',
  };

  const paddingStyles = {
    none: 'py-0',
    sm: 'py-[var(--space-sm)]',
    md: 'py-[var(--space-md)]',
    lg: 'py-[var(--space-lg)]',
    xl: 'py-[var(--space-xl)]',
    '2xl': 'py-[var(--space-2xl)]', // Minimum 8rem padding per PROTOTYPES.md
  };

  return (
    <div
      className={`${widthStyles[width]} ${paddingStyles[padding]} mx-auto px-[var(--space-md)] ${className}`}
    >
      {children}
    </div>
  );
}
