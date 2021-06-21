import * as QRCode from 'qrcode';
import { ConfigService } from '../config/config.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { unlinkSync } from 'fs';

import {
  AccessoryEntity,
  CategoryEntity,
  CommentEntity,
  PaginationVerifier,
  PhotoEntity,
  PhotosAccessoryEntity,
  UserEntity,
} from 'src/entities';
import {
  AccessoryRepository,
  CategoryRepository,
  CommentRepository,
  PhotoRepository,
  UserRepository,
} from 'src/repositories';
import { ApiResponse, SUCCESS, ERROR } from '../responses';
import { ApiResponseRecords } from 'src/responses/api.response';
import { CreateAccessoryDto, UpdateAccessoryDto } from '../entities/dto/';
import {
  IPaginationWithDates,
  IPaginationWithDatesAndState,
  IPaginationWithDatesAndFilter,
} from 'src/entities/interfaces/pagination';
import { States } from 'src/entities/enum/state-accessory.enum';
import { Configuration } from 'src/config/constant';
import { PhotoService, Cloudinary } from './index';

@Injectable()
export class AccessoryService {
  constructor(
    @InjectRepository(AccessoryEntity)
    private accessoryRepository: AccessoryRepository,
    @InjectRepository(CommentEntity)
    private commentRepository: CommentRepository,
    @InjectRepository(UserEntity)
    private userRepository: UserRepository,
    @InjectRepository(CategoryEntity)
    private categoryRepository: CategoryRepository,
    private configService: ConfigService,
    private readonly photoService: PhotoService,
    @InjectRepository(PhotoEntity)
    private photoRepository: PhotoRepository,
  ) {}

  async ifExistByName(name: string, id: number): Promise<Boolean> {
    const accessory = await this.accessoryRepository
      .createQueryBuilder('accessory')
      .leftJoinAndSelect(
        CommentEntity,
        'comment',
        'comment.accessory_id = accessory.id',
      )
      .leftJoinAndSelect(UserEntity, 'user', 'comment.user_owner = user.id')
      .where('accessory.name = :name AND user.id = :id', {
        name: name,
        id: id,
      })
      .getOne();

    return accessory ? true : false;
  }

  async generateQR(unique: string) {
    const urlHost = await this.configService.get(Configuration.URL_HOST);
    const url = `${urlHost}/preview/${unique}`;

    return QRCode.toDataURL(url);
  }

  async create(id: number, dto: CreateAccessoryDto): Promise<ApiResponse> {
    if (await this.ifExistByName(dto.name, id))
      return new ApiResponse(false, ERROR.ACCESSORY_EXIST);

    const category = await this.categoryRepository.findOne({
      id: dto.category_id,
    });
    if (!category) return new ApiResponse(false, ERROR.CATEGORY_NOT_FOUND);

    if (!Object.values(States).includes(dto.state))
      return new ApiResponse(false, ERROR.STATE_ACCESSORY);

    /* Crear código QR */
    const user = await this.userRepository.findOne({
      id: id,
    });
    if (!user) return new ApiResponse(false, ERROR.USER_NOT_FOUND);
    const uuid: string = uuidv4();
    const regex = /-/gi;
    const unique_identifier = uuid.replace(regex, '');
    const qr = await this.generateQR(unique_identifier);
    if (await this.accessoryRepository.findOne({ qr: qr }))
      return new ApiResponse(false, ERROR.QR_EXIST);

    const accessory = await this.accessoryRepository.create(dto);
    accessory.category = <any>dto.category_id;
    accessory.id_unique = unique_identifier;
    accessory.qr = qr;
    await accessory.save();

    const comment = new CommentEntity();
    comment.userOwner = <any>user.id;
    comment.accessory = <any>accessory.id;
    await comment.save();

    return new ApiResponse(true, SUCCESS.ACCESSORY_CREATED, {
      accessory,
      comment,
    });
  }

  removeExtensionFromFile(filename: string): string {
    const parts = filename.split('.');
    const ext = `.${parts[1]}`;
    const response = filename.replace(ext, '');
    return response;
  }

  async createEvidences(
    id_unique: string,
    filename: string,
    filePath: string,
  ): Promise<ApiResponse> {
    const accessory = await this.accessoryRepository.findOne({
      id_unique: id_unique,
    });
    if (!accessory) return new ApiResponse(false, ERROR.ACCESSORY_NOT_FOUND);

    let actualDate = new Date().toISOString();
    actualDate = actualDate.slice(0, actualDate.length - 5);
    let id = `${actualDate}-${filename}`;
    id = this.removeExtensionFromFile(id);
    let folder = 'evidences';
    const uploadedFile = await Cloudinary.uploadFile(filePath, folder, id);

    if (uploadedFile) {
      unlinkSync(filePath);

      const photo = this.photoRepository.create({
        url: uploadedFile.secure_url,
        default: true,
      });
      const evidence = await this.photoRepository.save(photo);

      const photoAccessory = new PhotosAccessoryEntity();
      photoAccessory.photo = <any>photo.id;
      photoAccessory.accessory = <any>accessory.id;
      photoAccessory.save();

      return new ApiResponse(true, SUCCESS.PHOTO_CREATED, evidence);
    } else {
      return new ApiResponse(false, ERROR.FILE_WAS_NOT_UPLOADED);
    }
  }

  async removeEvidence(id: number): Promise<any> {
    const evidence = await this.photoRepository.findOne({
      id: id,
    });

    if (!evidence) return new ApiResponse(false, ERROR.PHOTO_NOT_FOUND);

    await Cloudinary.removeFile(evidence.url);
    this.photoRepository
      .createQueryBuilder()
      .delete()
      .from(PhotoEntity)
      .where('id = :id', {
        id: id,
      })
      .execute();
    return new ApiResponse(true, SUCCESS.PHOTO_DELETED);
  }

  async findAllLost(pagination: IPaginationWithDates): Promise<ApiResponse> {
    if (!PaginationVerifier.verifyIPagination(pagination))
      return ApiResponse.paginationWithDatesNotProvidedError();

    const result = await this.accessoryRepository
      .createQueryBuilder('accessory')
      .innerJoinAndSelect('accessory.comments', 'comments')
      .innerJoinAndSelect('comments.userOwner', 'user')
      .leftJoinAndSelect('accessory.category', 'category')
      .leftJoinAndSelect('accessory.images', 'pa')
      .leftJoinAndSelect('pa.photo', 'images')
      .leftJoinAndSelect('user.photo', 'photos')
      .where(
        "accessory.created_at >= :start AND accessory.created_at <= :end AND user.role_id = 2 AND accessory.state = 'lost'",
        {
          start: pagination.start,
          end: pagination.end,
        },
      )
      .skip(Math.max(0, (pagination.pageNumber - 1) * pagination.pageElements))
      .take(pagination.pageElements)
      .orderBy('accessory.updatedAt', 'DESC')
      .getManyAndCount();

    if (!result.length) new ApiResponse(false, ERROR.ACCESSORIES_NOT_FOUND);

    return new ApiResponse(
      true,
      SUCCESS.ACCESSORIES_FOUND,
      new ApiResponseRecords(result, pagination),
    );
  }

  async findAll(
    pagination: IPaginationWithDatesAndState,
  ): Promise<ApiResponse> {
    if (!PaginationVerifier.verifyIPagination(pagination))
      return ApiResponse.paginationWithDatesNotProvidedError();

    const result = await this.accessoryRepository
      .createQueryBuilder('accessory')
      .innerJoinAndSelect('accessory.comments', 'comments')
      .innerJoinAndSelect('comments.userOwner', 'user')
      .leftJoinAndSelect('accessory.category', 'category')
      .leftJoinAndSelect('accessory.images', 'pa')
      .leftJoinAndSelect('pa.photo', 'images')
      .leftJoinAndSelect('user.photo', 'photos')
      .where(
        'accessory.created_at >= :start AND accessory.created_at <= :end AND user.role_id = 2 AND accessory.state = :state AND user.identification = :identification',
        {
          start: pagination.start,
          end: pagination.end,
          state: pagination.state,
          identification: pagination.identification,
        },
      )
      .skip(Math.max(0, (pagination.pageNumber - 1) * pagination.pageElements))
      .take(pagination.pageElements)
      .orderBy('accessory.updatedAt', 'DESC')
      .getManyAndCount();

    if (!result.length) new ApiResponse(false, ERROR.ACCESSORIES_NOT_FOUND);

    return new ApiResponse(
      true,
      SUCCESS.ACCESSORIES_FOUND,
      new ApiResponseRecords(result, pagination),
    );
  }

  async findOne(id: string) {
    const accessory = await this.accessoryRepository
      .createQueryBuilder('accessory')
      .innerJoinAndSelect('accessory.comments', 'comments')
      .innerJoinAndSelect('comments.userOwner', 'user')
      .leftJoinAndSelect('accessory.category', 'category')
      .leftJoinAndSelect('accessory.images', 'pa')
      .leftJoinAndSelect('pa.photo', 'images')
      .leftJoinAndSelect('user.photo', 'photos')
      .where('accessory.id_unique = :id_unique', {
        id_unique: id,
      })
      .getOne();

    if (!accessory) return new ApiResponse(false, ERROR.ACCESSORY_NOT_FOUND);

    return new ApiResponse(true, SUCCESS.ACCESSORY_FOUND, accessory);
  }

  async search(
    pagination: IPaginationWithDatesAndFilter,
  ): Promise<ApiResponse> {
    if (!PaginationVerifier.verifyIPagination(pagination))
      return ApiResponse.paginationWithDatesNotProvidedError();

    const result = await this.accessoryRepository
      .createQueryBuilder('accessory')
      .innerJoinAndSelect('accessory.comments', 'comments')
      .innerJoinAndSelect('comments.userOwner', 'user')
      .leftJoinAndSelect('accessory.category', 'category')
      .leftJoinAndSelect('accessory.images', 'pa')
      .leftJoinAndSelect('pa.photo', 'images')
      .leftJoinAndSelect('user.photo', 'photos')
      .where(
        "accessory.created_at >= :start AND accessory.created_at <= :end AND user.role_id = 2 AND accessory.state = 'lost' AND (LOWER(accessory.name) LIKE LOWER(:filter) OR LOWER(accessory.lost_place) LIKE LOWER(:filter) OR LOWER(category.category) LIKE LOWER(:filter) OR LOWER(user.name) LIKE LOWER(:filter))",
        {
          start: pagination.start,
          end: pagination.end,
          filter: `%${pagination.filter}%`,
        },
      )
      .skip(Math.max(0, (pagination.pageNumber - 1) * pagination.pageElements))
      .take(pagination.pageElements)
      .orderBy('accessory.updatedAt', 'DESC')
      .getManyAndCount();

    if (!result.length) new ApiResponse(false, ERROR.SEARCH_EMPTY);

    return new ApiResponse(
      true,
      SUCCESS.SEARCH,
      new ApiResponseRecords(result, pagination),
    );
  }

  async update(id: string, dto: UpdateAccessoryDto): Promise<ApiResponse> {
    const accessory = await this.accessoryRepository.findOne({
      id_unique: id,
    });
    if (!accessory) return new ApiResponse(false, ERROR.ACCESSORY_NOT_FOUND);

    const accessoryCat = new AccessoryEntity();
    accessoryCat.category = <any>dto.category_id;
    const result = await this.accessoryRepository.update(
      { id_unique: id },
      dto,
    );

    return new ApiResponse(true, SUCCESS.ACCESSORY_UPDATED, result);
  }

  async remove(id_unique: string): Promise<any> {
    const accessory = await this.accessoryRepository.findOne({
      id_unique: id_unique,
    });

    if (!accessory) return new ApiResponse(false, ERROR.ACCESSORY_NOT_FOUND);

    this.accessoryRepository
      .createQueryBuilder()
      .delete()
      .from(AccessoryEntity)
      .where('id_unique = :id_unique', {
        id_unique: id_unique,
      })
      .execute();

    return new ApiResponse(true, SUCCESS.ACCESSORY_DELETED);
  }
}
