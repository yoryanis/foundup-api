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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const responses_1 = require("../responses");
const passport_1 = require("@nestjs/passport");
const index_1 = require("../entities/dto/index");
const pagination_1 = require("../entities/interfaces/pagination");
const services_1 = require("../services");
const update_password_dto_1 = require("../entities/dto/update-password.dto");
const platform_express_1 = require("@nestjs/platform-express");
const entities_1 = require("../entities");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getAll(identification, pagination) {
        return await this.userService.getAll(identification, pagination);
    }
    async getById(identification) {
        return await this.userService.findById(identification);
    }
    async create(dto) {
        return await this.userService.create(dto);
    }
    addAvatar(identification, file) {
        return this.userService.createAvatar(identification, file.filename, file.path);
    }
    async update(identification, dto) {
        return await this.userService.update(identification, dto);
    }
    async updatePassword(identification, password) {
        return await this.userService.updatePassword(identification, password);
    }
    async delete(id) {
        return await this.userService.delete(id);
    }
};
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Get('admin/:identification'),
    __param(0, common_1.Param('identification', common_1.ParseIntPipe)),
    __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAll", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Get(':identification'),
    __param(0, common_1.Param('identification', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getById", null);
__decorate([
    common_1.UsePipes(new common_1.ValidationPipe({ whitelist: true })),
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [index_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Post('avatar/:identification'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file', services_1.Multer.DEFAULT_FILTER_OPTIONS)),
    swagger_1.ApiOperation({ summary: 'Adds file to user' }),
    swagger_1.ApiResponse({ status: 201, description: 'success', type: responses_1.ApiResponse }),
    __param(0, common_1.Param('identification', common_1.ParseIntPipe)),
    __param(1, common_1.UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addAvatar", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.UsePipes(new common_1.ValidationPipe({ whitelist: true })),
    common_1.Put(':identification'),
    __param(0, common_1.Param('identification', common_1.ParseIntPipe)),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, index_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.UsePipes(new common_1.ValidationPipe({ whitelist: true })),
    common_1.Put('password/:identification'),
    __param(0, common_1.Param('identification', common_1.ParseIntPipe)),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_password_dto_1.UpdatePasswordDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updatePassword", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Delete(':id'),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
UserController = __decorate([
    common_1.Controller('user'),
    __metadata("design:paramtypes", [services_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map