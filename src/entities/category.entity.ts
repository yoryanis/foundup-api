import {
  BaseEntity,
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { AccessoryEntity } from './accessory.entity';

@Entity({ name: 'categories' })
export class CategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  category: string;

  @OneToMany(() => AccessoryEntity, (accessory) => accessory.category, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  accessories: AccessoryEntity[];

  @DeleteDateColumn({ name: 'deleted_at' })
  public deletedAt: Date;
}
