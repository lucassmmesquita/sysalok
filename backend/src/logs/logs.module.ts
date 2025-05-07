import { Module, Global } from '@nestjs/common';
import { LogsService } from './logs.service';
import { LogsController } from './logs.controller';
import { PrismaModule } from '../prisma/prisma.module'; // Import PrismaModule

@Global() // Optional: if you want LogsService to be available globally without importing LogsModule everywhere
@Module({
  imports: [PrismaModule], // Ensure PrismaService is available to LogsService
  controllers: [LogsController],
  providers: [LogsService],
  exports: [LogsService], // Export LogsService if you want to use it in other modules directly
})
export class LogsModule {}

