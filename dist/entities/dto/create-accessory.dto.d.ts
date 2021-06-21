import { States } from '../enum/state-accessory.enum';
export declare class CreateAccessoryDto {
    id_unique: string;
    name?: string;
    description?: string;
    category_id?: number;
    lost_date?: Date;
    lost_place?: string;
    reward?: number;
    latitude?: number;
    longitude?: number;
    state?: States;
}
