import dayjs from 'dayjs';
import { Role } from '@prisma/client';
import { parse } from 'papaparse';
import { hashSync } from 'bcrypt';

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

    // get the file

    const bytes = await request.arrayBuffer();
    const csvFile = Buffer.from(bytes).toString();

    // parse the file

    const parsedCsv = parse(csvFile, {
      header: true,
      skipEmptyLines: true,
    });

    if (!parsedCsv.data.length) {
      return new Response('No hay datos', { status: 400 });
    }

    // format the data

    const voters = parsedCsv.data.map((row: any) => ({
      name: row.nombre,
      document: row.cedula,
      email: row.correo,
      hashedPassword: hashSync(row.cedula, 12),
      role: Role.VOTER,
    }));

    // create the users

    await prisma.user.createMany({
      data: voters,
      skipDuplicates: true,
    });

    // connect the users to the election

    await prisma.election.update({
      where: {
        id: electionId,
      },
      data: {
        voters: {
          connect: voters.map((voter) => ({
            document: voter.document,
          })),
        },
      },
    });

    await createAuditLog({
      action: 'UPDATE',
      entityId: election.id,
      entityType: 'ELECTION',
      entityName: election.name,
    });

    return new Response(`${voters.length} registros`);
  } catch (error) {
    console.log('[BULK_UPLOAD_ERROR]', error);

    return new Response('Algo salió mal', {
      status: 500,
    });
  }
}
