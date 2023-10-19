import { z } from 'zod';

import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/lib/prisma';
import { PartyValidator } from '@/lib/validators/party';
import { utapi } from '@/app/api/uploadthing/core';

interface IParams {
  params: {
    partyId?: string;
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

    const { partyId } = params;

    if (!partyId || typeof partyId !== 'string') {
      return new Response('ID no válido', { status: 400 });
    }

    const { image, ...body } = PartyValidator.parse(await request.json());

    const oldParty = await prisma.party.findUnique({
      where: {
        id: partyId,
      },
    });

    // if there is a new image, delete the old one
    if (image && oldParty?.imageKey && oldParty?.imageKey !== image.key) {
      await utapi.deleteFiles(oldParty?.imageKey);
    }

    const party = await prisma.party.update({
      where: {
        id: partyId,
      },
      data: {
        ...body,
        imageKey: image.key,
        imageUrl: image.url,
      },
    });

    return new Response(party.id);
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
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== 'ADMIN') {
      return new Response('No autorizado', {
        status: 401,
      });
    }

    const { partyId } = params;

    if (!partyId || typeof partyId !== 'string') {
      return new Response('ID no válido', { status: 400 });
    }

    const party = await prisma.party.findUnique({
      where: {
        id: partyId,
      },
    });

    if (!party) {
      return new Response('No encontrado', { status: 404 });
    }

    // if there is a image, delete it
    if (party?.imageKey) {
      await utapi.deleteFiles(party.imageKey);
    }

    await prisma.party.delete({
      where: {
        id: partyId,
      },
    });

    return new Response(party.id);
  } catch (error) {
    return new Response('Algo salió mal', {
      status: 500,
    });
  }
}
