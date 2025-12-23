/**
 * Mobile Books API
 * Returns list of books for the mobile app
 */

import { NextResponse } from 'next/server';

// Book data - in production this would come from a database/CMS
const books = [
  {
    id: 'maslow-hierarchy',
    title: 'Motivation and Personality',
    author: 'Abraham Maslow',
    description: 'The foundational work on the hierarchy of needs and self-actualization. Essential reading for understanding human motivation.',
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1388179763i/1297.jpg',
    category: 'Psychology',
    tags: ['self-actualization', 'psychology', 'motivation'],
    formats: [
      { type: 'paperback', url: 'https://amazon.com/dp/0060419873', priceDisplay: '$16.99' },
      { type: 'kindle', url: 'https://amazon.com/dp/B004XFYRFE', priceDisplay: '$12.99' },
    ],
  },
  {
    id: 'mans-search',
    title: "Man's Search for Meaning",
    author: 'Viktor E. Frankl',
    description: 'A psychiatrist who survived the Holocaust shares his philosophy of finding meaning in all forms of existence.',
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1535419394i/4069.jpg',
    category: 'Philosophy',
    tags: ['meaning', 'philosophy', 'resilience'],
    formats: [
      { type: 'paperback', url: 'https://amazon.com/dp/0807014273', priceDisplay: '$10.99' },
      { type: 'kindle', url: 'https://amazon.com/dp/B009U9S6FI', priceDisplay: '$8.99' },
      { type: 'audiobook', url: 'https://amazon.com/dp/B002V0QUOC', priceDisplay: '$14.99' },
    ],
  },
  {
    id: 'flow',
    title: 'Flow: The Psychology of Optimal Experience',
    author: 'Mihaly Csikszentmihalyi',
    description: 'Discover how to achieve happiness through finding flow - a state of complete absorption in what you do.',
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1555033699i/66354.jpg',
    category: 'Psychology',
    tags: ['flow', 'happiness', 'performance'],
    formats: [
      { type: 'paperback', url: 'https://amazon.com/dp/0061339202', priceDisplay: '$15.99' },
      { type: 'kindle', url: 'https://amazon.com/dp/B000W94FE6', priceDisplay: '$11.99' },
    ],
  },
  {
    id: 'thinking-fast-slow',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    description: 'Nobel laureate explains the two systems that drive the way we think and make choices.',
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1317793965i/11468377.jpg',
    category: 'Psychology',
    tags: ['thinking', 'decision-making', 'cognitive science'],
    formats: [
      { type: 'paperback', url: 'https://amazon.com/dp/0374533555', priceDisplay: '$17.99' },
      { type: 'kindle', url: 'https://amazon.com/dp/B00555X8OA', priceDisplay: '$13.99' },
    ],
  },
];

export async function GET() {
  return NextResponse.json(books);
}
