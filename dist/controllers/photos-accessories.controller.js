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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotosAccessoriesController = void 0;
const common_1 = require("@nestjs/common");
const photos_accessories_service_1 = require("../services/photos-accessories.service");
const create_photos_accessory_dto_1 = require("../photos-accessories/dto/create-photos-accessory.dto");
const update_photos_accessory_dto_1 = require("../photos-accessories/dto/update-photos-accessory.dto");
let PhotosAccessoriesController = class PhotosAccessoriesController {
    constructor(photosAccessoriesService) {
        this.photosAccessoriesService = photosAccessoriesService;
    }
    create(createPhotosAccessoryDto) {
        return this.photosAccessoriesService.create(createPhotosAccessoryDto);
    }
    findAll() {
        return this.photosAccessoriesService.findAll();
    }
    findOne(id) {
        return this.photosAccessoriesService.findOne(+id);
    }
    update(id, updatePhotosAccessoryDto) {
        return this.photosAccessoriesService.update(+id, updatePhotosAccessoryDto);
    }
    remove(id) {
        return this.photosAccessoriesService.remove(+id);
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof create_photos_accessory_dto_1.CreatePhotosAccessoryDto !== "undefined" && create_photos_accessory_dto_1.CreatePhotosAccessoryDto) === "function" ? _a : Object]),
    __metadata("design:returntype", void 0)
], PhotosAccessoriesController.prototype, "create", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PhotosAccessoriesController.prototype, "findAll", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PhotosAccessoriesController.prototype, "findOne", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_b = typeof update_photos_accessory_dto_1.UpdatePhotosAccessoryDto !== "undefined" && update_photos_accessory_dto_1.UpdatePhotosAccessoryDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], PhotosAccessoriesController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PhotosAccessoriesController.prototype, "remove", null);
PhotosAccessoriesController = __decorate([
    common_1.Controller('photos-accessories'),
    __metadata("design:paramtypes", [typeof (_c = typeof photos_accessories_service_1.PhotosAccessoriesService !== "undefined" && photos_accessories_service_1.PhotosAccessoriesService) === "function" ? _c : Object])
], PhotosAccessoriesController);
exports.PhotosAccessoriesController = PhotosAccessoriesController;
//# sourceMappingURL=photos-accessories.controller.js.map