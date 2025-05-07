import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
export declare class ClientesController {
    private readonly clientesService;
    constructor(clientesService: ClientesService);
    create(createClienteDto: CreateClienteDto): Promise<{
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date;
        cnpj: string;
        responsavel: string | null;
        contato: string | null;
        endereco: string | null;
    }>;
    findAll(): Promise<{
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date;
        cnpj: string;
        responsavel: string | null;
        contato: string | null;
        endereco: string | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date;
        cnpj: string;
        responsavel: string | null;
        contato: string | null;
        endereco: string | null;
    }>;
    update(id: string, updateClienteDto: UpdateClienteDto): Promise<{
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date;
        cnpj: string;
        responsavel: string | null;
        contato: string | null;
        endereco: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date;
        cnpj: string;
        responsavel: string | null;
        contato: string | null;
        endereco: string | null;
    }>;
}
