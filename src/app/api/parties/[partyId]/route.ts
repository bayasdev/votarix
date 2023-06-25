import { Role } from '@prisma/client';
import { z } from 'zod';

import getCurrentUser from '@/src/app/actions/getCurrentUser';
import prisma from '@/src/lib/prisma';
import { PartyValidator } from '@/src/lib/validators/party';

interface IParams {
  params: {
    partyId?: string;
  };
}

export async function PUT(request: Request, { params }: IParams) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== Role.ADMIN) {
      return new Response('No autorizado', {
        status: 401,
      });
    }

    const { partyId } = params;

    if (!partyId || typeof partyId !== 'string') {
      return new Response('Invalid Id', { status: 400 });
    }

    const body = PartyValidator.parse(await request.json());

    const party = await prisma.party.update({
      where: {
        id: partyId,
      },
      data: {
        ...body,
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

export async function DELETE(request: Request, { params }: IParams) {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== Role.ADMIN) {
    return new Response('No autorizado', {
      status: 401,
    });
  }

  const { partyId } = params;

  if (!partyId || typeof partyId !== 'string') {
    return new Response('Invalid Id', { status: 400 });
  }

  const party = await prisma.party.delete({
    where: {
      id: partyId,
    },
  });

  return new Response(party.id);
}
