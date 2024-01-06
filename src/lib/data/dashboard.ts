'use server';

import { prisma } from '@/lib/db';
import { DashboardDataResponse } from '@/types';

export async function getDashboardData(): Promise<DashboardDataResponse | null> {
  try {
    const totalUsers = await prisma.user.count();
    const totalElections = await prisma.election.count();
    const totalActiveElections = await prisma.election.count({
      where: {
        startsAt: {
          lte: new Date(),
        },
        endsAt: {
          gte: new Date(),
        },
      },
    });
    const totalCandidates = await prisma.candidate.count();
    const totalParties = await prisma.party.count();
    const totalCertificates = await prisma.certificate.count();

    return {
      totalUsers,
      totalElections,
      totalActiveElections,
      totalCandidates,
      totalParties,
      totalCertificates,
    };
  } catch (error) {
    return null;
  }
}
