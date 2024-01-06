'use server';

import { prisma } from '@/lib/db';

import { SafeUser, SafeUserWithHasVoted } from '@/types';
import { getCurrentUser } from '@/lib/session';

interface IParams {
  electionId?: string;
}

export async function getCanCurrentUserVote(params: IParams): Promise<boolean> {
  const { electionId } = params;

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return false;
  }

  try {
    const canVote = await prisma.election.findUnique({
      where: {
        id: electionId,
        // check if user is a voter and is enrolled in election
        voters: {
          some: {
            id: currentUser.id,
            role: 'VOTER',
          },
        },
        // check if election is ongoing
        startsAt: {
          lt: new Date(),
        },
        endsAt: {
          gt: new Date(),
        },
        isCompleted: false,
        // check if user has voted
        certificates: {
          none: {
            userId: currentUser.id,
          },
        },
      },
    });

    if (!canVote) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
}

export async function getVotersByElectionId(
  params: IParams,
): Promise<SafeUserWithHasVoted[] | null> {
  const { electionId } = params;

  try {
    const voters = await prisma.user.findMany({
      where: {
        role: 'VOTER',
        elections: {
          some: {
            id: electionId,
          },
        },
      },
      include: {
        _count: {
          select: {
            certificates: {
              where: {
                electionId,
              },
            },
          },
        },
      },
    });

    if (!voters) {
      return null;
    }

    const safeVoters = voters.map((item) => ({
      ...item,
      hashedPassword: '',
      hasVoted: item._count.certificates > 0,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    }));

    return safeVoters;
  } catch (error) {
    return null;
  }
}

export async function getElegibleVotersByElectionId(
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
      hashedPassword: '',
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    }));

    return safeVoters;
  } catch (error) {
    return null;
  }
}
