import { ConfigService } from '../config/config.service';
import { ConfigModule } from '../modules/config.module';
import { ConnectionOptions } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Configuration } from '../config/constant';

export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    async useFactory(configService: ConfigService) {
      return {
        type: 'postgres',
        host: configService.get(Configuration.DB_HOST),
        port: parseInt(configService.get(Configuration.DB_PORT)),
        username: configService.get(Configuration.DB_USER),
        password: configService.get(Configuration.DB_PASSWORD),
        database: configService.get(Configuration.DB_NAME),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        subscribers: ['dist/**/**/**/*.subscriber{.ts,.js}'],
        synchronize: true,
        logging: process.env.NODE_ENV.trim() === 'development',
        retryAttempts: 10,
        retryDelay: 3000,
        autoLoadEntities: true,
        keepConncetionAlive: true,
      } as ConnectionOptions;
    },
  }),
];
