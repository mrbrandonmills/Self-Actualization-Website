/**
 * Reset Admin Progress Script
 * Clears all fake lesson progress for admin accounts
 * Keeps enrollments so they can access courses, but removes progress
 *
 * Run: npm run db:reset:admin-progress
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const adminEmails = [
  'brandonflexy@gmail.com',
  'jesseadoherty@gmail.com',
];

async function resetAdminProgress() {
  console.log('🧹 Resetting admin progress data...\n');

  for (const email of adminEmails) {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, name: true, email: true },
    });

    if (!user) {
      console.log(`⚠️ User not found: ${email}`);
      continue;
    }

    console.log(`👤 Processing ${user.name || email}...`);

    // Delete all lesson progress
    const deletedProgress = await prisma.lessonProgress.deleteMany({
      where: { userId: user.id },
    });
    console.log(`   🗑️  Deleted ${deletedProgress.count} lesson progress records`);

    // Delete all tutor conversations
    const deletedConversations = await prisma.tutorConversation.deleteMany({
      where: { userId: user.id },
    });
    console.log(`   🗑️  Deleted ${deletedConversations.count} tutor conversations`);

    // Reset XP to fresh start
    await prisma.userXP.update({
      where: { userId: user.id },
      data: {
        totalXp: 0,
        currentLevel: 1,
        streakDays: 0,
        longestStreak: 0,
        lastActivityDate: null,
      },
    });
    console.log(`   ✨ Reset XP to 0, Level 1, 0 day streak`);

    // Keep enrollments - they still have access to all courses
    const enrollments = await prisma.enrollment.count({
      where: { userId: user.id, status: 'ACTIVE' },
    });
    console.log(`   ✅ Kept ${enrollments} course enrollments (full access)`);

    console.log('');
  }

  console.log('═══════════════════════════════════════════════════');
  console.log('✨ Admin progress reset complete!');
  console.log('═══════════════════════════════════════════════════');
  console.log('\nYour accounts now have:');
  console.log('• Full enrollment in all 6 courses');
  console.log('• 0 XP / Level 1 / 0 day streak');
  console.log('• No lesson progress - start fresh!');
  console.log('• No tutor conversation history');
  console.log('\nYou can now take the courses as a real student!');
}

resetAdminProgress()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error('Reset failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
