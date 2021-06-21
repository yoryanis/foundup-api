import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  AccessoryEntity,
  PhotoEntity,
  PhotosAccessoryEntity,
} from 'src/entities';
import { ConfigService } from 'src/config/config.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PhotosAccessoryEntity,
      AccessoryEntity,
      PhotoEntity,
    ]),
  ],
  controllers: [],
  providers: [ConfigService],
})
export class PhotosAccessoriesModule {}
