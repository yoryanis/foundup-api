import { Module } from '@nestjs/common';

import {
  AccessoryEntity,
  CommentEntity,
  NotificationEntity,
} from 'src/entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommentEntity,
      AccessoryEntity,
      NotificationEntity,
    ]),
  ],
  controllers: [],
  providers: [],
})
export class CommentModule {}
