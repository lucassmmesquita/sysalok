"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const clientes_module_1 = require("./clientes/clientes.module");
const projetos_module_1 = require("./projetos/projetos.module");
const perfis_profissionais_module_1 = require("./perfis-profissionais/perfis-profissionais.module");
const alocacoes_module_1 = require("./alocacoes/alocacoes.module");
const viagens_module_1 = require("./viagens/viagens.module");
const rubricas_module_1 = require("./rubricas/rubricas.module");
const usuarios_module_1 = require("./usuarios/usuarios.module");
const logs_module_1 = require("./logs/logs.module");
const prisma_module_1 = require("./prisma/prisma.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            clientes_module_1.ClientesModule,
            projetos_module_1.ProjetosModule,
            perfis_profissionais_module_1.PerfisProfissionaisModule,
            alocacoes_module_1.AlocacoesModule,
            viagens_module_1.ViagensModule,
            rubricas_module_1.RubricasModule,
            usuarios_module_1.UsuariosModule,
            logs_module_1.LogsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map