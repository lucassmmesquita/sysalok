import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Assuming PrismaService is in a shared prisma module
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from '@prisma/client';

@Injectable()
export class ClientesService {
  constructor(private prisma: PrismaService) {}

  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    return this.prisma.cliente.create({
      data: createClienteDto,
    });
  }

  async findAll(): Promise<Cliente[]> {
    return this.prisma.cliente.findMany();
  }

  async findOne(id: string): Promise<Cliente> {
    const cliente = await this.prisma.cliente.findUnique({
      where: { id },
    });
    if (!cliente) {
      throw new NotFoundException(`Cliente com ID "${id}" não encontrado`);
    }
    return cliente;
  }

  async update(id: string, updateClienteDto: UpdateClienteDto): Promise<Cliente> {
    try {
      return await this.prisma.cliente.update({
        where: { id },
        data: updateClienteDto,
      });
    } catch (error) {
      // Prisma P2025: Record to update not found
      if (error.code === 'P2025') {
        throw new NotFoundException(`Cliente com ID "${id}" não encontrado para atualização`);
      }
      throw error;
    }
  }

  async remove(id: string): Promise<Cliente> {
    try {
      return await this.prisma.cliente.delete({
        where: { id },
      });
    } catch (error) {
      // Prisma P2025: Record to delete not found
      if (error.code === 'P2025') {
        throw new NotFoundException(`Cliente com ID "${id}" não encontrado para remoção`);
      }
      throw error;
    }
  }
}

