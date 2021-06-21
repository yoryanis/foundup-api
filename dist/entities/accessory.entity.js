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
exports.AccessoryEntity = void 0;
const typeorm_1 = require("typeorm");
const index_1 = require("./index");
const state_accessory_enum_1 = require("./enum/state-accessory.enum");
const notification_entity_1 = require("./notification.entity");
const photos_accessory_entity_1 = require("./photos-accessory.entity");
let AccessoryEntity = class AccessoryEntity extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], AccessoryEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], AccessoryEntity.prototype, "id_unique", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], AccessoryEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], AccessoryEntity.prototype, "description", void 0);
__decorate([
    typeorm_1.ManyToOne(() => index_1.CategoryEntity, (category) => category.id),
    typeorm_1.JoinColumn({ name: 'category_id' }),
    __metadata("design:type", index_1.CategoryEntity)
], AccessoryEntity.prototype, "category", void 0);
__decorate([
    typeorm_1.OneToMany(() => index_1.CommentEntity, (comment) => comment.accessory, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], AccessoryEntity.prototype, "comments", void 0);
__decorate([
    typeorm_1.OneToMany(() => notification_entity_1.NotificationEntity, (noti) => noti.accessory, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], AccessoryEntity.prototype, "notifications", void 0);
__decorate([
    typeorm_1.OneToMany(() => photos_accessory_entity_1.PhotosAccessoryEntity, (pa) => pa.accessory, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], AccessoryEntity.prototype, "images", void 0);
__decorate([
    typeorm_1.Column({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], AccessoryEntity.prototype, "lost_date", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], AccessoryEntity.prototype, "lost_place", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], AccessoryEntity.prototype, "qr", void 0);
__decorate([
    typeorm_1.Column({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], AccessoryEntity.prototype, "reward", void 0);
__decorate([
    typeorm_1.Column({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], AccessoryEntity.prototype, "latitude", void 0);
__decorate([
    typeorm_1.Column({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], AccessoryEntity.prototype, "longitude", void 0);
__decorate([
    typeorm_1.Column({ type: 'enum', enum: state_accessory_enum_1.States, default: state_accessory_enum_1.States.CREATED }),
    __metadata("design:type", String)
], AccessoryEntity.prototype, "state", void 0);
__decorate([
    typeorm_1.Column({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], AccessoryEntity.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column({
        name: 'updated_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], AccessoryEntity.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.DeleteDateColumn({ name: 'deleted_at' }),
    __metadata("design:type", Date)
], AccessoryEntity.prototype, "deletedAt", void 0);
AccessoryEntity = __decorate([
    typeorm_1.Entity({ name: 'accessories' })
], AccessoryEntity);
exports.AccessoryEntity = AccessoryEntity;
//# sourceMappingURL=accessory.entity.js.map