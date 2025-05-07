import { PrismaService } from '../prisma/prisma.service';
import { CreatePerfilProfissionalDto } from './dto/create-perfil-profissional.dto';
import { UpdatePerfilProfissionalDto } from './dto/update-perfil-profissional.dto';
import { CreateCustoRhDto } from './dto/create-custo-rh.dto';
import { UpdateCustoRhDto } from './dto/update-custo-rh.dto';
import { PerfilProfissional, CustoRH } from '@prisma/client';
export declare class PerfisProfissionaisService {
    private prisma;
    constructor(prisma: PrismaService);
    createPerfil(dto: CreatePerfilProfissionalDto): Promise<PerfilProfissional>;
    findAllPerfis(): Promise<PerfilProfissional[]>;
    findOnePerfil(id: string): Promise<PerfilProfissional>;
    updatePerfil(id: string, dto: UpdatePerfilProfissionalDto): Promise<PerfilProfissional>;
    removePerfil(id: string): Promise<PerfilProfissional>;
    createCustoRh(dto: CreateCustoRhDto): Promise<CustoRH>;
    findCustoRhByPerfilAndMesAno(perfilId: string, mes: number, ano: number): Promise<CustoRH | null>;
    findAllCustosRhByPerfil(perfilId: string): Promise<CustoRH[]>;
    updateCustoRh(id: string, dto: UpdateCustoRhDto): Promise<CustoRH>;
    removeCustoRh(id: string): Promise<CustoRH>;
}
