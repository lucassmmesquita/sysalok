import { IsString, IsOptional, IsUUID, IsNumber, Min, IsInt } from 'class-validator';

export class UpdateViagemDto {
  @IsUUID()
  @IsOptional()
  projetoId?: string;

  @IsString()
  @IsOptional()
  descricaoVisita?: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  quantidadePessoas?: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  quantidadeDias?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  valorDiaria?: number;

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
}

