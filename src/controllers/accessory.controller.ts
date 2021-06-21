import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { AccessoryService } from '../services/accessory.service';
import { CreateAccessoryDto, UpdateAccessoryDto } from '../entities/dto/';
import {
  IPaginationWithDates,
  IPaginationWithDatesAndState,
  IPaginationWithDatesAndFilter,
} from 'src/entities/interfaces/pagination';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { Multer } from 'src/services';
import { ApiOperation, ApiResponse as AR } from '@nestjs/swagger';
import { ApiResponse } from 'src/responses';

@Controller('accessory')
export class AccessoryController {
  constructor(private readonly accessoryService: AccessoryService) {}

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post(':id')
  create(
    @Body() dto: CreateAccessoryDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.accessoryService.create(id, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('evidences/:id_unique')
  @UseInterceptors(FileInterceptor('file', Multer.DEFAULT_FILTER_OPTIONS))
  @ApiOperation({ summary: 'Adds file to accessory' })
  @AR({ status: 201, description: 'success', type: ApiResponse })
  async addEvidence(
    @Param('id_unique') id_unique: string,
    @UploadedFile() file,
  ) {
    return await this.accessoryService.createEvidences(
      id_unique,
      file.filename,
      file.path,
    );
  }

  @Get()
  findAllLost(@Query() pagination: IPaginationWithDates) {
    return this.accessoryService.findAllLost(pagination);
  }

  @Get('user-accesories')
  findAll(@Query() pagination: IPaginationWithDatesAndState) {
    return this.accessoryService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accessoryService.findOne(id);
  }

  @Get('search/lost')
  search(@Query() pagination: IPaginationWithDatesAndFilter) {
    return this.accessoryService.search(pagination);
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: Partial<UpdateAccessoryDto>) {
    return this.accessoryService.update(id, dto);
  }

  @Delete(':id_unique')
  remove(@Param('id_unique') id_unique: string) {
    return this.accessoryService.remove(id_unique);
  }

  @Delete('evidences/delete/:id')
  removeEvidence(@Param('id', ParseIntPipe) id: number) {
    return this.accessoryService.removeEvidence(id);
  }
}
