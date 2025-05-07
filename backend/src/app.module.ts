import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientesModule } from './clientes/clientes.module';
import { ProjetosModule } from './projetos/projetos.module';
import { PerfisProfissionaisModule } from './perfis-profissionais/perfis-profissionais.module';
import { AlocacoesModule } from './alocacoes/alocacoes.module';
import { ViagensModule } from './viagens/viagens.module';
import { RubricasModule } from './rubricas/rubricas.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { LogsModule } from './logs/logs.module'; // Import LogsModule
import { PrismaModule } from './prisma/prisma.module'; // Ensure PrismaModule is imported if not already global

@Module({
  imports: [
    PrismaModule, // It's common to import PrismaModule here if it's not global
    ClientesModule,
    ProjetosModule,
    PerfisProfissionaisModule,
    AlocacoesModule,
    ViagensModule,
    RubricasModule,
    UsuariosModule,
    LogsModule, // Add LogsModule to imports
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

