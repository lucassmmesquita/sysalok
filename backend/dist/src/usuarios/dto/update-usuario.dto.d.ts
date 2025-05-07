import { UserRole } from '@prisma/client';
export declare class UpdateUsuarioDto {
    nome?: string;
    email?: string;
    senha?: string;
    role?: UserRole;
}
