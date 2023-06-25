import { Role } from '@prisma/client';
import { z } from 'zod';

import getCurrentUser from '@/src/app/actions/getCurrentUser';
import prisma from '@/src/lib/prisma';
import { CandidateValidator } from '@/src/lib/validators/candidate';

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== Role.ADMIN) {
      return new Response('No autorizado', {
        status: 401,
      });
    }

    const body = await request.json();

    const { name, email, document, bio, proposals, partyId } =
      CandidateValidator.parse(body);

    const candidate = await prisma.candidate.create({
      data: {
        name,
        email,
        document,
        bio,
        proposals,
        partyId,
      },
    });

    return new Response(candidate.id, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response('Algo salió mal', {
      status: 500,
    });
  }
}
