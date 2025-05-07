import { Module } from '@nestjs/common';
import { AlocacoesController } from './alocacoes.controller';
import { AlocacoesService } from './alocacoes.service';

@Module({
  controllers: [AlocacoesController],
  providers: [AlocacoesService]
})
export class AlocacoesModule {}
