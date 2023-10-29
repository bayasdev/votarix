import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

import PDFDocument from 'pdfkit';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { siteConfig } from '@/config/site';
import { el } from 'date-fns/locale';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return res.status(401).send('No autorizado');
    }

    const { electionId } = req.query;

    if (!electionId || typeof electionId !== 'string') {
      return res.status(400).send('ID no válido');
    }

    const election = await prisma.election.findUnique({
      where: {
        id: electionId,
        endTime: {
          lte: new Date(),
        },
      },
      include: {
        _count: {
          select: {
            ballots: true,
            voters: true,
          },
        },
      },
    });

    if (!election) {
      return res.status(404).send('Elección no encontrada');
    }

    const generationDate = dayjs()
      .locale('es')
      .format('DD [de] MMMM [del] YYYY');

    const generationDateLong = dayjs()
      .locale('es')
      .format('DD [días del mes de] MMMM [de] YYYY [siendo las] HH:mm [horas]');

    const electionEndTime = dayjs(election.endTime)
      .locale('es')
      .format('DD [de] MMMM [del] YYYY');

    const intro = `En cumplimiento a lo que dispone la Constitución de la República del Ecuador; la Ley Orgánica de Educación Superior - LOES; y, desarrollado en el Estatuto de la Universidad Iberoamericana del Ecuador y la Normativa de Elecciones de los Representantes de los Estamentos Universitarios al Órgano del Gobierno. En la ciudad de Quito, D.M., a ${generationDateLong}, se reune el Tribunal Electoral integrado por:`;

    const introContinuation = `En conformidad y, en cumplimiento de la convocatoria al ejercicio del sufragio del ${electionEndTime} una vez que se han contabilizado el total de los votos, acorde a lo dispuesto en el reglamento, se procede a:`;

    const firstPoint = `1.- Verificar los escrutinios totales y levantar la presente ACTA DE RESULTADOS DEFINITIVOS con los siguientes resultados:`;

    const secondPoint = `2.- Dar inicio a la fase de impugnación de resultados, acorde al cronograma establecido para el efecto.`;

    const secretaryName =
      siteConfig.tribunal.find((member) => member.title === 'Secretario')
        ?.name || '';

    const pdfBuffer = await new Promise<Buffer>((resolve) => {
      const margin = 60;

      const doc = new PDFDocument({
        size: 'A4',
        layout: 'portrait',
        margin,
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
      doc.moveDown(1);

      doc.font('Helvetica-Bold').fontSize(12).text('TRIBUNAL ELECTORAL', {
        align: 'center',
      });
      doc.moveDown(1);

      doc
        .font('Helvetica-Bold')
        .fontSize(11)
        .text('UNIVERSIDAD IBEROAMERICANA DEL ECUADOR - UNIB.E', {
          align: 'center',
        });
      doc.moveDown(1);

      doc.font('Helvetica-Bold').fontSize(12).text(election.name, {
        align: 'center',
        underline: true,
      });
      doc.moveDown(1);

      doc
        .font('Helvetica-Bold')
        .fontSize(12)
        .text('ACTA DE RESULTADOS DEFINITIVOS DEL ESCRUTINIO', {
          align: 'center',
        });
      doc.moveDown(2);

      doc.font('Helvetica').fontSize(11).text(intro, { align: 'justify' });
      doc.moveDown(1);

      doc.list(
        siteConfig.tribunal.map((member) => member.name + ', ' + member.title),
        {
          listType: 'bullet',
          bulletRadius: 3,
          lineGap: 10,
        },
      );

      doc
        .font('Helvetica')
        .fontSize(11)
        .text(introContinuation, { align: 'justify' });
      doc.moveDown(1);

      doc.font('Helvetica').fontSize(11).text(firstPoint, { align: 'justify' });
      doc.moveDown(1);

      doc
        .font('Helvetica')
        .fontSize(11)
        .text(secondPoint, { align: 'justify' });
      doc.moveDown(6);

      doc
        .font('Helvetica')
        .fontSize(11)
        .text(secretaryName, { align: 'center' });
      doc.moveDown(0.5);

      doc
        .font('Helvetica-Bold')
        .fontSize(11)
        .text('Secretario', { align: 'center' });
      doc.moveDown(0.5);

      doc
        .font('Helvetica-Bold')
        .fontSize(11)
        .text('Tribunal Electoral', { align: 'center' });
      doc.moveDown(0.5);

      doc
        .font('Helvetica-Bold')
        .fontSize(11)
        .text('UNIVERSIDAD IBEROAMERICANA DEL ECUADOR', {
          align: 'center',
        });

      const buffers: Buffer[] = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.end();
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `inline; filename=acta_${electionId}.pdf`,
    );
    res.setHeader('Content-Length', pdfBuffer.length);

    return res.status(200).send(pdfBuffer);
  } catch (error) {
    return res.status(500).send('Error al generar el acta');
  }
}
