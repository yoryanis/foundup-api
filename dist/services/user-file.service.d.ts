import { PhotoEntity, UserEntity } from 'src/entities/index';
import { UserRepository } from '../repositories/index';
export declare class UserFileService {
    private userFileRepository;
    constructor(userFileRepository: UserRepository);
    create(photoFile: PhotoEntity): Promise<PhotoEntity & UserEntity>;
}
