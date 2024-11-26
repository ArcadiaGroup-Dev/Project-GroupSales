import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { CreateCategoryDto } from './dto/categories.dto';
import { UpdateCategoryDto } from './dto/categories.dto';
import { Category } from './entities/categories.entity';

@Injectable()
export class CategoryService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoriesRepository.createCategory(createCategoryDto);
  }

  async findAll(): Promise<Category[]> {
    return this.categoriesRepository.findAllCategories();
  }

  async findOne(id: string): Promise<Category> {
    return this.categoriesRepository.findCategoryById(id);
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    return this.categoriesRepository.updateCategory(id, updateCategoryDto);
  }

  async remove(id: string): Promise<void> {
    await this.categoriesRepository.removeCategory(id);
  }
}

