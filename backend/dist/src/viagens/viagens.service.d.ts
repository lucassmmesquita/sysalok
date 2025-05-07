import { PrismaService } from "../prisma/prisma.service";
import { CreateViagemDto } from "./dto/create-viagem.dto";
import { UpdateViagemDto } from "./dto/update-viagem.dto";
import { Viagem } from "@prisma/client";
export declare class ViagensService {
    private prisma;
    constructor(prisma: PrismaService);
    private calculateViagemTotals;
    create(createViagemDto: CreateViagemDto): Promise<Viagem>;
    findAll(): Promise<Viagem[]>;
    findOne(id: string): Promise<Viagem>;
    update(id: string, updateViagemDto: UpdateViagemDto): Promise<Viagem>;
    remove(id: string): Promise<Viagem>;
}
