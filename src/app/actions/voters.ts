'use server';

import prisma from '@/lib/prisma';
import { SafeUser } from '@/types';

export async function getElegibleVoters(params: {
  electionId?: string;
}): Promise<SafeUser[] | null> {
  const { electionId } = params;
  // where role is VOTER and not in electionId
  try {
    const voters = await prisma.user.findMany({
      where: {
        role: 'VOTER',
        elections: {
          none: {
            id: electionId,
          },
        },
      },
    });

    if (!voters) {
      return null;
    }

    const safeVoters = voters.map((item) => ({
      ...item,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
      emailVerified: item.emailVerified?.toISOString() || null,
      hashedPassword: null,
    }));

    return safeVoters;
  } catch (error: any) {
    return null;
  }
}

export async function getVotersByElectionId(params: {
  electionId?: string;
}): Promise<SafeUser[] | null> {
  try {
    const { electionId } = params;

    const voters = await prisma.election
      .findUnique({
        where: {
          id: electionId,
        },
      })
      .voters();

    if (!voters) {
      return null;
    }

    const safeVoters = voters.map((item) => ({
      ...item,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
      emailVerified: item.emailVerified?.toISOString() || null,
      hashedPassword: null,
    }));

    return safeVoters;
  } catch (error: any) {
    return null;
  }
}
