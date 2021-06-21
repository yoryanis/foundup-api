import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { PhotoService } from '../services/photo.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.photoService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.photoService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.photoService.remove(+id);
  }
}
