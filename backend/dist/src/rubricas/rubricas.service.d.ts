import { PrismaService } from "../prisma/prisma.service";
import { CreateRubricaDto } from "./dto/create-rubrica.dto";
import { UpdateRubricaDto } from "./dto/update-rubrica.dto";
import { Rubrica } from "@prisma/client";
export declare class RubricasService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createRubricaDto: CreateRubricaDto): Promise<Rubrica>;
    findAll(): Promise<Rubrica[]>;
    findOne(id: string): Promise<Rubrica>;
    update(id: string, updateRubricaDto: UpdateRubricaDto): Promise<Rubrica>;
    remove(id: string): Promise<Rubrica>;
    consolidarCustosProjeto(projetoId: string): Promise<any>;
}
