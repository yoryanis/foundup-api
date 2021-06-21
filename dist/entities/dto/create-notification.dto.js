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
exports.CreateNotificationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const is_not_blank_decorator_1 = require("../../decorators/is-not-blank.decorator");
class CreateNotificationDto {
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNotEmpty(),
    is_not_blank_decorator_1.IsNotBlank({ message: 'El campo <<detalles>> no puede estar vacío!' }),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "details", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNotEmpty(),
    is_not_blank_decorator_1.IsNotBlank({ message: 'El campo <<tipo>> no puede estar vacío!' }),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "type", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNumber(),
    is_not_blank_decorator_1.IsNotBlank({ message: 'El campo <<latitude>> no puede estar vacío!' }),
    __metadata("design:type", Number)
], CreateNotificationDto.prototype, "latitude", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNumber(),
    is_not_blank_decorator_1.IsNotBlank({ message: 'El campo <<longitude>> no puede estar vacío!' }),
    __metadata("design:type", Number)
], CreateNotificationDto.prototype, "longitude", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNumber(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CreateNotificationDto.prototype, "user_id", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsNumber(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CreateNotificationDto.prototype, "user_owner", void 0);
exports.CreateNotificationDto = CreateNotificationDto;
//# sourceMappingURL=create-notification.dto.js.map