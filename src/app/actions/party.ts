'use server';

import prisma from '@/src/lib/db';
import { SafeParty } from '@/src/types';

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
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    }));

    return safeParties;
  } catch (error: any) {
    return null;
  }
}

export async function getPartyById(params: IParams): Promise<SafeParty | null> {
  try {
    const { partyId } = params;

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
      createdAt: party.createdAt.toISOString(),
      updatedAt: party.updatedAt.toISOString(),
    };
  } catch (error: any) {
    return null;
  }
}
