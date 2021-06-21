import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';

import { CategoryEntity, CommentEntity, PhotoEntity } from './index';
import { States } from './enum/state-accessory.enum';
import { NotificationEntity } from './notification.entity';
import { PhotosAccessoryEntity } from './photos-accessory.entity';

@Entity({ name: 'accessories' })
export class AccessoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  id_unique: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => CategoryEntity, (category) => category.id)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  /* Relación Comment - Accessory */
  @OneToMany(() => CommentEntity, (comment) => comment.accessory, {
    cascade: true,
  })
  public comments!: CommentEntity[];

  /* Relación User - Accessory */
  @OneToMany(() => NotificationEntity, (noti) => noti.accessory, {
    cascade: true,
  })
  public notifications!: NotificationEntity[];

  /* Relación Photo - Accessory */
  @OneToMany(() => PhotosAccessoryEntity, (pa) => pa.accessory, {
    cascade: true,
  })
  public images!: PhotosAccessoryEntity[];

  @Column({ type: 'date', nullable: true })
  lost_date: Date;

  @Column({ type: 'varchar', nullable: true })
  lost_place: string;

  @Column({ type: 'text', nullable: true })
  qr: string;

  @Column({ type: 'float', nullable: true })
  reward: number;

  @Column({ type: 'float', nullable: true })
  latitude: number;

  @Column({ type: 'float', nullable: true })
  longitude: number;

  @Column({ type: 'enum', enum: States, default: States.CREATED })
  state: States;

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
