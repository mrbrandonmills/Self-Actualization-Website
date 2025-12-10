'use client'

import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { getCourseBySlug, getTotalLessons, type Course } from '@/data/courses'
import { getLessonsByCourse, getLessonsByWeek } from '@/data/lessons'
import { getStripe } from '@/lib/stripe-client'
import {
  BookOpen,
  Clock,
  Award,
  ChevronDown,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  Loader2,
  Check,
  Users,
  Target,
  Brain,
} from 'lucide-react'

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

// Color mapping for blocks
const blockColors: Record<string, { primary: string; glow: string; bg: string }> = {
  A: { primary: '#22c55e', glow: 'rgba(34, 197, 94, 0.4)', bg: 'rgba(34, 197, 94, 0.1)' },
  B: { primary: '#3b82f6', glow: 'rgba(59, 130, 246, 0.4)', bg: 'rgba(59, 130, 246, 0.1)' },
  C: { primary: '#a855f7', glow: 'rgba(168, 85, 247, 0.4)', bg: 'rgba(168, 85, 247, 0.1)' },
}

export default function CourseDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const course = getCourseBySlug(slug)

  const [expandedWeeks, setExpandedWeeks] = useState<number[]>([1])
  const [isEnrolling, setIsEnrolling] = useState(false)

  if (!course) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">Course not found</h1>
          <Link href="/courses" className="text-[#C9A050] hover:underline">
            Back to courses
          </Link>
        </div>
      </div>
    )
  }

  const lessons = getLessonsByCourse(course.slug)
  const totalLessons = getTotalLessons(course)
  const colors = blockColors[course.blockType]

  const toggleWeek = (weekNumber: number) => {
    setExpandedWeeks((prev) =>
      prev.includes(weekNumber) ? prev.filter((w) => w !== weekNumber) : [...prev, weekNumber]
    )
  }

  const handleEnroll = async () => {
    setIsEnrolling(true)

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ course }),
      })

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      const { sessionId } = await response.json()
      const stripe = await getStripe()

      if (!stripe) {
        throw new Error('Stripe failed to load')
      }

      const { error } = await stripe.redirectToCheckout({ sessionId })
      if (error) throw error
    } catch (error) {
      console.error('Enrollment error:', error)
      alert('Failed to start enrollment. Please try again.')
      setIsEnrolling(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Film grain overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-6 overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[120px] opacity-20"
          style={{ background: colors.primary }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Back link */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Laboratory
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-[1fr,400px] gap-12">
            {/* Left column - Course info */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-6"
            >
              {/* Block badge */}
              <motion.div variants={fadeInUp}>
                <span
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                  style={{
                    background: colors.bg,
                    color: colors.primary,
                    border: `1px solid ${colors.primary}40`,
                  }}
                >
                  <Sparkles className="w-4 h-4" />
                  Block {course.blockType} - {course.level}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                variants={fadeInUp}
                className="text-4xl md:text-5xl font-serif text-white leading-tight"
              >
                {course.title}
              </motion.h1>

              {/* Description */}
              <motion.p variants={fadeInUp} className="text-lg text-white/70 leading-relaxed">
                {course.description}
              </motion.p>

              {/* Transformation promise */}
              <motion.div
                variants={fadeInUp}
                className="p-6 rounded-2xl bg-white/5 border border-white/10"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: colors.bg }}
                  >
                    <Target className="w-6 h-6" style={{ color: colors.primary }} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Transformation Promise</h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {course.transformationPromise}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Stats row */}
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-[#C9A050]" />
                  </div>
                  <div>
                    <div className="text-white font-medium">{course.weeks} Weeks</div>
                    <div className="text-white/50 text-sm">{course.lessonDuration} daily</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-[#C9A050]" />
                  </div>
                  <div>
                    <div className="text-white font-medium">{totalLessons} Lessons</div>
                    <div className="text-white/50 text-sm">{course.lessonsPerWeek} per week</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-[#C9A050]" />
                  </div>
                  <div>
                    <div className="text-white font-medium">AI Tutor</div>
                    <div className="text-white/50 text-sm">Personal guidance</div>
                  </div>
                </div>
              </motion.div>

              {/* Instructor */}
              <motion.div variants={fadeInUp} className="flex items-center gap-4 pt-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C9A050] to-[#8B7355] flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white/50 text-sm">Created by</div>
                  <div className="text-white font-medium">{course.instructor}</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right column - Enrollment card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:sticky lg:top-24 h-fit"
            >
              <div
                className="rounded-3xl p-8 backdrop-blur-xl border"
                style={{
                  background: 'rgba(5, 32, 31, 0.85)',
                  borderColor: 'rgba(201, 160, 80, 0.3)',
                  boxShadow: `0 0 40px rgba(201, 160, 80, 0.1), inset 0 0 40px rgba(201, 160, 80, 0.05)`,
                }}
              >
                {/* Price */}
                <div className="text-center mb-6">
                  <div className="text-5xl font-bold text-white mb-2">${course.price}</div>
                  <div className="text-white/50">One-time payment</div>
                </div>

                {/* Enroll button */}
                <button
                  onClick={handleEnroll}
                  disabled={isEnrolling}
                  className="w-full py-4 rounded-xl font-semibold text-lg transition-all relative overflow-hidden group disabled:opacity-70"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.primary}cc)`,
                    color: 'white',
                  }}
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                  <span className="relative flex items-center justify-center gap-2">
                    {isEnrolling ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        Begin Your Transformation
                      </>
                    )}
                  </span>
                </button>

                {/* Guarantee */}
                <p className="text-center text-white/40 text-sm mt-4">
                  30-day money-back guarantee
                </p>

                {/* Includes */}
                <div className="mt-8 pt-8 border-t border-white/10">
                  <h4 className="text-white font-semibold mb-4">This course includes:</h4>
                  <ul className="space-y-3">
                    {[
                      `${totalLessons} guided lessons`,
                      'AI Tutor for personalized support',
                      'Weekly integration sessions',
                      'Certificate of completion',
                      'Lifetime access',
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-white/70 text-sm">
                        <Check className="w-4 h-4 text-[#C9A050]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Learning Outcomes */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-serif text-white mb-4">What You'll Learn</h2>
            <p className="text-white/60">
              Master these transformative skills through guided practice and AI-powered support.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {course.learningOutcomes.map((outcome, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: colors.bg }}
                >
                  <Award className="w-5 h-5" style={{ color: colors.primary }} />
                </div>
                <p className="text-white/80">{outcome}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-16 px-6 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-serif text-white mb-4">Course Curriculum</h2>
            <p className="text-white/60">
              {course.weeks} weeks of transformative content, with 5 lessons per week plus weekly
              integration.
            </p>
          </motion.div>

          <div className="space-y-4">
            {course.weekStructure.map((week) => {
              const weekLessons = getLessonsByWeek(course.slug, week.weekNumber)
              const isExpanded = expandedWeeks.includes(week.weekNumber)

              return (
                <motion.div
                  key={week.weekNumber}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rounded-2xl overflow-hidden border border-white/10 bg-white/5"
                >
                  {/* Week header */}
                  <button
                    onClick={() => toggleWeek(week.weekNumber)}
                    className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center font-bold"
                        style={{ background: colors.bg, color: colors.primary }}
                      >
                        {week.weekNumber}
                      </div>
                      <div className="text-left">
                        <h3 className="text-white font-semibold">{week.title}</h3>
                        <p className="text-white/50 text-sm">{week.theme}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-white/40 text-sm">{week.lessonCount} lessons</span>
                      {isExpanded ? (
                        <ChevronDown className="w-5 h-5 text-white/40" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-white/40" />
                      )}
                    </div>
                  </button>

                  {/* Lessons */}
                  {isExpanded && weekLessons.length > 0 && (
                    <div className="border-t border-white/10">
                      {weekLessons.map((lesson, i) => (
                        <div
                          key={lesson.id}
                          className={`px-6 py-4 flex items-center justify-between ${
                            i !== weekLessons.length - 1 ? 'border-b border-white/5' : ''
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <span className="text-white/30 text-sm w-6">
                              {week.weekNumber}.{lesson.lessonNumber}
                            </span>
                            <div>
                              <h4 className="text-white/80 text-sm">{lesson.title}</h4>
                              {lesson.contentType === 'integration' && (
                                <span className="text-xs text-[#C9A050]">Weekly Integration</span>
                              )}
                            </div>
                          </div>
                          <span className="text-white/40 text-sm">{lesson.duration}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">
              Ready to Transform?
            </h2>
            <p className="text-white/60 mb-8">
              Join the laboratory and begin your journey of conscious evolution. Your AI tutor
              awaits.
            </p>
            <button
              onClick={handleEnroll}
              disabled={isEnrolling}
              className="px-12 py-4 rounded-xl font-semibold text-lg transition-all relative overflow-hidden group disabled:opacity-70"
              style={{
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.primary}cc)`,
                color: 'white',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative flex items-center justify-center gap-2">
                {isEnrolling ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Enroll for ${course.price}
                  </>
                )}
              </span>
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
