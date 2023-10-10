'use server';

import prisma from '@/lib/prisma';
import { SafePosition, SafePositionWithElection } from '@/types';

interface IParams {
  positionId?: string;
}

export async function getPositions(): Promise<
  SafePositionWithElection[] | null
> {
  try {
    const positions = await prisma.position.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    const safePositions = positions.map((item) => ({
      ...item,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    }));

    return safePositions;
  } catch (error: any) {
    return null;
  }
}

export async function getPositionsWithElection(): Promise<
  SafePositionWithElection[] | null
> {
  try {
    const positions = await prisma.position.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        election: true,
      },
    });

    const safePositions = positions.map((item) => ({
      ...item,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
      election: {
        ...item.election,
        startTime: item?.election?.startTime.toISOString(),
        endTime: item?.election?.endTime.toISOString(),
        createdAt: item?.election?.createdAt.toISOString(),
        updatedAt: item?.election?.updatedAt.toISOString(),
      },
    }));

    return safePositions as SafePositionWithElection[];
  } catch (error: any) {
    return null;
  }
}

export async function getPositionById(
  params: IParams,
): Promise<SafePosition | null> {
  try {
    const { positionId } = params;

    const position = await prisma.position.findUnique({
      where: {
        id: positionId,
      },
    });

    if (!position) {
      return null;
    }

    return {
      ...position,
      createdAt: position.createdAt.toISOString(),
      updatedAt: position.updatedAt.toISOString(),
    };
  } catch (error: any) {
    return null;
  }
}

export async function getPositionsByElectionId(params: {
  electionId?: string;
}): Promise<SafePosition[] | null> {
  try {
    const { electionId } = params;

    const positions = await prisma.position.findMany({
      where: {
        electionId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const safePositions = positions.map((item) => ({
      ...item,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    }));

    return safePositions;
  } catch (error: any) {
    return null;
  }
}
