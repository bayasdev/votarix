import { z } from 'zod';

import { getCurrentUser } from '@/lib/session';
import { prisma } from '@/lib/db';
import { PositionValidator } from '@/lib/validators/position';

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== 'ADMIN') {
      return new Response('No autorizado', {
        status: 401,
      });
    }

    const body = await request.json();

    const { name, electionId } = PositionValidator.parse(body);

    const position = await prisma.position.create({
      data: {
        name,
        electionId,
      },
    });

    return new Response(position.id, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response('Algo salió mal', {
      status: 500,
    });
  }
}
