/**
 * Client-side Stripe Configuration
 * Safe to import in React components
 */

'use client';

import { loadStripe, Stripe as StripeJS } from '@stripe/stripe-js';

// Client-side Stripe promise (memoized)
let stripePromise: Promise<StripeJS | null>;

/**
 * Get Stripe.js instance for client-side checkout
 * Returns a memoized promise that resolves to the Stripe object
 */
export const getStripe = () => {
  if (!stripePromise) {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (!key) {
      console.error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set');
      return Promise.resolve(null);
    }
    stripePromise = loadStripe(key);
  }
  return stripePromise;
};
