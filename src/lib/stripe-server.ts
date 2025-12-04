/**
 * Server-side Stripe Configuration
 * ONLY import this in API routes and server components
 */

import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set');
}

// Server-side Stripe instance
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
});

/**
 * Format price for Stripe (converts dollars to cents)
 * Example: 197 -> 19700
 */
export function formatPriceForStripe(price: number): number {
  return Math.round(price * 100);
}

/**
 * Format price for display (converts cents to dollars)
 * Example: 19700 -> "197.00"
 */
export function formatPrice(priceInCents: number): string {
  return `${(priceInCents / 100).toFixed(2)}`;
}
