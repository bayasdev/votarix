import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcrypt';
import dayjs from 'dayjs';

import { siteConfig } from '../src/config/site';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await hash('abcd1234', 12);

  const admin = await prisma.user.create({
    data: {
      name: 'Administrador',
      document: '9999999999',
      email: 'admin@bayas.dev',
      hashedPassword,
      role: Role.ADMIN,
    },
  });

  const voters = await prisma.user.createMany({
    data: [
      {
        name: 'Votante 1',
        document: '1799999999',
        email: 'votante1@bayas.dev',
        hashedPassword,
        role: Role.VOTER,
      },
      {
        name: 'Votante 2',
        document: '1799999998',
        email: 'votante2@bayas.dev',
        hashedPassword,
        role: Role.VOTER,
      },
      {
        name: 'Votante 3',
        document: '1799999997',
        email: 'votante3@bayas.dev',
        hashedPassword,
        role: Role.VOTER,
      },
      {
        name: 'Votante 4',
        document: '1799999996',
        email: 'votante4@bayas.dev',
        hashedPassword,
        role: Role.VOTER,
      },
      {
        name: 'Votante 5',
        document: '1799999995',
        email: 'votante5@bayas.dev',
        hashedPassword,
        role: Role.VOTER,
      },
    ],
  });

  const election1 = await prisma.election.create({
    data: {
      name: 'Elección de Representantes Estudiantiles 2024',
      description: `Elecciones de representantes estudiantiles al Honorable Consejo Universitario de la ${siteConfig.organizationName} para el periodo 2024-2026.`,
      startsAt: dayjs(new Date()).add(1, 'hour').toDate(),
      endsAt: dayjs(new Date()).add(12, 'hour').toDate(),
    },
  });

  const position1 = await prisma.position.create({
    data: {
      name: 'Representante Estudiantil',
      electionId: election1.id,
    },
  });

  const party1 = await prisma.party.create({
    data: {
      name: 'Lista A',
      proposals: [
        {
          name: 'Propuesta 1',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
          name: 'Propuesta 2',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
          name: 'Propuesta 3',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
      ],
      positionId: position1.id,
    },
  });

  const candidate1 = await prisma.candidate.create({
    data: {
      name: 'Andrea Rodríguez',
      email: 'arodriguez@gmail.com',
      document: '1799999999',
      type: 'PRIMARY',
      partyId: party1.id,
    },
  });

  const candidate2 = await prisma.candidate.create({
    data: {
      name: 'Marcos Salazar',
      email: 'marcos2003@hotmail.com',
      document: '1799999998',
      type: 'SECONDARY',
      partyId: party1.id,
    },
  });

  const party2 = await prisma.party.create({
    data: {
      name: 'Lista B',
      proposals: [
        {
          name: 'Propuesta 1',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
          name: 'Propuesta 2',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
          name: 'Propuesta 3',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
      ],
      positionId: position1.id,
    },
  });

  const candidate3 = await prisma.candidate.create({
    data: {
      name: 'Juan Pérez',
      email: 'juanperez1@gmail.com',
      document: '1799999997',
      type: 'PRIMARY',
      partyId: party2.id,
    },
  });

  const candidate4 = await prisma.candidate.create({
    data: {
      name: 'María Ordóñez',
      email: 'marii_ordonez@outlook.com',
      document: '1799999996',
      type: 'SECONDARY',
      partyId: party2.id,
    },
  });

  console.log({
    admin,
    voters,
    election1,
    party1,
    candidate1,
    candidate2,
    party2,
    candidate3,
    candidate4,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
