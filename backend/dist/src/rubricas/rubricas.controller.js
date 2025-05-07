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
exports.RubricasController = void 0;
const common_1 = require("@nestjs/common");
const rubricas_service_1 = require("./rubricas.service");
const create_rubrica_dto_1 = require("./dto/create-rubrica.dto");
const update_rubrica_dto_1 = require("./dto/update-rubrica.dto");
let RubricasController = class RubricasController {
    rubricasService;
    constructor(rubricasService) {
        this.rubricasService = rubricasService;
    }
    create(createRubricaDto) {
        return this.rubricasService.create(createRubricaDto);
    }
    findAll() {
        return this.rubricasService.findAll();
    }
    findOne(id) {
        return this.rubricasService.findOne(id);
    }
    update(id, updateRubricaDto) {
        return this.rubricasService.update(id, updateRubricaDto);
    }
    remove(id) {
        return this.rubricasService.remove(id);
    }
    consolidarCustosProjeto(projetoId) {
        return this.rubricasService.consolidarCustosProjeto(projetoId);
    }
};
exports.RubricasController = RubricasController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_rubrica_dto_1.CreateRubricaDto]),
    __metadata("design:returntype", void 0)
], RubricasController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RubricasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RubricasController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_rubrica_dto_1.UpdateRubricaDto]),
    __metadata("design:returntype", void 0)
], RubricasController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RubricasController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('consolidar/:projetoId'),
    __param(0, (0, common_1.Param)('projetoId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RubricasController.prototype, "consolidarCustosProjeto", null);
exports.RubricasController = RubricasController = __decorate([
    (0, common_1.Controller)("rubricas"),
    __metadata("design:paramtypes", [rubricas_service_1.RubricasService])
], RubricasController);
//# sourceMappingURL=rubricas.controller.js.map