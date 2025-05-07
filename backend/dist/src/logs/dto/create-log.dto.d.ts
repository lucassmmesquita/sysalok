export declare enum LogLevel {
    INFO = "INFO",
    WARN = "WARN",
    ERROR = "ERROR",
    DEBUG = "DEBUG"
}
export declare class CreateLogDto {
    level: LogLevel;
    message: string;
    context?: string;
    userId?: number;
}
