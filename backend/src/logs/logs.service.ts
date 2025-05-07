import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLogDto, LogLevel } from './dto/create-log.dto';

@Injectable()
export class LogsService {
  constructor(private prisma: PrismaService) {}

  async create(createLogDto: CreateLogDto) {
    const { level, message, context, userId } = createLogDto;
    return this.prisma.log.create({
      data: {
        level: level,
        message: message,
        meta: {
          ...(context && { context }), // Adiciona context a meta se existir
          ...(userId && { userId }),   // Adiciona userId a meta se existir
        },
        // O campo userId no modelo Log do schema.prisma foi removido, 
        // mas se você o tivesse e quisesse um campo dedicado, 
        // o schema.prisma precisaria ser ajustado e uma nova migração gerada.
        // Por agora, estamos incluindo no `meta`.
      },
    });
  }

  async findAll(params: { skip?: number; take?: number; cursor?: any; where?: any; orderBy?: any }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.log.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }
}

