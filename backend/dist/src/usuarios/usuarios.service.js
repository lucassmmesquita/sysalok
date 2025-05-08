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
exports.UsuariosService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
const bcrypt = require("bcryptjs");
let UsuariosService = class UsuariosService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUsuarioDto) {
        const { email, senha, ...rest } = createUsuarioDto;
        const existingUser = await this.prisma.usuario.findUnique({ where: { email } });
        if (existingUser) {
            throw new common_1.ConflictException(`Usuário com email "${email}" já existe.`);
        }
        const hashedPassword = await bcrypt.hash(senha, 10);
        const user = await this.prisma.usuario.create({
            data: {
                ...rest,
                email,
                senha: hashedPassword,
                role: rest.role || client_1.UserRole.COLABORADOR,
            },
        });
        const { senha: _, ...result } = user;
        return result;
    }
    async findAll() {
        const users = await this.prisma.usuario.findMany();
        return users.map(user => {
            const { senha, ...result } = user;
            return result;
        });
    }
    async findOne(id) {
        const user = await this.prisma.usuario.findUnique({
            where: { id },
        });
        if (!user) {
            throw new common_1.NotFoundException(`Usuário com ID "${id}" não encontrado`);
        }
        const { senha, ...result } = user;
        return result;
    }
    async findByEmail(email) {
        return this.prisma.usuario.findUnique({ where: { email } });
    }
    async update(id, updateUsuarioDto) {
        const { senha, ...rest } = updateUsuarioDto;
        const dataToUpdate = { ...rest };
        if (senha) {
            dataToUpdate.senha = await bcrypt.hash(senha, 10);
        }
        try {
            const updatedUser = await this.prisma.usuario.update({
                where: { id },
                data: dataToUpdate,
            });
            const { senha: _, ...result } = updatedUser;
            return result;
        }
        catch (error) {
            if (error.code === "P2025") {
                throw new common_1.NotFoundException(`Usuário com ID "${id}" não encontrado para atualização`);
            }
            if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
                throw new common_1.ConflictException(`Email "${updateUsuarioDto.email}" já está em uso.`);
            }
            throw error;
        }
    }
    async remove(id) {
        try {
            const user = await this.prisma.usuario.delete({
                where: { id },
            });
            const { senha, ...result } = user;
            return result;
        }
        catch (error) {
            if (error.code === "P2025") {
                throw new common_1.NotFoundException(`Usuário com ID "${id}" não encontrado para remoção`);
            }
            throw error;
        }
    }
    async validateUser(email, pass) {
        console.log(' validateUser email :', email);
        console.log(' validateUser senha :', pass);
        if (!email || !pass) {
            return null;
        }
        const user = await this.findByEmail(email);
        console.log(' validateUser user :', user);
        if (!user) {
            return null;
        }
        if (!user.senha || typeof user.senha !== 'string' || user.senha.trim() === '') {
            return null;
        }
        const isPasswordMatching = await bcrypt.compare(pass, user.senha);
        console.log(' isPasswordMatching :', isPasswordMatching);
        if (isPasswordMatching) {
            const { senha, ...result } = user;
            return result;
        }
        return null;
    }
};
exports.UsuariosService = UsuariosService;
exports.UsuariosService = UsuariosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsuariosService);
//# sourceMappingURL=usuarios.service.js.map