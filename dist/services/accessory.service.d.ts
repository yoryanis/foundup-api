import { ConfigService } from '../config/config.service';
import { AccessoryRepository, CategoryRepository, CommentRepository, PhotoRepository, UserRepository } from 'src/repositories';
import { ApiResponse } from '../responses';
import { CreateAccessoryDto, UpdateAccessoryDto } from '../entities/dto/';
import { IPaginationWithDates, IPaginationWithDatesAndState, IPaginationWithDatesAndFilter } from 'src/entities/interfaces/pagination';
import { PhotoService } from './index';
export declare class AccessoryService {
    private accessoryRepository;
    private commentRepository;
    private userRepository;
    private categoryRepository;
    private configService;
    private readonly photoService;
    private photoRepository;
    constructor(accessoryRepository: AccessoryRepository, commentRepository: CommentRepository, userRepository: UserRepository, categoryRepository: CategoryRepository, configService: ConfigService, photoService: PhotoService, photoRepository: PhotoRepository);
    ifExistByName(name: string, id: number): Promise<Boolean>;
    generateQR(unique: string): Promise<any>;
    create(id: number, dto: CreateAccessoryDto): Promise<ApiResponse>;
    removeExtensionFromFile(filename: string): string;
    createEvidences(id_unique: string, filename: string, filePath: string): Promise<ApiResponse>;
    removeEvidence(id: number): Promise<any>;
    findAllLost(pagination: IPaginationWithDates): Promise<ApiResponse>;
    findAll(pagination: IPaginationWithDatesAndState): Promise<ApiResponse>;
    findOne(id: string): Promise<ApiResponse<any>>;
    search(pagination: IPaginationWithDatesAndFilter): Promise<ApiResponse>;
    update(id: string, dto: UpdateAccessoryDto): Promise<ApiResponse>;
    remove(id_unique: string): Promise<any>;
}
