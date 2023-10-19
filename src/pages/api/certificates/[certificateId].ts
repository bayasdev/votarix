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

    if (certificate?.userId !== session.user.id) {
      return res.status(401).send('No autorizado');
    }

    if (!certificate) {
      return res.status(404).send('Certificado no encontrado');
    }

    const qrImage = await QRCode.toBuffer(
      `http://localhost:3000/validateCertificate/${certificate.id}`,
    );

    const generationDate = dayjs()
      .locale('es')
      .format('DD [de] MMMM [del] YYYY');

    const message = `Este documento acredita que ${
      certificate.user.name
    } portador/a de la cédula de ciudadanía ecuatoriana # ${
      certificate.user.document
    } sufragó en el proceso electoral denominado "${
      certificate.election.name
    }" el día ${dayjs(certificate.createdAt)
      .locale('es')
      .format('DD [de] MMMM [del] YYYY')}.`;

    const pdfBuffer = await new Promise<Buffer>((resolve) => {
      const margin = 50;

      const doc = new PDFDocument({
        size: 'A4',
        layout: 'portrait',
        margin,
      });

      // register fonts
      doc.registerFont('Inter', 'src/assets/fonts/Inter-Regular.ttf');
      doc.registerFont('Inter-Bold', 'src/assets/fonts/Inter-Bold.ttf');

      const logoWidth = 180;
      const logoHeight = 75;
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

      doc.font('Inter-Bold').fontSize(14).text('CERTIFICADO DE VOTACIÓN', {
        align: 'center',
      });

      doc.moveDown(2);

      doc.font('Inter').fontSize(12).text(message, { align: 'justify' });

      doc.moveDown(2);

      doc
        .font('Inter')
        .fontSize(12)
        .text(`Dado en Quito, D.M. el ${generationDate}.`, { align: 'center' });

      doc.moveDown(2);

      doc.font('Inter-Bold').fontSize(12).text('Escanea el código QR', {
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
