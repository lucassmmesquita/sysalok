"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log(`Start seeding ...`);
    const adminEmail = "admin@sysalok.com";
    const adminPassword = "12345";
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(adminPassword, saltRounds);
    const adminUser = await prisma.usuario.upsert({
        where: { email: adminEmail },
        update: {},
        create: {
            nome: "Administrador SysAlok",
            email: adminEmail,
            senha: hashedPassword,
            role: client_1.UserRole.ADMIN,
        },
    });
    console.log(`Created admin user: ${adminUser.email}`);
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
            role: client_1.UserRole.GESTOR,
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
//# sourceMappingURL=seed.js.map