import { BaseEntity } from 'typeorm';
import { AccessoryEntity } from './accessory.entity';
import { PhotoEntity } from './photo.entity';
export declare class PhotosAccessoryEntity extends BaseEntity {
    id: number;
    photo: PhotoEntity;
    accessory: AccessoryEntity;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
