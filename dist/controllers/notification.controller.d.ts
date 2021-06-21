import { NotificationService } from '../services/notification.service';
import { CreateNotificationDto } from '../entities/dto/';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    create(dto: CreateNotificationDto, id: number): Promise<import("../responses").ApiResponse<any>>;
    findAll(identification: number): Promise<import("../responses").ApiResponse<any>>;
    findComments(id_unique: string): Promise<import("../responses").ApiResponse<any>>;
    findCount(identification: number): Promise<import("../responses").ApiResponse<any>>;
    seen(id: number): Promise<import("../responses").ApiResponse<any>>;
    accept(id_unique: string): Promise<import("../responses").ApiResponse<any>>;
}
