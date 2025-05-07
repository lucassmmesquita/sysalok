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
exports.ClientesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ClientesService = class ClientesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createClienteDto) {
        return this.prisma.cliente.create({
            data: createClienteDto,
        });
    }
    async findAll() {
        return this.prisma.cliente.findMany();
    }
    async findOne(id) {
        const cliente = await this.prisma.cliente.findUnique({
            where: { id },
        });
        if (!cliente) {
            throw new common_1.NotFoundException(`Cliente com ID "${id}" não encontrado`);
        }
        return cliente;
    }
    async update(id, updateClienteDto) {
        try {
            return await this.prisma.cliente.update({
                where: { id },
                data: updateClienteDto,
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.NotFoundException(`Cliente com ID "${id}" não encontrado para atualização`);
            }
            throw error;
        }
    }
    async remove(id) {
        try {
            return await this.prisma.cliente.delete({
                where: { id },
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.NotFoundException(`Cliente com ID "${id}" não encontrado para remoção`);
            }
            throw error;
        }
    }
};
exports.ClientesService = ClientesService;
exports.ClientesService = ClientesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ClientesService);
//# sourceMappingURL=clientes.service.js.map