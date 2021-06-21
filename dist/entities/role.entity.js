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
exports.RoleEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const role_enum_1 = require("./enum/role.enum");
let RoleEntity = class RoleEntity extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], RoleEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: 'enum', enum: role_enum_1.Roles, default: role_enum_1.Roles.USER }),
    __metadata("design:type", String)
], RoleEntity.prototype, "role", void 0);
__decorate([
    typeorm_1.OneToMany(() => user_entity_1.UserEntity, (user) => user.rol, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        cascade: true,
    }),
    __metadata("design:type", Array)
], RoleEntity.prototype, "users", void 0);
__decorate([
    typeorm_1.DeleteDateColumn({ name: 'deleted_at' }),
    __metadata("design:type", Date)
], RoleEntity.prototype, "deletedAt", void 0);
RoleEntity = __decorate([
    typeorm_1.Entity({ name: 'roles' })
], RoleEntity);
exports.RoleEntity = RoleEntity;
//# sourceMappingURL=role.entity.js.map