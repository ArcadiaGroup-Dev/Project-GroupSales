import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/products.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/productos.dto';
import { UsersService } from '../users/users.service';
import { UpdateProductDto } from './dto/productos.dto'; 

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly userService: UsersService,  
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const { userId, ...productData } = createProductDto;
  
    const user = await this.userService.findOneById(userId);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const product = this.productRepository.create({
      ...productData,
      user, 
    });

    return this.productRepository.save(product);
  }


  async findAllProducts(): Promise<Product[]> {
    try {
      return await this.productRepository.find();
    } catch (error) {
      throw new Error(`Error al obtener todos los productos: ${error.message}`);
    }
  }


  async findProductById(id: string): Promise<Product> {
    try {
      const product = await this.productRepository.findOne({ where: { id }, relations: ['user', 'category'] });
      if (!product) {
        throw new Error('Producto no encontrado');
      }
      return product;
    } catch (error) {
      throw new Error(`Error al obtener el producto: ${error.message}`);
    }
  }


  async updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    try {
      const product = await this.productRepository.findOne({ where: { id } });
      if (!product) {
        throw new Error('Producto no encontrado');
      }

      const updatedProduct = this.productRepository.merge(product, updateProductDto);
      return await this.productRepository.save(updatedProduct);
    } catch (error) {
      throw new Error(`Error al actualizar el producto: ${error.message}`);
    }
  }


  async removeProduct(id: string): Promise<void> {
    try {
      const product = await this.productRepository.findOne({ where: { id } });
      if (!product) {
        throw new Error('Producto no encontrado');
      }

      await this.productRepository.remove(product);
    } catch (error) {
      throw new Error(`Error al eliminar el producto: ${error.message}`);
    }
  }
}
