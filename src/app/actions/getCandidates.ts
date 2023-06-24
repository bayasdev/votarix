import prisma from '@/src/lib/prisma';
import { SafeCandidate } from '@/src/types';

export default async function getCandidates(): Promise<SafeCandidate[] | null> {
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
  } catch (error: any) {
    return null;
  }
}
