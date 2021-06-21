import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';

import { ApiResponse, ERROR, SUCCESS } from 'src/responses';
import { CreatePhotoDto } from '../entities/dto/index';
import { AccessoryEntity, PhotoEntity, UserEntity } from 'src/entities/index';
import {
  AccessoryRepository,
  PhotoRepository,
  UserRepository,
} from 'src/repositories/index';
import { ConfigService } from '../config/config.service';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(PhotoEntity) private photoRepository: PhotoRepository,
    @InjectRepository(UserEntity) private userRepository: UserRepository,
    @InjectRepository(AccessoryEntity)
    private accessoryRepository: AccessoryRepository,
    private configService: ConfigService,
  ) {}

  async uploadImage(dataBuffer: Buffer, filename: string) {
    const s3 = new S3();

    const uploadResult = await s3
      .upload({
        Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
        Body: dataBuffer,
        Key: `avatars/${uuid()}-${filename}`,
      })
      .promise();

    const newFile = this.photoRepository.create({
      url: uploadResult.Location,
      default: false,
    });
    await this.photoRepository.save(newFile);

    return newFile;
  }

  async findAll() {
    return `This action returns all photo`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} photo`;
  }

  async remove(id: number) {
    const photo = await this.photoRepository.findOne({
      id: id,
    });

    if (!photo) return new ApiResponse(false, ERROR.PHOTO_NOT_FOUND);

    this.userRepository
      .createQueryBuilder()
      .delete()
      .from(PhotoEntity)
      .where('id = :id', {
        id: id,
      })
      .execute();

    return new ApiResponse(true, SUCCESS.PHOTO_DELETED);
  }
}
