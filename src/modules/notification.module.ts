import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccessoryEntity, NotificationEntity, UserEntity } from 'src/entities';
import { NotificationController } from '../controllers/notification.controller';
import { NotificationService } from '../services/notification.service';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationEntity, AccessoryEntity, UserEntity])],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
