'use server';

import prisma from '@/lib/prisma';

import { SafeUser } from '@/types';
import getCurrentUser from '@/app/actions/getCurrentUser';

interface IParams {
  electionId?: string;
}

export async function getCanUserVote(params: IParams): Promise<boolean> {
  const { electionId } = params;

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return false;
  }

  try {
    const election = await prisma.election.findFirst({
      where: {
        id: electionId,
        voters: {
          some: {
            id: currentUser.id,
            role: 'VOTER',
          },
        },
        startTime: {
          lt: new Date(),
        },
        endTime: {
          gt: new Date(),
        },
        ballots: {
          none: {
            userId: currentUser.id,
          },
        },
      },
    });

    if (!election) {
      return false;
    }

    return true;
  } catch (error: any) {
    return false;
  }
}

export async function getElegibleVoters(
  params: IParams,
): Promise<SafeUser[] | null> {
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

export async function getVotersByElectionId(
  params: IParams,
): Promise<SafeUser[] | null> {
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
