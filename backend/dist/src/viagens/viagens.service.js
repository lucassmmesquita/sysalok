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
exports.ViagensService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let ViagensService = class ViagensService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    calculateViagemTotals(dto) {
        const totalDiarias = dto.quantidadePessoas * dto.quantidadeDias * dto.valorDiaria;
        const totalGeral = totalDiarias + (dto.valorPassagem || 0);
        return { totalDiarias, totalGeral };
    }
    async create(createViagemDto) {
        const { projetoId, ...rest } = createViagemDto;
        const projeto = await this.prisma.projeto.findUnique({ where: { id: projetoId } });
        if (!projeto) {
            throw new common_1.NotFoundException(`Projeto com ID "${projetoId}" não encontrado.`);
        }
        const { totalDiarias, totalGeral } = this.calculateViagemTotals(createViagemDto);
        return this.prisma.viagem.create({
            data: {
                ...rest,
                projetoId,
                totalDiarias: new client_1.Prisma.Decimal(totalDiarias),
                totalGeral: new client_1.Prisma.Decimal(totalGeral),
            },
        });
    }
    async findAll() {
        return this.prisma.viagem.findMany({ include: { projeto: true } });
    }
    async findOne(id) {
        const viagem = await this.prisma.viagem.findUnique({
            where: { id },
            include: { projeto: true },
        });
        if (!viagem) {
            throw new common_1.NotFoundException(`Viagem com ID "${id}" não encontrada`);
        }
        return viagem;
    }
    async update(id, updateViagemDto) {
        const { projetoId, ...rest } = updateViagemDto;
        const currentViagem = await this.prisma.viagem.findUnique({ where: { id } });
        if (!currentViagem) {
            throw new common_1.NotFoundException(`Viagem com ID "${id}" não encontrada para atualização`);
        }
        if (projetoId) {
            const projeto = await this.prisma.projeto.findUnique({ where: { id: projetoId } });
            if (!projeto) {
                throw new common_1.NotFoundException(`Projeto com ID "${projetoId}" não encontrado.`);
            }
        }
        const dataToUpdate = { ...rest };
        const valorDiariaForCalc = updateViagemDto.valorDiaria !== undefined
            ? updateViagemDto.valorDiaria
            : Number(currentViagem.valorDiaria);
        let valorPassagemForCalc = null;
        if (updateViagemDto.valorPassagem !== undefined) {
            valorPassagemForCalc = updateViagemDto.valorPassagem;
        }
        else if (currentViagem.valorPassagem !== null) {
            valorPassagemForCalc = Number(currentViagem.valorPassagem);
        }
        const fieldsForRecalculation = {
            quantidadePessoas: updateViagemDto.quantidadePessoas ?? currentViagem.quantidadePessoas,
            quantidadeDias: updateViagemDto.quantidadeDias ?? currentViagem.quantidadeDias,
            valorDiaria: valorDiariaForCalc,
            valorPassagem: valorPassagemForCalc,
        };
        const { totalDiarias, totalGeral } = this.calculateViagemTotals(fieldsForRecalculation);
        dataToUpdate.totalDiarias = new client_1.Prisma.Decimal(totalDiarias);
        dataToUpdate.totalGeral = new client_1.Prisma.Decimal(totalGeral);
        try {
            return await this.prisma.viagem.update({
                where: { id },
                data: dataToUpdate,
                include: { projeto: true },
            });
        }
        catch (error) {
            if (error.code === "P2025") {
                throw new common_1.NotFoundException(`Viagem com ID "${id}" não encontrada para atualização`);
            }
            throw error;
        }
    }
    async remove(id) {
        try {
            return await this.prisma.viagem.delete({
                where: { id },
            });
        }
        catch (error) {
            if (error.code === "P2025") {
                throw new common_1.NotFoundException(`Viagem com ID "${id}" não encontrada para remoção`);
            }
            throw error;
        }
    }
};
exports.ViagensService = ViagensService;
exports.ViagensService = ViagensService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ViagensService);
//# sourceMappingURL=viagens.service.js.map