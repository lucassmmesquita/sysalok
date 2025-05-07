import { IsString, IsOptional, IsEmail, Length } from 'class-validator';

export class UpdateClienteDto {
  @IsString()
  @IsOptional()
  nome?: string;

  @IsString()
  @IsOptional()
  @Length(14, 18) // CNPJ format with or without punctuation
  cnpj?: string;

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

