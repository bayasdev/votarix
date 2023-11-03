import { z } from 'zod';

import { getCurrentUser } from '@/lib/session';
import { prisma } from '@/lib/db';
import { PositionValidator } from '@/lib/validators/position';

interface IParams {
  params: {
    positionId?: string;
  };
}

export async function PUT(request: Request, { params }: IParams) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== 'ADMIN') {
      return new Response('No autorizado', {
        status: 401,
      });
    }

    const { positionId } = params;

    if (!positionId || typeof positionId !== 'string') {
      return new Response('ID no válido', { status: 400 });
    }

    const body = PositionValidator.parse(await request.json());

    const position = await prisma.position.update({
      where: {
        id: positionId,
      },
      data: {
        ...body,
      },
    });

    return new Response(position.id);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response('Algo salió mal', {
      status: 500,
    });
  }
}

export async function DELETE(request: Request, { params }: IParams) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== 'ADMIN') {
      return new Response('No autorizado', {
        status: 401,
      });
    }

    const { positionId } = params;

    if (!positionId || typeof positionId !== 'string') {
      return new Response('ID no válido', { status: 400 });
    }

    const position = await prisma.position.delete({
      where: {
        id: positionId,
      },
    });

    return new Response(position.id);
  } catch (error) {
    return new Response('Algo salió mal', {
      status: 500,
    });
  }
}
