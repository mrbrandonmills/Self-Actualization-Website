/**
 * Stripe Checkout API Route
 * Creates a checkout session for course enrollment
 */

import { NextRequest, NextResponse } from 'next/server';
import { stripe, formatPriceForStripe } from '@/lib/stripe-server';
import { Course, courseBundle } from '@/data/courses';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

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

    // Get authenticated user
    const session = await auth();
    const userId = session?.user?.id;

    const body = await request.json();
    const { course, isBundle }: { course?: Course; isBundle?: boolean } = body;

    // Handle bundle purchase
    if (isBundle) {
      const checkoutSession = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        customer_email: session?.user?.email || undefined,
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: courseBundle.title,
                description: courseBundle.description,
                metadata: {
                  isBundle: 'true',
                  courseIds: courseBundle.courseIds.join(','),
                },
              },
              unit_amount: courseBundle.price * 100,
            },
            quantity: 1,
          },
        ],
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/courses/enrollment-success?session_id={CHECKOUT_SESSION_ID}&bundle=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/courses`,
        metadata: {
          isBundle: 'true',
          courseIds: courseBundle.courseIds.join(','),
          userId: userId || '',
        },
      });

      return NextResponse.json({ sessionId: checkoutSession.id, url: checkoutSession.url });
    }

    // Handle single course purchase
    if (!course || !course.id || !course.title || !course.price) {
      return NextResponse.json(
        { error: 'Invalid course data' },
        { status: 400 }
      );
    }

    // Get course from database to get the actual ID
    const dbCourse = await prisma.course.findUnique({
      where: { slug: course.slug },
    });

    // Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: session?.user?.email || undefined,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: course.title,
              description: course.description,
              metadata: {
                courseId: course.id,
                courseSlug: course.slug,
                courseLevel: course.level,
                courseDuration: course.duration,
              },
            },
            unit_amount: formatPriceForStripe(course.price),
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/courses/enrollment-success?session_id={CHECKOUT_SESSION_ID}&course_slug=${course.slug}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/courses/${course.slug}`,
      metadata: {
        courseId: dbCourse?.id || course.id,
        courseSlug: course.slug,
        courseTitle: course.title,
        courseLevel: course.level,
        userId: userId || '',
      },
    });

    return NextResponse.json({ sessionId: checkoutSession.id, url: checkoutSession.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
