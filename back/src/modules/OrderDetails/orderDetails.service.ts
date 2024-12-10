import { Injectable } from '@nestjs/common';
import { OrderDetailRepository } from './orderDetails.repository';
import { CreateOrderDetailDto } from './dto/order-detail.dto';
import { OrderDetails } from './entities/order-detail.entity';

@Injectable()
export class OrderDetailService {
  constructor(private readonly orderDetailRepository: OrderDetailRepository) {}

  async create(
    createOrderDetailDto: CreateOrderDetailDto,
  ): Promise<OrderDetails> {
    return await this.orderDetailRepository.createOrderDetail(
      createOrderDetailDto,
    );
  }

  async findAll(): Promise<OrderDetails[]> {
    return await this.orderDetailRepository.findAllOrderDetails();
  }

  async findOne(id: string): Promise<OrderDetails> {
    return await this.orderDetailRepository.findOrderDetailById(id);
  }
}
