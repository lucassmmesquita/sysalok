import { IsString, IsOptional, IsUUID, IsNumber, Min, Max, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

// This is a simplified representation for the 30 months.
// In a real scenario, you might want a more dynamic way or a sub-entity if these months have more properties.
class MesesAlocacaoUpdateDto {
  @IsNumber()
  @IsOptional()
  @Min(0)
  mes01?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes02?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes03?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes04?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes05?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes06?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes07?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes08?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes09?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes10?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes11?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes12?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes13?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes14?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes15?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes16?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes17?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes18?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes19?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes20?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes21?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes22?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes23?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes24?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes25?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes26?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes27?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes28?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes29?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes30?: number;
}

export class UpdateAlocacaoDto {
  @IsUUID()
  @IsOptional()
  projetoId?: string;

  @IsUUID()
  @IsOptional()
  perfilProfissionalId?: string;

  @IsString()
  @IsOptional()
  squad?: string;

  @IsString()
  @IsOptional()
  origem?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes01?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes02?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes03?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes04?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes05?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes06?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes07?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes08?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes09?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes10?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes11?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes12?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes13?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes14?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes15?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes16?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes17?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes18?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes19?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes20?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes21?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes22?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes23?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes24?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes25?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes26?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes27?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes28?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes29?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mes30?: number;
}

