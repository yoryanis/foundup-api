import { EntityRepository, Repository } from 'typeorm';

import { PhotoEntity } from '../entities/photo.entity';

@EntityRepository(PhotoEntity)
export class PhotoRepository extends Repository<PhotoEntity> {}
