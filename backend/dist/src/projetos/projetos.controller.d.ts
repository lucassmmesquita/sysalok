import { ProjetosService } from './projetos.service';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { UpdateProjetoDto } from './dto/update-projeto.dto';
export declare class ProjetosController {
    private readonly projetosService;
    constructor(projetosService: ProjetosService);
    create(createProjetoDto: CreateProjetoDto): Promise<{
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date;
        codigo: string;
        descricao: string | null;
        dataInicio: Date;
        dataFim: Date | null;
        status: string;
        clienteId: string;
    }>;
    findAll(): Promise<{
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date;
        codigo: string;
        descricao: string | null;
        dataInicio: Date;
        dataFim: Date | null;
        status: string;
        clienteId: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date;
        codigo: string;
        descricao: string | null;
        dataInicio: Date;
        dataFim: Date | null;
        status: string;
        clienteId: string;
    }>;
    update(id: string, updateProjetoDto: UpdateProjetoDto): Promise<{
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date;
        codigo: string;
        descricao: string | null;
        dataInicio: Date;
        dataFim: Date | null;
        status: string;
        clienteId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date;
        codigo: string;
        descricao: string | null;
        dataInicio: Date;
        dataFim: Date | null;
        status: string;
        clienteId: string;
    }>;
}
