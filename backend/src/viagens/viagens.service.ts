import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateViagemDto } from "./dto/create-viagem.dto";
import { UpdateViagemDto } from "./dto/update-viagem.dto";
import { Viagem, Prisma } from "@prisma/client";

@Injectable()
export class ViagensService {
  constructor(private prisma: PrismaService) {}

  // This function expects numbers for monetary values
  private calculateViagemTotals(dto: { quantidadePessoas: number; quantidadeDias: number; valorDiaria: number; valorPassagem?: number | null }): { totalDiarias: number; totalGeral: number } {
    const totalDiarias = dto.quantidadePessoas * dto.quantidadeDias * dto.valorDiaria;
    const totalGeral = totalDiarias + (dto.valorPassagem || 0);
    return { totalDiarias, totalGeral };
  }

  async create(createViagemDto: CreateViagemDto): Promise<Viagem> {
    const { projetoId, ...rest } = createViagemDto;

    const projeto = await this.prisma.projeto.findUnique({ where: { id: projetoId } });
    if (!projeto) {
      throw new NotFoundException(`Projeto com ID "${projetoId}" não encontrado.`);
    }

    // DTO already defines valorDiaria and valorPassagem as number, so direct use is fine.
    const { totalDiarias, totalGeral } = this.calculateViagemTotals(createViagemDto);

    return this.prisma.viagem.create({
      data: {
        ...rest,
        projetoId,
        totalDiarias: new Prisma.Decimal(totalDiarias),
        totalGeral: new Prisma.Decimal(totalGeral),
      },
    });
  }

  async findAll(): Promise<Viagem[]> {
    return this.prisma.viagem.findMany({ include: { projeto: true } });
  }

  async findOne(id: string): Promise<Viagem> {
    const viagem = await this.prisma.viagem.findUnique({
      where: { id },
      include: { projeto: true },
    });
    if (!viagem) {
      throw new NotFoundException(`Viagem com ID "${id}" não encontrada`);
    }
    return viagem;
  }

  async update(id: string, updateViagemDto: UpdateViagemDto): Promise<Viagem> {
    const { projetoId, ...rest } = updateViagemDto;

    const currentViagem = await this.prisma.viagem.findUnique({ where: { id } });
    if (!currentViagem) {
        throw new NotFoundException(`Viagem com ID "${id}" não encontrada para atualização`);
    }

    if (projetoId) {
      const projeto = await this.prisma.projeto.findUnique({ where: { id: projetoId } });
      if (!projeto) {
        throw new NotFoundException(`Projeto com ID "${projetoId}" não encontrado.`);
      }
    }
    
    const dataToUpdate: Prisma.ViagemUpdateInput = { ...rest };

    // Ensure values passed to calculateViagemTotals are numbers.
    // currentViagem values are Prisma.Decimal, DTO values are number.
    const valorDiariaForCalc =
      updateViagemDto.valorDiaria !== undefined
        ? updateViagemDto.valorDiaria
        : Number(currentViagem.valorDiaria);

    let valorPassagemForCalc: number | null = null;
    if (updateViagemDto.valorPassagem !== undefined) {
      valorPassagemForCalc = updateViagemDto.valorPassagem;
    } else if (currentViagem.valorPassagem !== null) {
      valorPassagemForCalc = Number(currentViagem.valorPassagem);
    }

    const fieldsForRecalculation = {
        quantidadePessoas: updateViagemDto.quantidadePessoas ?? currentViagem.quantidadePessoas,
        quantidadeDias: updateViagemDto.quantidadeDias ?? currentViagem.quantidadeDias,
        valorDiaria: valorDiariaForCalc,
        valorPassagem: valorPassagemForCalc,
    };

    const { totalDiarias, totalGeral } = this.calculateViagemTotals(fieldsForRecalculation);
    dataToUpdate.totalDiarias = new Prisma.Decimal(totalDiarias);
    dataToUpdate.totalGeral = new Prisma.Decimal(totalGeral);

    try {
      return await this.prisma.viagem.update({
        where: { id },
        data: dataToUpdate,
        include: { projeto: true },
      });
    } catch (error) {
      if (error.code === "P2025") {
        throw new NotFoundException(`Viagem com ID "${id}" não encontrada para atualização`);
      }
      throw error;
    }
  }

  async remove(id: string): Promise<Viagem> {
    try {
      return await this.prisma.viagem.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === "P2025") {
        throw new NotFoundException(`Viagem com ID "${id}" não encontrada para remoção`);
      }
      throw error;
    }
  }
}

