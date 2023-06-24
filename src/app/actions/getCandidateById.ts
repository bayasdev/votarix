import prisma from '@/src/lib/prisma';
import { SafeCandidate } from '@/src/types';

interface IParams {
  candidateId?: string;
}

export default async function getCandidateById(
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
