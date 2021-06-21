"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const config_service_1 = require("../config/config.service");
const config_module_1 = require("../modules/config.module");
const typeorm_1 = require("@nestjs/typeorm");
const constant_1 = require("../config/constant");
exports.databaseProviders = [
    typeorm_1.TypeOrmModule.forRootAsync({
        imports: [config_module_1.ConfigModule],
        inject: [config_service_1.ConfigService],
        async useFactory(configService) {
            return {
                type: 'postgres',
                host: configService.get(constant_1.Configuration.DB_HOST),
                port: parseInt(configService.get(constant_1.Configuration.DB_PORT)),
                username: configService.get(constant_1.Configuration.DB_USER),
                password: configService.get(constant_1.Configuration.DB_PASSWORD),
                database: configService.get(constant_1.Configuration.DB_NAME),
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                subscribers: ['dist/**/**/**/*.subscriber{.ts,.js}'],
                synchronize: true,
                logging: process.env.NODE_ENV.trim() === 'development',
                retryAttempts: 10,
                retryDelay: 3000,
                autoLoadEntities: true,
                keepConncetionAlive: true,
            };
        },
    }),
];
//# sourceMappingURL=database.service.js.map