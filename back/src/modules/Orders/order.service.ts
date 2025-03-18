import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OrdersRepository } from './order.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { Orders } from './entities/order.entity';
import { Product } from '../Products/entities/products.entity';
import { OrderDetails } from '../OrderDetails/entities/order-detail.entity';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrdersRepository,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Orders)
    private readonly ordersRepository: Repository<Orders>,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(OrderDetails)
    private readonly orderDetailRepository: Repository<OrderDetails>,
  ) {}

  async create(
    userId: string,
    products: Array<{ id: string; quantity: number; seller: string }>,
  ) {
    return await this.orderRepository.addOrder(userId, products);
  }

  async findAll() {
    return await this.orderRepository.getAllOrders();
  }

  async findOne(id: string) {
    const order = await this.orderRepository.getOrder(id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async update(id: string, updateOrderDto: any) {
    return await this.orderRepository.updateOrder(id, updateOrderDto);
  }

  async remove(id: string) {
    return await this.orderRepository.removeOrder(id);
  }
}
