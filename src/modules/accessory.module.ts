import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccessoryController } from '../controllers/accessory.controller';
import {
  AccessoryEntity,
  CategoryEntity,
  CommentEntity,
  NotificationEntity,
  PhotoEntity,
  UserEntity,
} from 'src/entities';
import { AccessoryService, PhotoService } from 'src/services';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AccessoryEntity,
      CategoryEntity,
      UserEntity,
      CommentEntity,
      PhotoEntity,
    ]),
  ],
  controllers: [AccessoryController],
  providers: [AccessoryService, PhotoService, ConfigService],
})
export class AccessoryModule {}
