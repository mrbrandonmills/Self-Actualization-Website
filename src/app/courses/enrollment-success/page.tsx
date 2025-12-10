/**
 * Enrollment Success Page
 * Displayed after successful course purchase
 */

'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { courses, courseBundle, getCourseBySlug } from '@/data/courses';

function EnrollmentSuccessContent() {
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [courseSlug, setCourseSlug] = useState<string | null>(null);
  const [isBundle, setIsBundle] = useState(false);

  useEffect(() => {
    const sessionParam = searchParams.get('session_id');
    const slugParam = searchParams.get('course_slug');
    const bundleParam = searchParams.get('bundle');

    setSessionId(sessionParam);
    setCourseSlug(slugParam);
    setIsBundle(bundleParam === 'true');
  }, [searchParams]);

  const enrolledCourse = courseSlug ? getCourseBySlug(courseSlug) : null;
  const isNewUser = !session?.user;

  return (
    <main className="success-page">
      <motion.div
        className="success-container"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Success Icon */}
        <motion.div
          className="success-icon"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.2,
            type: 'spring',
            stiffness: 200,
            damping: 15
          }}
        >
          <svg className="w-24 h-24 text-[#C9A050]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </motion.div>

        {/* Success Message */}
        <motion.h1
          className="success-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {isBundle ? 'Bundle Enrolled!' : 'Enrollment Successful!'}
        </motion.h1>

        <motion.p
          className="success-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {isBundle
            ? 'Welcome to the Complete Laboratory Collection'
            : 'Welcome to the Laboratory of Life'}
        </motion.p>

        {/* Bundle Details */}
        {isBundle && (
          <motion.div
            className="bundle-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <h2 className="bundle-title">{courseBundle.title}</h2>
            <p className="bundle-description">{courseBundle.description}</p>
            <div className="bundle-courses">
              {courseBundle.courseIds.map((slug, i) => {
                const course = getCourseBySlug(slug);
                return course ? (
                  <div key={slug} className="bundle-course-item">
                    <span className="bundle-course-icon">{course.icon}</span>
                    <span>{course.title}</span>
                  </div>
                ) : null;
              })}
            </div>
          </motion.div>
        )}

        {/* Single Course Details */}
        {enrolledCourse && !isBundle && (
          <motion.div
            className="course-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="course-icon">{enrolledCourse.icon}</div>
            <div className="course-level-badge">
              {enrolledCourse.level}
            </div>
            <h2 className="course-title">{enrolledCourse.title}</h2>
            <p className="course-description">{enrolledCourse.description?.slice(0, 150)}...</p>
            <div className="course-meta">
              <span>{enrolledCourse.weeks} Weeks</span>
              <span>{enrolledCourse.lessonsPerWeek * enrolledCourse.weeks} Lessons</span>
              <span>{enrolledCourse.lessonDuration} per lesson</span>
            </div>
          </motion.div>
        )}

        {/* New User Prompt */}
        {isNewUser && (
          <motion.div
            className="new-user-prompt"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.8 }}
          >
            <h3>Create Your Account</h3>
            <p>Set up your account to access your course and track your progress.</p>
            <Link href="/signup" className="signup-button">
              Create Account
            </Link>
          </motion.div>
        )}

        {/* Next Steps */}
        <motion.div
          className="next-steps"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <h3>What&apos;s Next?</h3>
          <ul>
            <li>
              <span className="step-icon">1</span>
              <span>{isNewUser ? 'Create your account to get started' : 'Go to your dashboard to start learning'}</span>
            </li>
            <li>
              <span className="step-icon">2</span>
              <span>Choose your AI tutor voice in onboarding</span>
            </li>
            <li>
              <span className="step-icon">3</span>
              <span>Begin your first lesson and earn XP!</span>
            </li>
          </ul>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="action-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {session?.user ? (
            <>
              <Link href="/dashboard" className="button-primary">
                Go to Dashboard
              </Link>
              {enrolledCourse && (
                <Link href={`/courses/${enrolledCourse.slug}/lesson/week-1-lesson-1`} className="button-secondary">
                  Start First Lesson
                </Link>
              )}
            </>
          ) : (
            <>
              <Link href="/signup" className="button-primary">
                Create Account
              </Link>
              <Link href="/login" className="button-secondary">
                Already Have Account? Sign In
              </Link>
            </>
          )}
        </motion.div>

        {/* Session ID (for debugging) */}
        {sessionId && (
          <motion.p
            className="session-id"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            Order ID: {sessionId.slice(0, 24)}...
          </motion.p>
        )}
      </motion.div>

      {/* Background Gradient */}
      <div className="bg-gradient" />

      <style jsx global>{`
        /* Page Container */
        .success-page {
          min-height: 100vh;
          background: #0a0a0a;
          padding: 8rem 1.5rem 4rem;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow-x: hidden;
        }

        .bg-gradient {
          position: fixed;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(201, 160, 80, 0.15) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .success-container {
          max-width: 700px;
          width: 100%;
          text-align: center;
          position: relative;
          z-index: 1;
        }

        /* Success Icon */
        .success-icon {
          margin-bottom: 2rem;
          display: flex;
          justify-content: center;
        }

        .success-icon svg {
          width: 80px;
          height: 80px;
          color: #C9A050;
        }

        /* Typography */
        .success-title {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 400;
          color: white;
          letter-spacing: -0.02em;
          margin-bottom: 0.75rem;
        }

        .success-subtitle {
          font-size: clamp(1rem, 2vw, 1.25rem);
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 2.5rem;
        }

        /* Course Card */
        .course-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(201, 160, 80, 0.2);
          border-radius: 16px;
          padding: 2rem;
          margin-bottom: 2rem;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .course-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .course-level-badge {
          display: inline-block;
          padding: 0.375rem 0.75rem;
          background: rgba(201, 160, 80, 0.15);
          color: #C9A050;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          border-radius: 6px;
          margin-bottom: 1rem;
        }

        .course-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: white;
          margin-bottom: 0.75rem;
        }

        .course-description {
          font-size: 0.9375rem;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 1.25rem;
          line-height: 1.6;
        }

        .course-meta {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          font-size: 0.875rem;
          color: #C9A050;
        }

        /* Bundle Card */
        .bundle-card {
          background: linear-gradient(135deg, rgba(201, 160, 80, 0.1) 0%, rgba(201, 160, 80, 0.05) 100%);
          border: 1px solid rgba(201, 160, 80, 0.3);
          border-radius: 16px;
          padding: 2rem;
          margin-bottom: 2rem;
        }

        .bundle-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #C9A050;
          margin-bottom: 0.5rem;
        }

        .bundle-description {
          font-size: 0.9375rem;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 1.5rem;
        }

        .bundle-courses {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }

        .bundle-course-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .bundle-course-icon {
          font-size: 1.25rem;
        }

        /* New User Prompt */
        .new-user-prompt {
          background: linear-gradient(135deg, rgba(201, 160, 80, 0.15) 0%, rgba(201, 160, 80, 0.05) 100%);
          border: 1px solid rgba(201, 160, 80, 0.3);
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 2rem;
        }

        .new-user-prompt h3 {
          color: #C9A050;
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .new-user-prompt p {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9375rem;
          margin-bottom: 1rem;
        }

        .signup-button {
          display: inline-block;
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #C9A050, #D4AF37);
          color: black;
          font-weight: 600;
          border-radius: 8px;
          text-decoration: none;
          transition: opacity 0.2s;
        }

        .signup-button:hover {
          opacity: 0.9;
        }

        /* Next Steps */
        .next-steps {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          text-align: left;
        }

        .next-steps h3 {
          color: white;
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 1rem;
          text-align: center;
        }

        .next-steps ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .next-steps li {
          display: flex;
          align-items: center;
          gap: 1rem;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.9375rem;
        }

        .step-icon {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(201, 160, 80, 0.2);
          color: #C9A050;
          border-radius: 50%;
          font-size: 0.75rem;
          font-weight: 600;
          flex-shrink: 0;
        }

        /* Action Buttons */
        .action-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }

        .button-primary,
        .button-secondary {
          padding: 0.875rem 1.75rem;
          border-radius: 8px;
          font-size: 0.9375rem;
          font-weight: 600;
          transition: all 0.2s;
          text-decoration: none;
          display: inline-block;
        }

        .button-primary {
          background: linear-gradient(135deg, #C9A050, #D4AF37);
          color: black;
          border: none;
        }

        .button-primary:hover {
          opacity: 0.9;
          transform: translateY(-2px);
        }

        .button-secondary {
          background: transparent;
          color: #C9A050;
          border: 1px solid #C9A050;
        }

        .button-secondary:hover {
          background: rgba(201, 160, 80, 0.1);
        }

        /* Session ID */
        .session-id {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.3);
          font-family: monospace;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .success-page {
            padding: 6rem 1rem 3rem;
          }

          .course-meta {
            flex-direction: column;
            gap: 0.5rem;
          }

          .bundle-courses {
            grid-template-columns: 1fr;
          }

          .action-buttons {
            flex-direction: column;
          }

          .button-primary,
          .button-secondary {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
}

export default function EnrollmentSuccessPage() {
  return (
    <Suspense fallback={
      <div style={{
        minHeight: '100vh',
        background: '#0a0a0a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#C9A050'
      }}>
        <div style={{
          width: '32px',
          height: '32px',
          border: '2px solid #C9A050',
          borderTopColor: 'transparent',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <style jsx>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    }>
      <EnrollmentSuccessContent />
    </Suspense>
  );
}
