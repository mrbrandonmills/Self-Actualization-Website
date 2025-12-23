/**
 * Mobile Essays API
 * Returns list of essays/blog posts for the mobile app
 */

import { NextResponse } from 'next/server';

// Essay data - in production this would come from a database/CMS
const essays = [
  {
    id: 'self-actualization-intro',
    slug: 'what-is-self-actualization',
    title: 'What is Self-Actualization?',
    excerpt: 'Understanding Maslow\'s concept of becoming the best version of yourself.',
    content: `# What is Self-Actualization?

Self-actualization is the complete realization of one's potential, and the full development of one's abilities and appreciation for life.

## The Hierarchy of Needs

Abraham Maslow proposed that human needs exist in a hierarchy:

1. **Physiological needs** - Food, water, shelter
2. **Safety needs** - Security, stability
3. **Love and belonging** - Relationships, community
4. **Esteem** - Respect, recognition
5. **Self-actualization** - Becoming your best self

## Characteristics of Self-Actualized People

According to Maslow, self-actualized individuals tend to:

- Accept themselves and others
- Be spontaneous and creative
- Focus on problems outside themselves
- Appreciate life's basic experiences
- Have deep, meaningful relationships
- Maintain a sense of humor
- Experience "peak experiences"

> "What a man can be, he must be. This need we call self-actualization."
> — Abraham Maslow

## Your Journey

Self-actualization is not a destination but a continuous journey of growth and discovery. It's about aligning your actions with your deepest values and expressing your unique gifts in the world.`,
    imageUrl: null,
    author: 'Self-Actualize Team',
    publishedAt: '2024-12-01T00:00:00Z',
    readTimeMinutes: 5,
    tags: ['self-actualization', 'maslow', 'psychology'],
    category: 'Fundamentals',
  },
  {
    id: 'flow-state',
    slug: 'achieving-flow-state',
    title: 'Achieving Flow State',
    excerpt: 'How to enter the zone of optimal experience and peak performance.',
    content: `# Achieving Flow State

Flow is the mental state of being completely immersed in an activity, where time seems to disappear and you perform at your peak.

## What is Flow?

Psychologist Mihaly Csikszentmihalyi discovered that people are happiest when in a state of flow—completely absorbed in a challenging activity.

## The Conditions for Flow

To enter flow, you need:

### 1. Clear Goals
Know exactly what you're trying to accomplish.

### 2. Immediate Feedback
Get instant information about your progress.

### 3. Balance of Challenge and Skill
The task should be challenging enough to engage you, but not so hard that you become anxious.

## Flow in Practice

Here's how to cultivate flow in your life:

1. **Choose activities you love** - Passion makes flow easier
2. **Minimize distractions** - Create an environment for deep work
3. **Set clear objectives** - Know your targets
4. **Increase difficulty gradually** - Keep growing

> "The best moments in our lives are not the passive, receptive, relaxing times... The best moments usually occur if a person's body or mind is stretched to its limits in a voluntary effort to accomplish something difficult and worthwhile."
> — Mihaly Csikszentmihalyi`,
    imageUrl: null,
    author: 'Self-Actualize Team',
    publishedAt: '2024-12-10T00:00:00Z',
    readTimeMinutes: 4,
    tags: ['flow', 'productivity', 'peak-performance'],
    category: 'Performance',
  },
  {
    id: 'meaning-purpose',
    slug: 'finding-meaning-and-purpose',
    title: 'Finding Meaning and Purpose',
    excerpt: 'Viktor Frankl\'s insights on discovering what makes your life worth living.',
    content: `# Finding Meaning and Purpose

Viktor Frankl, who survived the Holocaust, taught that life has meaning under all circumstances, and that our main motivation is the will to meaning.

## The Three Sources of Meaning

Frankl identified three ways to find meaning:

### 1. Creative Values
What we give to the world through our work and creativity.

### 2. Experiential Values
What we receive from the world—love, beauty, truth.

### 3. Attitudinal Values
The stance we take toward unavoidable suffering.

## Questions to Find Your Purpose

Ask yourself:

- What breaks your heart about the world?
- What would you do if you knew you couldn't fail?
- What activities make you lose track of time?
- What impact do you want to leave behind?

## Living with Purpose

Purpose isn't found—it's chosen. Each day is an opportunity to live according to your values and contribute to something greater than yourself.

> "He who has a why to live can bear almost any how."
> — Friedrich Nietzsche`,
    imageUrl: null,
    author: 'Self-Actualize Team',
    publishedAt: '2024-12-15T00:00:00Z',
    readTimeMinutes: 6,
    tags: ['meaning', 'purpose', 'frankl'],
    category: 'Philosophy',
  },
];

export async function GET() {
  return NextResponse.json(essays);
}
