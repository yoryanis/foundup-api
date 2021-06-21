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
exports.CommentEntity = void 0;
const typeorm_1 = require("typeorm");
const index_1 = require("./index");
let CommentEntity = class CommentEntity extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], CommentEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => index_1.UserEntity, (user) => user.users, {
        onDelete: 'CASCADE',
    }),
    typeorm_1.JoinColumn({ name: 'user_owner' }),
    __metadata("design:type", index_1.UserEntity)
], CommentEntity.prototype, "userOwner", void 0);
__decorate([
    typeorm_1.ManyToOne(() => index_1.AccessoryEntity, (accessory) => accessory.comments, {
        onDelete: 'CASCADE',
    }),
    typeorm_1.JoinColumn({ name: 'accessory_id' }),
    __metadata("design:type", index_1.AccessoryEntity)
], CommentEntity.prototype, "accessory", void 0);
__decorate([
    typeorm_1.Column({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], CommentEntity.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column({
        name: 'updated_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], CommentEntity.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.DeleteDateColumn({ name: 'deleted_at' }),
    __metadata("design:type", Date)
], CommentEntity.prototype, "deletedAt", void 0);
CommentEntity = __decorate([
    typeorm_1.Entity({ name: 'comments' })
], CommentEntity);
exports.CommentEntity = CommentEntity;
//# sourceMappingURL=comment.entity.js.map