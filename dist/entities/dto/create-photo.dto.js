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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePhotoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const is_not_blank_decorator_1 = require("../../decorators/is-not-blank.decorator");
class CreatePhotoDto {
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNotEmpty(),
    is_not_blank_decorator_1.IsNotBlank({ message: 'El campo <<url>> no puede estar vacío!' }),
    __metadata("design:type", String)
], CreatePhotoDto.prototype, "url", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Boolean)
], CreatePhotoDto.prototype, "default", void 0);
exports.CreatePhotoDto = CreatePhotoDto;
//# sourceMappingURL=create-photo.dto.js.map