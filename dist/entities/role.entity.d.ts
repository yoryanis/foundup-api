import { BaseEntity } from 'typeorm';
import { UserEntity } from './user.entity';
import { Roles } from './enum/role.enum';
export declare class RoleEntity extends BaseEntity {
    id: number;
    role: Roles;
    users: UserEntity[];
    deletedAt: Date;
}
