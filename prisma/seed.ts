import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcrypt';
import dayjs from 'dayjs';

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

  const election1 = await prisma.election.create({
    data: {
      name: 'Elecciones 1',
      description:
        'Elecciones de representantes estudiantiles al honorable consejo universitario',
      startTime: new Date(),
      endTime: dayjs(new Date()).add(12, 'hour').toDate(),
    },
  });

  const position1 = await prisma.position.create({
    data: {
      name: 'Presidente',
      electionId: election1.id,
    },
  });

  const party1 = await prisma.party.create({
    data: {
      name: 'Partido 1',
    },
  });

  const party2 = await prisma.party.create({
    data: {
      name: 'Partido 2',
    },
  });

  const candidate1 = await prisma.candidate.create({
    data: {
      name: 'Juan Pérez',
      document: '1799999999',
      email: 'jperez@ejemplo.com',
      proposals: 'Generaré 10000 nuevos empleos en el área de STEM',
      partyId: party1.id,
      positionId: position1.id,
    },
  });

  const candidate2 = await prisma.candidate.create({
    data: {
      name: 'María González',
      document: '1799999998',
      email: 'mgonzales@bayas.dev',
      proposals: 'Mejoraré el transporte público',
      partyId: party2.id,
      positionId: position1.id,
    },
  });

  console.log({
    admin,
    election1,
    position1,
    party1,
    party2,
    candidate1,
    candidate2,
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
