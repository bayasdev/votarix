'use server';

import { getCurrentUser } from '@/lib/session';
import { prisma } from '@/lib/db';

import {
  SafeElection,
  SafeElectionWithStatus,
  ElectionDataResponse,
  ElectionResultsResponse,
  ElectionProposalsResponse,
} from '@/types';
import { ElectionStatus } from '@/constants';

export interface IParams {
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
      startsAt: item.startsAt.toISOString(),
      endsAt: item.endsAt.toISOString(),
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    }));

    return safeElections;
  } catch (error) {
    return null;
  }
}

export async function getElectionsWithStatus(): Promise<
  SafeElectionWithStatus[] | null
> {
  try {
    const elections = await prisma.election.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    const safeElections = elections.map((item) => ({
      ...item,
      startsAt: item.startsAt.toISOString(),
      endsAt: item.endsAt.toISOString(),
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
      status:
        item.startsAt > new Date()
          ? ElectionStatus.NOT_STARTED
          : item.endsAt > new Date()
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
        endsAt: {
          lt: new Date(),
        },
        isCompleted: true,
      },
      orderBy: {
        endsAt: 'desc',
      },
    });

    const safeElections = elections.map((item) => ({
      ...item,
      startsAt: item.startsAt.toISOString(),
      endsAt: item.endsAt.toISOString(),
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
        startsAt: {
          lt: new Date(),
        },
        endsAt: {
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
      startsAt: item.startsAt.toISOString(),
      endsAt: item.endsAt.toISOString(),
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
      startsAt: election.startsAt.toISOString(),
      endsAt: election.endsAt.toISOString(),
      createdAt: election.createdAt.toISOString(),
      updatedAt: election.updatedAt.toISOString(),
    };
  } catch (error) {
    return null;
  }
}

export async function getElectionDataById(
  params: IParams,
): Promise<ElectionDataResponse | null> {
  const { electionId } = params;

  try {
    const election = await prisma.election.findUnique({
      where: {
        id: electionId,
      },
      include: {
        positions: {
          select: {
            id: true,
            name: true,
            parties: {
              select: {
                id: true,
                name: true,
                imageKey: true,
                imageUrl: true,
                candidates: {
                  select: {
                    id: true,
                    name: true,
                    imageKey: true,
                    imageUrl: true,
                    type: true,
                  },
                },
              },
              orderBy: {
                name: 'asc',
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

    const toReturn: ElectionDataResponse = {
      id: election.id,
      name: election.name,
      description: election.description,
      startsAt: election.startsAt.toISOString(),
      endsAt: election.endsAt.toISOString(),
      positions: election.positions.map((position) => ({
        id: position.id,
        name: position.name,
        parties: position.parties.map((party) => ({
          id: party.id,
          name: party.name,
          imageKey: party.imageKey as string,
          imageUrl: party.imageUrl as string,
          candidates: party.candidates.map((candidate) => ({
            id: candidate.id,
            name: candidate.name,
            imageKey: candidate.imageKey as string,
            imageUrl: candidate.imageUrl as string,
            type: candidate.type,
          })),
        })),
      })),
    };

    return toReturn;
  } catch (error) {
    return null;
  }
}

export async function getElectionProposalsById(
  params: IParams,
): Promise<ElectionProposalsResponse | null> {
  const { electionId } = params;

  try {
    const data = await prisma.election.findUnique({
      where: {
        id: electionId,
      },
      include: {
        positions: {
          select: {
            id: true,
            name: true,
            parties: {
              select: {
                id: true,
                name: true,
                imageKey: true,
                imageUrl: true,
                candidates: {
                  select: {
                    id: true,
                    name: true,
                    imageKey: true,
                    imageUrl: true,
                    type: true,
                  },
                },
                proposals: true,
              },
              orderBy: {
                name: 'asc',
              },
            },
          },
          orderBy: {
            name: 'asc',
          },
        },
      },
    });

    if (!data) {
      return null;
    }

    const toReturn: ElectionProposalsResponse = {
      id: data.id,
      name: data.name,
      positions: data.positions.map((position) => ({
        id: position.id,
        name: position.name,
        parties: position.parties.map((party) => ({
          id: party.id,
          name: party.name,
          imageKey: party.imageKey as string,
          imageUrl: party.imageUrl as string,
          candidates: party.candidates.map((candidate) => ({
            id: candidate.id,
            name: candidate.name,
            imageKey: candidate.imageKey as string,
            imageUrl: candidate.imageUrl as string,
            type: candidate.type,
          })),
          proposals: JSON.stringify(party.proposals || []),
        })),
      })),
    };

    return toReturn;
  } catch (error) {
    return null;
  }
}

export async function getElectionResultsById(
  params: IParams,
  showOnlyCompleted: boolean = false,
): Promise<ElectionResultsResponse | null> {
  const { electionId } = params;

  try {
    const data = await prisma.election.findUnique({
      where: {
        id: electionId,
        endsAt: showOnlyCompleted ? { lte: new Date() } : undefined,
        isCompleted: showOnlyCompleted ? true : undefined,
      },
      include: {
        positions: {
          select: {
            id: true,
            name: true,
            parties: {
              select: {
                id: true,
                name: true,
                imageKey: true,
                imageUrl: true,
                candidates: {
                  select: {
                    id: true,
                    name: true,
                    imageKey: true,
                    imageUrl: true,
                    type: true,
                  },
                },
                _count: {
                  select: {
                    votes: true,
                  },
                },
              },
              orderBy: {
                name: 'asc',
              },
            },
            votes: true,
          },
        },
        _count: {
          select: {
            certificates: true,
            voters: true,
          },
        },
      },
    });

    if (!data) {
      return null;
    }

    const totalVoters = data._count.voters || 0;
    const totalAbsentVoters = totalVoters - (data._count.certificates || 0);

    const electionResults: ElectionResultsResponse = {
      id: data.id,
      name: data.name,
      description: data.description,
      startsAt: data.startsAt.toISOString(),
      endsAt: data.endsAt.toISOString(),
      positions: data.positions.map((position) => ({
        id: position.id,
        name: position.name,
        parties: position.parties.map((party) => ({
          id: party.id,
          name: party.name,
          imageKey: party.imageKey as string,
          imageUrl: party.imageUrl as string,
          candidates: party.candidates.map((candidate) => ({
            id: candidate.id,
            name: candidate.name,
            imageKey: candidate.imageKey as string,
            imageUrl: candidate.imageUrl as string,
            type: candidate.type,
          })),
          totalVotes: party._count.votes,
          percentage: party._count.votes / position.votes.length,
        })),
        totalVotes: position.votes.length,
        // validVotes where vote.isNull === false and vote.partyId !== null
        totalValidVotes: position.votes.filter(
          (vote) => !vote.isNull && vote.partyId !== null,
        ).length,
        // nullVotes where vote.isNull === true
        totalNullVotes: position.votes.filter((vote) => vote.isNull).length,
        // blankVotes where vote.isNull === false and vote.partyId === null
        totalBlankVotes: position.votes.filter(
          (vote) => !vote.isNull && vote.partyId === null,
        ).length,
      })),
      totalVoters,
      totalAbsentVoters,
    };

    return electionResults;
  } catch (error) {
    return null;
  }
}
