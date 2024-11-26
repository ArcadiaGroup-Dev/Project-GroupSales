import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/categories.entity';
import { CategoriesRepository } from './categories.repository';
import { CategoryService } from './categories.service';
import {CategoryController } from './categories.controller'; 

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoriesRepository, CategoryService],
  controllers: [CategoryController], 
  exports: [CategoryService], 
})
export class CategoriesModule {}



