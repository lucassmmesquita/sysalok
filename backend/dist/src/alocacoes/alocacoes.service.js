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
exports.AlocacoesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AlocacoesService = class AlocacoesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    calculateTotalAlocado(dto) {
        let total = 0;
        for (let i = 1; i <= 30; i++) {
            const mesKey = `mes${String(i).padStart(2, '0')}`;
            if (dto[mesKey] && typeof dto[mesKey] === 'number') {
                total += dto[mesKey];
            }
        }
        return total;
    }
    async create(createAlocacaoDto) {
        const { projetoId, perfilProfissionalId, ...rest } = createAlocacaoDto;
        const projeto = await this.prisma.projeto.findUnique({ where: { id: projetoId } });
        if (!projeto) {
            throw new common_1.NotFoundException(`Projeto com ID "${projetoId}" não encontrado.`);
        }
        const perfil = await this.prisma.perfilProfissional.findUnique({ where: { id: perfilProfissionalId } });
        if (!perfil) {
            throw new common_1.NotFoundException(`Perfil Profissional com ID "${perfilProfissionalId}" não encontrado.`);
        }
        const totalAlocado = this.calculateTotalAlocado(createAlocacaoDto);
        return this.prisma.alocacao.create({
            data: {
                ...rest,
                projetoId,
                perfilProfissionalId,
                totalAlocado,
            },
        });
    }
    async findAll() {
        return this.prisma.alocacao.findMany({ include: { projeto: true, perfilProfissional: true } });
    }
    async findOne(id) {
        const alocacao = await this.prisma.alocacao.findUnique({
            where: { id },
            include: { projeto: true, perfilProfissional: true },
        });
        if (!alocacao) {
            throw new common_1.NotFoundException(`Alocação com ID "${id}" não encontrada`);
        }
        return alocacao;
    }
    async update(id, updateAlocacaoDto) {
        const { projetoId, perfilProfissionalId, ...rest } = updateAlocacaoDto;
        if (projetoId) {
            const projeto = await this.prisma.projeto.findUnique({ where: { id: projetoId } });
            if (!projeto) {
                throw new common_1.NotFoundException(`Projeto com ID "${projetoId}" não encontrado.`);
            }
        }
        if (perfilProfissionalId) {
            const perfil = await this.prisma.perfilProfissional.findUnique({ where: { id: perfilProfissionalId } });
            if (!perfil) {
                throw new common_1.NotFoundException(`Perfil Profissional com ID "${perfilProfissionalId}" não encontrado.`);
            }
        }
        const dataToUpdate = { ...rest };
        const totalAlocado = this.calculateTotalAlocado(updateAlocacaoDto);
        dataToUpdate.totalAlocado = totalAlocado;
        try {
            return await this.prisma.alocacao.update({
                where: { id },
                data: dataToUpdate,
                include: { projeto: true, perfilProfissional: true },
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.NotFoundException(`Alocação com ID "${id}" não encontrada para atualização`);
            }
            throw error;
        }
    }
    async remove(id) {
        try {
            return await this.prisma.alocacao.delete({
                where: { id },
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.NotFoundException(`Alocação com ID "${id}" não encontrada para remoção`);
            }
            throw error;
        }
    }
};
exports.AlocacoesService = AlocacoesService;
exports.AlocacoesService = AlocacoesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AlocacoesService);
//# sourceMappingURL=alocacoes.service.js.map