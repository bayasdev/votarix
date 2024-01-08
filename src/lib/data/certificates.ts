'use server';

import { CertificateResponse } from '@/types';
import { prisma } from '../db';
import { getCurrentUser } from '../session';

interface IParams {
  certificateId?: string;
}

export async function getCurrentUserCertificates(): Promise<
  CertificateResponse[] | null
> {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return null;
    }

    const certificates = await prisma.certificate.findMany({
      where: {
        userId: currentUser.id,
      },
      include: {
        election: true,
      },
    });

    if (!certificates) {
      return null;
    }

    return certificates.map((item) => ({
      id: item.id,
      electionName: item.election.name,
      voterName: currentUser.name || '',
      voterDocument: currentUser.document || '',
    }));
  } catch (error) {
    return null;
  }
}

export async function getCertificateById(
  params: IParams,
): Promise<CertificateResponse | null> {
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
