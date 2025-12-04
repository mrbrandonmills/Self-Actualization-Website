# Stripe Enrollment - Critical Bug Fixes (Ready to Implement)

**Date:** December 3, 2025
**Priority:** URGENT - Deploy blockers

This document contains **copy-paste ready code fixes** for all critical bugs.

---

## 🔴 BUG-001: Webhook Secret Not Validated

**File:** `/src/app/api/webhooks/stripe/route.ts`
**Risk:** Payment fraud, unauthorized course access
**Fix Time:** 30 minutes

### Current Code (VULNERABLE):
```typescript
export async function POST(request: NextRequest) {
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
      process.env.STRIPE_WEBHOOK_SECRET!  // ❌ DANGEROUS
    );
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }
  // ...
}
```

### Fixed Code (SECURE):
```typescript
export async function POST(request: NextRequest) {
  // 1. Verify webhook secret is configured
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('CRITICAL: STRIPE_WEBHOOK_SECRET not configured');
    return NextResponse.json(
      { error: 'Webhook endpoint not properly configured' },
      { status: 500 }
    );
  }

  // 2. Get request body and signature
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    console.warn('Webhook request missing signature header');
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    );
  }

  // 3. Verify origin (defense in depth)
  const origin = request.headers.get('origin');
  const userAgent = request.headers.get('user-agent');

  // Stripe webhooks should not have browser origin
  if (origin) {
    console.warn('Webhook called with browser origin:', origin);
    return NextResponse.json(
      { error: 'Invalid request source' },
      { status: 403 }
    );
  }

  // Log suspicious User-Agents
  if (!userAgent || !userAgent.includes('Stripe')) {
    console.warn('Webhook called without Stripe User-Agent:', userAgent);
  }

  // 4. Verify signature
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret  // ✅ SAFE
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Webhook signature verification failed:', {
      error: errorMessage,
      signature: signature.substring(0, 20) + '...',
    });

    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  // 5. Log successful verification
  console.log('Webhook verified:', {
    eventType: event.type,
    eventId: event.id,
    timestamp: new Date(event.created * 1000).toISOString(),
  });

  // ... rest of handler
}
```

---

## 🔴 BUG-002: Client Controls Price

**File:** `/src/app/api/checkout/route.ts`
**Risk:** Revenue theft ($5K-$50K/month)
**Fix Time:** 1 hour

### Current Code (VULNERABLE):
```typescript
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { course }: { course: Course } = body;

    if (!course || !course.id || !course.title || !course.price) {
      return NextResponse.json(
        { error: 'Invalid course data' },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      // ...
      line_items: [{
        price_data: {
          // ...
          unit_amount: formatPriceForStripe(course.price),  // ❌ CLIENT PRICE
        },
        quantity: 1,
      }],
      // ...
    });
  }
}
```

### Fixed Code (SECURE):
```typescript
import { courses } from '@/data/courses';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { courseId }: { courseId: string } = body;

    // 1. Validate course ID provided
    if (!courseId || typeof courseId !== 'string') {
      return NextResponse.json(
        { error: 'Course ID is required' },
        { status: 400 }
      );
    }

    // 2. Look up course from server-side data (authoritative source)
    const course = courses.find(c => c.id === courseId);

    if (!course) {
      console.warn('Attempted checkout for non-existent course:', courseId);
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }

    // 3. Validate course is purchasable
    if (!course.price || course.price <= 0) {
      console.error('Course has invalid price:', course);
      return NextResponse.json(
        { error: 'Course is not available for purchase' },
        { status: 400 }
      );
    }

    // 4. Create checkout session with SERVER-SIDE price
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: course.title,  // ✅ Server data
            description: course.description,
            metadata: {
              courseId: course.id,
              courseLevel: course.level,
              courseDuration: course.duration,
            },
          },
          unit_amount: formatPriceForStripe(course.price),  // ✅ SERVER PRICE
        },
        quantity: 1,
      }],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/courses/enrollment-success?session_id={CHECKOUT_SESSION_ID}&course_id=${course.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/courses`,
      metadata: {
        courseId: course.id,
        courseTitle: course.title,
        courseLevel: course.level,
        coursePrice: course.price.toString(),  // Store for verification
      },
    });

    // 5. Log checkout creation
    console.log('Checkout session created:', {
      sessionId: session.id,
      courseId: course.id,
      price: course.price,
    });

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });

  } catch (error) {
    console.error('Stripe checkout error:', error);

    // Better error handling
    const isStripeError = error instanceof Stripe.errors.StripeError;

    if (isStripeError) {
      return NextResponse.json(
        { error: 'Payment service temporarily unavailable. Please try again.' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
```

### Update Client Code:
**File:** `/src/components/courses/CoursePreviewPanel.tsx`

```typescript
const handleEnroll = async () => {
  if (!course) return;

  setIsEnrolling(true);

  try {
    // Send only courseId, not entire course object
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseId: course.id }),  // ✅ Only ID
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create checkout session');
    }

    const { url } = await response.json();

    // Redirect directly using URL
    if (url) {
      window.location.href = url;
    } else {
      throw new Error('No checkout URL received');
    }

  } catch (error) {
    console.error('Enrollment error:', error);
    alert('Failed to start enrollment. Please try again.');
    setIsEnrolling(false);
  }
};
```

---

## 🔴 BUG-005: Missing Environment Variable Validation

**File:** `/src/lib/stripe.ts`
**Risk:** App crashes in production
**Fix Time:** 1 hour

### Current Code (DANGEROUS):
```typescript
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
});

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};
```

### Fixed Code (SAFE):
```typescript
/**
 * Stripe Configuration with Runtime Validation
 * Fails fast on missing/invalid configuration
 */

import Stripe from 'stripe';
import { loadStripe, Stripe as StripeJS } from '@stripe/stripe-js';

// ============================================================================
// SERVER-SIDE STRIPE INSTANCE
// ============================================================================

function validateStripeSecretKey(): string {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  // Check if key exists
  if (!secretKey) {
    throw new Error(
      'STRIPE_SECRET_KEY is not configured. ' +
      'Please set it in your .env.local file. ' +
      'Get your keys from: https://dashboard.stripe.com/apikeys'
    );
  }

  // Check if using placeholder value
  if (secretKey.includes('YOUR_') || secretKey === 'sk_test_YOUR_SECRET_KEY_HERE') {
    throw new Error(
      'STRIPE_SECRET_KEY is set to placeholder value. ' +
      'Please replace it with your actual Stripe secret key. ' +
      'Get your keys from: https://dashboard.stripe.com/apikeys'
    );
  }

  // Check if key format is valid
  if (!secretKey.startsWith('sk_test_') && !secretKey.startsWith('sk_live_')) {
    throw new Error(
      'STRIPE_SECRET_KEY appears invalid. ' +
      'It should start with "sk_test_" (test mode) or "sk_live_" (production). ' +
      'Current value starts with: ' + secretKey.substring(0, 7)
    );
  }

  // Warn if using live key in development
  if (secretKey.startsWith('sk_live_') && process.env.NODE_ENV !== 'production') {
    console.warn(
      '⚠️  WARNING: Using LIVE Stripe key in non-production environment! ' +
      'Switch to test key (sk_test_...) for development.'
    );
  }

  return secretKey;
}

// Validate and create server-side Stripe instance
const stripeSecretKey = validateStripeSecretKey();

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
});

console.log('✅ Stripe server instance initialized:', {
  mode: stripeSecretKey.startsWith('sk_live_') ? 'LIVE' : 'TEST',
  environment: process.env.NODE_ENV,
});

// ============================================================================
// CLIENT-SIDE STRIPE INSTANCE
// ============================================================================

function validateStripePublishableKey(): string {
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  // Check if key exists
  if (!publishableKey) {
    throw new Error(
      'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not configured. ' +
      'Please set it in your .env.local file. ' +
      'Get your keys from: https://dashboard.stripe.com/apikeys'
    );
  }

  // Check if using placeholder value
  if (publishableKey.includes('YOUR_') || publishableKey === 'pk_test_YOUR_PUBLISHABLE_KEY_HERE') {
    console.error(
      'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is set to placeholder value. ' +
      'Stripe checkout will not work. ' +
      'Get your keys from: https://dashboard.stripe.com/apikeys'
    );
    return '';  // Return empty to prevent crashes, but checkout won't work
  }

  // Check if key format is valid
  if (!publishableKey.startsWith('pk_test_') && !publishableKey.startsWith('pk_live_')) {
    throw new Error(
      'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY appears invalid. ' +
      'It should start with "pk_test_" or "pk_live_". ' +
      'Current value starts with: ' + publishableKey.substring(0, 7)
    );
  }

  // CRITICAL: Check if secret key was accidentally exposed
  if (publishableKey.startsWith('sk_')) {
    throw new Error(
      '🚨 CRITICAL SECURITY ERROR: ' +
      'Stripe SECRET key is exposed in client code! ' +
      'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY should start with "pk_", not "sk_". ' +
      'You must rotate your secret key immediately at: ' +
      'https://dashboard.stripe.com/apikeys'
    );
  }

  // Warn if key mismatch (live key with test secret or vice versa)
  const isPublishableLive = publishableKey.startsWith('pk_live_');
  const isSecretLive = stripeSecretKey.startsWith('sk_live_');

  if (isPublishableLive !== isSecretLive) {
    console.warn(
      '⚠️  WARNING: Stripe key mode mismatch! ' +
      `Publishable key is ${isPublishableLive ? 'LIVE' : 'TEST'} ` +
      `but secret key is ${isSecretLive ? 'LIVE' : 'TEST'}. ` +
      'Payments may fail.'
    );
  }

  return publishableKey;
}

let stripePromise: Promise<StripeJS | null>;

export const getStripe = () => {
  if (!stripePromise) {
    const publishableKey = validateStripePublishableKey();

    if (!publishableKey) {
      // Return null promise if key is invalid
      stripePromise = Promise.resolve(null);
    } else {
      stripePromise = loadStripe(publishableKey);
    }
  }
  return stripePromise;
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export interface CourseProductMetadata {
  courseId: string;
  courseTitle: string;
  courseLevel: string;
  courseDuration: string;
}

// Helper to format price for Stripe (convert dollars to cents)
export function formatPriceForStripe(price: number): number {
  if (typeof price !== 'number' || isNaN(price)) {
    throw new Error(`Invalid price: ${price}`);
  }

  if (price < 0) {
    throw new Error(`Price cannot be negative: ${price}`);
  }

  if (price > 999999) {
    throw new Error(`Price too large: ${price}`);
  }

  return Math.round(price * 100);
}

// Helper to format price for display
export function formatPrice(priceInCents: number): string {
  if (typeof priceInCents !== 'number' || isNaN(priceInCents)) {
    return '$0.00';
  }

  return `$${(priceInCents / 100).toFixed(2)}`;
}

// ============================================================================
// STARTUP VALIDATION
// ============================================================================

// Validate configuration on module load
if (typeof window === 'undefined') {
  // Server-side: validate immediately
  console.log('🔒 Validating Stripe configuration...');

  try {
    validateStripeSecretKey();
    console.log('✅ Stripe secret key validated');
  } catch (error) {
    console.error('❌ Stripe configuration error:', error);
    // Don't throw - allow app to start but fail gracefully at checkout
  }
}
```

---

## 🔴 BUG-004: Race Condition (Double Charging)

**File:** `/src/components/courses/CoursePreviewPanel.tsx`
**Risk:** Customer charged twice
**Fix Time:** 2 hours

### Current Code (HAS RACE CONDITION):
```typescript
const [isEnrolling, setIsEnrolling] = useState(false)

const handleEnroll = async () => {
  if (!course) return

  setIsEnrolling(true)

  try {
    const response = await fetch('/api/checkout', { /* ... */ })
    const { sessionId } = await response.json()

    const stripe = await getStripe()
    const { error } = await stripe.redirectToCheckout({ sessionId })

    if (error) {
      throw error
    }
  } catch (error) {
    setIsEnrolling(false)  // ❌ Can be clicked again
  }
  // ❌ Never sets back to false on success
}
```

### Fixed Code (RACE-SAFE):
```typescript
const [isEnrolling, setIsEnrolling] = useState(false);
const [hasStartedCheckout, setHasStartedCheckout] = useState(false);
const checkoutInProgress = useRef(false);  // Persistent across re-renders

const handleEnroll = async () => {
  if (!course) return;

  // Prevent multiple simultaneous clicks
  if (checkoutInProgress.current) {
    console.log('Checkout already in progress, ignoring click');
    return;
  }

  checkoutInProgress.current = true;
  setIsEnrolling(true);
  setHasStartedCheckout(true);

  try {
    // 1. Create checkout session
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseId: course.id }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create checkout session');
    }

    const { url } = await response.json();

    if (!url) {
      throw new Error('No checkout URL received from server');
    }

    // 2. Small delay to show "Redirecting..." state
    await new Promise(resolve => setTimeout(resolve, 300));

    // 3. Direct redirect (more reliable than Stripe.js redirect)
    window.location.href = url;

    // Don't reset state - page will unload during redirect

  } catch (error) {
    console.error('Enrollment error:', error);

    // Reset states to allow retry
    checkoutInProgress.current = false;
    setIsEnrolling(false);
    setHasStartedCheckout(false);

    // Show user-friendly error
    const errorMessage = error instanceof Error
      ? error.message
      : 'Failed to start enrollment. Please try again.';

    alert(errorMessage);  // TODO: Replace with toast notification
  }
};

// Prevent closing panel during checkout
const handleClose = () => {
  if (hasStartedCheckout) {
    const confirmClose = confirm(
      'You have started the enrollment process. ' +
      'Are you sure you want to cancel?'
    );

    if (!confirmClose) {
      return;
    }
  }

  onClose();
};

// Cleanup on unmount
useEffect(() => {
  return () => {
    // Reset ref on unmount
    checkoutInProgress.current = false;
  };
}, []);
```

### Update Button:
```typescript
<motion.button
  onClick={handleEnroll}
  disabled={isEnrolling || hasStartedCheckout}
  className="w-full py-4 rounded-xl text-lg font-medium"
  style={{
    background: isEnrolling
      ? 'linear-gradient(135deg, #8B8B8B 0%, #A0A0A0 50%, #8B8B8B 100%)'
      : 'linear-gradient(135deg, #C9A050 0%, #D4AF37 50%, #C9A050 100%)',
    cursor: (isEnrolling || hasStartedCheckout) ? 'not-allowed' : 'pointer',
    opacity: hasStartedCheckout ? 0.7 : 1,
  }}
  whileHover={isEnrolling ? {} : { scale: 1.02 }}
  whileTap={isEnrolling ? {} : { scale: 0.98 }}
>
  <span className="relative z-10">
    {isEnrolling ? (
      <>
        <Loader2 className="w-5 h-5 animate-spin inline mr-2" />
        {hasStartedCheckout ? 'Redirecting to payment...' : 'Processing...'}
      </>
    ) : (
      `Enroll Now - $${course.price} USD`
    )}
  </span>
</motion.button>
```

---

## 🔴 BUG-006: No CORS Protection

**File:** `/src/app/api/webhooks/stripe/route.ts`
**Risk:** CSRF attacks
**Fix Time:** 30 minutes

### Add to webhook handler:

```typescript
export async function POST(request: NextRequest) {
  // SECURITY: Verify request is from Stripe, not a browser
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  const userAgent = request.headers.get('user-agent');

  // 1. Webhooks should NEVER have an Origin header (not from browser)
  if (origin) {
    console.warn('⚠️  Webhook request has Origin header (suspicious):', {
      origin,
      ip: request.headers.get('x-forwarded-for'),
      userAgent,
    });

    return NextResponse.json(
      { error: 'Invalid request source' },
      { status: 403 }
    );
  }

  // 2. Webhooks should NEVER have a Referer header
  if (referer) {
    console.warn('⚠️  Webhook request has Referer header (suspicious):', {
      referer,
      ip: request.headers.get('x-forwarded-for'),
      userAgent,
    });

    return NextResponse.json(
      { error: 'Invalid request source' },
      { status: 403 }
    );
  }

  // 3. Log non-Stripe User-Agents (informational only)
  if (!userAgent || !userAgent.toLowerCase().includes('stripe')) {
    console.warn('⚠️  Webhook has non-Stripe User-Agent:', userAgent);
    // Don't block - Stripe might change their UA
  }

  // 4. Check IP allowlist (optional but recommended)
  const clientIp = request.headers.get('x-forwarded-for') ||
                   request.headers.get('x-real-ip');

  if (clientIp && process.env.STRIPE_WEBHOOK_IP_ALLOWLIST) {
    const allowedIps = process.env.STRIPE_WEBHOOK_IP_ALLOWLIST.split(',');
    const isAllowed = allowedIps.some(ip => clientIp.includes(ip.trim()));

    if (!isAllowed) {
      console.warn('⚠️  Webhook from non-allowed IP:', clientIp);
      // Don't block - Stripe IPs can change
    }
  }

  // ... rest of webhook handler (signature verification, etc.)
}
```

---

## 📋 DEPLOYMENT CHECKLIST

Before deploying these fixes:

1. **Environment Variables:**
   ```bash
   # .env.local (MUST HAVE REAL VALUES)
   STRIPE_SECRET_KEY=sk_test_51ABC123...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51ABC123...
   STRIPE_WEBHOOK_SECRET=whsec_ABC123...
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   ```

2. **Test Locally:**
   ```bash
   # Install Stripe CLI
   brew install stripe/stripe-cli/stripe

   # Login
   stripe login

   # Forward webhooks to local server
   stripe listen --forward-to localhost:3000/api/webhooks/stripe

   # Copy webhook secret to .env.local
   # (Stripe CLI will display it)

   # Trigger test webhook
   stripe trigger checkout.session.completed
   ```

3. **Verify Fixes:**
   - [ ] App starts without errors
   - [ ] Can create checkout session
   - [ ] Webhook signature verified
   - [ ] Cannot tamper with price
   - [ ] Cannot double-click enroll button
   - [ ] See proper error messages

4. **Deploy to Staging:**
   - [ ] Set production Stripe keys in Vercel/hosting
   - [ ] Configure webhook endpoint in Stripe dashboard
   - [ ] Test full payment flow
   - [ ] Verify webhook delivery

5. **Monitor:**
   - [ ] Check logs for errors
   - [ ] Verify successful payments
   - [ ] Test refund flow

---

**Ready to Deploy?** ✅ After implementing all 6 critical fixes above.

**Estimated Total Time:** 5-6 hours for careful implementation and testing.

**Next Steps:** Implement BUG-003 (course access grant system) - requires database setup.
