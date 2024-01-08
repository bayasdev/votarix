import { z } from 'zod';

import { getCurrentUser } from '@/lib/session';
import { prisma } from '@/lib/db';
import { PositionValidator } from '@/lib/validators/position';
import { createAuditLog } from '@/lib/helpers/create-audit-log';

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

    await createAuditLog({
      action: 'UPDATE',
      entityId: position.id,
      entityType: 'POSITION',
      entityName: position.name,
    });

    return new Response(position.id);
  } catch (error) {
    console.log('[UPDATE_POSITION_ERROR]', error);

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

    await createAuditLog({
      action: 'DELETE',
      entityId: position.id,
      entityType: 'POSITION',
      entityName: position.name,
    });

    return new Response(position.id);
  } catch (error) {
    console.log('[DELETE_POSITION_ERROR]', error);

    return new Response('Algo salió mal', {
      status: 500,
    });
  }
}
