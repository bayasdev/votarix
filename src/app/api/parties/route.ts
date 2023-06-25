import { Role } from '@prisma/client';
import { z } from 'zod';

import getCurrentUser from '@/src/app/actions/getCurrentUser';
import prisma from '@/src/lib/prisma';
import { PartyValidator } from '@/src/lib/validators/party';

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== Role.ADMIN) {
      return new Response('No autorizado', {
        status: 401,
      });
    }

    const body = await request.json();

    const { name } = PartyValidator.parse(body);

    const party = await prisma.party.create({
      data: {
        name,
      },
    });

    return new Response(party.id, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response('Algo salió mal', {
      status: 500,
    });
  }
}
