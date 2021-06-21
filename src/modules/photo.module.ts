import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PhotoService } from '../services/photo.service';
import { PhotoController } from '../controllers/photo.controller';
import { PhotoEntity } from '../entities/photo.entity';
import { AccessoryEntity, UserEntity } from 'src/entities';
import { ConfigService } from 'src/config/config.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccessoryEntity, PhotoEntity, UserEntity]),
  ],
  controllers: [PhotoController],
  providers: [PhotoService, ConfigService],
})
export class PhotoModule {}
