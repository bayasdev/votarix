'use server';

import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/lib/prisma';

import {
  ElectionData,
  ElectionResults,
  SafeElection,
  SafeElectionWithStatus,
  SafeElectionWithStatusAndCanVote,
} from '@/types';

interface IParams {
  electionId?: string;
}

export async function getElections(): Promise<SafeElectionWithStatus[] | null> {
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
      status: item.startTime < new Date() && item.endTime > new Date(),
    }));

    return safeElections;
  } catch (error: any) {
    return null;
  }
}

export async function getOngoingElections(): Promise<
  SafeElectionWithStatusAndCanVote[] | null
> {
  try {
    const currentUser = await getCurrentUser();

    const elections = await prisma.election.findMany({
      where: {
        startTime: {
          lt: new Date(),
        },
        endTime: {
          gt: new Date(),
        },
      },
      include: {
        ballots: {
          select: {
            userId: true,
          },
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
      status: item.startTime < new Date() && item.endTime > new Date(),
      canVote: !item.ballots.some(
        (ballot) => ballot.userId === currentUser?.id,
      ),
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

export async function getElectionDataById(
  params: IParams,
): Promise<ElectionData | null> {
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
              },
              orderBy: {
                party: {
                  name: 'asc',
                },
              },
            },
          },
          orderBy: {
            name: 'asc',
          },
        },
      },
    });

    if (!election) {
      return null;
    }

    const electionData: ElectionData = {
      id: election.id,
      name: election.name,
      description: election.description,
      startTime: election.startTime.toISOString(),
      endTime: election.endTime.toISOString(),
      positions: election.positions.map((position) => ({
        id: position.id,
        name: position.name,
        candidates: position.candidates.map((candidate) => ({
          id: candidate.id,
          name: candidate.name,
          imageUrl: candidate.imageUrl || '',
          party: {
            id: candidate.party.id,
            name: candidate.party.name,
            imageUrl: candidate.party.imageUrl || '',
          },
        })),
      })),
    };

    return electionData;
  } catch (error: any) {
    return null;
  }
}

export async function getElectionResultsById(
  params: IParams,
): Promise<ElectionResults | null> {
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
              orderBy: {
                party: {
                  name: 'asc',
                },
              },
            },
          },
          orderBy: {
            name: 'asc',
          },
        },
        voters: true,
      },
    });

    if (!election) {
      return null;
    }

    const electionResults: ElectionResults = {
      electionId: election.id,
      electionName: election.name,
      positions: election.positions.map((position) => ({
        id: position.id,
        name: position.name,
        candidates: position.candidates.map((candidate) => ({
          id: candidate.id,
          name: candidate.name,
          imageUrl: candidate.imageUrl || '',
          party: {
            id: candidate.party.id,
            name: candidate.party.name,
            imageUrl: candidate.party.imageUrl || '',
          },
          votes: candidate.ballots.length,
        })),
      })),
      registeredVoters: election.voters.length,
      totalVotes: election.positions.reduce(
        (acc, position) =>
          acc +
          position.candidates.reduce(
            (acc, candidate) => acc + candidate.ballots.length,
            0,
          ),
        0,
      ),
      updatedAt: new Date().toISOString(),
    };

    return electionResults;
  } catch (error) {
    return null;
  }
}
