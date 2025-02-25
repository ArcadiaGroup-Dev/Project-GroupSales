import { Orders } from 'src/modules/Orders/entities/order.entity';
import { Product } from 'src/modules/Products/entities/products.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  SELLER = 'seller',
  CLIENT = 'client',
}

@Entity({ name: 'Users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  birthdate: Date;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column()
  bank: string;

  @Column()
  account:string;

  @Column()
  cardHolder:string;

  @Column()
  alias: string;

  @Column()
  cbu: string;


  @OneToMany(() => Product, (products) => products.user, { nullable: true })
  products: Product[];

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CLIENT })
  role: UserRole;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Orders, (order) => order.user)
  @JoinColumn({ name: 'orders_id' })
  orders: Orders[];

  @OneToMany(() => Orders, (order) => order.seller)
  soldOrders: Orders[];
}
