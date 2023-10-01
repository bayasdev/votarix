'use server';

import prisma from '@/src/lib/prisma';
import { SafePosition } from '@/src/types';

interface IParams {
  positionId?: string;
}

export async function getPositions(): Promise<SafePosition[] | null> {
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
