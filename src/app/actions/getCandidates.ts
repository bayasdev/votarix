import { Candidate, Role } from '@prisma/client';

import prisma from '@/src/lib/prisma';
import getCurrentUser from './getCurrentUser';
import { SafeCandidate } from '@/src/types';

export default async function getCandidates(): Promise<SafeCandidate[] | null> {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== Role.ADMIN) {
      return null;
    }

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
  } catch (error: any) {
    return null;
  }
}
