import { ApiResponse } from '../responses';
import { CreateUserDto, UpdateUserDto } from 'src/entities/dto/index';
import { IPaginationWithDates } from 'src/entities/interfaces/pagination';
import { UserEntity } from 'src/entities/index';
import { UpdatePasswordDto } from 'src/entities/dto/update-password.dto';
import { UserRepository, RoleRepository, PhotoRepository } from '../repositories/index';
export declare class UserService {
    private userRepository;
    private roleRepository;
    private photoRepository;
    constructor(userRepository: UserRepository, roleRepository: RoleRepository, photoRepository: PhotoRepository);
    getAll(identification: number, pagination: IPaginationWithDates): Promise<ApiResponse>;
    findById(identification: number): Promise<ApiResponse>;
    getByIdentification(identification: number): Promise<UserEntity>;
    getByEmail(email: string): Promise<UserEntity>;
    ifExistById(identification: number): Promise<Boolean>;
    ifExistByEmail(email: string): Promise<Boolean>;
    create(dto: CreateUserDto): Promise<ApiResponse>;
    removeExtensionFromFile(filename: string): string;
    createAvatar(identification: number, filename: string, filePath: string): Promise<ApiResponse>;
    update(identification: number, dto: UpdateUserDto): Promise<ApiResponse>;
    updatePassword(identification: number, password: UpdatePasswordDto): Promise<ApiResponse>;
    delete(id: number): Promise<any>;
}
