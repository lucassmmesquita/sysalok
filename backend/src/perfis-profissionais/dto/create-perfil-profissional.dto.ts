import { IsString, IsNotEmpty, IsOptional, IsNumber, Min } from 'class-validator';

export class CreatePerfilProfissionalDto {
  @IsString()
  @IsNotEmpty()
  nome: string; // Ex: "Desenvolvedor Senior", "Gerente de Projetos"

  @IsString()
  @IsOptional()
  vinculo?: string; // Ex: "CLT", "PJ"

  @IsNumber()
  @IsOptional()
  @Min(0)
  remuneracao?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  custoMensal?: number; // Custo base, pode ser sobrescrito por CustoRH

  @IsNumber()
  @IsOptional()
  @Min(0)
  valorHora?: number; // Valor hora base
}

