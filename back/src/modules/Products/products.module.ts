import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './products.controller';
import { ProductService } from './products.service';
import { ProductsRepository } from './products.repository';
import { Category } from '../Categories/entities/categories.entity';
import { Product } from './entities/products.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category]), UsersModule],
  controllers: [ProductController],
  providers: [ProductService, ProductsRepository],
  exports: [ProductService],
})
export class ProductModule {}
