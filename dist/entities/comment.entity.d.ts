import { BaseEntity } from 'typeorm';
import { AccessoryEntity, UserEntity } from './index';
export declare class CommentEntity extends BaseEntity {
    id: number;
    userOwner: UserEntity;
    accessory: AccessoryEntity;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
