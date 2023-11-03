import { Role } from '@prisma/client';
import { z } from 'zod';

import { getCurrentUser } from '@/lib/session';
import prisma from '@/lib/prisma';
import { UserValidator } from '@/lib/validators/user';

interface IParams {
  params: {
    userId?: string;
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

    const { userId } = params;

    if (!userId || typeof userId !== 'string') {
      return new Response('ID no válido', { status: 400 });
    }

    const body = UserValidator.parse(await request.json());

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...body,
        role: body.role as Role,
      },
    });

    return new Response(user.id);
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

    const { userId } = params;

    if (!userId || typeof userId !== 'string') {
      return new Response('ID no válido', { status: 400 });
    }

    const user = await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return new Response(user.id);
  } catch (error) {
    return new Response('Algo salió mal', {
      status: 500,
    });
  }
}
