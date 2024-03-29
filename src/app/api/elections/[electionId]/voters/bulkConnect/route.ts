import dayjs from 'dayjs';

import { getCurrentUser } from '@/lib/session';
import { prisma } from '@/lib/db';
import { createAuditLog } from '@/lib/helpers/create-audit-log';

interface IParams {
  params: {
    electionId?: string;
  };
}

export async function POST(request: Request, { params }: IParams) {
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

    const body = await request.json();

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

    if (
      dayjs().isAfter(election.startsAt) &&
      dayjs().isBefore(election.endsAt)
    ) {
      return new Response('No se puede editar una elección en curso', {
        status: 400,
      });
    }

    if (dayjs().isAfter(election.endsAt)) {
      return new Response('No se puede editar una elección completada', {
        status: 400,
      });
    }

    await prisma.election.update({
      where: {
        id: electionId,
      },
      data: {
        voters: {
          connect: body,
        },
      },
    });

    await createAuditLog({
      action: 'UPDATE',
      entityId: election.id,
      entityType: 'ELECTION',
      entityName: election.name,
    });

    // delete all votes and certificates

    await prisma.vote.deleteMany({
      where: {
        electionId,
      },
    });

    await prisma.certificate.deleteMany({
      where: {
        electionId,
      },
    });

    return new Response('Padrón restablecido', {
      status: 200,
    });
  } catch (error) {
    console.log('[BULK_CONNECT_ERROR]', error);

    return new Response('Algo salió mal', {
      status: 500,
    });
  }
}
