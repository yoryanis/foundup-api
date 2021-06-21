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
exports.ReportController = void 0;
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const pagination_1 = require("../entities/interfaces/pagination");
const responses_1 = require("../responses");
const report_service_1 = require("../services/report.service");
let ReportController = class ReportController {
    constructor(reportService) {
        this.reportService = reportService;
    }
    async getAll(pagination) {
        return await this.reportService.getAll(pagination);
    }
    async getReportGeneral(year) {
        return await this.reportService.getReportGeneral(year);
    }
    async getReportByCity(year) {
        return await this.reportService.getReportCity(year);
    }
    async getReportByCategory(year) {
        return await this.reportService.getReportCategory(year);
    }
};
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Get(),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getAll", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Get('/general/:year'),
    __param(0, common_1.Param('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getReportGeneral", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Get('/city/:year'),
    __param(0, common_1.Param('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getReportByCity", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    common_1.Get('/category/:year'),
    __param(0, common_1.Param('year')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getReportByCategory", null);
ReportController = __decorate([
    common_1.Controller('report'),
    __metadata("design:paramtypes", [report_service_1.ReportService])
], ReportController);
exports.ReportController = ReportController;
//# sourceMappingURL=report.controller.js.map