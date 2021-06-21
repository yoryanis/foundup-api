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
exports.ReportService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const entities_1 = require("../entities");
const repositories_1 = require("../repositories");
const responses_1 = require("../responses");
const api_response_1 = require("../responses/api.response");
const pagination_1 = require("../entities/interfaces/pagination");
let ReportService = class ReportService {
    constructor(commentRepository) {
        this.commentRepository = commentRepository;
        this.months = [
            '01',
            '02',
            '03',
            '04',
            '05',
            '06',
            '07',
            '08',
            '09',
            '10',
            '11',
            '12',
        ];
    }
    async getAll(pagination) {
        if (!entities_1.PaginationVerifier.verifyIPagination(pagination))
            return responses_1.ApiResponse.paginationWithDatesNotProvidedError();
        const result = await this.commentRepository
            .createQueryBuilder('comment')
            .innerJoinAndSelect('comment.userOwner', 'user', 'comment.user_owner = user.id')
            .innerJoinAndSelect('comment.accessory', 'accessory', 'comment.accessory_id = accessory.id')
            .innerJoinAndSelect('accessory.category', 'category', 'accessory.category_id = category.id')
            .where("accessory.state = 'lost' AND accessory.created_at >= :start AND accessory.created_at <= :end AND user.role_id = 2", {
            start: pagination.start,
            end: pagination.end,
        })
            .skip(Math.max(0, (pagination.pageNumber - 1) * pagination.pageElements))
            .take(pagination.pageElements)
            .orderBy('accessory.createdAt', 'DESC')
            .getManyAndCount();
        if (!result.length)
            new responses_1.ApiResponse(false, responses_1.ERROR.USERS_NOT_FOUND);
        return new responses_1.ApiResponse(true, responses_1.SUCCESS.REPORT, new api_response_1.ApiResponseRecords(result, pagination));
    }
    async getReportGeneral(year) {
        let founds = [];
        let losts = [];
        for (let i = 0; i < this.months.length; i++) {
            let found = await this.commentRepository.query(`SELECT COUNT(*) FROM accessories as consul WHERE to_char(lost_date, 'YYYY') = $1 AND state = 'found' AND to_char(lost_date, 'mm') = '${this.months[i]}';`, [year]);
            founds.push(...found);
        }
        for (let i = 0; i < 9; i++) {
            let lost = await this.commentRepository.query(`SELECT COUNT(*) FROM accessories as consul WHERE to_char(lost_date, 'YYYY') = $1 AND state = 'lost' AND to_char(lost_date, 'mm') = '${this.months[i]}';`, [year]);
            losts.push(...lost);
        }
        let count = await this.commentRepository.query(`SELECT COUNT(*) FROM accessories as consul WHERE to_char(lost_date, 'YYYY') = $1`, [year]);
        let result = { founds, losts, count };
        if (!result)
            new responses_1.ApiResponse(false, responses_1.ERROR.REPORT_NO_FOUND);
        return new responses_1.ApiResponse(true, responses_1.SUCCESS.REPORT, result);
    }
    async getReportCity(year) {
        let cities = await this.commentRepository.query(`SELECT lost_place, COUNT(*) FROM accessories as consul WHERE to_char(lost_date, 'YYYY') = $1 AND state = 'lost' GROUP BY lost_place;`, [year]);
        let count = await this.commentRepository.query(`SELECT COUNT(*) FROM accessories as consul WHERE to_char(lost_date, 'YYYY') = $1 AND state = 'lost'`, [year]);
        let result = { cities, count };
        if (!result)
            new responses_1.ApiResponse(false, responses_1.ERROR.REPORT_NO_FOUND);
        return new responses_1.ApiResponse(true, responses_1.SUCCESS.REPORT, result);
    }
    async getReportCategory(year) {
        let categories = await this.commentRepository.query(`SELECT c.category, COUNT(*) FROM accessories a INNER JOIN categories c ON c.id = a.category_id WHERE to_char(a.lost_date, 'YYYY') = $1 AND a.state = 'lost' GROUP BY c.category;`, [year]);
        let count = await this.commentRepository.query(`SELECT COUNT(*) FROM accessories a INNER JOIN categories c ON c.id = a.category_id WHERE to_char(a.lost_date, 'YYYY') = $1 AND a.state = 'lost';`, [year]);
        let result = { categories, count };
        if (!result)
            new responses_1.ApiResponse(false, responses_1.ERROR.REPORT_NO_FOUND);
        return new responses_1.ApiResponse(true, responses_1.SUCCESS.REPORT, result);
    }
};
ReportService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(entities_1.CommentEntity)),
    __metadata("design:paramtypes", [repositories_1.CommentRepository])
], ReportService);
exports.ReportService = ReportService;
//# sourceMappingURL=report.service.js.map