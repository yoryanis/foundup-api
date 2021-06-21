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
exports.CreateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const length_decorator_1 = require("../../decorators/length.decorator");
const is_not_blank_decorator_1 = require("../../decorators/is-not-blank.decorator");
class CreateUserDto {
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNumber(),
    class_validator_1.IsNotEmpty(),
    length_decorator_1.IsLength({
        message: 'La identificación debe contener mínimo 7 números y máximo 10 números!',
    }),
    class_transformer_1.Type(() => Number),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "identification", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNotEmpty(),
    is_not_blank_decorator_1.IsNotBlank({ message: 'El campo <<nombre>> no puede estar vacío!' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "lastname", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNumber(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "role_id", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "occupation", void 0);
__decorate([
    swagger_1.ApiProperty(),
    is_not_blank_decorator_1.IsNotBlank({ message: 'El campo <<ciudad>> no puede estar vacío!' }),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "city", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "address", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsDate(),
    class_transformer_1.Type(() => Date),
    __metadata("design:type", Date)
], CreateUserDto.prototype, "birthdate", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "phone", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsEmail(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    swagger_1.ApiProperty(),
    is_not_blank_decorator_1.IsNotBlank({ message: 'El campo <<contraseña>> no puede estar vacío!' }),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsBoolean(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Boolean)
], CreateUserDto.prototype, "state", void 0);
exports.CreateUserDto = CreateUserDto;
//# sourceMappingURL=create-user.dto.js.map