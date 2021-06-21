import {
  BaseEntity,
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserEntity } from './index';
import { PhotosAccessoryEntity } from './photos-accessory.entity';

@Entity({ name: 'photos' })
export class PhotoEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  url: string;

  @Column({ type: 'boolean', default: false })
  default: boolean;

  /* Relación Photo - Accessory */
  @OneToMany(() => PhotosAccessoryEntity, (pa) => pa.photo, {
    cascade: true,
  })
  public photos!: PhotosAccessoryEntity[];

  @OneToMany(() => UserEntity, (user) => user.rol, {
    cascade: true,
  })
  users: UserEntity[];

  @DeleteDateColumn({ name: 'deleted_at' })
  public deletedAt: Date;
}
