import { Module } from '@nestjs/common';
import { RubricasController } from './rubricas.controller';
import { RubricasService } from './rubricas.service';

@Module({
  controllers: [RubricasController],
  providers: [RubricasService]
})
export class RubricasModule {}
