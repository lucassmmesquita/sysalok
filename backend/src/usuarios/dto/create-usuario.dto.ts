import { IsString, IsNotEmpty, IsEmail, MinLength, IsEnum, IsOptional } from 'class-validator';
import { UserRole } from '@prisma/client'; // Assuming UserRole enum is defined in Prisma schema

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6) // Basic password length requirement
  senha: string;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}

