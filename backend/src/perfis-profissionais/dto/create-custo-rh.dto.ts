import { IsString, IsNotEmpty, IsNumber, Min, IsInt, Max, IsUUID } from 'class-validator';

export class CreateCustoRhDto {
  @IsUUID()
  @IsNotEmpty()
  perfilProfissionalId: string;

  @IsInt()
  @Min(1)
  @Max(12)
  @IsNotEmpty()
  mes: number;

  @IsInt()
  @Min(2000) // Assuming a reasonable minimum year
  @IsNotEmpty()
  ano: number;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  custoMensal: number;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  valorHora: number;
}

