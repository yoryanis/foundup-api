import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AccessoryEntity, NotificationEntity, UserEntity } from 'src/entities';
import { States } from 'src/entities/enum/state-accessory.enum';
import {
  AccessoryRepository,
  NotificationRepository,
  UserRepository,
} from 'src/repositories';
import { ApiResponse, ERROR, SUCCESS } from 'src/responses';
import { CreateNotificationDto } from '../entities/dto/index';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(NotificationEntity)
    private notificationRepository: NotificationRepository,
    @InjectRepository(AccessoryEntity)
    private accessoryRepository: AccessoryRepository,
    @InjectRepository(UserEntity) private userRepository: UserRepository,
  ) {}

  async create(dto: CreateNotificationDto, id: number): Promise<ApiResponse> {
    const accessory = await this.accessoryRepository.findOne({
      id: id,
    });
    if (!accessory) return new ApiResponse(false, ERROR.ACCESSORY_NOT_FOUND);

    const userOwner = await this.userRepository.findOne({
      id: dto.user_owner,
    });
    if (!userOwner) return new ApiResponse(false, ERROR.USER_NOT_FOUND);

    const userRef = await this.userRepository.findOne({
      id: dto.user_id,
    });
    if (!userRef) return new ApiResponse(false, ERROR.USER_NOT_FOUND);

    const noti = await this.notificationRepository.create(dto);
    noti.userOwner = <any>userOwner.id;
    noti.user = <any>userRef.id;
    noti.accessory = <any>accessory.id;
    await noti.save();

    return new ApiResponse(true, SUCCESS.NOTIFICATION_CREATED);
  }

  async findAll(identification: number): Promise<ApiResponse> {
    const result = await this.notificationRepository
      .createQueryBuilder('notification')
      .innerJoinAndSelect(
        'notification.userOwner',
        'user',
        'notification.user_owner = user.id',
      )
      .innerJoinAndSelect(
        'notification.user',
        'userRef',
        'notification.user_id = userRef.id',
      )
      .innerJoinAndSelect(
        'notification.accessory',
        'accessory',
        'notification.accessory_id = accessory.id',
      )
      .where('user.role_id = 2 AND user.identification = :identification', {
        identification: identification,
      })
      .orderBy('notification.createdAt', 'DESC')
      .getMany();

    if (!result.length) new ApiResponse(false, ERROR.NOTIFICATION_NOT_FOUND);

    return new ApiResponse(true, SUCCESS.NOTIFICATIONS_FOUND, result);
  }

  async findComments(id_unique: string): Promise<ApiResponse> {
    const result = await this.notificationRepository
      .createQueryBuilder('notification')
      .innerJoinAndSelect(
        'notification.userOwner',
        'user',
        'notification.user_owner = user.id',
      )
      .innerJoinAndSelect(
        'notification.user',
        'userRef',
        'notification.user_id = userRef.id',
      )
      .innerJoinAndSelect(
        'notification.accessory',
        'accessory',
        'notification.accessory_id = accessory.id',
      )
      .where(
        "user.role_id = 2 AND accessory.id_unique = :id_unique AND notification.type ='found'",
        {
          id_unique: id_unique,
        },
      )
      .orderBy('notification.updatedAt', 'DESC')
      .getMany();

    if (!result.length) new ApiResponse(false, ERROR.NOTIFICATION_NOT_FOUND);

    return new ApiResponse(true, SUCCESS.NOTIFICATIONS_FOUND, result);
  }

  async count(identification: number): Promise<ApiResponse> {
    const result = await this.notificationRepository
      .createQueryBuilder('notification')
      .innerJoinAndSelect(
        'notification.userOwner',
        'user',
        'notification.user_owner = user.id',
      )
      .innerJoinAndSelect(
        'notification.user',
        'userRef',
        'notification.user_id = userRef.id',
      )
      .innerJoinAndSelect(
        'notification.accessory',
        'accessory',
        'notification.accessory_id = accessory.id',
      )
      .where(
        'user.role_id = 2 AND user.identification = :identification AND notification.seen = false',
        {
          identification: identification,
        },
      )
      .getCount();

    return new ApiResponse(true, SUCCESS.NOTIFICATIONS_FOUND, result);
  }

  async seen(id: number): Promise<ApiResponse> {
    const notification = await this.notificationRepository.findOne({
      id: id,
    });
    if (!notification)
      return new ApiResponse(false, ERROR.NOTIFICATION_NOT_FOUND);

    await this.notificationRepository.update({ id: id }, { seen: true });

    return new ApiResponse(true, SUCCESS.NOTIFICATION_CREATED);
  }

  async accept(id_unique: string): Promise<ApiResponse> {
    const accessory = await this.accessoryRepository.findOne({
      id_unique: id_unique,
    });
    if (!accessory) return new ApiResponse(false, ERROR.ACCESSORY_NOT_FOUND);

    await this.accessoryRepository.update(
      { id_unique: id_unique },
      { state: States.FOUND },
    );

    return new ApiResponse(true, SUCCESS.NOTIFICATION_CREATED);
  }
}
