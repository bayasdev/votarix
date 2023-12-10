'use server';

import { getCurrentUser } from '@/lib/session';
import { prisma } from '@/lib/db';

import {
  ElectionData,
  ElectionResults,
  SafeElection,
  SafeElectionWithStatus,
} from '@/types';
import { ElectionStatus } from '@/constants';

export interface IParams {
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
      status:
        item.startTime > new Date()
          ? ElectionStatus.NOT_STARTED
          : item.endTime > new Date()
            ? ElectionStatus.ONGOING
            : ElectionStatus.FINISHED,
    }));

    return safeElections;
  } catch (error) {
    return null;
  }
}

export async function getFinishedElections(): Promise<SafeElection[] | null> {
  try {
    const elections = await prisma.election.findMany({
      where: {
        endTime: {
          lt: new Date(),
        },
      },
      orderBy: {
        endTime: 'desc',
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
  } catch (error) {
    return null;
  }
}

export async function getAvailableElectionsForCurrentUser(): Promise<
  SafeElection[] | null
> {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return null;
    }

    const elections = await prisma.election.findMany({
      where: {
        startTime: {
          lt: new Date(),
        },
        endTime: {
          gt: new Date(),
        },
        voters: {
          some: {
            id: currentUser?.id,
          },
        },
        certificates: {
          none: {
            userId: currentUser?.id,
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
    }));

    return safeElections;
  } catch (error) {
    return null;
  }
}

export async function getElectionById(
  params: IParams,
): Promise<SafeElection | null> {
  const { electionId } = params;

  try {
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
  } catch (error) {
    return null;
  }
}

export async function getElectionDataById(
  params: IParams,
): Promise<ElectionData | null> {
  const { electionId } = params;

  try {
    const election = await prisma.election.findUnique({
      where: {
        id: electionId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        startTime: true,
        endTime: true,
        positions: {
          select: {
            id: true,
            name: true,
            candidates: {
              select: {
                id: true,
                name: true,
                imageUrl: true,
                party: {
                  select: {
                    id: true,
                    name: true,
                    imageUrl: true,
                  },
                },
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
  } catch (error) {
    return null;
  }
}

export async function getElectionResultsById(
  params: IParams,
  showOnlyCompleted: boolean = false,
): Promise<ElectionResults | null> {
  const { electionId } = params;

  try {
    const election = await prisma.election.findUnique({
      where: {
        id: electionId,
        endTime: showOnlyCompleted ? { lt: new Date() } : undefined,
      },
      include: {
        _count: {
          select: {
            certificates: true,
            voters: true,
          },
        },
      },
    });

    if (!election) {
      return null;
    }

    const totalVoters = election._count?.voters || 0;
    const totalVotes = election._count?.certificates || 0;
    const absentVoters = totalVoters - totalVotes;
    const absentPercentage = (absentVoters / totalVoters) * 100;

    const positions = await prisma.position.findMany({
      where: {
        electionId: election.id,
      },
      include: {
        candidates: {
          include: {
            _count: {
              select: {
                ballots: true,
              },
            },
            party: true,
          },
        },
        ballots: true,
      },
    });

    const electionResults: ElectionResults = {
      electionId: election.id,
      electionName: election.name,
      startTime: election.startTime.toISOString(),
      endTime: election.endTime.toISOString(),
      // TODO: implement
      positions: positions.map((position) => ({
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
          votes: candidate._count?.ballots || 0,
          // percentage is relative to validVotes
          percentage:
            ((candidate._count?.ballots || 0) /
              (position.ballots.filter(
                (ballot) => !ballot.isNull && ballot.candidateId,
              ).length || 1)) *
            100,
        })),
        // validVotes where ballot.isNull = false and ballot.candidateId != null
        validVotes: position.ballots.filter(
          (ballot) => !ballot.isNull && ballot.candidateId,
        ).length,
        // nullVotes where ballot.isNull = true
        nullVotes: position.ballots.filter((ballot) => ballot.isNull).length,
        // blankVotes where ballot.candidateId = null and ballot.isNull = false
        blankVotes: position.ballots.filter(
          (ballot) => !ballot.candidateId && !ballot.isNull,
        ).length,
      })),
      totalVoters,
      totalVotes,
      absentVoters,
      absentPercentage,
      status:
        election.startTime > new Date()
          ? ElectionStatus.NOT_STARTED
          : election.endTime > new Date()
            ? ElectionStatus.ONGOING
            : ElectionStatus.FINISHED,
      updatedAt: new Date().toISOString(),
    };

    return electionResults;
  } catch (error) {
    return null;
  }
}
