import { PrismaService } from '../prisma/prisma.service';
import { CreateLogDto } from './dto/create-log.dto';
export declare class LogsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createLogDto: CreateLogDto): Promise<{
        id: string;
        createdAt: Date;
        level: string;
        message: string;
        timestamp: Date;
        meta: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    findAll(params: {
        skip?: number;
        take?: number;
        cursor?: any;
        where?: any;
        orderBy?: any;
    }): Promise<{
        id: string;
        createdAt: Date;
        level: string;
        message: string;
        timestamp: Date;
        meta: import("@prisma/client/runtime/library").JsonValue | null;
    }[]>;
}
