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
exports.PhotosAccessoryEntity = void 0;
const typeorm_1 = require("typeorm");
const accessory_entity_1 = require("./accessory.entity");
const photo_entity_1 = require("./photo.entity");
let PhotosAccessoryEntity = class PhotosAccessoryEntity extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], PhotosAccessoryEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => photo_entity_1.PhotoEntity, (photo) => photo.photos, {
        onDelete: 'CASCADE',
    }),
    typeorm_1.JoinColumn({ name: 'photo_id' }),
    __metadata("design:type", photo_entity_1.PhotoEntity)
], PhotosAccessoryEntity.prototype, "photo", void 0);
__decorate([
    typeorm_1.ManyToOne(() => accessory_entity_1.AccessoryEntity, (accessory) => accessory.images, {
        onDelete: 'CASCADE',
    }),
    typeorm_1.JoinColumn({ name: 'accessory_id' }),
    __metadata("design:type", accessory_entity_1.AccessoryEntity)
], PhotosAccessoryEntity.prototype, "accessory", void 0);
__decorate([
    typeorm_1.Column({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], PhotosAccessoryEntity.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column({
        name: 'updated_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], PhotosAccessoryEntity.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.DeleteDateColumn({ name: 'deleted_at' }),
    __metadata("design:type", Date)
], PhotosAccessoryEntity.prototype, "deletedAt", void 0);
PhotosAccessoryEntity = __decorate([
    typeorm_1.Entity({ name: 'photos_accessories' })
], PhotosAccessoryEntity);
exports.PhotosAccessoryEntity = PhotosAccessoryEntity;
//# sourceMappingURL=photos-accessory.entity.js.map