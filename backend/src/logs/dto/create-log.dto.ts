import { IsString, IsOptional, IsInt, IsEnum } from 'class-validator';

export enum LogLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  DEBUG = 'DEBUG',
}

export class CreateLogDto {
  @IsEnum(LogLevel)
  level: LogLevel;

  @IsString()
  message: string;

  @IsString()
  @IsOptional()
  context?: string;

  @IsInt()
  @IsOptional()
  userId?: number;
}

