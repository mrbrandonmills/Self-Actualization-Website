/**
 * Stripe Configuration
 * Server-side and client-side Stripe instances
 */

import Stripe from 'stripe';
import { loadStripe, Stripe as StripeJS } from '@stripe/stripe-js';

// Server-side Stripe instance
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
});

// Client-side Stripe instance
let stripePromise: Promise<StripeJS | null>;
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};

// Product metadata for courses
export interface CourseProductMetadata {
  courseId: string;
  courseTitle: string;
  courseLevel: string;
  courseDuration: string;
}

// Helper to format price for Stripe (convert dollars to cents)
export function formatPriceForStripe(price: number): number {
  return Math.round(price * 100);
}

// Helper to format price for display
export function formatPrice(priceInCents: number): string {
  return `$${(priceInCents / 100).toFixed(2)}`;
}
