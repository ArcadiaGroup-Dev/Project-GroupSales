import { Repository } from 'typeorm';
import { Product } from './entities/products.entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductRepository extends Repository<Product> {
  async findByName(name: string): Promise<Product | undefined> {
    return this.findOne({ where: { name } });
  }
}
