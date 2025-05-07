import { IsString, IsNotEmpty, IsOptional, IsUUID, IsNumber, Min, IsInt } from 'class-validator';

export class CreateViagemDto {
  @IsUUID()
  @IsNotEmpty()
  projetoId: string;

  @IsString()
  @IsOptional()
  descricaoVisita?: string;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  quantidadePessoas: number;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  quantidadeDias: number;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  valorDiaria: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  valorPassagem?: number;

  @IsString()
  @IsOptional()
  origem?: string;

  @IsString()
  @IsOptional()
  destino?: string;

  @IsString()
  @IsOptional()
  tipoTransporte?: string;

  // totalDiarias and totalGeral will be calculated in the service
}

