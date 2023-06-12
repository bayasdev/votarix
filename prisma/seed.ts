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

  console.log({ admin });
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
