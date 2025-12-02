/**
 * Button Component - Award-Winning 2026 Design System
 * Premium button with literary organic aesthetic
 */

import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles = `
    font-family: var(--font-sans);
    font-weight: var(--font-weight-medium);
    letter-spacing: var(--tracking-wide);
    text-transform: uppercase;
    transition: all var(--transition-base);
    border-radius: var(--radius-md);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-sm);
  `;

  const variantStyles = {
    primary: `
      background: var(--accent-warm);
      color: var(--bg-primary);
      border: 2px solid var(--accent-warm);
      hover:bg-[var(--olive-dark)]
      hover:border-[var(--olive-dark)]
    `,
    secondary: `
      background: var(--olive-dark);
      color: var(--bg-primary);
      border: 2px solid var(--olive-dark);
      hover:bg-[var(--olive-mid)]
      hover:border-[var(--olive-mid)]
    `,
    outline: `
      background: transparent;
      color: var(--olive-dark);
      border: 2px solid var(--olive-dark);
      hover:bg-[var(--ui-hover)]
    `,
    ghost: `
      background: transparent;
      color: var(--olive-dark);
      border: 2px solid transparent;
      hover:bg-[var(--ui-hover)]
    `,
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
