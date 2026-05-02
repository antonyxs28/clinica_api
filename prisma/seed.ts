import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const clinica = await prisma.clinica.upsert({
    where: { cnpj: '00000000000191' },
    update: {},
    create: {
      nome: 'Clínica Central',
      cnpj: '00000000000191',
      endereco: 'Rua Principal, 100',
    },
  });

  const senhaHash = await bcrypt.hash('Admin123!', 10);
  await prisma.usuario.upsert({
    where: { email: 'admin@clinica.com' },
    update: {},
    create: {
      nome: 'Administrador',
      email: 'admin@clinica.com',
      senha: senhaHash,
      papel: 'admin',
      clinicaId: clinica.id,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
