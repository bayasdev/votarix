import { Role } from '@prisma/client';
import { parse } from 'papaparse';
import { hashSync } from 'bcrypt';

import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/lib/prisma';

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

    return new Response(`${voters.length} registros`);
  } catch (error) {
    return new Response('Algo salió mal', {
      status: 500,
    });
  }
}
