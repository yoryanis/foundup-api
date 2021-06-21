import { AccessoryRepository, NotificationRepository, UserRepository } from 'src/repositories';
import { ApiResponse } from 'src/responses';
import { CreateNotificationDto } from '../entities/dto/index';
export declare class NotificationService {
    private notificationRepository;
    private accessoryRepository;
    private userRepository;
    constructor(notificationRepository: NotificationRepository, accessoryRepository: AccessoryRepository, userRepository: UserRepository);
    create(dto: CreateNotificationDto, id: number): Promise<ApiResponse>;
    findAll(identification: number): Promise<ApiResponse>;
    findComments(id_unique: string): Promise<ApiResponse>;
    count(identification: number): Promise<ApiResponse>;
    seen(id: number): Promise<ApiResponse>;
    accept(id_unique: string): Promise<ApiResponse>;
}
