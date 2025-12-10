/**
 * Admin Account Seed Script
 * Creates admin accounts for Brandon and Jesse with full course access
 *
 * Run: npm run db:seed:admins
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Admin accounts to create
const adminAccounts = [
  {
    email: 'brandonflexy@gmail.com',
    name: 'Brandon Mills',
    password: 'SelfActualize2025!', // Secure password - change after first login
  },
  {
    email: 'jesseadoherty@gmail.com',
    name: 'Jesse Doherty',
    password: 'SelfActualize2025!', // Secure password - change after first login
  },
];

async function seedAdmins() {
  console.log('🔐 Seeding admin accounts...\n');

  for (const admin of adminAccounts) {
    try {
      // Hash password
      const passwordHash = await bcrypt.hash(admin.password, 12);

      // Upsert user (create or update)
      const user = await prisma.user.upsert({
        where: { email: admin.email },
        update: {
          role: 'ADMIN',
          name: admin.name,
          passwordHash,
        },
        create: {
          email: admin.email,
          name: admin.name,
          passwordHash,
          role: 'ADMIN',
          isActive: true,
        },
      });

      // Ensure UserXP record exists
      await prisma.userXP.upsert({
        where: { userId: user.id },
        update: {},
        create: {
          userId: user.id,
          totalXp: 0,
          currentLevel: 1,
          streakDays: 0,
          longestStreak: 0,
        },
      });

      console.log(`✅ Admin created: ${admin.name} (${admin.email})`);
      console.log(`   Role: ADMIN`);
      console.log(`   Password: ${admin.password}\n`);
    } catch (error) {
      console.error(`❌ Failed to create admin ${admin.email}:`, error);
    }
  }

  console.log('\n📋 Admin accounts summary:');
  console.log('═══════════════════════════════════════════════════');
  console.log('| Email                      | Password             |');
  console.log('═══════════════════════════════════════════════════');
  for (const admin of adminAccounts) {
    console.log(`| ${admin.email.padEnd(26)} | ${admin.password.padEnd(20)} |`);
  }
  console.log('═══════════════════════════════════════════════════');
  console.log('\n⚠️  Please change these passwords after first login!');
  console.log('🔑 Admin users have full access to all courses without enrollment.\n');
}

seedAdmins()
  .then(() => {
    console.log('✨ Admin seeding complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
