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
exports.UserEntity = void 0;
const bcrypt = require("bcrypt");
const typeorm_1 = require("typeorm");
const index_1 = require("./index");
const notification_entity_1 = require("./notification.entity");
let UserEntity = class UserEntity extends typeorm_1.BaseEntity {
    async hashPassword() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 10);
        }
    }
    async comparePassword(attempt) {
        return await bcrypt.compareSync(attempt, this.password);
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], UserEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: 'int', nullable: false, unique: true }),
    __metadata("design:type", Number)
], UserEntity.prototype, "identification", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: 45, nullable: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: 45, nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "lastname", void 0);
__decorate([
    typeorm_1.ManyToOne(() => index_1.RoleEntity, (role) => role.id),
    typeorm_1.JoinColumn({ name: 'role_id' }),
    __metadata("design:type", index_1.RoleEntity)
], UserEntity.prototype, "rol", void 0);
__decorate([
    typeorm_1.OneToOne(() => index_1.PhotoEntity, (photo) => photo.id, {
        eager: true,
        onDelete: 'CASCADE',
    }),
    typeorm_1.JoinColumn({ name: 'photo_id' }),
    __metadata("design:type", index_1.PhotoEntity)
], UserEntity.prototype, "photo", void 0);
__decorate([
    typeorm_1.OneToMany(() => index_1.CommentEntity, (comment) => comment.userOwner, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], UserEntity.prototype, "users", void 0);
__decorate([
    typeorm_1.OneToMany(() => notification_entity_1.NotificationEntity, (noti) => noti.user, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], UserEntity.prototype, "notifications", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: 70, nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "occupation", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: 70, nullable: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "city", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: 70, nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "address", void 0);
__decorate([
    typeorm_1.Column({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], UserEntity.prototype, "birthdate", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: 12, nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', length: 50, nullable: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', nullable: false, select: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "state", void 0);
__decorate([
    typeorm_1.Column({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], UserEntity.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column({
        name: 'updated_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], UserEntity.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.DeleteDateColumn({ name: 'deleted_at' }),
    __metadata("design:type", Date)
], UserEntity.prototype, "deletedAt", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    typeorm_1.BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserEntity.prototype, "hashPassword", null);
UserEntity = __decorate([
    typeorm_1.Entity({ name: 'users' })
], UserEntity);
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map