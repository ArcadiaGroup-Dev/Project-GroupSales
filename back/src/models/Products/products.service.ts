import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { CreateProductDto } from './dto/productos.dto';
import { UpdateProductDto } from './dto/productos.dto';
import { Product } from './entities/products.entity';

@Injectable()
export class ProductService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    return this.productsRepository.createProduct(createProductDto);
  }

  async findAll(): Promise<Product[]> {
    return this.productsRepository.findAllProducts();
  }

  async findOne(id: string): Promise<Product> {
    return this.productsRepository.findProductById(id);
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    return this.productsRepository.updateProduct(id, updateProductDto);
  }

  async remove(id: string): Promise<void> {
    await this.productsRepository.removeProduct(id);
  }
}
