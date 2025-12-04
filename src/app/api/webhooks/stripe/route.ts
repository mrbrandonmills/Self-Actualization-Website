/**
 * Stripe Webhook Handler
 * Handles payment events from Stripe
 */

import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe-server';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  // Runtime validation of Stripe credentials
  if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'sk_test_placeholder') {
    console.error('STRIPE_SECRET_KEY is not configured');
    return NextResponse.json(
      { error: 'Webhook handler is not configured' },
      { status: 500 }
    );
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error('STRIPE_WEBHOOK_SECRET is not configured');
    return NextResponse.json(
      { error: 'Webhook secret is not configured' },
      { status: 500 }
    );
  }

  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;

      // Log successful enrollment
      console.log('✅ Course enrollment completed:', {
        sessionId: session.id,
        courseId: session.metadata?.courseId,
        courseTitle: session.metadata?.courseTitle,
        customerEmail: session.customer_details?.email,
        amountTotal: session.amount_total,
      });

      // TODO: Add to database/CRM
      // - Grant course access to customer
      // - Send welcome email
      // - Update analytics

      break;
    }

    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log('✅ Payment succeeded:', paymentIntent.id);
      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.error('❌ Payment failed:', paymentIntent.id);
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
