/**
 * Section Component - Award-Winning 2026 Design System
 * Generous white space per PROTOTYPES.md (minimum 8rem vertical padding)
 */

import React from 'react';

export interface SectionProps {
  children: React.ReactNode;
  spacing?: 'normal' | 'large' | 'xl';
  background?: 'primary' | 'secondary' | 'tertiary';
  className?: string;
}

export function Section({
  children,
  spacing = 'large',
  background = 'primary',
  className = '',
}: SectionProps) {
  const spacingStyles = {
    normal: 'py-[var(--space-xl)]',      // 96px
    large: 'py-[var(--space-2xl)]',      // 128px (PROTOTYPES.md minimum)
    xl: 'py-[var(--space-3xl)]',         // 192px
  };

  const backgroundStyles = {
    primary: 'bg-[var(--bg-primary)]',
    secondary: 'bg-[var(--bg-secondary)]',
    tertiary: 'bg-[var(--bg-tertiary)]',
  };

  return (
    <section className={`${spacingStyles[spacing]} ${backgroundStyles[background]} ${className}`}>
      {children}
    </section>
  );
}
