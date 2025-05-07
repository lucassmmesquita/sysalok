import { Module } from '@nestjs/common';
import { PerfisProfissionaisController } from './perfis-profissionais.controller';
import { PerfisProfissionaisService } from './perfis-profissionais.service';

@Module({
  controllers: [PerfisProfissionaisController],
  providers: [PerfisProfissionaisService]
})
export class PerfisProfissionaisModule {}
