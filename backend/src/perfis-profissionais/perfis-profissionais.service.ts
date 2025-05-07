import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePerfilProfissionalDto } from './dto/create-perfil-profissional.dto';
import { UpdatePerfilProfissionalDto } from './dto/update-perfil-profissional.dto';
import { CreateCustoRhDto } from './dto/create-custo-rh.dto';
import { UpdateCustoRhDto } from './dto/update-custo-rh.dto';
import { PerfilProfissional, CustoRH } from '@prisma/client';

@Injectable()
export class PerfisProfissionaisService {
  constructor(private prisma: PrismaService) {}

  // PerfilProfissional CRUD
  async createPerfil(dto: CreatePerfilProfissionalDto): Promise<PerfilProfissional> {
    return this.prisma.perfilProfissional.create({
      data: dto,
    });
  }

  async findAllPerfis(): Promise<PerfilProfissional[]> {
    return this.prisma.perfilProfissional.findMany({ include: { custosRH: true } });
  }

  async findOnePerfil(id: string): Promise<PerfilProfissional> {
    const perfil = await this.prisma.perfilProfissional.findUnique({
      where: { id },
      include: { custosRH: true },
    });
    if (!perfil) {
      throw new NotFoundException(`Perfil Profissional com ID "${id}" não encontrado`);
    }
    return perfil;
  }

  async updatePerfil(id: string, dto: UpdatePerfilProfissionalDto): Promise<PerfilProfissional> {
    try {
      return await this.prisma.perfilProfissional.update({
        where: { id },
        data: dto,
        include: { custosRH: true },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Perfil Profissional com ID "${id}" não encontrado para atualização`);
      }
      throw error;
    }
  }

  async removePerfil(id: string): Promise<PerfilProfissional> {
    // Check for related CustoRH records first to avoid foreign key constraint errors if desired
    // Or handle it at the database level with cascade options in Prisma schema
    const custosCount = await this.prisma.custoRH.count({ where: { perfilProfissionalId: id } });
    if (custosCount > 0) {
        throw new ConflictException(`Perfil Profissional com ID "${id}" possui Custos de RH associados e não pode ser removido diretamente.`);
    }
    const alocacoesCount = await this.prisma.alocacao.count({ where: { perfilProfissionalId: id } });
    if (alocacoesCount > 0) {
        throw new ConflictException(`Perfil Profissional com ID "${id}" possui Alocações associadas e não pode ser removido diretamente.`);
    }

    try {
      return await this.prisma.perfilProfissional.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Perfil Profissional com ID "${id}" não encontrado para remoção`);
      }
      throw error;
    }
  }

  // CustoRH Management
  async createCustoRh(dto: CreateCustoRhDto): Promise<CustoRH> {
    const perfil = await this.prisma.perfilProfissional.findUnique({
        where: { id: dto.perfilProfissionalId }
    });
    if (!perfil) {
        throw new NotFoundException(`Perfil Profissional com ID "${dto.perfilProfissionalId}" não encontrado para associar Custo de RH.`);
    }
    return this.prisma.custoRH.create({
      data: dto,
    });
  }

  async findCustoRhByPerfilAndMesAno(perfilId: string, mes: number, ano: number): Promise<CustoRH | null> {
    return this.prisma.custoRH.findUnique({
      where: {
        perfilProfissionalId_mes_ano: {
          perfilProfissionalId: perfilId,
          mes: mes,
          ano: ano,
        },
      },
    });
  }

  async findAllCustosRhByPerfil(perfilId: string): Promise<CustoRH[]> {
    return this.prisma.custoRH.findMany({
        where: { perfilProfissionalId: perfilId }
    });
  }

  async updateCustoRh(id: string, dto: UpdateCustoRhDto): Promise<CustoRH> {
    if (dto.perfilProfissionalId) {
        const perfil = await this.prisma.perfilProfissional.findUnique({
            where: { id: dto.perfilProfissionalId }
        });
        if (!perfil) {
            throw new NotFoundException(`Perfil Profissional com ID "${dto.perfilProfissionalId}" não encontrado para associar Custo de RH.`);
        }
    }
    try {
      return await this.prisma.custoRH.update({
        where: { id },
        data: dto,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Custo de RH com ID "${id}" não encontrado para atualização`);
      }
      throw error;
    }
  }

  async removeCustoRh(id: string): Promise<CustoRH> {
    try {
      return await this.prisma.custoRH.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Custo de RH com ID "${id}" não encontrado para remoção`);
      }
      throw error;
    }
  }
}

