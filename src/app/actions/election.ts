'use server';

import prisma from '@/lib/prisma';
import { ElectionResult, SafeElection } from '@/types';

interface IParams {
  electionId?: string;
}

export async function getElections(): Promise<SafeElection[] | null> {
  try {
    const elections = await prisma.election.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    const safeElections = elections.map((item) => ({
      ...item,
      startTime: item.startTime.toISOString(),
      endTime: item.endTime.toISOString(),
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    }));

    return safeElections;
  } catch (error: any) {
    return null;
  }
}

export async function getOngoingElections(): Promise<SafeElection[] | null> {
  try {
    const elections = await prisma.election.findMany({
      where: {
        startTime: {
          lt: new Date(),
        },
        endTime: {
          gt: new Date(),
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const safeElections = elections.map((item) => ({
      ...item,
      startTime: item.startTime.toISOString(),
      endTime: item.endTime.toISOString(),
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    }));

    return safeElections;
  } catch (error: any) {
    return null;
  }
}

export async function getElectionById(
  params: IParams,
): Promise<SafeElection | null> {
  try {
    const { electionId } = params;

    const election = await prisma.election.findUnique({
      where: {
        id: electionId,
      },
    });

    if (!election) {
      return null;
    }

    return {
      ...election,
      startTime: election.startTime.toISOString(),
      endTime: election.endTime.toISOString(),
      createdAt: election.createdAt.toISOString(),
      updatedAt: election.updatedAt.toISOString(),
    };
  } catch (error: any) {
    return null;
  }
}

export async function getElectionResultsById(
  params: IParams,
): Promise<ElectionResult[] | null> {
  try {
    const { electionId } = params;

    const election = await prisma.election.findUnique({
      where: {
        id: electionId,
      },
      include: {
        positions: {
          include: {
            candidates: {
              include: {
                party: true,
                ballots: true,
              },
            },
          },
        },
      },
    });

    if (!election) {
      return null;
    }

    const electionResult: ElectionResult[] = [];

    election.positions.forEach((position) => {
      position.candidates.forEach((candidate) => {
        const voteCount = candidate.ballots.length;

        electionResult.push({
          electionId: election.id,
          positionName: position.name,
          candidateName: candidate.name,
          candidateImageUrl: candidate.imageUrl || '',
          partyName: candidate.party.name,
          partyImageUrl: candidate.party?.imageUrl || '',
          voteCount,
        });
      });
    });

    return electionResult;
  } catch (error) {
    return null;
  }
}
