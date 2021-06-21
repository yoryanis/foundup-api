import { BaseEntity } from 'typeorm';
import { AccessoryEntity } from './accessory.entity';
export declare class CategoryEntity extends BaseEntity {
    id: number;
    category: string;
    accessories: AccessoryEntity[];
    deletedAt: Date;
}
