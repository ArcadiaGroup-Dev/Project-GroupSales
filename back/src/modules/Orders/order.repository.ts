import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrderDetails } from '../OrderDetails/entities/order-detail.entity';
import { User } from '../users/entities/user.entity';
import { Product } from '../Products/entities/products.entity';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Orders)
    private readonly ordersRepository: Repository<Orders>,
    @InjectRepository(OrderDetails)
    private readonly orderDetailRepository: Repository<OrderDetails>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async addOrder(
    userId: string,
    products: Array<{ id: string; quantity: number; seller: string }>,
  ) {
    let total = 0;

    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user)
      throw new NotFoundException(`Usuario con id ${userId} no encontrado`);

    // Obtener el vendedor (seller)
    const sellerIds = [...new Set(products.map((product) => product.seller))];
    if (sellerIds.length !== 1) {
      throw new BadRequestException(
        'Todos los productos deben tener el mismo vendedor.',
      );
    }

    const seller = await this.usersRepository.findOneBy({ id: sellerIds[0] });
    if (!seller)
      throw new NotFoundException(
        `Vendedor con id ${sellerIds[0]} no encontrado`,
      );

    // Crear la nueva orden
    const order = new Orders();
    order.date = new Date();
    order.user = user;
    order.seller = seller; // Asignar el vendedor
    const newOrder = await this.ordersRepository.save(order);

    const productsArray = await Promise.all(
      products.map(async (element) => {
        const product = await this.productsRepository.findOneBy({
          id: element.id,
        });
        if (!product)
          throw new NotFoundException(
            `Producto con id ${element.id} no encontrado`,
          );

        total += Number(product.price) * element.quantity;

        await this.productsRepository.update(
          { id: element.id },
          { stock: product.stock - element.quantity },
        );

        return { product, quantity: element.quantity };
      }),
    );

    const orderDetail = new OrderDetails();
    orderDetail.price = Number(total.toFixed(2));
    orderDetail.products = productsArray.map((item) => item.product);
    orderDetail.quantity = productsArray.reduce(
      (acc, item) => acc + item.quantity,
      0,
    );
    orderDetail.order = newOrder;

    await this.orderDetailRepository.save(orderDetail);

    return {
      orderId: newOrder.id,
      detail: await this.orderDetailRepository.find({
        where: { id: orderDetail.id },
        relations: {
          order: true,
          products: true,
        },
      }),
    };
  }

  async getOrder(id: string) {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: {
        orderDetails: {
          products: true,
        },
        user: true,
        seller: true,
      },
    });

    if (!order) throw new NotFoundException(`Order con id ${id} no encontrada`);

    return order;
  }

  async getAllOrders() {
    return await this.ordersRepository.find({
      relations: {
        user: true,
        seller: true,
        orderDetails: true,
      },
    });
  }

  async updateOrder(id: string, updateOrderDto: any) {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: {
        orderDetails: true,
        user: true,
      },
    });

    if (!order) throw new NotFoundException(`Order con id ${id} no encontrada`);

    Object.assign(order, updateOrderDto);

    return await this.ordersRepository.save(order);
  }

  async removeOrder(id: string) {
    const order = await this.ordersRepository.findOne({ where: { id } });
    if (!order) throw new NotFoundException(`Order con id ${id} no encontrada`);

    return await this.ordersRepository.remove(order);
  }
}
