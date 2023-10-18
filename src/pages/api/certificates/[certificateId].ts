import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { Role } from '@prisma/client';
import PDFDocument from 'pdfkit';
import dayjs from 'dayjs';

import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session || session.user.role !== Role.VOTER) {
      return res.status(401).send('No autorizado');
    }

    const { certificateId } = req.query;

    if (!certificateId || typeof certificateId !== 'string') {
      return res.status(400).send('ID no válido');
    }

    const certificate = await prisma.certificate.findUnique({
      where: {
        id: certificateId,
      },
      include: {
        election: true,
        user: true,
      },
    });

    if (certificate?.userId !== session.user.id) {
      return res.status(401).send('No autorizado');
    }

    if (!certificate) {
      return res.status(404).send('Certificado no encontrado');
    }

    const pdfBuffer = await new Promise<Buffer>((resolve) => {
      const doc = new PDFDocument({
        size: 'A4',
        layout: 'portrait',
      });

      // register fonts
      doc.registerFont('Inter', 'src/assets/fonts/Inter-Regular.ttf');
      doc.registerFont('Inter-Bold', 'src/assets/fonts/Inter-Bold.ttf');

      doc.font('Inter-Bold').fontSize(16);

      doc.text('Certificado de votación', {
        align: 'center',
      });

      doc.font('Inter').fontSize(12);

      doc.moveDown();

      doc.text(`Nombre: ${certificate.user.name}`, {
        align: 'left',
      });

      doc.text(`Cédula: ${certificate.user.document}`, {
        align: 'left',
      });

      // proceso electoral

      doc.moveDown();

      doc.text(`Proceso electoral: ${certificate.election.name}`, {
        align: 'left',
      });

      doc.text(`Fecha: ${dayjs(certificate.createdAt).format('DD/MM/YYYY')}`, {
        align: 'left',
      });

      doc.moveDown();

      doc.text('Firma: ', {
        align: 'left',
      });

      const buffers: Buffer[] = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.end();
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=certificado_${certificate.id}.pdf`,
    );
    res.setHeader('Content-Length', pdfBuffer.length);

    return res.status(200).send(pdfBuffer);
  } catch (error) {
    return res.status(500).send('Error al generar el certificado');
  }
}
