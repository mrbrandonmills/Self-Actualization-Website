'use client';

import { useState, useEffect } from 'react';
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
  Play
} from 'lucide-react';
import { courses, getCourseBySlug } from '@/data/courses';
import { getLessonsByCourse, getLessonById } from '@/data/lessons';

// Simulated user data (replace with Supabase auth)
const mockUser = {
  id: 'user-123',
  name: 'Student',
  email: 'student@example.com',
  enrolledCourses: ['engineering-your-patterns'], // Simulated enrollments
  currentLesson: 'ep-2-3', // Last lesson in progress
  xp: {
    total: 350,
    level: 1,
    streakDays: 3,
    longestStreak: 7,
  },
  courseProgress: {
    'engineering-your-patterns': {
      completedLessons: 7,
      totalLessons: 30,
    }
  }
};

export default function DashboardPage() {
  const [user] = useState(mockUser);

  // Get enrolled courses with progress
  const enrolledCourses = user.enrolledCourses.map(slug => {
    const course = getCourseBySlug(slug);
    const progress = user.courseProgress[slug];
    return course ? { ...course, progress } : null;
  }).filter(Boolean);

  // Get current lesson
  const currentLesson = user.currentLesson ? getLessonById(user.currentLesson) : null;
  const currentCourse = currentLesson ? getCourseBySlug(currentLesson.courseSlug) : null;

  // XP calculations
  const xpForNextLevel = (user.xp.level) * 1000;
  const xpProgress = (user.xp.total % 1000) / 10; // Percentage toward next level

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
                  <p className="text-gold-400 font-medium">{user.xp.total} XP</p>
                  <p className="text-xs text-white/40">Level {user.xp.level}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500/10 border border-orange-500/20">
                <Flame className="w-5 h-5 text-orange-400" />
                <div>
                  <p className="text-orange-400 font-medium">{user.xp.streakDays} day streak</p>
                  <p className="text-xs text-white/40">Best: {user.xp.longestStreak}</p>
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
          {currentLesson && currentCourse && (
            <motion.section variants={itemVariants}>
              <h2 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                <Play className="w-5 h-5 text-gold-400" />
                Continue Learning
              </h2>
              <Link
                href={`/courses/${currentLesson.courseSlug}/lesson/${currentLesson.id}`}
                className="block"
              >
                <div className="relative p-6 rounded-2xl bg-gradient-to-br from-gold-500/10 to-transparent border border-gold-500/20 hover:border-gold-500/40 transition-all group overflow-hidden">
                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                  <div className="relative flex flex-col md:flex-row md:items-center gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-white/10 text-white/70">
                          {currentCourse.title}
                        </span>
                        <span className="text-white/40 text-sm">
                          Week {currentLesson.weekNumber}
                        </span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-serif text-white group-hover:text-gold-400 transition-colors">
                        {currentLesson.title}
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
                  {user.xp.total % 1000} / {1000} XP to Level {user.xp.level + 1}
                </p>
              </div>

              {/* Streak */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <Flame className="w-5 h-5 text-orange-400" />
                  <span className="text-white/50 text-sm">Current Streak</span>
                </div>
                <p className="text-2xl font-bold text-white">{user.xp.streakDays}</p>
                <p className="text-xs text-white/40">days in a row</p>
              </div>

              {/* Courses */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-5 h-5 text-purple-400" />
                  <span className="text-white/50 text-sm">Enrolled Courses</span>
                </div>
                <p className="text-2xl font-bold text-white">{enrolledCourses.length}</p>
                <p className="text-xs text-white/40">of 6 courses</p>
              </div>

              {/* Lessons Completed */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-5 h-5 text-green-400" />
                  <span className="text-white/50 text-sm">Lessons Complete</span>
                </div>
                <p className="text-2xl font-bold text-white">
                  {Object.values(user.courseProgress).reduce((sum, p) => sum + p.completedLessons, 0)}
                </p>
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
                {enrolledCourses.map((course: any) => {
                  const lessons = getLessonsByCourse(course.slug);
                  const progressPercent = course.progress
                    ? Math.round((course.progress.completedLessons / course.progress.totalLessons) * 100)
                    : 0;

                  const blockColors = {
                    A: { primary: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30' },
                    B: { primary: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
                    C: { primary: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' },
                  };
                  const colors = blockColors[course.blockType as keyof typeof blockColors];

                  return (
                    <Link
                      key={course.id}
                      href={`/courses/${course.slug}`}
                      className="block p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors.bg} ${colors.primary}`}>
                          Block {course.blockType}
                        </span>
                        <span className="text-white/40 text-sm">{course.weeks} weeks</span>
                      </div>

                      <h3 className="text-lg font-serif text-white group-hover:text-gold-400 transition-colors mb-2">
                        {course.title}
                      </h3>

                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-white/50">Progress</span>
                          <span className="text-white/70">{progressPercent}%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r from-gold-600 to-gold-400 transition-all`}
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/40">
                          {course.progress?.completedLessons || 0} / {lessons.length} lessons
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
                  // Simulate activity for past days
                  const isActive = i < user.xp.streakDays;
                  const isToday = i === 2; // Wednesday

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
