/**
 * Enrollment Success Page
 * Displayed after successful course purchase
 */

'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { courses } from '@/data/courses';

function EnrollmentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [courseId, setCourseId] = useState<string | null>(null);

  useEffect(() => {
    const session = searchParams.get('session_id');
    const course = searchParams.get('course_id');
    setSessionId(session);
    setCourseId(course);
  }, [searchParams]);

  const enrolledCourse = courseId ? courses.find(c => c.id === courseId) : null;

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
          ✨
        </motion.div>

        {/* Success Message */}
        <motion.h1
          className="success-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Enrollment Successful!
        </motion.h1>

        <motion.p
          className="success-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Welcome to the Laboratory of Life
        </motion.p>

        {/* Course Details */}
        {enrolledCourse && (
          <motion.div
            className="course-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="course-level-badge">
              {enrolledCourse.level}
            </div>
            <h2 className="course-title">{enrolledCourse.title}</h2>
            <p className="course-subtitle">{enrolledCourse.subtitle}</p>
            <div className="course-meta">
              <span>📚 {enrolledCourse.modules} Modules</span>
              <span>⏱️ {enrolledCourse.duration}</span>
            </div>
          </motion.div>
        )}

        {/* Next Steps */}
        <motion.div
          className="next-steps"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <h3>What's Next?</h3>
          <ul>
            <li>✉️ Check your email for course access details</li>
            <li>📖 Your course materials will be available within 24 hours</li>
            <li>🎓 Start your transformation journey!</li>
          </ul>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="action-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <Link href="/courses" className="button-secondary">
            Browse More Courses
          </Link>
          <Link href="/" className="button-primary">
            Return Home
          </Link>
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

      {/* Film Grain */}
      <div className="film-grain" />

      <style jsx global>{`
        /* Page Container */
        .success-page {
          min-height: 100vh;
          background: #05201f;
          padding: 8rem 1.5rem 4rem;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow-x: hidden;
        }

        .success-container {
          max-width: 800px;
          width: 100%;
          text-align: center;
        }

        /* Success Icon */
        .success-icon {
          font-size: 6rem;
          margin-bottom: 2rem;
        }

        /* Typography */
        .success-title {
          font-family: var(--font-serif, 'Playfair Display', serif);
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 300;
          color: #C9A050;
          letter-spacing: -0.02em;
          margin-bottom: 1rem;
        }

        .success-subtitle {
          font-size: clamp(1.125rem, 2vw, 1.5rem);
          color: rgba(245, 243, 239, 0.7);
          margin-bottom: 3rem;
        }

        /* Course Card */
        .course-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(201, 160, 80, 0.3);
          border-radius: 16px;
          padding: 2rem;
          margin-bottom: 3rem;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .course-level-badge {
          display: inline-block;
          padding: 0.5rem 1rem;
          background: rgba(201, 160, 80, 0.2);
          color: #C9A050;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          border-radius: 8px;
          margin-bottom: 1rem;
        }

        .course-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #f5f3ef;
          margin-bottom: 0.5rem;
        }

        .course-subtitle {
          font-size: 1rem;
          color: rgba(245, 243, 239, 0.6);
          margin-bottom: 1.5rem;
        }

        .course-meta {
          display: flex;
          justify-content: center;
          gap: 2rem;
          font-size: 0.875rem;
          color: #C9A050;
        }

        /* Next Steps */
        .next-steps {
          background: rgba(201, 160, 80, 0.1);
          border: 1px solid rgba(201, 160, 80, 0.2);
          border-radius: 12px;
          padding: 2rem;
          margin-bottom: 3rem;
          text-align: left;
        }

        .next-steps h3 {
          color: #C9A050;
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1rem;
          text-align: center;
        }

        .next-steps ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .next-steps li {
          color: #f5f3ef;
          font-size: 1rem;
          line-height: 2;
          padding-left: 0;
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
          padding: 1rem 2rem;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          text-decoration: none;
          display: inline-block;
        }

        .button-primary {
          background: linear-gradient(135deg, #C9A050, #d4af37);
          color: #05201f;
          border: none;
          box-shadow: 0 4px 20px rgba(201, 160, 80, 0.4);
        }

        .button-primary:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(201, 160, 80, 0.6);
        }

        .button-secondary {
          background: transparent;
          color: #C9A050;
          border: 2px solid #C9A050;
        }

        .button-secondary:hover {
          background: rgba(201, 160, 80, 0.1);
          transform: translateY(-2px);
        }

        /* Session ID */
        .session-id {
          font-size: 0.75rem;
          color: rgba(245, 243, 239, 0.4);
          font-family: monospace;
        }

        /* Film Grain */
        .film-grain {
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.03;
          pointer-events: none;
          z-index: 100;
          mix-blend-mode: overlay;
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
        background: '#05201f',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#C9A050'
      }}>
        Loading...
      </div>
    }>
      <EnrollmentSuccessContent />
    </Suspense>
  );
}
