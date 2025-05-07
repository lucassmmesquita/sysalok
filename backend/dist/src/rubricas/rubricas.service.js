"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RubricasService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let RubricasService = class RubricasService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createRubricaDto) {
        const { projetoId, ...rest } = createRubricaDto;
        const projeto = await this.prisma.projeto.findUnique({ where: { id: projetoId } });
        if (!projeto) {
            throw new common_1.NotFoundException(`Projeto com ID "${projetoId}" não encontrado.`);
        }
        return this.prisma.rubrica.create({
            data: {
                ...rest,
                projetoId,
                dataReferencia: rest.dataReferencia ? new Date(rest.dataReferencia) : new Date(),
            },
        });
    }
    async findAll() {
        return this.prisma.rubrica.findMany({ include: { projeto: true } });
    }
    async findOne(id) {
        const rubrica = await this.prisma.rubrica.findUnique({
            where: { id },
            include: { projeto: true },
        });
        if (!rubrica) {
            throw new common_1.NotFoundException(`Rubrica com ID "${id}" não encontrada`);
        }
        return rubrica;
    }
    async update(id, updateRubricaDto) {
        const { projetoId, ...rest } = updateRubricaDto;
        if (projetoId) {
            const projeto = await this.prisma.projeto.findUnique({ where: { id: projetoId } });
            if (!projeto) {
                throw new common_1.NotFoundException(`Projeto com ID "${projetoId}" não encontrado.`);
            }
        }
        const dataToUpdate = { ...rest };
        if (rest.dataReferencia) {
            dataToUpdate.dataReferencia = new Date(rest.dataReferencia);
        }
        try {
            return await this.prisma.rubrica.update({
                where: { id },
                data: dataToUpdate,
                include: { projeto: true },
            });
        }
        catch (error) {
            if (error.code === "P2025") {
                throw new common_1.NotFoundException(`Rubrica com ID "${id}" não encontrada para atualização`);
            }
            throw error;
        }
    }
    async remove(id) {
        try {
            return await this.prisma.rubrica.delete({
                where: { id },
            });
        }
        catch (error) {
            if (error.code === "P2025") {
                throw new common_1.NotFoundException(`Rubrica com ID "${id}" não encontrada para remoção`);
            }
            throw error;
        }
    }
    async consolidarCustosProjeto(projetoId) {
        const alocacoes = await this.prisma.alocacao.findMany({
            where: { projetoId },
            include: { perfilProfissional: { include: { custosRH: true } } },
        });
        const viagens = await this.prisma.viagem.findMany({
            where: { projetoId },
        });
        let custoTotalRH = new client_1.Prisma.Decimal(0);
        alocacoes.forEach(aloc => {
            for (let i = 1; i <= 30; i++) {
                const mesKey = `mes${String(i).padStart(2, '0')}`;
                const alocacaoNoMesValue = aloc[mesKey];
                if (alocacaoNoMesValue !== null && alocacaoNoMesValue !== undefined && Number(alocacaoNoMesValue) > 0) {
                    const alocacaoNoMes = Number(alocacaoNoMesValue);
                    const custoPerfilDecimal = aloc.perfilProfissional.custosRH[0]?.custoMensal || aloc.perfilProfissional.custoMensal || new client_1.Prisma.Decimal(0);
                    const custoPerfil = Number(custoPerfilDecimal);
                    custoTotalRH = custoTotalRH.plus(new client_1.Prisma.Decimal(alocacaoNoMes * custoPerfil));
                }
            }
        });
        let custoTotalViagensDecimal = new client_1.Prisma.Decimal(0);
        viagens.forEach(viagem => {
            if (viagem.totalGeral) {
                custoTotalViagensDecimal = custoTotalViagensDecimal.plus(viagem.totalGeral);
            }
        });
        const custoTotalViagens = Number(custoTotalViagensDecimal);
        return {
            projetoId,
            custoTotalRH: Number(custoTotalRH),
            custoTotalViagens,
            custoTotalProjeto: Number(custoTotalRH) + custoTotalViagens,
        };
    }
};
exports.RubricasService = RubricasService;
exports.RubricasService = RubricasService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RubricasService);
//# sourceMappingURL=rubricas.service.js.map