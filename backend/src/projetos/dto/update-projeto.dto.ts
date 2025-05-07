import { IsString, IsOptional, IsDateString, IsUUID } from 'class-validator';

export class UpdateProjetoDto {
  @IsString()
  @IsOptional()
  nome?: string;

  @IsString()
  @IsOptional()
  codigo?: string;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsDateString()
  @IsOptional()
  dataInicio?: string; // ISO8601 date string

  @IsDateString()
  @IsOptional()
  dataFim?: string; // ISO8601 date string

  @IsString()
  @IsOptional()
  status?: string; // Ex: "Em Andamento", "Concluído", "Cancelado"

  @IsUUID()
  @IsOptional()
  clienteId?: string;
}

