import { IsString, IsOptional, IsNumber, Min } from 'class-validator';

export class UpdatePerfilProfissionalDto {
  @IsString()
  @IsOptional()
  nome?: string;

  @IsString()
  @IsOptional()
  vinculo?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  remuneracao?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  custoMensal?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  valorHora?: number;
}

