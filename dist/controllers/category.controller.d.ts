import { CategoryService } from '../services/category.service';
import { CreateCategoryDto } from '../entities/dto/';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(dto: CreateCategoryDto): Promise<import("../responses").ApiResponse<any>>;
    findAll(): Promise<import("../responses").ApiResponse<any>>;
    update(id: number, dto: CreateCategoryDto): Promise<import("../responses").ApiResponse<any>>;
    removeCategory(id: number): Promise<import("../responses").ApiResponse<any>>;
}
