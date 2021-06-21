import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { ApiResponse, SUCCESS, ERROR } from '../responses';
import { ApiResponseRecords } from 'src/responses/api.response';
import { CreateUserDto, UpdateUserDto } from 'src/entities/dto/index';
import { IPaginationWithDates } from 'src/entities/interfaces/pagination';
import { PaginationVerifier } from 'src/entities/pagination';
import { Cloudinary } from './index';
import { PhotoEntity, RoleEntity, UserEntity } from 'src/entities/index';
import { UpdatePasswordDto } from 'src/entities/dto/update-password.dto';
import {
  UserRepository,
  RoleRepository,
  PhotoRepository,
} from '../repositories/index';
import { unlinkSync } from 'fs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepository: UserRepository,
    @InjectRepository(RoleEntity) private roleRepository: RoleRepository,
    @InjectRepository(PhotoEntity) private photoRepository: PhotoRepository,
  ) {}

  async getAll(
    identification: number,
    pagination: IPaginationWithDates,
  ): Promise<ApiResponse> {
    if (!PaginationVerifier.verifyIPagination(pagination))
      return ApiResponse.paginationWithDatesNotProvidedError();

    const result = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.rol', 'role')
      .leftJoinAndSelect('user.photo', 'photo')
      .where(
        'user.created_at >= :start AND user.created_at <= :end AND user.identification != :identification AND user.role_id = 1',
        {
          start: pagination.start,
          end: pagination.end,
          identification: identification,
        },
      )
      .skip(Math.max(0, (pagination.pageNumber - 1) * pagination.pageElements))
      .take(pagination.pageElements)
      .orderBy('user.createdAt', 'DESC')
      .getManyAndCount();

    if (!result.length) new ApiResponse(false, ERROR.USERS_NOT_FOUND);

    return new ApiResponse(
      true,
      SUCCESS.USERS_FOUND,
      new ApiResponseRecords(result, pagination),
    );
  }

  async findById(identification: number): Promise<ApiResponse> {
    const user = await this.userRepository.findOne(
      {
        identification: identification,
      },
      { relations: ['rol', 'photo'] },
    );

    if (!user) return new ApiResponse(false, ERROR.USER_NOT_FOUND);

    return new ApiResponse(true, SUCCESS.USER_FOUND, user);
  }

  async getByIdentification(identification: number): Promise<UserEntity> {
    return await this.userRepository.findOne({
      identification: identification,
    });
  }

  async getByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .leftJoinAndSelect('user.rol', 'role')
      .where('user.email = :email', { email: email })
      .getOne();
  }

  async ifExistById(identification: number): Promise<Boolean> {
    const user = await this.userRepository.findOne({
      identification: identification,
    });

    return user ? true : false;
  }

  async ifExistByEmail(email: string): Promise<Boolean> {
    const user = await this.userRepository.findOne({
      email: email,
    });

    return user ? true : false;
  }

  async create(dto: CreateUserDto): Promise<ApiResponse> {
    if (await this.ifExistById(dto.identification))
      return new ApiResponse(false, ERROR.USER_EXIST);

    if (await this.ifExistByEmail(dto.email))
      return new ApiResponse(false, ERROR.EMAIL_EXIST);

    const role = await this.roleRepository.findOne({ id: dto.role_id });
    if (!role) return new ApiResponse(false, ERROR.ROLE_NOT_FOUND);

    const user = await this.userRepository.create(dto);
    user.rol = <any>dto.role_id;
    await user.save();

    return new ApiResponse(true, SUCCESS.USER_CREATED);
  }

  removeExtensionFromFile(filename: string): string {
    const parts = filename.split('.');
    const ext = `.${parts[1]}`;
    const response = filename.replace(ext, '');
    return response;
  }

  async createAvatar(
    identification: number,
    filename: string,
    filePath: string,
  ): Promise<ApiResponse> {
    const user = await this.userRepository.findOne({
      identification: identification,
    });
    if (!user) return new ApiResponse(false, ERROR.USER_NOT_FOUND);

    let actualDate = new Date().toISOString();
    actualDate = actualDate.slice(0, actualDate.length - 5);
    let id = `${actualDate}-${filename}`;
    id = this.removeExtensionFromFile(id);
    let folder = 'avatars';
    const uploadedFile = await Cloudinary.uploadFile(filePath, folder, id);

    if (uploadedFile) {
      unlinkSync(filePath);

      const photo = this.photoRepository.create({
        url: uploadedFile.secure_url,
        default: true,
      });
      const avatar = await this.photoRepository.save(photo);

      user.photo = <any>avatar.id;
      user.save();

      return new ApiResponse(true, SUCCESS.PHOTO_CREATED, avatar);
    } else {
      return new ApiResponse(false, ERROR.FILE_WAS_NOT_UPLOADED);
    }
  }

  async update(
    identification: number,
    dto: UpdateUserDto,
  ): Promise<ApiResponse> {
    const user = await this.userRepository.findOne({
      identification: identification,
    });

    if (!user) return new ApiResponse(false, ERROR.USER_NOT_FOUND);

    const result = await this.userRepository.update(
      { identification: identification },
      dto,
    );

    return new ApiResponse(true, SUCCESS.USER_UPDATED, result);
  }

  async updatePassword(
    identification: number,
    password: UpdatePasswordDto,
  ): Promise<ApiResponse> {
    const user = await this.userRepository.findOne({
      identification: identification,
    });

    if (!user) return new ApiResponse(false, ERROR.USER_NOT_FOUND);

    const result = await this.userRepository.update(
      { identification: identification },
      password,
    );

    return new ApiResponse(true, SUCCESS.PASSWORD_UPDATED, result);
  }

  async delete(id: number): Promise<any> {
    const user = await this.userRepository.findOne({
      id: id,
    });

    if (!user) return new ApiResponse(false, ERROR.USER_NOT_FOUND);

    this.userRepository
      .createQueryBuilder()
      .delete()
      .from(UserEntity)
      .where('id = :id', {
        id: id,
      })
      .execute();

    return new ApiResponse(true, SUCCESS.USER_DELETED);
  }
}
