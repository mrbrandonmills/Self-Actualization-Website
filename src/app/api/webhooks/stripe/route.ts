/**
 * Stripe Webhook Handler
 * Handles payment events from Stripe and creates enrollments in the database
 * Creates user accounts for guest checkouts (paying customers only)
 */

import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe-server';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

/**
 * Generate a secure temporary password
 */
function generateTempPassword(): string {
  return crypto.randomBytes(12).toString('base64').slice(0, 16);
}

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

      // Get user info
      let finalUserId = session.metadata?.userId;
      const courseSlug = session.metadata?.courseSlug;
      const isBundle = session.metadata?.isBundle === 'true';
      const customerEmail = session.customer_details?.email;
      const customerName = session.customer_details?.name || 'Student';

      // If no userId but we have an email, create account for this paying customer
      if (!finalUserId && customerEmail) {
        try {
          // Check if user already exists with this email
          const existingUser = await prisma.user.findUnique({
            where: { email: customerEmail },
          });

          if (existingUser) {
            // Use existing account
            finalUserId = existingUser.id;
            console.log(`Found existing user for ${customerEmail}: ${finalUserId}`);
          } else {
            // Create new account for paying customer
            const tempPassword = generateTempPassword();
            const hashedPassword = await bcrypt.hash(tempPassword, 12);

            const newUser = await prisma.user.create({
              data: {
                email: customerEmail,
                name: customerName,
                password: hashedPassword,
                membershipTier: isBundle ? 'PREMIUM' : 'BASIC',
              },
            });

            // Create UserXP record
            await prisma.userXP.create({
              data: {
                userId: newUser.id,
                totalXp: 0,
                currentLevel: 1,
                streakDays: 0,
                longestStreak: 0,
              },
            });

            finalUserId = newUser.id;
            console.log(`Created new account for paying customer: ${customerEmail} (${finalUserId})`);

            // TODO: Send welcome email with temp password
            // For now, log it (in production, integrate with email service)
            console.log(`WELCOME EMAIL NEEDED: ${customerEmail} - Temp password: ${tempPassword}`);
          }
        } catch (error) {
          console.error('Error creating user account:', error);
        }
      }

      // Create enrollments if we have a user
      if (finalUserId) {
        try {
          if (isBundle) {
            // Enroll in all courses
            const courses = await prisma.course.findMany({
              where: { slug: { in: ALL_COURSE_SLUGS } },
              select: { id: true, slug: true },
            });

            for (const course of courses) {
              await prisma.enrollment.upsert({
                where: {
                  idx_enrollments_unique: { userId: finalUserId, courseId: course.id },
                },
                create: {
                  userId: finalUserId,
                  courseId: course.id,
                  stripeSessionId: session.id,
                  status: 'ACTIVE',
                },
                update: {
                  stripeSessionId: session.id,
                  status: 'ACTIVE',
                },
              });
              console.log(`Enrolled user ${finalUserId} in course: ${course.slug}`);
            }
          } else if (courseSlug) {
            // Enroll in single course
            const course = await prisma.course.findUnique({
              where: { slug: courseSlug },
              select: { id: true },
            });

            if (course) {
              await prisma.enrollment.upsert({
                where: {
                  idx_enrollments_unique: { userId: finalUserId, courseId: course.id },
                },
                create: {
                  userId: finalUserId,
                  courseId: course.id,
                  stripeSessionId: session.id,
                  status: 'ACTIVE',
                },
                update: {
                  stripeSessionId: session.id,
                  status: 'ACTIVE',
                },
              });
              console.log(`Enrolled user ${finalUserId} in course: ${courseSlug}`);
            }
          }
        } catch (error) {
          console.error('Enrollment error:', error);
          // Don't fail the webhook - Stripe payment already succeeded
        }
      } else {
        console.error('No userId and no customer email - cannot create enrollment');
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
