import { IsString, IsOptional, IsUUID, IsNumber, Min, IsInt, IsDateString, Max } from 'class-validator';

export class UpdateRubricaDto {
  @IsUUID()
  @IsOptional()
  projetoId?: string;

  @IsString()
  @IsOptional()
  categoriaCusto?: string;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  valor?: number;

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
  dataReferencia?: string;
}

