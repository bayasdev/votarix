'use server';

import { prisma } from '@/lib/db';
import { SafeUser } from '@/types';

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
      hashedPassword: '',
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    }));

    return safeUsers;
  } catch (error) {
    return null;
  }
}

export async function getUserById(params: IParams): Promise<SafeUser | null> {
  const { userId } = params;

  try {
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
      hashedPassword: '',
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  } catch (error) {
    return null;
  }
}
