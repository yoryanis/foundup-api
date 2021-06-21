import { EntityRepository, Repository } from 'typeorm';

import { AccessoryEntity } from '../entities/accessory.entity';

@EntityRepository(AccessoryEntity)
export class AccessoryRepository extends Repository<AccessoryEntity> {}
