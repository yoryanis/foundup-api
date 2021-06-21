import { BaseEntity } from 'typeorm';
import { CategoryEntity, CommentEntity } from './index';
import { States } from './enum/state-accessory.enum';
import { NotificationEntity } from './notification.entity';
import { PhotosAccessoryEntity } from './photos-accessory.entity';
export declare class AccessoryEntity extends BaseEntity {
    id: number;
    id_unique: string;
    name: string;
    description: string;
    category: CategoryEntity;
    comments: CommentEntity[];
    notifications: NotificationEntity[];
    images: PhotosAccessoryEntity[];
    lost_date: Date;
    lost_place: string;
    qr: string;
    reward: number;
    latitude: number;
    longitude: number;
    state: States;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
