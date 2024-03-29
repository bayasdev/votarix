import { z } from 'zod';

import { getCurrentUser } from '@/lib/session';
import { prisma } from '@/lib/db';
import { VoteValidator } from '@/lib/validators/vote';
import { createAuditLog } from '@/lib/helpers/create-audit-log';

interface IParams {
  params: {
    electionId?: string;
  };
}

export async function POST(request: Request, { params }: IParams) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new Response('No autorizado', {
        status: 401,
      });
    }

    const { electionId } = params;

    if (!electionId || typeof electionId !== 'string') {
      return new Response('ID no válido', { status: 400 });
    }

    const canVote = await prisma.election.findUnique({
      where: {
        id: electionId,
        // check if user is a voter and is enrolled in election
        voters: {
          some: {
            id: currentUser.id,
            role: 'VOTER',
          },
        },
        // check if election is ongoing
        startsAt: {
          lt: new Date(),
        },
        endsAt: {
          gt: new Date(),
        },
        // check if user has voted
        certificates: {
          none: {
            userId: currentUser.id,
          },
        },
      },
    });

    if (!canVote) {
      return new Response('No puedes votar en esta elección', { status: 403 });
    }

    const body = await request.json();

    const { votes } = VoteValidator.parse(body);

    // create vote

    votes.forEach(async (vote) => {
      let checkedSelections = 0;
      let checkedPartyId = '';

      vote.selection.forEach(async (selection) => {
        if (selection.isChecked) {
          checkedSelections += 1;
          checkedPartyId = selection.partyId;
        }
      });

      if (checkedSelections === 0) {
        await prisma.vote.create({
          data: {
            type: 'BLANK',
            electionId: electionId,
            positionId: vote.positionId,
          },
        });
      }

      if (checkedSelections === 1) {
        await prisma.vote.create({
          data: {
            type: 'VALID',
            electionId: electionId,
            positionId: vote.positionId,
            partyId: checkedPartyId,
          },
        });
      }

      if (checkedSelections > 1) {
        await prisma.vote.create({
          data: {
            type: 'NULL',
            electionId: electionId,
            positionId: vote.positionId,
          },
        });
      }

      // vote id is not logged to keep anonymity
      await createAuditLog({
        action: 'CREATE',
        entityType: 'VOTE',
      });
    });

    // create certificate

    const certificate = await prisma.certificate.create({
      data: {
        electionId: electionId,
        userId: currentUser.id,
      },
    });

    await createAuditLog({
      action: 'CREATE',
      entityId: certificate.id,
      entityType: 'CERTIFICATE',
    });

    return new Response('Voto registrado', { status: 201 });
  } catch (error) {
    console.log('[VOTE_ERROR]', error);

    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }

    return new Response('Algo salió mal', {
      status: 500,
    });
  }
}
