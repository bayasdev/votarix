import { getServerSession } from 'next-auth/next';

import { SafeUser } from '@/types';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export const runtime = 'edge';

export default async function getCurrentUser(): Promise<SafeUser | null> {
  'use server';

  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
      hashedPassword: null,
    };
  } catch (error) {
    return null;
  }
}
