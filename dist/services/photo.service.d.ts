/// <reference types="node" />
import { ApiResponse } from 'src/responses';
import { PhotoEntity } from 'src/entities/index';
import { AccessoryRepository, PhotoRepository, UserRepository } from 'src/repositories/index';
import { ConfigService } from '../config/config.service';
export declare class PhotoService {
    private photoRepository;
    private userRepository;
    private accessoryRepository;
    private configService;
    constructor(photoRepository: PhotoRepository, userRepository: UserRepository, accessoryRepository: AccessoryRepository, configService: ConfigService);
    uploadImage(dataBuffer: Buffer, filename: string): Promise<PhotoEntity>;
    findAll(): Promise<string>;
    findOne(id: number): Promise<string>;
    remove(id: number): Promise<ApiResponse<any>>;
}
