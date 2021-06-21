"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePasswordSubscriber = void 0;
const typeorm_1 = require("typeorm");
const bcrypt = require("bcrypt");
const user_entity_1 = require("../user.entity");
let UpdatePasswordSubscriber = class UpdatePasswordSubscriber {
    listenTo() {
        return user_entity_1.UserEntity;
    }
    async hashPassword(entity) {
        entity.password = await bcrypt.hash(entity.password, 10);
    }
    beforeInsert(event) {
        return this.hashPassword(event.entity);
    }
    async beforeUpdate({ entity, databaseEntity }) {
        if (entity.password !== (databaseEntity === null || databaseEntity === void 0 ? void 0 : databaseEntity.password)) {
            await this.hashPassword(entity);
        }
    }
};
UpdatePasswordSubscriber = __decorate([
    typeorm_1.EventSubscriber()
], UpdatePasswordSubscriber);
exports.UpdatePasswordSubscriber = UpdatePasswordSubscriber;
//# sourceMappingURL=updatePassword.subscriber.js.map