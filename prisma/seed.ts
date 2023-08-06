import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcrypt';

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

  const candidate = await prisma.candidate.create({
    data: {
      name: 'Juan Pérez',
      document: '1799999999',
      email: 'jperez@ejemplo.com',
      proposals: 'Generaré 10000 nuevos empleos en el área de STEM',
      partyId: party1.id,
    },
  });

  console.log({ admin, party1, party2, candidate });
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
