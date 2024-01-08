'use server';

import { prisma } from '@/lib/db';
import {
  SafeCandidate,
  SafeCandidateWithPartyAndPositionAndElection,
} from '@/types';

interface IParams {
  candidateId?: string;
}

export async function getCandidates(): Promise<SafeCandidate[] | null> {
  try {
    const candidates = await prisma.candidate.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    const safeCandidates = candidates.map((item) => ({
      ...item,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    }));

    return safeCandidates;
  } catch (error) {
    return null;
  }
}

export async function getCandidatesWithPartyAndPositionAndElection(): Promise<
  SafeCandidateWithPartyAndPositionAndElection[] | null
> {
  try {
    const candidates = await prisma.candidate.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        party: {
          select: {
            name: true,
            position: {
              select: {
                name: true,
                election: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const safeCandidates = candidates.map((item) => ({
      ...item,
      partyName: item.party.name,
      positionName: item.party.position.name,
      electionName: item.party.position.election.name,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    }));

    return safeCandidates as SafeCandidateWithPartyAndPositionAndElection[];
  } catch (error) {
    return null;
  }
}

export async function getCandidateById(
  params: IParams,
): Promise<SafeCandidate | null> {
  try {
    const { candidateId } = params;

    const candidate = await prisma.candidate.findUnique({
      where: {
        id: candidateId,
      },
    });

    if (!candidate) {
      return null;
    }

    return {
      ...candidate,
      createdAt: candidate.createdAt.toISOString(),
      updatedAt: candidate.updatedAt.toISOString(),
    };
  } catch (error) {
    return null;
  }
}

export async function getCandidatesByPartyId(params: {
  partyId?: string;
}): Promise<SafeCandidate[] | null> {
  const { partyId } = params;

  try {
    const candidates = await prisma.candidate.findMany({
      where: {
        partyId,
      },
    });

    if (!candidates) {
      return null;
    }

    const safeCandidates = candidates.map((item) => ({
      ...item,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    }));

    return safeCandidates;
  } catch (error) {
    return null;
  }
}
