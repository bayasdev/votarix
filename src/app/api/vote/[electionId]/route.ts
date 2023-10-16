import { z } from 'zod';
import { Role } from '@prisma/client';

import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/lib/prisma';
import { getCanUserVote } from '@/app/actions/voters';
import { VoteValidator } from '@/lib/validators/vote';

interface IParams {
  params: {
    electionId?: string;
  };
}

export async function POST(request: Request, { params }: IParams) {
  try {
    const { electionId } = params;
    const currentUser = await getCurrentUser();
    const canUserVote = await getCanUserVote(params);

    if (!canUserVote || !currentUser || !electionId) {
      return new Response('No autorizado', {
        status: 401,
      });
    }

    const body = await request.json();

    const { ballots } = VoteValidator.parse(body);

    const ballotsData = ballots.map((ballot) => ({
      ...ballot,
      electionId: electionId,
      userId: currentUser.id,
    }));

    await prisma.ballot.createMany({
      data: ballotsData,
    });

    return new Response('Voto registrado', { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response('Algo salió mal', {
      status: 500,
    });
  }
}
