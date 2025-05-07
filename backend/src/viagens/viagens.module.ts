import { Module } from '@nestjs/common';
import { ViagensController } from './viagens.controller';
import { ViagensService } from './viagens.service';

@Module({
  controllers: [ViagensController],
  providers: [ViagensService]
})
export class ViagensModule {}
