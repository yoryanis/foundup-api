import { BaseEntity } from 'typeorm';
import { UserEntity } from './index';
import { PhotosAccessoryEntity } from './photos-accessory.entity';
export declare class PhotoEntity extends BaseEntity {
    id: number;
    url: string;
    default: boolean;
    photos: PhotosAccessoryEntity[];
    users: UserEntity[];
    deletedAt: Date;
}
