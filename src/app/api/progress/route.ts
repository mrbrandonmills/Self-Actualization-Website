/**
 * Progress API
 * Handles lesson completion and progress tracking using Prisma
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

// GET /api/progress?courseId=xxx
export async function GET(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id;
  const searchParams = request.nextUrl.searchParams;
  const courseId = searchParams.get('courseId');

  try {
    // Get progress records
    const whereClause: { userId: string; courseId?: string } = { userId };
    if (courseId) {
      whereClause.courseId = courseId;
    }

    const progress = await prisma.lessonProgress.findMany({
      where: whereClause,
      include: {
        lesson: {
          select: {
            id: true,
            title: true,
            slug: true,
            orderIndex: true,
          },
        },
      },
    });

    // Get user XP
    const xpData = await prisma.userXP.findUnique({
      where: { userId },
    });

    // Calculate summary
    const completedLessons = progress.filter(p => p.status === 'COMPLETED').length;
    const totalTimeSpent = progress.reduce((acc, p) => acc + p.timeSpentSeconds, 0);

    return NextResponse.json({
      progress,
      xp: xpData ?? { totalXp: 0, currentLevel: 1, streakDays: 0 },
      summary: {
        completedLessons,
        totalTimeSpentMinutes: Math.round(totalTimeSpent / 60),
      },
    });
  } catch (error) {
    console.error('Progress API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/progress - Mark lesson as completed
export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const body = await request.json();
    const { lessonId, courseId, timeSpentSeconds = 0 } = body;

    if (!lessonId || !courseId) {
      return NextResponse.json(
        { error: 'lessonId and courseId are required' },
        { status: 400 }
      );
    }

    // Check if already completed
    const existing = await prisma.lessonProgress.findUnique({
      where: {
        userId_lessonId: { userId, lessonId },
      },
    });

    const wasAlreadyCompleted = existing?.status === 'COMPLETED';

    // Upsert progress
    const progressData = await prisma.lessonProgress.upsert({
      where: {
        userId_lessonId: { userId, lessonId },
      },
      create: {
        userId,
        lessonId,
        courseId,
        status: 'COMPLETED',
        timeSpentSeconds,
        completedAt: new Date(),
      },
      update: {
        status: 'COMPLETED',
        timeSpentSeconds,
        completedAt: new Date(),
      },
    });

    // Award XP only if not already completed
    let xpAwarded = 0;
    if (!wasAlreadyCompleted) {
      xpAwarded = 50;

      // Update user XP
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const userXp = await prisma.userXP.findUnique({
        where: { userId },
      });

      if (userXp) {
        const lastActivity = userXp.lastActivityDate
          ? new Date(userXp.lastActivityDate)
          : null;

        let newStreakDays = userXp.streakDays;

        if (lastActivity) {
          const yesterday = new Date(today);
          yesterday.setDate(yesterday.getDate() - 1);

          if (lastActivity.getTime() === yesterday.getTime()) {
            // Consecutive day
            newStreakDays = userXp.streakDays + 1;
          } else if (lastActivity.getTime() < yesterday.getTime()) {
            // Streak broken
            newStreakDays = 1;
          }
          // Same day = keep streak
        } else {
          newStreakDays = 1;
        }

        const newTotalXp = userXp.totalXp + xpAwarded;
        const newLevel = Math.floor(newTotalXp / 1000) + 1;

        await prisma.userXP.update({
          where: { userId },
          data: {
            totalXp: newTotalXp,
            currentLevel: newLevel,
            streakDays: newStreakDays,
            longestStreak: Math.max(userXp.longestStreak, newStreakDays),
            lastActivityDate: today,
          },
        });
      } else {
        // Create XP record if it doesn't exist
        await prisma.userXP.create({
          data: {
            userId,
            totalXp: xpAwarded,
            currentLevel: 1,
            streakDays: 1,
            longestStreak: 1,
            lastActivityDate: today,
          },
        });
      }
    }

    // Get updated XP
    const xpData = await prisma.userXP.findUnique({
      where: { userId },
    });

    return NextResponse.json({
      success: true,
      progress: progressData,
      xpAwarded,
      xp: xpData ?? { totalXp: 0, currentLevel: 1, streakDays: 0 },
    });
  } catch (error) {
    console.error('Progress API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PATCH /api/progress - Update progress (e.g., time spent)
export async function PATCH(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const body = await request.json();
    const { lessonId, status, timeSpentSeconds } = body;

    if (!lessonId) {
      return NextResponse.json({ error: 'lessonId is required' }, { status: 400 });
    }

    const updateData: Record<string, unknown> = {};
    if (status) updateData.status = status;
    if (timeSpentSeconds !== undefined) updateData.timeSpentSeconds = timeSpentSeconds;

    const data = await prisma.lessonProgress.update({
      where: {
        userId_lessonId: { userId, lessonId },
      },
      data: updateData,
    });

    return NextResponse.json({ success: true, progress: data });
  } catch (error) {
    console.error('Progress API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
