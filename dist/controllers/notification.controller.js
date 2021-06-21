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
exports.NotificationController = void 0;
const common_1 = require("@nestjs/common");
const notification_service_1 = require("../services/notification.service");
const dto_1 = require("../entities/dto/");
let NotificationController = class NotificationController {
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    create(dto, id) {
        return this.notificationService.create(dto, id);
    }
    findAll(identification) {
        return this.notificationService.findAll(identification);
    }
    findComments(id_unique) {
        return this.notificationService.findComments(id_unique);
    }
    findCount(identification) {
        return this.notificationService.count(identification);
    }
    seen(id) {
        return this.notificationService.seen(+id);
    }
    accept(id_unique) {
        return this.notificationService.accept(id_unique);
    }
};
__decorate([
    common_1.Post('generate/:id'),
    __param(0, common_1.Body()),
    __param(1, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateNotificationDto, Number]),
    __metadata("design:returntype", void 0)
], NotificationController.prototype, "create", null);
__decorate([
    common_1.Get(':identification'),
    __param(0, common_1.Param('identification', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], NotificationController.prototype, "findAll", null);
__decorate([
    common_1.Get('comments-accessory/:id_unique'),
    __param(0, common_1.Param('id_unique')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NotificationController.prototype, "findComments", null);
__decorate([
    common_1.Get('count/:identification'),
    __param(0, common_1.Param('identification', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], NotificationController.prototype, "findCount", null);
__decorate([
    common_1.Put(':id/seen'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], NotificationController.prototype, "seen", null);
__decorate([
    common_1.Put(':id_unique/accept'),
    __param(0, common_1.Param('id_unique')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NotificationController.prototype, "accept", null);
NotificationController = __decorate([
    common_1.Controller('notification'),
    __metadata("design:paramtypes", [notification_service_1.NotificationService])
], NotificationController);
exports.NotificationController = NotificationController;
//# sourceMappingURL=notification.controller.js.map