import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import path from 'path';
import PDFDocumentWithTables from 'pdfkit-table';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import { authOptions } from '@/lib/auth';
import { siteConfig } from '@/config/site';
import { getElectionResultsById } from '@/lib/data/elections';

dayjs.extend(utc);
dayjs.extend(timezone);

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

    const electionResults = await getElectionResultsById({ electionId });

    if (!electionResults) {
      return res.status(400).send('Error al procesar los resultados');
    }

    const resourcesDir = path.join(process.cwd(), 'public', 'resources');
    const logoPath = path.join(resourcesDir, 'logoUnibeNuevo.png');

    const generationDateLong = dayjs()
      .utc()
      .tz('America/Guayaquil')
      .locale('es')
      .format('DD [días del mes de] MMMM [de] YYYY [siendo las] HH:mm [horas]');

    const electionendsAt = dayjs(electionResults.endsAt)
      .utc()
      .tz('America/Guayaquil')
      .locale('es')
      .format('DD [de] MMMM [del] YYYY');

    const intro = `En cumplimiento a lo que dispone la Constitución de la República del Ecuador; la Ley Orgánica de Educación Superior - LOES; y, desarrollado en el Estatuto de la ${siteConfig.organizationName} y la Normativa de Elecciones de los Representantes de los Estamentos Universitarios al Órgano del Cogobierno. En la ciudad de Quito, D.M., a ${generationDateLong}, se reune el Tribunal Electoral integrado por:`;

    const introContinuation = `En conformidad y, en cumplimiento de la convocatoria al ejercicio del sufragio del ${electionendsAt} una vez que se han contabilizado el total de los votos, acorde a lo dispuesto en el reglamento, se procede a:`;

    const firstPoint = `1.- Verificar los escrutinios totales y levantar la presente ACTA DE RESULTADOS con los siguientes resultados:`;

    const secondPoint = `2.- Dar inicio a la fase de impugnación de resultados, acorde al cronograma establecido para el efecto.`;

    const secretaryName =
      siteConfig.tribunalMembers.find((member) => member.title === 'Secretario')
        ?.name || '';

    const pdfBuffer = await new Promise<Buffer>((resolve) => {
      const verticalMargin = 20;
      const horizontalMargin = 40;

      const doc = new PDFDocumentWithTables({
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
      doc.image(logoPath, doc.page.width / 2 - logoWidth / 2, doc.y, {
        fit: [logoWidth, logoHeight],
        align: 'center',
      });
      doc.moveDown(2);

      doc.font('Helvetica-Bold').fontSize(12).text('TRIBUNAL ELECTORAL', {
        align: 'center',
      });
      doc.moveDown(1);

      doc
        .font('Helvetica-Bold')
        .fontSize(11)
        .text(
          `${siteConfig.organizationName.toUpperCase()} - ${
            siteConfig.organizationAbbreviation
          }`,
          {
            align: 'center',
          },
        );
      doc.moveDown(1);

      doc
        .font('Helvetica-Bold')
        .fontSize(12)
        .text(electionResults.name.toUpperCase(), {
          align: 'center',
          underline: true,
        });
      doc.moveDown(1);

      doc.font('Helvetica-Bold').fontSize(12).text('ACTA DE RESULTADOS', {
        align: 'center',
      });
      doc.moveDown(1);

      doc.font('Helvetica').fontSize(11).text(intro, { align: 'justify' });
      doc.moveDown(1);

      doc.list(
        siteConfig.tribunalMembers.map(
          (member) => member.name + ', ' + member.title,
        ),
        {
          listType: 'bullet',
          bulletRadius: 3,
          lineGap: 4,
        },
      );
      doc.moveDown(1);

      doc
        .font('Helvetica')
        .fontSize(11)
        .text(introContinuation, { align: 'justify' });
      doc.moveDown(1);

      doc.font('Helvetica').fontSize(11).text(firstPoint, { align: 'justify' });
      doc.moveDown(1);

      electionResults.positions.forEach((position) => {
        doc.font('Helvetica').fontSize(11).text(`Dignidad: ${position.name}`);

        doc.moveDown(1);

        const tableHeaders = [
          ...position.parties
            .map((party) => `VOTOS ${party.name.toUpperCase()}`)
            .flat(),
          'VOTOS NULOS',
          'VOTOS BLANCOS',
          'SUFRAGANTES',
          'AUSENTES',
          'EMPADRONADOS',
        ];

        const tableRows = [
          [
            ...position.parties
              .map((party) => party.totalVotes.toString())
              .flat(),
            position.totalNullVotes.toString(),
            position.totalBlankVotes.toString(),
            electionResults.totalVoters.toString(),
            electionResults.totalAbsentVoters.toString(),
            electionResults.registeredVoters.toString(),
          ],
        ];

        const resultsTable = {
          headers: tableHeaders,
          rows: tableRows,
        };

        doc.table(resultsTable);
        doc.moveDown(1);
      });

      doc
        .font('Helvetica')
        .fontSize(11)
        .text(secondPoint, { align: 'justify' });
      doc.moveDown(10);

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
        .text(siteConfig.organizationName.toUpperCase(), {
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
