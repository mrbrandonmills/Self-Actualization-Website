/**
 * Dashboard API
 * Fetches user's dashboard data including enrollments, progress, and XP
 */

import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch user with all related data
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        userXp: true,
        enrollments: {
          where: { status: 'ACTIVE' },
          include: {
            course: {
              include: {
                lessons: {
                  select: { id: true },
                },
              },
            },
          },
        },
        lessonProgress: {
          include: {
            lesson: true,
            course: true,
          },
          orderBy: { updatedAt: 'desc' },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Calculate progress for each enrolled course
    const enrolledCourses = user.enrollments.map((enrollment) => {
      const courseProgress = user.lessonProgress.filter(
        (p) => p.courseId === enrollment.courseId
      );
      const completedLessons = courseProgress.filter(
        (p) => p.status === 'COMPLETED'
      ).length;
      const totalLessons = enrollment.course.lessons.length;

      return {
        courseId: enrollment.course.id,
        courseSlug: enrollment.course.slug,
        courseTitle: enrollment.course.title,
        bookSource: enrollment.course.bookSource,
        weeks: enrollment.course.durationWeeks,
        completedLessons,
        totalLessons,
        progressPercent: totalLessons > 0
          ? Math.round((completedLessons / totalLessons) * 100)
          : 0,
      };
    });

    // Find current/next lesson to continue
    const inProgressLesson = user.lessonProgress.find(
      (p) => p.status === 'IN_PROGRESS'
    );

    let currentLesson = null;
    if (inProgressLesson) {
      currentLesson = {
        lessonId: inProgressLesson.lesson.id,
        lessonSlug: inProgressLesson.lesson.slug,
        lessonTitle: inProgressLesson.lesson.title,
        courseSlug: inProgressLesson.course.slug,
        courseTitle: inProgressLesson.course.title,
        weekNumber: Math.floor(inProgressLesson.lesson.orderIndex / 5) + 1,
        keyConcept: inProgressLesson.lesson.content?.substring(0, 150) || '',
        duration: `${inProgressLesson.lesson.durationMinutes} min`,
        xpReward: 50,
      };
    }

    // XP data
    const xp = user.userXp || {
      totalXp: 0,
      currentLevel: 1,
      streakDays: 0,
      longestStreak: 0,
    };

    // Calculate total completed lessons
    const totalCompletedLessons = user.lessonProgress.filter(
      (p) => p.status === 'COMPLETED'
    ).length;

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name || 'Student',
        email: user.email,
      },
      xp: {
        total: xp.totalXp,
        level: xp.currentLevel,
        streakDays: xp.streakDays,
        longestStreak: xp.longestStreak,
      },
      enrolledCourses,
      currentLesson,
      stats: {
        totalEnrolled: enrolledCourses.length,
        totalCompleted: totalCompletedLessons,
      },
    });
  } catch (error) {
    console.error('Dashboard API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}
