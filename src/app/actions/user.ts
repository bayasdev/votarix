'use server';

import prisma from '@/src/lib/prisma';
import { SafeUser } from '@/src/types';

interface IParams {
  userId?: string;
}

export async function getUsers(): Promise<SafeUser[] | null> {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    const safeUsers = users.map((item) => ({
      ...item,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
      emailVerified: item.emailVerified?.toISOString() || null,
      hashedPassword: null,
    }));

    return safeUsers;
  } catch () {
    return null;
  }
}

export async function getUserById(params: IParams): Promise<SafeUser | null> {
  try {
    const { userId } = params;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return null;
    }

    return {
      ...user,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
      emailVerified: user.emailVerified?.toISOString() || null,
      hashedPassword: null,
    };
  } catch () {
    return null;
  }
}
