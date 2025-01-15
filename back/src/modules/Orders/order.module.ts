import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './entities/order.entity';
import { OrderDetails } from '../OrderDetails/entities/order-detail.entity';
import { Product } from '../Products/entities/products.entity';
import { User } from '../users/entities/user.entity';
import { OrdersRepository } from './order.repository';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { AuthModule } from 'src/config/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Orders, OrderDetails, Product, User]),
    AuthModule,
    JwtModule,
  ],
  providers: [OrdersRepository, OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
