import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

import QRCode from 'qrcode';
import PDFDocument from 'pdfkit';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session || session.user.role !== 'VOTER') {
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

    if (!certificate) {
      return res.status(404).send('Certificado no encontrado');
    }

    if (certificate.userId !== session.user.id) {
      return res.status(401).send('No autorizado');
    }

    const qrImage = await QRCode.toBuffer(
      `${process.env.NEXTAUTH_URL}/validateCertificate/${certificate.id}`,
    );

    const generationDate = dayjs()
      .locale('es')
      .format('DD [de] MMMM [del] YYYY [a las] HH:mm');

    const message = `Este documento acredita que ${
      certificate.user.name
    } portador/a de la cédula de ciudadanía ecuatoriana # ${
      certificate.user.document
    } sufragó en el proceso electoral denominado "${
      certificate.election.name
    }" el día ${dayjs(certificate.createdAt)
      .locale('es')
      .format('DD [de] MMMM [del] YYYY [a las] HH:mm')}.`;

    const pdfBuffer = await new Promise<Buffer>((resolve) => {
      const verticalMargin = 20;
      const horizontalMargin = 40;

      const doc = new PDFDocument({
        size: 'A4',
        layout: 'portrait',
        margins: {
          top: verticalMargin,
          bottom: verticalMargin,
          left: horizontalMargin,
          right: horizontalMargin,
        },
      });

      const logoHeight = 80;
      const aspectRatio = 3 / 2;
      const logoWidth = logoHeight * aspectRatio;
      doc.image(
        'src/assets/images/logoUnibeNuevo.png',
        doc.page.width / 2 - logoWidth / 2,
        doc.y,
        {
          fit: [logoWidth, logoHeight],
          align: 'center',
        },
      );
      doc.moveDown(2);

      doc.font('Helvetica-Bold').fontSize(14).text('CERTIFICADO DE VOTACIÓN', {
        align: 'center',
        underline: true,
      });
      doc.moveDown(2);

      doc.font('Helvetica').fontSize(12).text(message, { align: 'justify' });
      doc.moveDown(2);

      doc
        .font('Helvetica')
        .fontSize(12)
        .text(`Dado en la ciudad de Quito, D.M., el ${generationDate}.`, {
          align: 'center',
        });
      doc.moveDown(2);

      doc.font('Helvetica-Bold').fontSize(12).text('Escanea el código QR', {
        align: 'center',
      });
      doc.moveDown(1);

      const qrWidth = 80;
      const qrHeight = qrWidth;
      doc.image(qrImage, doc.page.width / 2 - qrWidth / 2, doc.y, {
        fit: [qrWidth, qrHeight],
        align: 'center',
        valign: 'center',
      });

      const buffers: Buffer[] = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.end();
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `inline; filename=certificado_${certificate.id}.pdf`,
    );
    res.setHeader('Content-Length', pdfBuffer.length);

    return res.status(200).send(pdfBuffer);
  } catch (error) {
    return res.status(500).send('Error al generar el certificado');
  }
}
