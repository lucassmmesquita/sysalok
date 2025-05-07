"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerfisProfissionaisController = void 0;
const common_1 = require("@nestjs/common");
const perfis_profissionais_service_1 = require("./perfis-profissionais.service");
const create_perfil_profissional_dto_1 = require("./dto/create-perfil-profissional.dto");
const update_perfil_profissional_dto_1 = require("./dto/update-perfil-profissional.dto");
const update_custo_rh_dto_1 = require("./dto/update-custo-rh.dto");
let PerfisProfissionaisController = class PerfisProfissionaisController {
    perfisProfissionaisService;
    constructor(perfisProfissionaisService) {
        this.perfisProfissionaisService = perfisProfissionaisService;
    }
    createPerfil(createPerfilDto) {
        return this.perfisProfissionaisService.createPerfil(createPerfilDto);
    }
    findAllPerfis() {
        return this.perfisProfissionaisService.findAllPerfis();
    }
    findOnePerfil(id) {
        return this.perfisProfissionaisService.findOnePerfil(id);
    }
    updatePerfil(id, updatePerfilDto) {
        return this.perfisProfissionaisService.updatePerfil(id, updatePerfilDto);
    }
    removePerfil(id) {
        return this.perfisProfissionaisService.removePerfil(id);
    }
    createCustoRh(perfilId, createCustoRhDto) {
        return this.perfisProfissionaisService.createCustoRh({ ...createCustoRhDto, perfilProfissionalId: perfilId });
    }
    findAllCustosRhByPerfil(perfilId) {
        return this.perfisProfissionaisService.findAllCustosRhByPerfil(perfilId);
    }
    findCustoRhByPerfilAndMesAno(perfilId, mes, ano) {
        return this.perfisProfissionaisService.findCustoRhByPerfilAndMesAno(perfilId, mes, ano);
    }
    updateCustoRh(custoId, updateCustoRhDto) {
        return this.perfisProfissionaisService.updateCustoRh(custoId, updateCustoRhDto);
    }
    removeCustoRh(custoId) {
        return this.perfisProfissionaisService.removeCustoRh(custoId);
    }
};
exports.PerfisProfissionaisController = PerfisProfissionaisController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_perfil_profissional_dto_1.CreatePerfilProfissionalDto]),
    __metadata("design:returntype", void 0)
], PerfisProfissionaisController.prototype, "createPerfil", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PerfisProfissionaisController.prototype, "findAllPerfis", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PerfisProfissionaisController.prototype, "findOnePerfil", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_perfil_profissional_dto_1.UpdatePerfilProfissionalDto]),
    __metadata("design:returntype", void 0)
], PerfisProfissionaisController.prototype, "updatePerfil", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PerfisProfissionaisController.prototype, "removePerfil", null);
__decorate([
    (0, common_1.Post)(':perfilId/custos-rh'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    __param(0, (0, common_1.Param)('perfilId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PerfisProfissionaisController.prototype, "createCustoRh", null);
__decorate([
    (0, common_1.Get)(':perfilId/custos-rh'),
    __param(0, (0, common_1.Param)('perfilId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PerfisProfissionaisController.prototype, "findAllCustosRhByPerfil", null);
__decorate([
    (0, common_1.Get)(':perfilId/custos-rh/specific'),
    __param(0, (0, common_1.Param)('perfilId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)('mes', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('ano', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", void 0)
], PerfisProfissionaisController.prototype, "findCustoRhByPerfilAndMesAno", null);
__decorate([
    (0, common_1.Patch)('custos-rh/:custoId'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    __param(0, (0, common_1.Param)('custoId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_custo_rh_dto_1.UpdateCustoRhDto]),
    __metadata("design:returntype", void 0)
], PerfisProfissionaisController.prototype, "updateCustoRh", null);
__decorate([
    (0, common_1.Delete)('custos-rh/:custoId'),
    __param(0, (0, common_1.Param)('custoId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PerfisProfissionaisController.prototype, "removeCustoRh", null);
exports.PerfisProfissionaisController = PerfisProfissionaisController = __decorate([
    (0, common_1.Controller)('perfis-profissionais'),
    __metadata("design:paramtypes", [perfis_profissionais_service_1.PerfisProfissionaisService])
], PerfisProfissionaisController);
//# sourceMappingURL=perfis-profissionais.controller.js.map