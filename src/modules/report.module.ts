import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccessoryEntity, CommentEntity, UserEntity } from 'src/entities';
import { ReportController } from 'src/controllers/report.controller';
import { ReportService } from 'src/services/report.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccessoryEntity, CommentEntity, UserEntity]),
  ],
  controllers: [ReportController],
  providers: [ReportService],
  exports: [ReportService],
})
export class ReportModule {}
