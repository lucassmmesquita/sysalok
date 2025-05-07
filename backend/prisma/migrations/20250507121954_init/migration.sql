-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'GESTOR', 'COLABORADOR');

-- CreateTable
CREATE TABLE "Cliente" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "responsavel" TEXT,
    "contato" TEXT,
    "endereco" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Projeto" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "descricao" TEXT,
    "dataInicio" TIMESTAMP(3) NOT NULL,
    "dataFim" TIMESTAMP(3),
    "status" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Projeto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PerfilProfissional" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "vinculo" TEXT,
    "remuneracao" DECIMAL(65,30),
    "custoMensal" DECIMAL(65,30),
    "valorHora" DECIMAL(65,30),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PerfilProfissional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustoRH" (
    "id" TEXT NOT NULL,
    "perfilProfissionalId" TEXT NOT NULL,
    "mes" INTEGER NOT NULL,
    "ano" INTEGER NOT NULL,
    "custoMensal" DECIMAL(65,30) NOT NULL,
    "valorHora" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustoRH_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alocacao" (
    "id" TEXT NOT NULL,
    "projetoId" TEXT NOT NULL,
    "perfilProfissionalId" TEXT NOT NULL,
    "squad" TEXT,
    "origem" TEXT,
    "mes01" DECIMAL(65,30) DEFAULT 0,
    "mes02" DECIMAL(65,30) DEFAULT 0,
    "mes03" DECIMAL(65,30) DEFAULT 0,
    "mes04" DECIMAL(65,30) DEFAULT 0,
    "mes05" DECIMAL(65,30) DEFAULT 0,
    "mes06" DECIMAL(65,30) DEFAULT 0,
    "mes07" DECIMAL(65,30) DEFAULT 0,
    "mes08" DECIMAL(65,30) DEFAULT 0,
    "mes09" DECIMAL(65,30) DEFAULT 0,
    "mes10" DECIMAL(65,30) DEFAULT 0,
    "mes11" DECIMAL(65,30) DEFAULT 0,
    "mes12" DECIMAL(65,30) DEFAULT 0,
    "mes13" DECIMAL(65,30) DEFAULT 0,
    "mes14" DECIMAL(65,30) DEFAULT 0,
    "mes15" DECIMAL(65,30) DEFAULT 0,
    "mes16" DECIMAL(65,30) DEFAULT 0,
    "mes17" DECIMAL(65,30) DEFAULT 0,
    "mes18" DECIMAL(65,30) DEFAULT 0,
    "mes19" DECIMAL(65,30) DEFAULT 0,
    "mes20" DECIMAL(65,30) DEFAULT 0,
    "mes21" DECIMAL(65,30) DEFAULT 0,
    "mes22" DECIMAL(65,30) DEFAULT 0,
    "mes23" DECIMAL(65,30) DEFAULT 0,
    "mes24" DECIMAL(65,30) DEFAULT 0,
    "mes25" DECIMAL(65,30) DEFAULT 0,
    "mes26" DECIMAL(65,30) DEFAULT 0,
    "mes27" DECIMAL(65,30) DEFAULT 0,
    "mes28" DECIMAL(65,30) DEFAULT 0,
    "mes29" DECIMAL(65,30) DEFAULT 0,
    "mes30" DECIMAL(65,30) DEFAULT 0,
    "totalAlocado" DECIMAL(65,30),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Alocacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Viagem" (
    "id" TEXT NOT NULL,
    "projetoId" TEXT NOT NULL,
    "descricaoVisita" TEXT,
    "quantidadePessoas" INTEGER NOT NULL,
    "quantidadeDias" INTEGER NOT NULL,
    "valorDiaria" DECIMAL(65,30) NOT NULL,
    "totalDiarias" DECIMAL(65,30),
    "valorPassagem" DECIMAL(65,30),
    "totalGeral" DECIMAL(65,30),
    "origem" TEXT,
    "destino" TEXT,
    "tipoTransporte" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Viagem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rubrica" (
    "id" TEXT NOT NULL,
    "projetoId" TEXT NOT NULL,
    "categoriaCusto" TEXT NOT NULL,
    "descricao" TEXT,
    "valor" DECIMAL(65,30) NOT NULL,
    "mes" INTEGER,
    "ano" INTEGER,
    "dataReferencia" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rubrica_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'COLABORADOR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Log" (
    "id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "level" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "meta" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_cnpj_key" ON "Cliente"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Projeto_codigo_key" ON "Projeto"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "PerfilProfissional_nome_key" ON "PerfilProfissional"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "CustoRH_perfilProfissionalId_mes_ano_key" ON "CustoRH"("perfilProfissionalId", "mes", "ano");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Projeto" ADD CONSTRAINT "Projeto_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustoRH" ADD CONSTRAINT "CustoRH_perfilProfissionalId_fkey" FOREIGN KEY ("perfilProfissionalId") REFERENCES "PerfilProfissional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alocacao" ADD CONSTRAINT "Alocacao_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "Projeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alocacao" ADD CONSTRAINT "Alocacao_perfilProfissionalId_fkey" FOREIGN KEY ("perfilProfissionalId") REFERENCES "PerfilProfissional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Viagem" ADD CONSTRAINT "Viagem_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "Projeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rubrica" ADD CONSTRAINT "Rubrica_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "Projeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
