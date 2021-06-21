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
exports.UpdateAccessoryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const is_not_blank_decorator_1 = require("../../decorators/is-not-blank.decorator");
const state_accessory_enum_1 = require("../enum/state-accessory.enum");
class UpdateAccessoryDto {
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNotEmpty(),
    is_not_blank_decorator_1.IsNotBlank({ message: 'El campo <<nombre>> no puede estar vacío!' }),
    __metadata("design:type", String)
], UpdateAccessoryDto.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateAccessoryDto.prototype, "description", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNumber(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], UpdateAccessoryDto.prototype, "category_id", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsDate(),
    class_transformer_1.Type(() => Date),
    class_validator_1.IsOptional(),
    __metadata("design:type", Date)
], UpdateAccessoryDto.prototype, "lost_date", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], UpdateAccessoryDto.prototype, "lost_place", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], UpdateAccessoryDto.prototype, "reward", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], UpdateAccessoryDto.prototype, "latitude", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNumber(),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], UpdateAccessoryDto.prototype, "longitude", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNotEmpty(),
    is_not_blank_decorator_1.IsNotBlank({ message: 'El campo <<estados>> no puede estar vacío!' }),
    __metadata("design:type", String)
], UpdateAccessoryDto.prototype, "state", void 0);
exports.UpdateAccessoryDto = UpdateAccessoryDto;
//# sourceMappingURL=update-accessory.dto.js.map