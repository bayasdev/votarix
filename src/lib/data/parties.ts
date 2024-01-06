'use server';

import { prisma } from '@/lib/db';
import { SafeParty, SafePartyWithPositionAndElection } from '@/types';

interface IParams {
  partyId?: string;
}

export async function getParties(): Promise<SafeParty[] | null> {
  try {
    const parties = await prisma.party.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    const safeParties = parties.map((item) => ({
      ...item,
      proposals: JSON.stringify(item.proposals),
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    }));

    return safeParties;
  } catch (error) {
    return null;
  }
}

export async function getPartiesWithPositionAndElection(): Promise<
  SafePartyWithPositionAndElection[] | null
> {
  try {
    const parties = await prisma.party.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
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
    });

    const safeParties = parties.map((item) => ({
      ...item,
      proposals: JSON.stringify(item.proposals),
      positionName: item.position.name,
      electionName: item.position.election.name,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    }));

    return safeParties;
  } catch (error) {
    return null;
  }
}

export async function getPartyById(params: IParams): Promise<SafeParty | null> {
  const { partyId } = params;

  try {
    const party = await prisma.party.findUnique({
      where: {
        id: partyId,
      },
    });

    if (!party) {
      return null;
    }

    return {
      ...party,
      proposals: JSON.stringify(party.proposals),
      createdAt: party.createdAt.toISOString(),
      updatedAt: party.updatedAt.toISOString(),
    };
  } catch (error) {
    return null;
  }
}
