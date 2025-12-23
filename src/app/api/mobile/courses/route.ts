/**
 * Mobile Courses API
 * Returns list of courses for the mobile app
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET || 'fallback-secret-change-me'
);

// Helper to get user ID from token
async function getUserIdFromToken(request: NextRequest): Promise<string | null> {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  try {
    const token = authHeader.split(' ')[1];
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload.id as string;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserIdFromToken(request);

    // Get all courses
    const courses = await prisma.course.findMany({
      where: { published: true },
      include: {
        lessons: {
          orderBy: { order: 'asc' },
          select: {
            id: true,
            title: true,
            description: true,
            order: true,
            durationMinutes: true,
            videoUrl: true,
            isPreview: true,
          },
        },
        _count: {
          select: { lessons: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Get user enrollments if logged in
    let enrollments: Record<string, boolean> = {};
    if (userId) {
      const userEnrollments = await prisma.enrollment.findMany({
        where: {
          userId,
          status: 'ACTIVE',
        },
        select: {
          courseId: true,
        },
      });
      enrollments = Object.fromEntries(
        userEnrollments.map((e) => [e.courseId, true])
      );
    }

    // Format response
    const formattedCourses = courses.map((course) => ({
      id: course.id,
      slug: course.slug,
      title: course.title,
      description: course.description,
      imageUrl: course.imageUrl,
      instructor: course.instructor,
      lessonCount: course._count.lessons,
      durationMinutes: course.lessons.reduce(
        (sum, lesson) => sum + (lesson.durationMinutes || 0),
        0
      ),
      difficulty: course.difficulty || 'beginner',
      themeColor: course.themeColor || 'gold',
      price: course.price ? Number(course.price) : null,
      isFree: !course.price || Number(course.price) === 0,
      isEnrolled: enrollments[course.id] || false,
      lessons: course.lessons.map((lesson) => ({
        id: lesson.id,
        title: lesson.title,
        description: lesson.description,
        order: lesson.order,
        durationMinutes: lesson.durationMinutes || 0,
        videoUrl: enrollments[course.id] || lesson.isPreview ? lesson.videoUrl : null,
        isPreview: lesson.isPreview || false,
      })),
    }));

    return NextResponse.json(formattedCourses);
  } catch (error) {
    console.error('Get courses error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}
