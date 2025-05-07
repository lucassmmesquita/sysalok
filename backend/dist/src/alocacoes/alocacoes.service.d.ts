import { PrismaService } from '../prisma/prisma.service';
import { CreateAlocacaoDto } from './dto/create-alocacao.dto';
import { UpdateAlocacaoDto } from './dto/update-alocacao.dto';
import { Alocacao } from '@prisma/client';
export declare class AlocacoesService {
    private prisma;
    constructor(prisma: PrismaService);
    private calculateTotalAlocado;
    create(createAlocacaoDto: CreateAlocacaoDto): Promise<Alocacao>;
    findAll(): Promise<Alocacao[]>;
    findOne(id: string): Promise<Alocacao>;
    update(id: string, updateAlocacaoDto: UpdateAlocacaoDto): Promise<Alocacao>;
    remove(id: string): Promise<Alocacao>;
}
