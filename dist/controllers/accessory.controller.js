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
exports.AccessoryController = void 0;
const common_1 = require("@nestjs/common");
const accessory_service_1 = require("../services/accessory.service");
const dto_1 = require("../entities/dto/");
const pagination_1 = require("../entities/interfaces/pagination");
const platform_express_1 = require("@nestjs/platform-express");
const passport_1 = require("@nestjs/passport");
const services_1 = require("../services");
const swagger_1 = require("@nestjs/swagger");
const responses_1 = require("../responses");
let AccessoryController = class AccessoryController {
    constructor(accessoryService) {
        this.accessoryService = accessoryService;
    }
    create(dto, id) {
        return this.accessoryService.create(id, dto);
    }
    async addEvidence(id_unique, file) {
        return await this.accessoryService.createEvidences(id_unique, file.filename, file.path);
    }
    findAllLost(pagination) {
        return this.accessoryService.findAllLost(pagination);
    }
    findAll(pagination) {
        return this.accessoryService.findAll(pagination);
    }
    findOne(id) {
        return this.accessoryService.findOne(id);
    }
    search(pagination) {
        return this.accessoryService.search(pagination);
    }
    update(id, dto) {
        return this.accessoryService.update(id, dto);
    }
    remove(id_unique) {
        return this.accessoryService.remove(id_unique);
    }
    removeEvidence(id) {
        return this.accessoryService.removeEvidence(id);
    }
};
__decorate([
    common_1.UsePipes(new common_1.ValidationPipe({ whitelist: true })),
    common_1.Post(':id'),
    __param(0, common_1.Body()),
    __param(1, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateAccessoryDto, Number]),
    __metadata("design:returntype", void 0)
], AccessoryController.prototype, "create", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Post('evidences/:id_unique'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file', services_1.Multer.DEFAULT_FILTER_OPTIONS)),
    swagger_1.ApiOperation({ summary: 'Adds file to accessory' }),
    swagger_1.ApiResponse({ status: 201, description: 'success', type: responses_1.ApiResponse }),
    __param(0, common_1.Param('id_unique')),
    __param(1, common_1.UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AccessoryController.prototype, "addEvidence", null);
__decorate([
    common_1.Get(),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AccessoryController.prototype, "findAllLost", null);
__decorate([
    common_1.Get('user-accesories'),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AccessoryController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AccessoryController.prototype, "findOne", null);
__decorate([
    common_1.Get('search/lost'),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AccessoryController.prototype, "search", null);
__decorate([
    common_1.UsePipes(new common_1.ValidationPipe({ whitelist: true })),
    common_1.Put(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AccessoryController.prototype, "update", null);
__decorate([
    common_1.Delete(':id_unique'),
    __param(0, common_1.Param('id_unique')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AccessoryController.prototype, "remove", null);
__decorate([
    common_1.Delete('evidences/delete/:id'),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AccessoryController.prototype, "removeEvidence", null);
AccessoryController = __decorate([
    common_1.Controller('accessory'),
    __metadata("design:paramtypes", [accessory_service_1.AccessoryService])
], AccessoryController);
exports.AccessoryController = AccessoryController;
//# sourceMappingURL=accessory.controller.js.map