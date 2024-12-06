import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDetails } from './entities/order-detail.entity';
import { CreateOrderDetailDto } from './dto/order-detail.dto';
import { Orders } from '../Orders/entities/order.entity';
import { Product } from '../Products/entities/products.entity';

@Injectable()
export class OrderDetailRepository {
  constructor(
    @InjectRepository(OrderDetails)
    private readonly orderDetailRepo: Repository<OrderDetails>,
    @InjectRepository(Orders)
    private readonly ordersRepo: Repository<Orders>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async createOrderDetail(createOrderDetailDto: CreateOrderDetailDto): Promise<OrderDetails> {
    const { orderId, productId, quantity, price } = createOrderDetailDto;


    const order = await this.ordersRepo.findOne({ where: { id: orderId } });
    if (!order) throw new NotFoundException('Order not found');

  
    const product = await this.productRepo.findOne({ where: { id: productId } });
    if (!product) throw new NotFoundException('Product not found');

    
    const orderDetail = this.orderDetailRepo.create({
      order,
      products: [product], 
      quantity,
      price,
    });

    return await this.orderDetailRepo.save(orderDetail);
  }

  async findAllOrderDetails(): Promise<OrderDetails[]> {
    return await this.orderDetailRepo.find({
      relations: ['order', 'products'], 
    });
  }

  async findOrderDetailById(id: string): Promise<OrderDetails> {
    const orderDetail = await this.orderDetailRepo.findOne({
      where: { id },
      relations: ['order', 'products'], 
    });
    if (!orderDetail) throw new NotFoundException('OrderDetail not found');
    return orderDetail;
  }
}

