'use server';

import prisma from '@/src/lib/prisma';
import { SafeCandidate } from '@/src/types';

interface IParams {
  candidateId?: string;
}

export async function getCandidates(): Promise<SafeCandidate[] | null> {
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

export async function getCandidateById(
  params: IParams,
): Promise<SafeCandidate | null> {
  try {
    const { candidateId } = params;

    const candidate = await prisma.candidate.findUnique({
      where: {
        id: candidateId,
      },
    });

    if (!candidate) {
      return null;
    }

    return {
      ...candidate,
      createdAt: candidate.createdAt.toISOString(),
      updatedAt: candidate.updatedAt.toISOString(),
    };
  } catch (error: any) {
    return null;
  }
}
