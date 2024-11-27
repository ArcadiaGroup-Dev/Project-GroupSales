import { Product } from "src/modules/Products/entities/products.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
    ADMIN = 'admin',
    SELLER = 'seller',
    CLIENT = 'client',
  }


@Entity({name:"Users"})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    name:string

    @Column()
    email:string
    
    @Column()
    password:string

    @Column()
    birthdate: Date

    @Column()
    phone: number

    @Column()
    adress: string

    @Column()
    city:string

    @Column()
    country: string

    @OneToMany(() => Product, (products) => products.user, { nullable: true })
    products: Product[]

    @Column({ type: 'enum', enum: UserRole, default: UserRole.CLIENT })
    role: UserRole;

    @Column({default:true})
    isActive:boolean

}
