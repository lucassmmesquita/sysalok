import { PrismaService } from "../prisma/prisma.service";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { UpdateUsuarioDto } from "./dto/update-usuario.dto";
import { Usuario } from "@prisma/client";
export declare class UsuariosService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUsuarioDto: CreateUsuarioDto): Promise<Omit<Usuario, 'senha'>>;
    findAll(): Promise<Omit<Usuario, 'senha'>[]>;
    findOne(id: string): Promise<Omit<Usuario, 'senha'>>;
    findByEmail(email: string): Promise<Usuario | null>;
    update(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<Omit<Usuario, 'senha'>>;
    remove(id: string): Promise<Omit<Usuario, 'senha'>>;
    validateUser(email: string, pass: string): Promise<Omit<Usuario, 'senha'> | null>;
}
