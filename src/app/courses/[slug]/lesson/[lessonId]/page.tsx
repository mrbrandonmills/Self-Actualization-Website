'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Sparkles,
  CheckCircle2,
  Circle,
  MessageSquare,
  Volume2,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Award,
  Lock
} from 'lucide-react';
import { getCourseBySlug, getCoursesByBlock } from '@/data/courses';
import { getLessonsByCourse, getLessonById, getNextLesson, getPreviousLesson } from '@/data/lessons';

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const courseSlug = params.slug as string;
  const lessonId = params.lessonId as string;

  const [showTutor, setShowTutor] = useState(false);
  const [showCurriculum, setShowCurriculum] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [tutorMessages, setTutorMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [tutorInput, setTutorInput] = useState('');
  const [isTutorLoading, setIsTutorLoading] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState<boolean | null>(null);
  const [enrollmentLoading, setEnrollmentLoading] = useState(true);

  const course = getCourseBySlug(courseSlug);
  const allLessons = getLessonsByCourse(courseSlug);
  const lesson = getLessonById(lessonId);
  const nextLesson = lesson ? getNextLesson(lessonId, courseSlug) : null;
  const prevLesson = lesson ? getPreviousLesson(lessonId, courseSlug) : null;

  // Check enrollment status
  useEffect(() => {
    async function checkEnrollment() {
      if (status === 'loading') return;

      // First lesson is always free preview
      if (lesson?.isFreePreview) {
        setIsEnrolled(true);
        setEnrollmentLoading(false);
        return;
      }

      if (!session?.user) {
        setIsEnrolled(false);
        setEnrollmentLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/enrollment/check?courseSlug=${courseSlug}`);
        const data = await response.json();
        setIsEnrolled(data.enrolled);
      } catch (error) {
        console.error('Enrollment check error:', error);
        setIsEnrolled(false);
      } finally {
        setEnrollmentLoading(false);
      }
    }

    checkEnrollment();
  }, [session, status, courseSlug, lesson?.isFreePreview]);

  // Get lessons grouped by week
  const weekGroups = allLessons.reduce((acc, l) => {
    if (!acc[l.weekNumber]) acc[l.weekNumber] = [];
    acc[l.weekNumber].push(l);
    return acc;
  }, {} as Record<number, typeof allLessons>);

  // Block color
  const blockColors = {
    A: { primary: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30' },
    B: { primary: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
    C: { primary: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' },
  };
  const colors = blockColors[course?.blockType || 'A'];

  if (!course || !lesson) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif text-white mb-4">Lesson Not Found</h1>
          <Link href="/courses" className="text-gold-400 hover:underline">
            Return to Courses
          </Link>
        </div>
      </div>
    );
  }

  // Show loading while checking enrollment
  if (enrollmentLoading || status === 'loading') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Show enrollment required message
  if (!isEnrolled && !lesson.isFreePreview) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold-500/10 flex items-center justify-center">
            <Lock className="w-8 h-8 text-gold-500" />
          </div>
          <h1 className="text-2xl font-serif text-white mb-3">Enrollment Required</h1>
          <p className="text-white/60 mb-6">
            This lesson is part of <strong className="text-white">{course.title}</strong>.
            Enroll in the course to access all lessons and your personal AI tutor.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/courses/${courseSlug}`}
              className="px-6 py-3 bg-gradient-to-r from-gold-500 to-gold-400 text-black font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              View Course - ${course.price}
            </Link>
            {!session?.user && (
              <Link
                href={`/login?callbackUrl=/courses/${courseSlug}/lesson/${lessonId}`}
                className="px-6 py-3 border border-white/20 text-white rounded-lg hover:bg-white/5 transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
          {lesson.weekNumber === 1 && (
            <p className="mt-6 text-sm text-white/40">
              <Link href={`/courses/${courseSlug}/lesson/week-1-lesson-1`} className="text-gold-500 hover:underline">
                Preview the first lesson free
              </Link>
            </p>
          )}
        </div>
      </div>
    );
  }

  // Calculate progress
  const currentIndex = allLessons.findIndex(l => l.id === lessonId);
  const progress = ((currentIndex + 1) / allLessons.length) * 100;

  const handleComplete = async () => {
    setIsCompleted(true);
    // TODO: Call API to save progress and award XP
    // await completeLesson(userId, lessonId, course.id);
  };

  const sendTutorMessage = async () => {
    if (!tutorInput.trim() || isTutorLoading) return;

    const userMessage = tutorInput.trim();
    setTutorInput('');
    setTutorMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTutorLoading(true);

    // TODO: Call AI Tutor API with streaming
    // For now, simulate a response
    setTimeout(() => {
      setTutorMessages(prev => [...prev, {
        role: 'assistant',
        content: `That's a great question about "${lesson.title}". ${lesson.keyConcept}\n\nWould you like me to explore any aspect of this deeper?`
      }]);
      setIsTutorLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Top Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            href={`/courses/${courseSlug}`}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">{course.title}</span>
            <span className="sm:hidden">Back</span>
          </Link>

          {/* Progress Bar */}
          <div className="flex-1 max-w-xs mx-4">
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-500 to-gold-400"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-xs text-white/40 text-center mt-1">
              {currentIndex + 1} / {allLessons.length}
            </p>
          </div>

          <button
            onClick={() => setShowCurriculum(!showCurriculum)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white/60 hover:text-white"
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Curriculum</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`pt-20 pb-32 transition-all duration-300 ${showTutor ? 'lg:pr-[400px]' : ''}`}>
        <div className="max-w-3xl mx-auto px-4 py-8">
          {/* Week Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.primary}`}>
              Week {lesson.weekNumber}
            </span>
            <span className="flex items-center gap-1 text-white/40 text-sm">
              <Clock className="w-3.5 h-3.5" />
              {lesson.duration}
            </span>
            {lesson.contentType === 'integration' && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-400 text-xs">
                <Sparkles className="w-3 h-3" />
                Integration
              </span>
            )}
          </div>

          {/* Lesson Title */}
          <h1 className="text-3xl md:text-4xl font-serif text-white mb-2">
            {lesson.title}
          </h1>
          <p className="text-white/50 mb-8">
            Lesson {lesson.lessonNumber} of Week {lesson.weekNumber}
          </p>

          {/* XP Badge */}
          <div className="flex items-center gap-2 mb-8">
            <Award className={`w-5 h-5 ${isCompleted ? 'text-gold-400' : 'text-white/30'}`} />
            <span className={`text-sm ${isCompleted ? 'text-gold-400' : 'text-white/40'}`}>
              +{lesson.xpReward} XP {isCompleted && '(Earned!)'}
            </span>
          </div>

          {/* Key Concept Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 mb-8"
          >
            <div className="absolute top-0 left-6 -translate-y-1/2 px-3 py-1 bg-[#0a0a0a] text-gold-400 text-sm font-medium rounded-full border border-gold-500/30">
              Key Concept
            </div>
            <p className="text-lg text-white/90 leading-relaxed pt-2">
              {lesson.keyConcept}
            </p>
          </motion.div>

          {/* Practice Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative p-6 rounded-2xl bg-gradient-to-br from-gold-500/10 to-transparent border border-gold-500/20 mb-8"
          >
            <div className="absolute top-0 left-6 -translate-y-1/2 px-3 py-1 bg-[#0a0a0a] text-gold-400 text-sm font-medium rounded-full border border-gold-500/30">
              Practice
            </div>
            <p className="text-lg text-white/80 leading-relaxed pt-2">
              {lesson.practice}
            </p>
          </motion.div>

          {/* AI Tutor CTA */}
          {lesson.contentType === 'integration' && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => setShowTutor(true)}
              className="w-full p-6 rounded-2xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 hover:border-purple-400/50 transition-all group"
            >
              <div className="flex items-center justify-center gap-3">
                <MessageSquare className="w-6 h-6 text-purple-400 group-hover:scale-110 transition-transform" />
                <span className="text-lg text-white font-medium">Start AI Tutor Session</span>
              </div>
              <p className="text-white/50 text-sm mt-2">
                Guided reflection and integration with your personal AI tutor
              </p>
            </motion.button>
          )}

          {/* Completion Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-12"
          >
            {!isCompleted ? (
              <button
                onClick={handleComplete}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-gold-600 to-gold-500 text-black font-semibold text-lg hover:from-gold-500 hover:to-gold-400 transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                Mark as Complete
              </button>
            ) : (
              <div className="w-full py-4 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400 font-medium text-lg flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Completed! +{lesson.xpReward} XP Earned
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-white/5">
        <div className={`max-w-3xl mx-auto px-4 py-4 flex items-center justify-between transition-all ${showTutor ? 'lg:pr-[400px]' : ''}`}>
          {prevLesson ? (
            <Link
              href={`/courses/${courseSlug}/lesson/${prevLesson.id}`}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white/70 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
            </Link>
          ) : (
            <div />
          )}

          <button
            onClick={() => setShowTutor(!showTutor)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              showTutor
                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span className="hidden sm:inline">AI Tutor</span>
          </button>

          {nextLesson ? (
            <Link
              href={`/courses/${courseSlug}/lesson/${nextLesson.id}`}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gold-500/20 hover:bg-gold-500/30 transition-colors text-gold-400"
            >
              <span className="hidden sm:inline">Next Lesson</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <Link
              href={`/courses/${courseSlug}`}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 transition-colors text-green-400"
            >
              <span>Complete Course</span>
              <Award className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>

      {/* Curriculum Sidebar */}
      <AnimatePresence>
        {showCurriculum && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCurriculum(false)}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-[#0a0a0a] border-r border-white/10 z-50 overflow-y-auto"
            >
              <div className="p-4 border-b border-white/10 flex items-center justify-between sticky top-0 bg-[#0a0a0a]">
                <h2 className="text-lg font-serif text-white">Curriculum</h2>
                <button
                  onClick={() => setShowCurriculum(false)}
                  className="p-2 rounded-lg hover:bg-white/5 transition-colors text-white/60"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 space-y-4">
                {Object.entries(weekGroups).map(([week, lessons]) => (
                  <div key={week} className="space-y-2">
                    <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider">
                      Week {week}
                    </h3>
                    {lessons.map((l) => (
                      <Link
                        key={l.id}
                        href={`/courses/${courseSlug}/lesson/${l.id}`}
                        onClick={() => setShowCurriculum(false)}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                          l.id === lessonId
                            ? 'bg-gold-500/20 border border-gold-500/30'
                            : 'hover:bg-white/5'
                        }`}
                      >
                        {l.id === lessonId ? (
                          <Circle className="w-4 h-4 text-gold-400 fill-gold-400" />
                        ) : (
                          <Circle className="w-4 h-4 text-white/30" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm truncate ${l.id === lessonId ? 'text-white' : 'text-white/70'}`}>
                            {l.title}
                          </p>
                          <p className="text-xs text-white/40">{l.duration}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* AI Tutor Panel */}
      <AnimatePresence>
        {showTutor && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTutor(false)}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full sm:w-[400px] bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col"
            >
              {/* Tutor Header */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-white font-medium">AI Tutor</h2>
                    <p className="text-xs text-white/50">Guided reflection</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg hover:bg-white/5 transition-colors text-white/60">
                    <Volume2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setShowTutor(false)}
                    className="p-2 rounded-lg hover:bg-white/5 transition-colors text-white/60"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {tutorMessages.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mx-auto mb-4">
                      <MessageSquare className="w-8 h-8 text-purple-400" />
                    </div>
                    <h3 className="text-white font-medium mb-2">Welcome to your AI Tutor session</h3>
                    <p className="text-white/50 text-sm max-w-xs mx-auto">
                      Ask questions about today's lesson, or share your thoughts on the practice exercise.
                    </p>
                  </div>
                )}

                {tutorMessages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] p-3 rounded-2xl ${
                      msg.role === 'user'
                        ? 'bg-gold-500/20 text-white rounded-br-sm'
                        : 'bg-white/5 text-white/90 rounded-bl-sm'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </motion.div>
                ))}

                {isTutorLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white/5 rounded-2xl rounded-bl-sm px-4 py-3">
                      <div className="flex gap-1">
                        <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-2 h-2 bg-white/40 rounded-full" />
                        <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }} className="w-2 h-2 bg-white/40 rounded-full" />
                        <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }} className="w-2 h-2 bg-white/40 rounded-full" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-white/10">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tutorInput}
                    onChange={(e) => setTutorInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendTutorMessage()}
                    placeholder="Ask your AI tutor..."
                    className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 transition-colors"
                  />
                  <button
                    onClick={sendTutorMessage}
                    disabled={!tutorInput.trim() || isTutorLoading}
                    className="px-4 py-3 rounded-xl bg-purple-500 hover:bg-purple-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ArrowRight className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
