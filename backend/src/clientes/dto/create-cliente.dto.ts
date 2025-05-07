import { IsString, IsNotEmpty, IsOptional, IsEmail, Length } from 'class-validator';

export class CreateClienteDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  @Length(14, 18) // CNPJ format with or without punctuation
  cnpj: string;

  @IsString()
  @IsOptional()
  responsavel?: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  contato?: string;

  @IsString()
  @IsOptional()
  endereco?: string;
}

