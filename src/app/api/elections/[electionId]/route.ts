import { z } from 'zod';
import dayjs from 'dayjs';

import { getCurrentUser } from '@/lib/session';
import { prisma } from '@/lib/db';
import { ElectionValidator } from '@/lib/validators/election';
import { createAuditLog } from '@/lib/helpers/create-audit-log';

interface IParams {
  params: {
    electionId?: string;
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

    const { electionId } = params;

    if (!electionId || typeof electionId !== 'string') {
      return new Response('ID no válido', { status: 400 });
    }

    const body = ElectionValidator.parse(await request.json());

    const election = await prisma.election.findUnique({
      where: {
        id: electionId,
      },
    });

    if (!election) {
      return new Response('Elección no encontrada', {
        status: 404,
      });
    }

    if (election.isCompleted) {
      return new Response('No se puede editar una elección completada', {
        status: 400,
      });
    }

    const currentDate = new Date();

    if (
      dayjs(currentDate).isAfter(election.startsAt) &&
      dayjs(currentDate).isBefore(election.endsAt)
    ) {
      return new Response('No se puede editar una elección en curso', {
        status: 400,
      });
    }

    await prisma.election.update({
      where: {
        id: electionId,
      },
      data: {
        ...body,
      },
    });

    await createAuditLog({
      action: 'UPDATE',
      entityId: election.id,
      entityType: 'ELECTION',
      entityName: election.name,
    });

    return new Response(election.id);
  } catch (error) {
    console.log('[UPDATE_ELECTION_ERROR]', error);

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

    const { electionId } = params;

    if (!electionId || typeof electionId !== 'string') {
      return new Response('ID no válido', { status: 400 });
    }

    const election = await prisma.election.delete({
      where: {
        id: electionId,
      },
    });

    await createAuditLog({
      action: 'DELETE',
      entityId: election.id,
      entityType: 'ELECTION',
      entityName: election.name,
    });

    return new Response(election.id);
  } catch (error) {
    console.log('[DELETE_ELECTION_ERROR]', error);

    return new Response('Algo salió mal', {
      status: 500,
    });
  }
}
