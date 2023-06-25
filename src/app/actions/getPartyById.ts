'use server';

import prisma from '@/src/lib/db';
import { SafeParty } from '@/src/types';

interface IParams {
  partyId?: string;
}

export default async function getPartyById(
  params: IParams,
): Promise<SafeParty | null> {
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
