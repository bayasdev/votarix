'use server';

import { prisma } from '@/lib/db';

import { CertificateResponse, SafeUser, SafeUserWithHasVoted } from '@/types';
import { getCurrentUser } from '@/lib/session';

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
      hashedPassword: '',
    }));

    return safeVoters;
  } catch (error) {
    return null;
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
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
      emailVerified: item.emailVerified?.toISOString() || null,
      hashedPassword: null,
      hasVoted: item._count.certificates > 0,
    }));

    return safeVoters;
  } catch (error) {
    return null;
  }
}

export async function getVoterCertificates(): Promise<
  CertificateResponse[] | null
> {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return null;
    }

    const certificates = await prisma.certificate.findMany({
      where: {
        userId: currentUser.id,
      },
      include: {
        election: true,
      },
    });

    if (!certificates) {
      return null;
    }

    return certificates.map((item) => ({
      id: item.id,
      electionName: item.election.name,
      voterName: currentUser.name || '',
      voterDocument: currentUser.document || '',
    }));
  } catch (error) {
    return null;
  }
}
