import { IsString, IsNotEmpty, IsOptional, IsDateString, IsUUID } from 'class-validator';

export class CreateProjetoDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  codigo: string;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsDateString()
  @IsNotEmpty()
  dataInicio: string; // ISO8601 date string

  @IsDateString()
  @IsOptional()
  dataFim?: string; // ISO8601 date string

  @IsString()
  @IsNotEmpty()
  status: string; // Ex: "Em Andamento", "Concluído", "Cancelado"

  @IsUUID()
  @IsNotEmpty()
  clienteId: string;
}

