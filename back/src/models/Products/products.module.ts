import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './products.controller';
import { ProductService } from './products.service';
import { ProductRepository } from './products.repository';
import { Category } from '../Categories/entities/categories.entity'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductRepository, Category]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService], 
})
export class ProductModule {}
