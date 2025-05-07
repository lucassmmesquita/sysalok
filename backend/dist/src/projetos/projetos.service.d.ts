import { PrismaService } from '../prisma/prisma.service';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { UpdateProjetoDto } from './dto/update-projeto.dto';
import { Projeto } from '@prisma/client';
export declare class ProjetosService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createProjetoDto: CreateProjetoDto): Promise<Projeto>;
    findAll(): Promise<Projeto[]>;
    findOne(id: string): Promise<Projeto>;
    update(id: string, updateProjetoDto: UpdateProjetoDto): Promise<Projeto>;
    remove(id: string): Promise<Projeto>;
}
