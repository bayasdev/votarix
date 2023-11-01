'use server';

import prisma from '@/lib/prisma';
import { DashboardData } from '@/types';

export async function getDashboardData(): Promise<DashboardData | null> {
  try {
    const totalUsers = await prisma.user.count();
    const totalElections = await prisma.election.count();
    const totalActiveElections = await prisma.election.count({
      where: {
        startTime: {
          lte: new Date(),
        },
        endTime: {
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
