import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


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

    @Column({default:false})
    isAdmin: boolean

    @Column({default:false})
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

    @Column({default:true})
    isActive:boolean

}
