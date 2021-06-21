import { CategoryRepository } from 'src/repositories';
import { ApiResponse } from '../responses';
import { CreateCategoryDto } from '../entities/dto/';
export declare class CategoryService {
    private categoryRepository;
    constructor(categoryRepository: CategoryRepository);
    create(dto: any): Promise<ApiResponse>;
    findAll(): Promise<ApiResponse>;
    update(id: number, dto: CreateCategoryDto): Promise<ApiResponse>;
    remove(id: number): Promise<ApiResponse<any>>;
}
