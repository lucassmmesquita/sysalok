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
exports.PerfisProfissionaisService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PerfisProfissionaisService = class PerfisProfissionaisService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createPerfil(dto) {
        return this.prisma.perfilProfissional.create({
            data: dto,
        });
    }
    async findAllPerfis() {
        return this.prisma.perfilProfissional.findMany({ include: { custosRH: true } });
    }
    async findOnePerfil(id) {
        const perfil = await this.prisma.perfilProfissional.findUnique({
            where: { id },
            include: { custosRH: true },
        });
        if (!perfil) {
            throw new common_1.NotFoundException(`Perfil Profissional com ID "${id}" não encontrado`);
        }
        return perfil;
    }
    async updatePerfil(id, dto) {
        try {
            return await this.prisma.perfilProfissional.update({
                where: { id },
                data: dto,
                include: { custosRH: true },
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.NotFoundException(`Perfil Profissional com ID "${id}" não encontrado para atualização`);
            }
            throw error;
        }
    }
    async removePerfil(id) {
        const custosCount = await this.prisma.custoRH.count({ where: { perfilProfissionalId: id } });
        if (custosCount > 0) {
            throw new common_1.ConflictException(`Perfil Profissional com ID "${id}" possui Custos de RH associados e não pode ser removido diretamente.`);
        }
        const alocacoesCount = await this.prisma.alocacao.count({ where: { perfilProfissionalId: id } });
        if (alocacoesCount > 0) {
            throw new common_1.ConflictException(`Perfil Profissional com ID "${id}" possui Alocações associadas e não pode ser removido diretamente.`);
        }
        try {
            return await this.prisma.perfilProfissional.delete({
                where: { id },
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.NotFoundException(`Perfil Profissional com ID "${id}" não encontrado para remoção`);
            }
            throw error;
        }
    }
    async createCustoRh(dto) {
        const perfil = await this.prisma.perfilProfissional.findUnique({
            where: { id: dto.perfilProfissionalId }
        });
        if (!perfil) {
            throw new common_1.NotFoundException(`Perfil Profissional com ID "${dto.perfilProfissionalId}" não encontrado para associar Custo de RH.`);
        }
        return this.prisma.custoRH.create({
            data: dto,
        });
    }
    async findCustoRhByPerfilAndMesAno(perfilId, mes, ano) {
        return this.prisma.custoRH.findUnique({
            where: {
                perfilProfissionalId_mes_ano: {
                    perfilProfissionalId: perfilId,
                    mes: mes,
                    ano: ano,
                },
            },
        });
    }
    async findAllCustosRhByPerfil(perfilId) {
        return this.prisma.custoRH.findMany({
            where: { perfilProfissionalId: perfilId }
        });
    }
    async updateCustoRh(id, dto) {
        if (dto.perfilProfissionalId) {
            const perfil = await this.prisma.perfilProfissional.findUnique({
                where: { id: dto.perfilProfissionalId }
            });
            if (!perfil) {
                throw new common_1.NotFoundException(`Perfil Profissional com ID "${dto.perfilProfissionalId}" não encontrado para associar Custo de RH.`);
            }
        }
        try {
            return await this.prisma.custoRH.update({
                where: { id },
                data: dto,
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.NotFoundException(`Custo de RH com ID "${id}" não encontrado para atualização`);
            }
            throw error;
        }
    }
    async removeCustoRh(id) {
        try {
            return await this.prisma.custoRH.delete({
                where: { id },
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.NotFoundException(`Custo de RH com ID "${id}" não encontrado para remoção`);
            }
            throw error;
        }
    }
};
exports.PerfisProfissionaisService = PerfisProfissionaisService;
exports.PerfisProfissionaisService = PerfisProfissionaisService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PerfisProfissionaisService);
//# sourceMappingURL=perfis-profissionais.service.js.map