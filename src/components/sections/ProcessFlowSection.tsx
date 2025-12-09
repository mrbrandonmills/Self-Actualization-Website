/**
 * Process Flow Section - Award-Winning 2026 Homepage
 * MODULE 6: Complex Information Architecture
 * Demonstrates: Write → Edit → Publish → Sell workflow
 * Features: GSAP scroll-triggered animations with stagger effects
 */

'use client';

import React, { useRef } from 'react';
import { Section, Container } from '../ui';
import { gsap, useGSAP } from '@/lib/gsap';
import { ParallaxWrapper } from '@/components/animations';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: string;
}

const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Write',
    description: 'Craft compelling narratives that resonate with readers. Our editorial team guides you through every revision.',
    icon: '✍️',
  },
  {
    number: '02',
    title: 'Edit',
    description: 'Professional editing services ensure your manuscript shines. Structural, line, and copy editing available.',
    icon: '📝',
  },
  {
    number: '03',
    title: 'Publish',
    description: 'Premium production quality. From typesetting to cover design, we handle the technical details.',
    icon: '📚',
  },
  {
    number: '04',
    title: 'Sell',
    description: 'Strategic marketing and distribution. Your work reaches readers worldwide through proven channels.',
    icon: '🚀',
  },
];

export function ProcessFlowSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  // GSAP Scroll-Triggered Animations
  useGSAP(
    () => {
      // Animate header
      gsap.from(headerRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // Animate connection line (draw effect)
      gsap.from(lineRef.current, {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.5,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: lineRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      // Animate process steps with stagger
      gsap.from('.process-step', {
        opacity: 0,
        scale: 0.8,
        y: 30,
        duration: 0.7,
        stagger: 0.15,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: '.process-steps-grid',
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      // Animate step badges with extra bounce
      gsap.from('.step-badge', {
        scale: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: '.process-steps-grid',
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      // Animate arrows
      gsap.from('.step-arrow', {
        opacity: 0,
        x: -20,
        duration: 0.5,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.process-steps-grid',
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <Section spacing="xl" background="secondary">
      <Container width="wide">
        <div ref={sectionRef}>
          {/* Section Header */}
          <div ref={headerRef} className="text-center mb-[var(--space-3xl)]">
            <h2 className="h2 mb-[var(--space-md)]">
              From Manuscript to Masterpiece
            </h2>
            <p className="lead mx-auto">
              A proven process that transforms ideas into published works
            </p>
          </div>

          {/* Process Steps */}
          <div className="process-steps-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[var(--space-2xl)] relative">
            {/* Connection Line - Desktop only */}
            <div
              ref={lineRef}
              className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-[2px] bg-[var(--olive-light)] opacity-30"
            />

            {processSteps.map((step, index) => (
              <div
                key={step.number}
                className="process-step relative flex flex-col items-center text-center group"
              >
                {/* Number Badge with Parallax Depth */}
                <ParallaxWrapper
                  speed={0.3 + (index % 2) * 0.2}
                  direction="up"
                  scale={true}
                >
                  <div className="step-badge w-32 h-32 rounded-full bg-[var(--bg-primary)] border-4 border-[var(--olive-mid)] flex items-center justify-center mb-[var(--space-lg)] transition-all duration-500 group-hover:border-[var(--accent-warm)] group-hover:scale-110 z-10">
                    <span className="text-6xl">{step.icon}</span>
                  </div>
                </ParallaxWrapper>

                {/* Step Number */}
                <span className="label text-[var(--accent-warm)] mb-[var(--space-sm)]">
                  Step {step.number}
                </span>

                {/* Step Title */}
                <h3 className="h4 mb-[var(--space-md)] group-hover:text-[var(--accent-warm)] transition-colors">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-muted max-w-[var(--content-width-narrow)]">
                  {step.description}
                </p>

                {/* Arrow - Desktop only */}
                {index < processSteps.length - 1 && (
                  <div className="step-arrow hidden lg:block absolute top-16 -right-[25%] text-4xl text-[var(--olive-light)] z-0">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-[var(--space-3xl)]">
            <a
              href="/writing-lab"
              className="inline-flex items-center gap-[var(--space-sm)] text-[var(--olive-dark)] hover:text-[var(--accent-warm)] transition-colors font-medium"
            >
              <span>Learn More About Our Process</span>
              <span className="text-2xl">→</span>
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}
