import { Product } from "src/modules/Products/entities/products.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:"Seller"})
export class Seller {
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    name:string

    @Column()
    email:string
    
    @Column()
    password:string

    @Column({default:false})
    isAdmin: boolean

    @Column({default:true})
    isSeller: boolean

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

    @OneToMany(() => Product, (products) => products.seller, { nullable: false })
    products: Product[];
  

    @Column({default:true})
    isActive:boolean

}
