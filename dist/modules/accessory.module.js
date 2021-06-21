"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessoryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const accessory_controller_1 = require("../controllers/accessory.controller");
const entities_1 = require("../entities");
const services_1 = require("../services");
const config_service_1 = require("../config/config.service");
let AccessoryModule = class AccessoryModule {
};
AccessoryModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                entities_1.AccessoryEntity,
                entities_1.CategoryEntity,
                entities_1.UserEntity,
                entities_1.CommentEntity,
                entities_1.PhotoEntity,
            ]),
        ],
        controllers: [accessory_controller_1.AccessoryController],
        providers: [services_1.AccessoryService, services_1.PhotoService, config_service_1.ConfigService],
    })
], AccessoryModule);
exports.AccessoryModule = AccessoryModule;
//# sourceMappingURL=accessory.module.js.map