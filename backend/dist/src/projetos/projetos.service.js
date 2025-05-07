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
exports.ProjetosService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProjetosService = class ProjetosService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createProjetoDto) {
        const cliente = await this.prisma.cliente.findUnique({
            where: { id: createProjetoDto.clienteId },
        });
        if (!cliente) {
            throw new common_1.NotFoundException(`Cliente com ID "${createProjetoDto.clienteId}" não encontrado para associar ao projeto.`);
        }
        return this.prisma.projeto.create({
            data: createProjetoDto,
        });
    }
    async findAll() {
        return this.prisma.projeto.findMany({ include: { cliente: true } });
    }
    async findOne(id) {
        const projeto = await this.prisma.projeto.findUnique({
            where: { id },
            include: { cliente: true },
        });
        if (!projeto) {
            throw new common_1.NotFoundException(`Projeto com ID "${id}" não encontrado`);
        }
        return projeto;
    }
    async update(id, updateProjetoDto) {
        if (updateProjetoDto.clienteId) {
            const cliente = await this.prisma.cliente.findUnique({
                where: { id: updateProjetoDto.clienteId },
            });
            if (!cliente) {
                throw new common_1.NotFoundException(`Cliente com ID "${updateProjetoDto.clienteId}" não encontrado para associar ao projeto.`);
            }
        }
        try {
            return await this.prisma.projeto.update({
                where: { id },
                data: updateProjetoDto,
                include: { cliente: true },
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.NotFoundException(`Projeto com ID "${id}" não encontrado para atualização`);
            }
            throw error;
        }
    }
    async remove(id) {
        try {
            return await this.prisma.projeto.delete({
                where: { id },
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.NotFoundException(`Projeto com ID "${id}" não encontrado para remoção`);
            }
            throw error;
        }
    }
};
exports.ProjetosService = ProjetosService;
exports.ProjetosService = ProjetosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProjetosService);
//# sourceMappingURL=projetos.service.js.map