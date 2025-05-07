import { IsString, IsNotEmpty, IsOptional, IsUUID, IsNumber, Min, IsInt, IsDateString, Max } from 'class-validator';

export class CreateRubricaDto {
  @IsUUID()
  @IsNotEmpty()
  projetoId: string;

  @IsString()
  @IsNotEmpty()
  categoriaCusto: string; // Ex: "RH", "Viagem", "Outros"

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  valor: number;

  @IsInt()
  @Min(1)
  @Max(12)
  @IsOptional()
  mes?: number;

  @IsInt()
  @Min(2000)
  @IsOptional()
  ano?: number;

  @IsDateString()
  @IsOptional()
  dataReferencia?: string; // ISO8601 date string, defaults to now() in schema
}

