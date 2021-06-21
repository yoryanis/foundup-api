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
exports.CategoryService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const entities_1 = require("../entities");
const repositories_1 = require("../repositories");
const responses_1 = require("../responses");
let CategoryService = class CategoryService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async create(dto) {
        if (await this.categoryRepository.findOne({
            category: dto.category,
        }))
            return new responses_1.ApiResponse(false, responses_1.ERROR.CATEGORY_EXIST);
        const category = await this.categoryRepository.create({
            category: dto.category,
        });
        await category.save();
        return new responses_1.ApiResponse(true, responses_1.SUCCESS.CATEGORY_CREATED, category);
    }
    async findAll() {
        const categories = await this.categoryRepository.find();
        return new responses_1.ApiResponse(true, responses_1.SUCCESS.CATEGORY_FOUND, categories);
    }
    async update(id, dto) {
        const category = await this.categoryRepository.findOne({
            id: id,
        });
        if (await this.categoryRepository.findOne({
            category: dto.category,
        }))
            return new responses_1.ApiResponse(false, responses_1.ERROR.CATEGORY_EXIST);
        if (!category)
            return new responses_1.ApiResponse(false, responses_1.ERROR.CATEGORY_NOT_FOUND);
        category.category = dto.category;
        const result = await this.categoryRepository.save(category);
        return new responses_1.ApiResponse(true, responses_1.SUCCESS.CATEGORY_UPDATED, result);
    }
    async remove(id) {
        const category = await this.categoryRepository.findOne({ id: id });
        if (!category)
            return new responses_1.ApiResponse(false, responses_1.ERROR.CATEGORY_NOT_FOUND);
        this.categoryRepository.softRemove(category);
        return new responses_1.ApiResponse(true, responses_1.SUCCESS.CATEGORY_DELETED);
    }
};
CategoryService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(entities_1.CategoryEntity)),
    __metadata("design:paramtypes", [repositories_1.CategoryRepository])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map