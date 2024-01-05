import { Role } from '@prisma/client';
import { parse } from 'papaparse';
import { hashSync } from 'bcrypt';

import { getCurrentUser } from '@/lib/session';
import { prisma } from '@/lib/db';

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

    // If election is ongoing, do not allow to modify voters
    // check startsAt and endsAt
    if (
      election &&
      election.startsAt &&
      election.endsAt &&
      election.startsAt < new Date() &&
      election.endsAt > new Date()
    ) {
      return new Response(
        'No se puede modificar el padrón en una elección en curso',
        {
          status: 400,
        },
      );
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

    // reset election
    // remove ballots and certificates

    await prisma.ballot.deleteMany({
      where: {
        electionId,
      },
    });

    await prisma.certificate.deleteMany({
      where: {
        electionId,
      },
    });

    return new Response(`${voters.length} registros`);
  } catch (error) {
    return new Response('Algo salió mal', {
      status: 500,
    });
  }
}
