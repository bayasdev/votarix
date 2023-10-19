import { z } from 'zod';

import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/lib/prisma';
import { ElectionValidator } from '@/lib/validators/election';

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== 'ADMIN') {
      return new Response('No autorizado', {
        status: 401,
      });
    }

    const body = await request.json();

    const { name, description, startTime, endTime } =
      ElectionValidator.parse(body);

    const election = await prisma.election.create({
      data: {
        name,
        description,
        startTime,
        endTime,
      },
    });

    return new Response(election.id, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response('Algo salió mal', {
      status: 500,
    });
  }
}
