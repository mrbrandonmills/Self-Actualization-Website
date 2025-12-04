/**
 * Client-side Stripe Configuration
 * Safe to import in React components
 */

'use client';

import { loadStripe, Stripe as StripeJS } from '@stripe/stripe-js';

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set');
}

// Client-side Stripe promise (memoized)
let stripePromise: Promise<StripeJS | null>;

/**
 * Get Stripe.js instance for client-side checkout
 * Returns a memoized promise that resolves to the Stripe object
 */
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};
