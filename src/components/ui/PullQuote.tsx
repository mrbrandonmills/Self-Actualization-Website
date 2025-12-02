/**
 * Pull Quote Component - Award-Winning 2026 Design System
 * PROTOTYPES.md specification implementation
 */

import React from 'react';

export interface PullQuoteProps {
  children: React.ReactNode;
  author?: string;
  role?: string;
  className?: string;
}

export function PullQuote({ children, author, role, className = '' }: PullQuoteProps) {
  return (
    <figure className={`pull-quote ${className}`}>
      <blockquote>{children}</blockquote>
      {(author || role) && (
        <figcaption className="mt-[var(--space-md)] text-muted">
          {author && <cite className="not-italic font-medium text-olive-dark">{author}</cite>}
          {role && <span className="block text-sm mt-1">{role}</span>}
        </figcaption>
      )}
    </figure>
  );
}
