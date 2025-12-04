/**
 * Stripe Checkout API Route
 * Creates a checkout session for course enrollment
 */

import { NextRequest, NextResponse } from 'next/server';
import { stripe, formatPriceForStripe } from '@/lib/stripe-server';
import { Course } from '@/data/courses';

export async function POST(request: NextRequest) {
  try {
    // Runtime validation of Stripe credentials
    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'sk_test_placeholder') {
      console.error('STRIPE_SECRET_KEY is not configured');
      return NextResponse.json(
        { error: 'Payment system is not configured. Please contact support.' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { course }: { course: Course } = body;

    if (!course || !course.id || !course.title || !course.price) {
      return NextResponse.json(
        { error: 'Invalid course data' },
        { status: 400 }
      );
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: course.title,
              description: course.description,
              metadata: {
                courseId: course.id,
                courseLevel: course.level,
                courseDuration: course.duration,
              },
            },
            unit_amount: formatPriceForStripe(course.price),
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/courses/enrollment-success?session_id={CHECKOUT_SESSION_ID}&course_id=${course.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/courses`,
      metadata: {
        courseId: course.id,
        courseTitle: course.title,
        courseLevel: course.level,
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
