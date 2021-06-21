import { BaseEntity } from 'typeorm';
import { RoleEntity, PhotoEntity, CommentEntity } from './index';
import { NotificationEntity } from './notification.entity';
export declare class UserEntity extends BaseEntity {
    id: number;
    identification: number;
    name: string;
    lastname: string;
    rol: RoleEntity;
    photo: PhotoEntity;
    users: CommentEntity[];
    notifications: NotificationEntity[];
    occupation: string;
    city: string;
    address: string;
    birthdate: Date;
    phone: string;
    email: string;
    password: string;
    state: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    hashPassword(): Promise<void>;
    comparePassword(attempt: string): Promise<boolean>;
}
