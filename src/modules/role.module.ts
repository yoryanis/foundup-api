import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleEntity } from 'src/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
})
export class RoleModule {}
