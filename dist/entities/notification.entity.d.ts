import { BaseEntity } from 'typeorm';
import { AccessoryEntity, UserEntity } from './index';
export declare class NotificationEntity extends BaseEntity {
    id: number;
    details: string;
    seen: boolean;
    type: string;
    latitude: number;
    longitude: number;
    user: UserEntity;
    userOwner: UserEntity;
    accessory: AccessoryEntity;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
