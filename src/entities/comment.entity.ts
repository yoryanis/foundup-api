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

@Entity({ name: 'comments' })
export class CommentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

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
