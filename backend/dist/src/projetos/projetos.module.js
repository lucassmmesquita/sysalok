"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjetosModule = void 0;
const common_1 = require("@nestjs/common");
const projetos_controller_1 = require("./projetos.controller");
const projetos_service_1 = require("./projetos.service");
let ProjetosModule = class ProjetosModule {
};
exports.ProjetosModule = ProjetosModule;
exports.ProjetosModule = ProjetosModule = __decorate([
    (0, common_1.Module)({
        controllers: [projetos_controller_1.ProjetosController],
        providers: [projetos_service_1.ProjetosService]
    })
], ProjetosModule);
//# sourceMappingURL=projetos.module.js.map