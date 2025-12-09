/**
 * Stripe Checkout API Route for Products
 * Creates a checkout session for product purchases (books, bundles, etc.)
 */

import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe-server';
import { CartItem } from '@/contexts/CartContext';

export async function POST(request: NextRequest) {
  try {
    // Runtime validation of Stripe credentials
    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'sk_test_placeholder' || process.env.STRIPE_SECRET_KEY === 'sk_test_YOUR_KEY_HERE') {
      console.error('STRIPE_SECRET_KEY is not configured');
      return NextResponse.json(
        { error: 'Payment system is not configured. Please add your Stripe keys to .env.local' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { items }: { items: CartItem[] } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      );
    }

    // Build line items for Stripe
    const lineItems = items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.product.name,
          description: item.product.description,
          metadata: {
            productId: item.product.id,
            productType: item.product.type,
            category: item.product.category,
          },
        },
        unit_amount: item.product.price, // Already in cents
      },
      quantity: item.quantity,
    }));

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: lineItems,
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/store/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/books`,
      metadata: {
        cartItems: JSON.stringify(items.map(i => ({
          id: i.product.id,
          name: i.product.name,
          quantity: i.quantity
        }))),
      },
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'NZ', 'DE', 'FR', 'ES', 'IT', 'NL'],
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
