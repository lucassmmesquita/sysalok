import { LogsService } from './logs.service';
export declare class LogsController {
    private readonly logsService;
    constructor(logsService: LogsService);
    findAll(query: any): Promise<{
        id: string;
        createdAt: Date;
        level: string;
        message: string;
        timestamp: Date;
        meta: import("@prisma/client/runtime/library").JsonValue | null;
    }[]>;
}
