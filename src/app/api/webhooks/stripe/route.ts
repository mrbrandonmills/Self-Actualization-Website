/**
 * Stripe Webhook Handler
 * Handles payment events from Stripe and creates enrollments in Supabase
 */

import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe-server';
import { getSupabaseAdmin } from '@/lib/supabase';
import Stripe from 'stripe';

// All course slugs for bundle enrollment
const ALL_COURSE_SLUGS = [
  'engineering-your-patterns',
  'self-actualization-process',
  'art-of-right-judgment',
  'structuring-decisions-chaos',
  'laboratory-of-living',
  'conscious-integration',
];

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
      console.log('Course enrollment completed:', {
        sessionId: session.id,
        courseSlug: session.metadata?.courseSlug,
        isBundle: session.metadata?.isBundle,
        userId: session.metadata?.userId,
        customerEmail: session.customer_details?.email,
        amountTotal: session.amount_total,
      });

      // Create enrollment(s) in Supabase
      const userId = session.metadata?.userId;
      const courseSlug = session.metadata?.courseSlug;
      const isBundle = session.metadata?.isBundle === 'true';

      if (userId) {
        try {
          const supabaseAdmin = getSupabaseAdmin();

          if (isBundle) {
            // Enroll in all courses
            const { data: courses, error: coursesError } = await supabaseAdmin
              .from('courses')
              .select('id, slug')
              .in('slug', ALL_COURSE_SLUGS);

            if (coursesError) {
              console.error('Error fetching courses for bundle:', coursesError);
            } else if (courses) {
              for (const course of courses) {
                const { error: enrollError } = await supabaseAdmin
                  .from('enrollments')
                  .upsert({
                    user_id: userId,
                    course_id: course.id,
                    stripe_session_id: session.id,
                    status: 'active',
                  }, {
                    onConflict: 'user_id,course_id',
                  });

                if (enrollError) {
                  console.error(`Error enrolling in course ${course.slug}:`, enrollError);
                } else {
                  console.log(`Enrolled user ${userId} in course: ${course.slug}`);
                }
              }
            }
          } else if (courseSlug) {
            // Enroll in single course
            const { data: course, error: courseError } = await supabaseAdmin
              .from('courses')
              .select('id')
              .eq('slug', courseSlug)
              .single();

            if (courseError) {
              console.error('Error fetching course:', courseError);
            } else if (course) {
              const { error: enrollError } = await supabaseAdmin
                .from('enrollments')
                .upsert({
                  user_id: userId,
                  course_id: course.id,
                  stripe_session_id: session.id,
                  status: 'active',
                }, {
                  onConflict: 'user_id,course_id',
                });

              if (enrollError) {
                console.error('Error creating enrollment:', enrollError);
              } else {
                console.log(`Enrolled user ${userId} in course: ${courseSlug}`);
              }
            }
          }
        } catch (error) {
          console.error('Supabase enrollment error:', error);
          // Don't fail the webhook - Stripe payment already succeeded
          // Log for manual resolution if needed
        }
      } else {
        console.warn('No userId in checkout session metadata - enrollment not created');
      }

      break;
    }

    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log('Payment succeeded:', paymentIntent.id);
      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.error('Payment failed:', paymentIntent.id);
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
