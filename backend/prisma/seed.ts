import { PrismaClient, UserRole } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  const adminEmail = "admin@sysalok.com";
  const adminPassword = "12345"; // Lembre-se de trocar esta senha em um ambiente de produção
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(adminPassword, saltRounds);

  const adminUser = await prisma.usuario.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      nome: "Administrador SysAlok",
      email: adminEmail,
      senha: hashedPassword,
      role: UserRole.ADMIN,
    },
  });
  console.log(`Created admin user: ${adminUser.email}`);

  // Você pode adicionar outros usuários ou dados iniciais aqui
  // Exemplo de usuário Gestor:
  const gestorEmail = "gestor@sysalok.com";
  const gestorPassword = "gestor123";
  const hashedGestorPassword = await bcrypt.hash(gestorPassword, saltRounds);

  const gestorUser = await prisma.usuario.upsert({
    where: { email: gestorEmail },
    update: {},
    create: {
      nome: "Gestor de Projetos SysAlok",
      email: gestorEmail,
      senha: hashedGestorPassword,
      role: UserRole.GESTOR,
    },
  });
  console.log(`Created gestor user: ${gestorUser.email}`);


  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

