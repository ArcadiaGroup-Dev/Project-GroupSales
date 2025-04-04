import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderDetails } from '../../OrderDetails/entities/order-detail.entity';
import { User } from '../../users/entities/user.entity';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'Orders',
})
export class Orders {
  @ApiHideProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Debe ser una fecha de tipo dd/mm/yy',
    example: '27/08/2024',
  })
  @Column()
  date: Date;

  @OneToOne(() => OrderDetails, (orderDetail) => orderDetail.order)
  orderDetails: OrderDetails;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => User, (user) => user.soldOrders)
  @JoinColumn({ name: 'seller_id' })
  seller: User;
}
