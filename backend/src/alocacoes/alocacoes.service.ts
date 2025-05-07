import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAlocacaoDto } from './dto/create-alocacao.dto';
import { UpdateAlocacaoDto } from './dto/update-alocacao.dto';
import { Alocacao, Prisma } from '@prisma/client';

@Injectable()
export class AlocacoesService {
  constructor(private prisma: PrismaService) {}

  private calculateTotalAlocado(dto: CreateAlocacaoDto | UpdateAlocacaoDto): number {
    let total = 0;
    for (let i = 1; i <= 30; i++) {
      const mesKey = `mes${String(i).padStart(2, '0')}` as keyof (CreateAlocacaoDto | UpdateAlocacaoDto);
      if (dto[mesKey] && typeof dto[mesKey] === 'number') {
        total += dto[mesKey] as number;
      }
    }
    return total;
  }

  async create(createAlocacaoDto: CreateAlocacaoDto): Promise<Alocacao> {
    const { projetoId, perfilProfissionalId, ...rest } = createAlocacaoDto;

    const projeto = await this.prisma.projeto.findUnique({ where: { id: projetoId } });
    if (!projeto) {
      throw new NotFoundException(`Projeto com ID "${projetoId}" não encontrado.`);
    }

    const perfil = await this.prisma.perfilProfissional.findUnique({ where: { id: perfilProfissionalId } });
    if (!perfil) {
      throw new NotFoundException(`Perfil Profissional com ID "${perfilProfissionalId}" não encontrado.`);
    }

    const totalAlocado = this.calculateTotalAlocado(createAlocacaoDto);

    return this.prisma.alocacao.create({
      data: {
        ...rest,
        projetoId,
        perfilProfissionalId,
        totalAlocado,
      },
    });
  }

  async findAll(): Promise<Alocacao[]> {
    return this.prisma.alocacao.findMany({ include: { projeto: true, perfilProfissional: true } });
  }

  async findOne(id: string): Promise<Alocacao> {
    const alocacao = await this.prisma.alocacao.findUnique({
      where: { id },
      include: { projeto: true, perfilProfissional: true },
    });
    if (!alocacao) {
      throw new NotFoundException(`Alocação com ID "${id}" não encontrada`);
    }
    return alocacao;
  }

  async update(id: string, updateAlocacaoDto: UpdateAlocacaoDto): Promise<Alocacao> {
    const { projetoId, perfilProfissionalId, ...rest } = updateAlocacaoDto;

    if (projetoId) {
      const projeto = await this.prisma.projeto.findUnique({ where: { id: projetoId } });
      if (!projeto) {
        throw new NotFoundException(`Projeto com ID "${projetoId}" não encontrado.`);
      }
    }

    if (perfilProfissionalId) {
      const perfil = await this.prisma.perfilProfissional.findUnique({ where: { id: perfilProfissionalId } });
      if (!perfil) {
        throw new NotFoundException(`Perfil Profissional com ID "${perfilProfissionalId}" não encontrado.`);
      }
    }
    
    const dataToUpdate: Prisma.AlocacaoUpdateInput = { ...rest };
    const totalAlocado = this.calculateTotalAlocado(updateAlocacaoDto);
    dataToUpdate.totalAlocado = totalAlocado;

    try {
      return await this.prisma.alocacao.update({
        where: { id },
        data: dataToUpdate,
        include: { projeto: true, perfilProfissional: true },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Alocação com ID "${id}" não encontrada para atualização`);
      }
      throw error;
    }
  }

  async remove(id: string): Promise<Alocacao> {
    try {
      return await this.prisma.alocacao.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Alocação com ID "${id}" não encontrada para remoção`);
      }
      throw error;
    }
  }
}

