import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateRubricaDto } from "./dto/create-rubrica.dto";
import { UpdateRubricaDto } from "./dto/update-rubrica.dto";
import { Rubrica, Prisma, Alocacao } from "@prisma/client"; // Import Alocacao here

@Injectable()
export class RubricasService {
  constructor(private prisma: PrismaService) {}

  async create(createRubricaDto: CreateRubricaDto): Promise<Rubrica> {
    const { projetoId, ...rest } = createRubricaDto;

    const projeto = await this.prisma.projeto.findUnique({ where: { id: projetoId } });
    if (!projeto) {
      throw new NotFoundException(`Projeto com ID "${projetoId}" não encontrado.`);
    }

    return this.prisma.rubrica.create({
      data: {
        ...rest,
        projetoId,
        dataReferencia: rest.dataReferencia ? new Date(rest.dataReferencia) : new Date(),
      },
    });
  }

  async findAll(): Promise<Rubrica[]> {
    return this.prisma.rubrica.findMany({ include: { projeto: true } });
  }

  async findOne(id: string): Promise<Rubrica> {
    const rubrica = await this.prisma.rubrica.findUnique({
      where: { id },
      include: { projeto: true },
    });
    if (!rubrica) {
      throw new NotFoundException(`Rubrica com ID "${id}" não encontrada`);
    }
    return rubrica;
  }

  async update(id: string, updateRubricaDto: UpdateRubricaDto): Promise<Rubrica> {
    const { projetoId, ...rest } = updateRubricaDto;

    if (projetoId) {
      const projeto = await this.prisma.projeto.findUnique({ where: { id: projetoId } });
      if (!projeto) {
        throw new NotFoundException(`Projeto com ID "${projetoId}" não encontrado.`);
      }
    }
    
    const dataToUpdate: Prisma.RubricaUpdateInput = { ...rest };
    if (rest.dataReferencia) {
        dataToUpdate.dataReferencia = new Date(rest.dataReferencia);
    }

    try {
      return await this.prisma.rubrica.update({
        where: { id },
        data: dataToUpdate,
        include: { projeto: true },
      });
    } catch (error) {
      if (error.code === "P2025") {
        throw new NotFoundException(`Rubrica com ID "${id}" não encontrada para atualização`);
      }
      throw error;
    }
  }

  async remove(id: string): Promise<Rubrica> {
    try {
      return await this.prisma.rubrica.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === "P2025") {
        throw new NotFoundException(`Rubrica com ID "${id}" não encontrada para remoção`);
      }
      throw error;
    }
  }

  // Basic consolidation logic - can be expanded
  async consolidarCustosProjeto(projetoId: string): Promise<any> {
    const alocacoes = await this.prisma.alocacao.findMany({
      where: { projetoId },
      include: { perfilProfissional: { include: { custosRH: true } } },
    });

    const viagens = await this.prisma.viagem.findMany({
      where: { projetoId },
    });

    let custoTotalRH = new Prisma.Decimal(0);
    alocacoes.forEach(aloc => {
      for (let i = 1; i <= 30; i++) {
        const mesKey = `mes${String(i).padStart(2, '0')}` as keyof Alocacao;
        const alocacaoNoMesValue = aloc[mesKey]; // This is Prisma.Decimal | null
        
        if (alocacaoNoMesValue !== null && alocacaoNoMesValue !== undefined && Number(alocacaoNoMesValue) > 0) {
          
          const alocacaoNoMes = Number(alocacaoNoMesValue);
          // Simplified: Assumes a CustoRH entry for each month of alocacao or uses base from PerfilProfissional
          // A more robust solution would fetch CustoRH for the specific month/year of the project's duration
          const custoPerfilDecimal = aloc.perfilProfissional.custosRH[0]?.custoMensal || aloc.perfilProfissional.custoMensal || new Prisma.Decimal(0);
          const custoPerfil = Number(custoPerfilDecimal);
          custoTotalRH = custoTotalRH.plus(new Prisma.Decimal(alocacaoNoMes * custoPerfil));
        }
      }
    });

    let custoTotalViagensDecimal = new Prisma.Decimal(0);
    viagens.forEach(viagem => {
        if (viagem.totalGeral) {
            custoTotalViagensDecimal = custoTotalViagensDecimal.plus(viagem.totalGeral);
        }
    });
    const custoTotalViagens = Number(custoTotalViagensDecimal);

    // Optionally, create/update Rubrica entries here or just return the consolidated data
    // Example: Create Rubrica for RH
    // await this.create({ projetoId, categoriaCusto: "RH", valor: Number(custoTotalRH) });
    // await this.create({ projetoId, categoriaCusto: "Viagem", valor: custoTotalViagens });

    return {
      projetoId,
      custoTotalRH: Number(custoTotalRH),
      custoTotalViagens,
      custoTotalProjeto: Number(custoTotalRH) + custoTotalViagens,
    };
  }
}

