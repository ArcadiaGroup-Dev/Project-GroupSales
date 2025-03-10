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

  // async create(
  //   userId: string,
  //   products: Array<{ id: string; quantity: number }>,
  // ) {
  //   let total = 0;

  //   const user = await this.usersRepository.findOne({ where: { id: userId } });
  //   if (!user)
  //     throw new NotFoundException(`Usuario con id ${userId} no encontrado`);

  //   const order = new Orders();
  //   order.date = new Date();
  //   order.user = user;
  //   const newOrder = await this.ordersRepository.save(order);

  //   const productsArray = await Promise.all(
  //     products.map(async (element) => {
  //       const product = await this.productsRepository.findOne({
  //         where: { id: element.id },
  //       });
  //       if (!product)
  //         throw new NotFoundException(
  //           `Producto con id ${element.id} no encontrado`,
  //         );

  //       if (product.stock < element.quantity) {
  //         throw new BadRequestException(
  //           `No hay suficiente stock para el producto ${product.name}`,
  //         );
  //       }

  //       total += product.price * element.quantity;
  //       await this.productsRepository.update(
  //         { id: element.id },
  //         { stock: product.stock - element.quantity },
  //       );

  //       return { product, quantity: element.quantity };
  //     }),
  //   );

  //   const orderDetail = new OrderDetails();
  //   orderDetail.price = Number(total.toFixed(2));
  //   orderDetail.products = productsArray.map((item) => item.product);
  //   orderDetail.quantity = productsArray.reduce(
  //     (acc, item) => acc + item.quantity,
  //     0,
  //   );
  //   orderDetail.order = newOrder;

  //   await this.orderDetailRepository.save(orderDetail);

  //   return {
  //     order: await this.orderDetailRepository.find({
  //       where: { id: orderDetail.id },
  //       relations: { order: true, products: true },
  //     }),
  //     finalTotal: total,
  //   };
  // }

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
