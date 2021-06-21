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
var AppModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const schedule_1 = require("@nestjs/schedule");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_module_1 = require("./modules/config.module");
const config_service_1 = require("./config/config.service");
const constant_1 = require("./config/constant");
const index_1 = require("./modules/index");
let AppModule = AppModule_1 = class AppModule {
    constructor(_configService) {
        this._configService = _configService;
        AppModule_1.port = this._configService.get(constant_1.Configuration.SERVER_PORT);
    }
};
AppModule = AppModule_1 = __decorate([
    common_1.Module({
        imports: [
            platform_express_1.MulterModule.register({ dest: './files' }),
            schedule_1.ScheduleModule.forRoot(),
            index_1.AccessoryModule,
            index_1.CategoryModule,
            index_1.CommentModule,
            index_1.DatabaseModule,
            index_1.PhotoModule,
            index_1.RoleModule,
            index_1.ReportModule,
            index_1.UserModule,
            index_1.AuthModule,
            index_1.NotificationModule,
            index_1.DatabaseModule,
            config_module_1.ConfigModule,
            index_1.PhotosAccessoriesModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    }),
    __metadata("design:paramtypes", [config_service_1.ConfigService])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map