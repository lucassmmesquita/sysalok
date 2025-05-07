import { IsString, IsOptional, IsNumber, Min, IsInt, Max, IsUUID } from 'class-validator';

export class UpdateCustoRhDto {
  @IsUUID()
  @IsOptional()
  perfilProfissionalId?: string;

  @IsInt()
  @Min(1)
  @Max(12)
  @IsOptional()
  mes?: number;

  @IsInt()
  @Min(2000)
  @IsOptional()
  ano?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  custoMensal?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  valorHora?: number;
}

