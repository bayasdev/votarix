import prisma from '@/lib/prisma';

import { CertificateResponse } from '@/types';

interface IParams {
  certificateId?: string;
}

export const runtime = 'edge';

export async function getCertificateById(
  params: IParams,
): Promise<CertificateResponse | null> {
  'use server';

  const { certificateId } = params;

  try {
    const certificate = await prisma.certificate.findUnique({
      where: {
        id: certificateId,
      },
      include: {
        election: true,
        user: true,
      },
    });

    if (!certificate) {
      return null;
    }

    return {
      id: certificate.id,
      electionName: certificate.election.name,
      voterName: certificate.user.name,
      voterDocument: certificate.user.document || '',
    };
  } catch (error) {
    return null;
  }
}
