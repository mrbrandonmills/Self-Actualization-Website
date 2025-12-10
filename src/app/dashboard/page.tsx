'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  BookOpen,
  Flame,
  Award,
  ChevronRight,
  Clock,
  Sparkles,
  Target,
  Trophy,
  BarChart3,
  Calendar,
  Play,
  Loader2
} from 'lucide-react';

interface DashboardData {
  user: {
    id: string;
    name: string;
    email: string;
  };
  xp: {
    total: number;
    level: number;
    streakDays: number;
    longestStreak: number;
  };
  enrolledCourses: Array<{
    courseId: string;
    courseSlug: string;
    courseTitle: string;
    bookSource: string;
    weeks: number;
    completedLessons: number;
    totalLessons: number;
    progressPercent: number;
  }>;
  currentLesson: {
    lessonId: string;
    lessonSlug: string;
    lessonTitle: string;
    courseSlug: string;
    courseTitle: string;
    weekNumber: number;
    keyConcept: string;
    duration: string;
    xpReward: number;
  } | null;
  stats: {
    totalEnrolled: number;
    totalCompleted: number;
  };
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/dashboard');
      return;
    }

    if (status === 'authenticated') {
      fetchDashboardData();
    }
  }, [status, router]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/dashboard');
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }
      const data = await response.json();
      setDashboardData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-gold-400 animate-spin mx-auto mb-4" />
          <p className="text-white/50">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="px-4 py-2 bg-gold-500 text-black rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return null;
  }

  const { user, xp, enrolledCourses, currentLesson, stats } = dashboardData;

  // XP calculations
  const xpForNextLevel = xp.level * 1000;
  const xpProgress = (xp.total % 1000) / 10;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Block type colors
  const getBlockColors = (bookSource: string) => {
    const blockMap: Record<string, { primary: string; bg: string; border: string; label: string }> = {
      'BLOCK_A': { primary: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30', label: 'Block A' },
      'BLOCK_B': { primary: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30', label: 'Block B' },
      'BLOCK_C': { primary: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30', label: 'Block C' },
    };
    return blockMap[bookSource] || blockMap['BLOCK_A'];
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-serif text-white">
                Welcome back, {user.name}
              </h1>
              <p className="text-white/50 mt-1">Continue your self-actualization journey</p>
            </div>

            {/* XP Badge */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gold-500/10 border border-gold-500/20">
                <Trophy className="w-5 h-5 text-gold-400" />
                <div>
                  <p className="text-gold-400 font-medium">{xp.total} XP</p>
                  <p className="text-xs text-white/40">Level {xp.level}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500/10 border border-orange-500/20">
                <Flame className="w-5 h-5 text-orange-400" />
                <div>
                  <p className="text-orange-400 font-medium">{xp.streakDays} day streak</p>
                  <p className="text-xs text-white/40">Best: {xp.longestStreak}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-8"
        >
          {/* Continue Learning Section */}
          {currentLesson && (
            <motion.section variants={itemVariants}>
              <h2 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                <Play className="w-5 h-5 text-gold-400" />
                Continue Learning
              </h2>
              <Link
                href={`/courses/${currentLesson.courseSlug}/lesson/${currentLesson.lessonSlug}`}
                className="block"
              >
                <div className="relative p-6 rounded-2xl bg-gradient-to-br from-gold-500/10 to-transparent border border-gold-500/20 hover:border-gold-500/40 transition-all group overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                  <div className="relative flex flex-col md:flex-row md:items-center gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-white/10 text-white/70">
                          {currentLesson.courseTitle}
                        </span>
                        <span className="text-white/40 text-sm">
                          Week {currentLesson.weekNumber}
                        </span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-serif text-white group-hover:text-gold-400 transition-colors">
                        {currentLesson.lessonTitle}
                      </h3>
                      <p className="text-white/50 mt-2 line-clamp-2">{currentLesson.keyConcept}</p>
                      <div className="flex items-center gap-4 mt-4">
                        <span className="flex items-center gap-1 text-sm text-white/40">
                          <Clock className="w-4 h-4" />
                          {currentLesson.duration}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-gold-400">
                          <Award className="w-4 h-4" />
                          +{currentLesson.xpReward} XP
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gold-500 group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-black ml-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.section>
          )}

          {/* Stats Grid */}
          <motion.section variants={itemVariants}>
            <h2 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-400" />
              Your Progress
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Level Progress */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <Trophy className="w-5 h-5 text-gold-400" />
                  <span className="text-white/50 text-sm">Level Progress</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-gradient-to-r from-gold-600 to-gold-400"
                    style={{ width: `${xpProgress}%` }}
                  />
                </div>
                <p className="text-xs text-white/40">
                  {xp.total % 1000} / 1000 XP to Level {xp.level + 1}
                </p>
              </div>

              {/* Streak */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <Flame className="w-5 h-5 text-orange-400" />
                  <span className="text-white/50 text-sm">Current Streak</span>
                </div>
                <p className="text-2xl font-bold text-white">{xp.streakDays}</p>
                <p className="text-xs text-white/40">days in a row</p>
              </div>

              {/* Courses */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-5 h-5 text-purple-400" />
                  <span className="text-white/50 text-sm">Enrolled Courses</span>
                </div>
                <p className="text-2xl font-bold text-white">{stats.totalEnrolled}</p>
                <p className="text-xs text-white/40">of 6 courses</p>
              </div>

              {/* Lessons Completed */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-5 h-5 text-green-400" />
                  <span className="text-white/50 text-sm">Lessons Complete</span>
                </div>
                <p className="text-2xl font-bold text-white">{stats.totalCompleted}</p>
                <p className="text-xs text-white/40">total lessons</p>
              </div>
            </div>
          </motion.section>

          {/* Enrolled Courses */}
          <motion.section variants={itemVariants}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-purple-400" />
                My Courses
              </h2>
              <Link
                href="/courses"
                className="text-sm text-gold-400 hover:underline flex items-center gap-1"
              >
                Browse all courses
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {enrolledCourses.length === 0 ? (
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center">
                <BookOpen className="w-12 h-12 text-white/20 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No courses yet</h3>
                <p className="text-white/50 mb-4">Start your self-actualization journey today</p>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold-500 text-black font-medium hover:bg-gold-400 transition-colors"
                >
                  Browse Courses
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {enrolledCourses.map((course) => {
                  const colors = getBlockColors(course.bookSource);

                  return (
                    <Link
                      key={course.courseId}
                      href={`/courses/${course.courseSlug}`}
                      className="block p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors.bg} ${colors.primary}`}>
                          {colors.label}
                        </span>
                        <span className="text-white/40 text-sm">{course.weeks} weeks</span>
                      </div>

                      <h3 className="text-lg font-serif text-white group-hover:text-gold-400 transition-colors mb-2">
                        {course.courseTitle}
                      </h3>

                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-white/50">Progress</span>
                          <span className="text-white/70">{course.progressPercent}%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-gold-600 to-gold-400 transition-all"
                            style={{ width: `${course.progressPercent}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/40">
                          {course.completedLessons} / {course.totalLessons} lessons
                        </span>
                        <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-gold-400 group-hover:translate-x-1 transition-all" />
                      </div>
                    </Link>
                  );
                })}

                {/* Add More Courses Card */}
                <Link
                  href="/courses"
                  className="flex flex-col items-center justify-center p-8 rounded-xl border-2 border-dashed border-white/10 hover:border-gold-500/30 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:bg-gold-500/10 transition-colors">
                    <Sparkles className="w-6 h-6 text-white/40 group-hover:text-gold-400 transition-colors" />
                  </div>
                  <span className="text-white/50 group-hover:text-white transition-colors">Add more courses</span>
                </Link>
              </div>
            )}
          </motion.section>

          {/* Weekly Activity */}
          <motion.section variants={itemVariants}>
            <h2 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-green-400" />
              This Week
            </h2>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="grid grid-cols-7 gap-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                  const isActive = i < xp.streakDays;
                  const isToday = i === new Date().getDay() - 1; // Adjust for Monday start

                  return (
                    <div key={day} className="text-center">
                      <p className="text-xs text-white/40 mb-2">{day}</p>
                      <div
                        className={`w-10 h-10 mx-auto rounded-lg flex items-center justify-center ${
                          isToday
                            ? 'bg-gold-500/20 border border-gold-500/30'
                            : isActive
                              ? 'bg-green-500/20 border border-green-500/30'
                              : 'bg-white/5 border border-white/10'
                        }`}
                      >
                        {isActive ? (
                          <Flame className={`w-5 h-5 ${isToday ? 'text-gold-400' : 'text-green-400'}`} />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-white/20" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-center text-white/40 text-sm mt-4">
                Complete a lesson today to keep your streak going!
              </p>
            </div>
          </motion.section>
        </motion.div>
      </main>
    </div>
  );
}
