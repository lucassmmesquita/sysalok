import { UsuariosService } from "./usuarios.service";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { UpdateUsuarioDto } from "./dto/update-usuario.dto";
export declare class UsuariosController {
    private readonly usuariosService;
    constructor(usuariosService: UsuariosService);
    create(createUsuarioDto: CreateUsuarioDto): Promise<Omit<{
        id: string;
        nome: string;
        email: string;
        senha: string;
        role: import(".prisma/client").$Enums.UserRole;
        createdAt: Date;
        updatedAt: Date;
    }, "senha">>;
    findAll(): Promise<Omit<{
        id: string;
        nome: string;
        email: string;
        senha: string;
        role: import(".prisma/client").$Enums.UserRole;
        createdAt: Date;
        updatedAt: Date;
    }, "senha">[]>;
    findOne(id: string): Promise<Omit<{
        id: string;
        nome: string;
        email: string;
        senha: string;
        role: import(".prisma/client").$Enums.UserRole;
        createdAt: Date;
        updatedAt: Date;
    }, "senha">>;
    update(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<Omit<{
        id: string;
        nome: string;
        email: string;
        senha: string;
        role: import(".prisma/client").$Enums.UserRole;
        createdAt: Date;
        updatedAt: Date;
    }, "senha">>;
    remove(id: string): Promise<Omit<{
        id: string;
        nome: string;
        email: string;
        senha: string;
        role: import(".prisma/client").$Enums.UserRole;
        createdAt: Date;
        updatedAt: Date;
    }, "senha">>;
    login(loginDto: Pick<CreateUsuarioDto, 'email' | 'senha'>): Promise<Omit<{
        id: string;
        nome: string;
        email: string;
        senha: string;
        role: import(".prisma/client").$Enums.UserRole;
        createdAt: Date;
        updatedAt: Date;
    }, "senha">>;
}
