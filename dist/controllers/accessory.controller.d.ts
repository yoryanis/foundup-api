import { AccessoryService } from '../services/accessory.service';
import { CreateAccessoryDto, UpdateAccessoryDto } from '../entities/dto/';
import { IPaginationWithDates, IPaginationWithDatesAndState, IPaginationWithDatesAndFilter } from 'src/entities/interfaces/pagination';
import { ApiResponse } from 'src/responses';
export declare class AccessoryController {
    private readonly accessoryService;
    constructor(accessoryService: AccessoryService);
    create(dto: CreateAccessoryDto, id: number): Promise<ApiResponse<any>>;
    addEvidence(id_unique: string, file: any): Promise<ApiResponse<any>>;
    findAllLost(pagination: IPaginationWithDates): Promise<ApiResponse<any>>;
    findAll(pagination: IPaginationWithDatesAndState): Promise<ApiResponse<any>>;
    findOne(id: string): Promise<ApiResponse<any>>;
    search(pagination: IPaginationWithDatesAndFilter): Promise<ApiResponse<any>>;
    update(id: string, dto: Partial<UpdateAccessoryDto>): Promise<ApiResponse<any>>;
    remove(id_unique: string): Promise<any>;
    removeEvidence(id: number): Promise<any>;
}
