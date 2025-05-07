import { PerfisProfissionaisService } from './perfis-profissionais.service';
import { CreatePerfilProfissionalDto } from './dto/create-perfil-profissional.dto';
import { UpdatePerfilProfissionalDto } from './dto/update-perfil-profissional.dto';
import { CreateCustoRhDto } from './dto/create-custo-rh.dto';
import { UpdateCustoRhDto } from './dto/update-custo-rh.dto';
export declare class PerfisProfissionaisController {
    private readonly perfisProfissionaisService;
    constructor(perfisProfissionaisService: PerfisProfissionaisService);
    createPerfil(createPerfilDto: CreatePerfilProfissionalDto): Promise<{
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date;
        vinculo: string | null;
        remuneracao: import("@prisma/client/runtime/library").Decimal | null;
        custoMensal: import("@prisma/client/runtime/library").Decimal | null;
        valorHora: import("@prisma/client/runtime/library").Decimal | null;
    }>;
    findAllPerfis(): Promise<{
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date;
        vinculo: string | null;
        remuneracao: import("@prisma/client/runtime/library").Decimal | null;
        custoMensal: import("@prisma/client/runtime/library").Decimal | null;
        valorHora: import("@prisma/client/runtime/library").Decimal | null;
    }[]>;
    findOnePerfil(id: string): Promise<{
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date;
        vinculo: string | null;
        remuneracao: import("@prisma/client/runtime/library").Decimal | null;
        custoMensal: import("@prisma/client/runtime/library").Decimal | null;
        valorHora: import("@prisma/client/runtime/library").Decimal | null;
    }>;
    updatePerfil(id: string, updatePerfilDto: UpdatePerfilProfissionalDto): Promise<{
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date;
        vinculo: string | null;
        remuneracao: import("@prisma/client/runtime/library").Decimal | null;
        custoMensal: import("@prisma/client/runtime/library").Decimal | null;
        valorHora: import("@prisma/client/runtime/library").Decimal | null;
    }>;
    removePerfil(id: string): Promise<{
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date;
        vinculo: string | null;
        remuneracao: import("@prisma/client/runtime/library").Decimal | null;
        custoMensal: import("@prisma/client/runtime/library").Decimal | null;
        valorHora: import("@prisma/client/runtime/library").Decimal | null;
    }>;
    createCustoRh(perfilId: string, createCustoRhDto: Omit<CreateCustoRhDto, 'perfilProfissionalId'>): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        custoMensal: import("@prisma/client/runtime/library").Decimal;
        valorHora: import("@prisma/client/runtime/library").Decimal;
        perfilProfissionalId: string;
        mes: number;
        ano: number;
    }>;
    findAllCustosRhByPerfil(perfilId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        custoMensal: import("@prisma/client/runtime/library").Decimal;
        valorHora: import("@prisma/client/runtime/library").Decimal;
        perfilProfissionalId: string;
        mes: number;
        ano: number;
    }[]>;
    findCustoRhByPerfilAndMesAno(perfilId: string, mes: number, ano: number): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        custoMensal: import("@prisma/client/runtime/library").Decimal;
        valorHora: import("@prisma/client/runtime/library").Decimal;
        perfilProfissionalId: string;
        mes: number;
        ano: number;
    } | null>;
    updateCustoRh(custoId: string, updateCustoRhDto: UpdateCustoRhDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        custoMensal: import("@prisma/client/runtime/library").Decimal;
        valorHora: import("@prisma/client/runtime/library").Decimal;
        perfilProfissionalId: string;
        mes: number;
        ano: number;
    }>;
    removeCustoRh(custoId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        custoMensal: import("@prisma/client/runtime/library").Decimal;
        valorHora: import("@prisma/client/runtime/library").Decimal;
        perfilProfissionalId: string;
        mes: number;
        ano: number;
    }>;
}
