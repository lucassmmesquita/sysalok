import { UserRole } from '@prisma/client';
export declare class CreateUsuarioDto {
    nome: string;
    email: string;
    senha: string;
    role?: UserRole;
}
