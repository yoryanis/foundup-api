import {
  BaseEntity,
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AccessoryEntity } from './accessory.entity';
import { PhotoEntity } from './photo.entity';

@Entity({ name: 'photos_accessories' })
export class PhotosAccessoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PhotoEntity, (photo) => photo.photos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'photo_id' })
  public photo!: PhotoEntity;

  @ManyToOne(() => AccessoryEntity, (accessory) => accessory.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'accessory_id' })
  public accessory!: AccessoryEntity;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  public deletedAt: Date;
}
