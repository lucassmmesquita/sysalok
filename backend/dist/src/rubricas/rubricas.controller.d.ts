import { RubricasService } from "./rubricas.service";
import { CreateRubricaDto } from "./dto/create-rubrica.dto";
import { UpdateRubricaDto } from "./dto/update-rubrica.dto";
export declare class RubricasController {
    private readonly rubricasService;
    constructor(rubricasService: RubricasService);
    create(createRubricaDto: CreateRubricaDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        descricao: string | null;
        mes: number | null;
        ano: number | null;
        projetoId: string;
        categoriaCusto: string;
        valor: import("@prisma/client/runtime/library").Decimal;
        dataReferencia: Date;
    }>;
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        descricao: string | null;
        mes: number | null;
        ano: number | null;
        projetoId: string;
        categoriaCusto: string;
        valor: import("@prisma/client/runtime/library").Decimal;
        dataReferencia: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        descricao: string | null;
        mes: number | null;
        ano: number | null;
        projetoId: string;
        categoriaCusto: string;
        valor: import("@prisma/client/runtime/library").Decimal;
        dataReferencia: Date;
    }>;
    update(id: string, updateRubricaDto: UpdateRubricaDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        descricao: string | null;
        mes: number | null;
        ano: number | null;
        projetoId: string;
        categoriaCusto: string;
        valor: import("@prisma/client/runtime/library").Decimal;
        dataReferencia: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        descricao: string | null;
        mes: number | null;
        ano: number | null;
        projetoId: string;
        categoriaCusto: string;
        valor: import("@prisma/client/runtime/library").Decimal;
        dataReferencia: Date;
    }>;
    consolidarCustosProjeto(projetoId: string): Promise<any>;
}
