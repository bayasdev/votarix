'use server';

import prisma from '@/src/lib/db';
import { SafeParty } from '@/src/types';

export default async function getParties(): Promise<SafeParty[] | null> {
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
