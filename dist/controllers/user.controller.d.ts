/// <reference types="multer" />
import { ApiResponse } from 'src/responses';
import { CreateUserDto, UpdateUserDto } from 'src/entities/dto/index';
import { IPaginationWithDates } from 'src/entities/interfaces/pagination';
import { UserService } from 'src/services/';
import { UpdatePasswordDto } from 'src/entities/dto/update-password.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAll(identification: number, pagination: IPaginationWithDates): Promise<ApiResponse>;
    getById(identification: number): Promise<ApiResponse<any>>;
    create(dto: CreateUserDto): Promise<ApiResponse<any>>;
    addAvatar(identification: number, file: Express.Multer.File): Promise<ApiResponse>;
    update(identification: number, dto: UpdateUserDto): Promise<ApiResponse<any>>;
    updatePassword(identification: number, password: UpdatePasswordDto): Promise<ApiResponse<any>>;
    delete(id: number): Promise<any>;
}
