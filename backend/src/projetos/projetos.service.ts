import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { UpdateProjetoDto } from './dto/update-projeto.dto';
import { Projeto } from '@prisma/client';

@Injectable()
export class ProjetosService {
  constructor(private prisma: PrismaService) {}

  async create(createProjetoDto: CreateProjetoDto): Promise<Projeto> {
    // Ensure client exists before creating project
    const cliente = await this.prisma.cliente.findUnique({
      where: { id: createProjetoDto.clienteId },
    });
    if (!cliente) {
      throw new NotFoundException(`Cliente com ID "${createProjetoDto.clienteId}" não encontrado para associar ao projeto.`);
    }
    return this.prisma.projeto.create({
      data: createProjetoDto,
    });
  }

  async findAll(): Promise<Projeto[]> {
    return this.prisma.projeto.findMany({ include: { cliente: true } });
  }

  async findOne(id: string): Promise<Projeto> {
    const projeto = await this.prisma.projeto.findUnique({
      where: { id },
      include: { cliente: true },
    });
    if (!projeto) {
      throw new NotFoundException(`Projeto com ID "${id}" não encontrado`);
    }
    return projeto;
  }

  async update(id: string, updateProjetoDto: UpdateProjetoDto): Promise<Projeto> {
    if (updateProjetoDto.clienteId) {
      const cliente = await this.prisma.cliente.findUnique({
        where: { id: updateProjetoDto.clienteId },
      });
      if (!cliente) {
        throw new NotFoundException(`Cliente com ID "${updateProjetoDto.clienteId}" não encontrado para associar ao projeto.`);
      }
    }
    try {
      return await this.prisma.projeto.update({
        where: { id },
        data: updateProjetoDto,
        include: { cliente: true },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Projeto com ID "${id}" não encontrado para atualização`);
      }
      throw error;
    }
  }

  async remove(id: string): Promise<Projeto> {
    try {
      return await this.prisma.projeto.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Projeto com ID "${id}" não encontrado para remoção`);
      }
      throw error;
    }
  }
}

