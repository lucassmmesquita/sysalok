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
exports.AlocacoesController = void 0;
const common_1 = require("@nestjs/common");
const alocacoes_service_1 = require("./alocacoes.service");
const create_alocacao_dto_1 = require("./dto/create-alocacao.dto");
const update_alocacao_dto_1 = require("./dto/update-alocacao.dto");
let AlocacoesController = class AlocacoesController {
    alocacoesService;
    constructor(alocacoesService) {
        this.alocacoesService = alocacoesService;
    }
    create(createAlocacaoDto) {
        return this.alocacoesService.create(createAlocacaoDto);
    }
    findAll() {
        return this.alocacoesService.findAll();
    }
    findOne(id) {
        return this.alocacoesService.findOne(id);
    }
    update(id, updateAlocacaoDto) {
        return this.alocacoesService.update(id, updateAlocacaoDto);
    }
    remove(id) {
        return this.alocacoesService.remove(id);
    }
};
exports.AlocacoesController = AlocacoesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_alocacao_dto_1.CreateAlocacaoDto]),
    __metadata("design:returntype", void 0)
], AlocacoesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AlocacoesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AlocacoesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_alocacao_dto_1.UpdateAlocacaoDto]),
    __metadata("design:returntype", void 0)
], AlocacoesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AlocacoesController.prototype, "remove", null);
exports.AlocacoesController = AlocacoesController = __decorate([
    (0, common_1.Controller)("alocacoes"),
    __metadata("design:paramtypes", [alocacoes_service_1.AlocacoesService])
], AlocacoesController);
//# sourceMappingURL=alocacoes.controller.js.map