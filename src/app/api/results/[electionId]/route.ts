import prisma from '@/lib/prisma';
import { ElectionStatus } from '@/constants';
import { ElectionResults } from '@/types';

interface IParams {
  params: {
    electionId?: string;
  };
}

export async function GET(request: Request, { params }: IParams) {
  try {
    const { electionId } = params;

    if (!electionId || typeof electionId !== 'string') {
      return new Response('ID no válido', { status: 400 });
    }

    const election = await prisma.election.findUnique({
      where: {
        id: electionId,
        endTime: {
          lt: new Date(),
        },
      },
      select: {
        id: true,
        name: true,
        positions: {
          select: {
            id: true,
            name: true,
            candidates: {
              select: {
                id: true,
                name: true,
                imageUrl: true,
                party: {
                  select: {
                    id: true,
                    name: true,
                    imageUrl: true,
                  },
                },
                _count: {
                  select: {
                    ballots: true,
                  },
                },
              },
              orderBy: {
                ballots: {
                  _count: 'desc',
                },
              },
            },
            _count: {
              select: {
                ballots: true,
              },
            },
          },
          orderBy: {
            name: 'asc',
          },
        },
        startTime: true,
        endTime: true,
        _count: {
          select: {
            voters: true,
            certificates: true,
          },
        },
      },
    });

    if (!election) {
      return null;
    }

    const totalVoters = election._count.voters;
    // for each voter, there is one certificate
    const totalVotes = election._count.certificates;

    const absentVoters = totalVoters - totalVotes;
    const absentPercentage = (absentVoters / totalVoters) * 100 || 0;

    const electionResults: ElectionResults = {
      electionId: election.id,
      electionName: election.name,
      positions: election.positions.map((position) => ({
        id: position.id,
        name: position.name,
        candidates: position.candidates.map((candidate) => ({
          id: candidate.id,
          name: candidate.name,
          imageUrl: candidate.imageUrl || '',
          party: {
            id: candidate.party.id,
            name: candidate.party.name,
            imageUrl: candidate.party.imageUrl || '',
          },
          votes: candidate._count.ballots,
          // percentage is relative to the total votes for a position
          percentage:
            (candidate._count.ballots / position._count.ballots) * 100 || 0,
        })),
      })),
      totalVoters,
      totalVotes,
      absentVoters,
      absentPercentage,
      status:
        election.startTime > new Date()
          ? ElectionStatus.NOT_STARTED
          : election.endTime > new Date()
          ? ElectionStatus.ONGOING
          : ElectionStatus.FINISHED,
      updatedAt: new Date().toISOString(),
    };

    return new Response(JSON.stringify(electionResults), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response('Algo salió mal', {
      status: 500,
    });
  }
}
