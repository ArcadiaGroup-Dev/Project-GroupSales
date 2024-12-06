import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetailService } from './orderDetails.service';
import { OrderDetailController } from './orderDetails.controller';
import { OrderDetails } from './entities/order-detail.entity';
import { Orders } from '../Orders/entities/order.entity';
import { Product } from '../Products/entities/products.entity';
import { OrderDetailRepository } from './orderDetails.repository';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetails, Orders, Product])],
  providers: [OrderDetailService, OrderDetailRepository],
  controllers: [OrderDetailController],
})
export class OrderDetailModule {}
