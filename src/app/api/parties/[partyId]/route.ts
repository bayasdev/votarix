import { z } from 'zod';

import getCurrentUser from '@/actions/getCurrentUser';
import prisma from '@/lib/prisma';
import { PartyValidator } from '@/lib/validators/party';
import { utapi } from '@/app/api/uploadthing/core';
import { isCdnUrl, getImageKeyFromUrl } from '@/lib/helpers/uploadthing';

interface IParams {
  params: {
    partyId?: string;
  };
}

export const runtime = 'edge';

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

    if (!oldParty) {
      return new Response('No encontrado', { status: 404 });
    }

    if (oldParty.imageUrl && isCdnUrl(oldParty.imageUrl)) {
      const currentImageKey = getImageKeyFromUrl(oldParty.imageUrl);

      if (currentImageKey && currentImageKey !== image.key) {
        try {
          await utapi.deleteFiles(currentImageKey);
        } catch (error) {}
      }
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

    if (party.imageUrl && isCdnUrl(party.imageUrl)) {
      const currentImageKey = getImageKeyFromUrl(party.imageUrl);

      if (currentImageKey) {
        try {
          await utapi.deleteFiles(currentImageKey);
        } catch (error) {}
      }
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
