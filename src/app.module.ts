import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './modules/config.module';
import { ConfigService } from './config/config.service';
import { Configuration } from './config/constant';

import {
  AccessoryModule,
  AuthModule,
  CategoryModule,
  CommentModule,
  DatabaseModule,
  NotificationModule,
  PhotoModule,
  PhotosAccessoriesModule,
  ReportModule,
  RoleModule,
  UserModule,
} from './modules/index';

@Module({
  imports: [
    MulterModule.register({ dest: './files' }),
    ScheduleModule.forRoot(),
    AccessoryModule,
    CategoryModule,
    CommentModule,
    DatabaseModule,
    PhotoModule,
    RoleModule,
    ReportModule,
    UserModule,
    AuthModule,
    NotificationModule,
    DatabaseModule,
    ConfigModule,
    PhotosAccessoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port: number | string;

  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get(Configuration.SERVER_PORT);
  }
}
