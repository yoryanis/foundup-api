import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { CategoryEntity } from 'src/entities';
import { CategoryRepository } from 'src/repositories';
import { ApiResponse, SUCCESS, ERROR } from '../responses';
import { CreateCategoryDto } from '../entities/dto/';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: CategoryRepository,
  ) {}

  async create(dto: any): Promise<ApiResponse> {
    if (
      await this.categoryRepository.findOne({
        category: dto.category,
      })
    )
      return new ApiResponse(false, ERROR.CATEGORY_EXIST);

    const category = await this.categoryRepository.create({
      category: dto.category,
    });
    await category.save();

    return new ApiResponse(true, SUCCESS.CATEGORY_CREATED, category);
  }

  async findAll(): Promise<ApiResponse> {
    const categories = await this.categoryRepository.find();

    return new ApiResponse(true, SUCCESS.CATEGORY_FOUND, categories);
  }

  async update(id: number, dto: CreateCategoryDto): Promise<ApiResponse> {
    const category = await this.categoryRepository.findOne({
      id: id,
    });

    if (
      await this.categoryRepository.findOne({
        category: dto.category,
      })
    )
      return new ApiResponse(false, ERROR.CATEGORY_EXIST);

    if (!category) return new ApiResponse(false, ERROR.CATEGORY_NOT_FOUND);

    category.category = dto.category;
    const result = await this.categoryRepository.save(category);

    return new ApiResponse(true, SUCCESS.CATEGORY_UPDATED, result);
  }

  async remove(id: number) {
    const category = await this.categoryRepository.findOne({ id: id });

    if (!category) return new ApiResponse(false, ERROR.CATEGORY_NOT_FOUND);

    this.categoryRepository.softRemove(category);

    return new ApiResponse(true, SUCCESS.CATEGORY_DELETED);
  }
}
