/**
 * Enrollment Check API
 * Checks if current user is enrolled in a course
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ enrolled: false });
    }

    const searchParams = request.nextUrl.searchParams;
    const courseSlug = searchParams.get('courseSlug');

    if (!courseSlug) {
      return NextResponse.json(
        { error: 'courseSlug is required' },
        { status: 400 }
      );
    }

    // Find course by slug
    const course = await prisma.course.findUnique({
      where: { slug: courseSlug },
      select: { id: true },
    });

    if (!course) {
      return NextResponse.json({ enrolled: false });
    }

    // Check for active enrollment
    const enrollment = await prisma.enrollment.findFirst({
      where: {
        userId: session.user.id,
        courseId: course.id,
        status: 'ACTIVE',
      },
    });

    return NextResponse.json({ enrolled: !!enrollment });
  } catch (error) {
    console.error('Enrollment check error:', error);
    return NextResponse.json(
      { error: 'Failed to check enrollment' },
      { status: 500 }
    );
  }
}
