import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from 'src/config/config.service';

import { UserController } from '../controllers/user.controller';
import {
  UserEntity,
  RoleEntity,
  PhotoEntity,
  AccessoryEntity,
} from '../entities/';
import { UserService, PhotoService } from '../services/';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      RoleEntity,
      PhotoEntity,
      AccessoryEntity,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, PhotoService, ConfigService],
  exports: [UserService],
})
export class UserModule {}
