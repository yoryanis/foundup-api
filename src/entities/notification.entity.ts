import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm';

import { AccessoryEntity, UserEntity } from './index';

@Entity({ name: 'notifications' })
export class NotificationEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  details: string;

  @Column({ type: 'boolean', default: false })
  seen: boolean;

  @Column({ type: 'text', nullable: false })
  type: string;

  @Column({ type: 'float', nullable: true })
  latitude: number;

  @Column({ type: 'float', nullable: true })
  longitude: number;

  @ManyToOne(() => UserEntity, (user) => user.users)
  @JoinColumn({ name: 'user_id' })
  public user!: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.users, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_owner' })
  public userOwner!: UserEntity;

  @ManyToOne(() => AccessoryEntity, (accessory) => accessory.comments, {
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
