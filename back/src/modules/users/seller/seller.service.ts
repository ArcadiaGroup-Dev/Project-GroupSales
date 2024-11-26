import { Injectable } from '@nestjs/common';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Seller } from './entities/seller.entity';
import { Repository } from 'typeorm';
import { User } from '../clients/entities/user.entity';

@Injectable()
export class SellerService {
  constructor(
    @InjectRepository(Seller)
    private readonly sellerRepository: Repository<Seller>, 
    private readonly userRepository: Repository<User> 
  ){}

  async create(id:string) {
    const user = await this.userRepository.findOne({where:{id}})
    if(!user){
      return "Usuario inexistente"
    }
    user.isSeller = true

    return this.sellerRepository.save(user)  
  }

  findAll() {
    return this.sellerRepository.find();
  }

  findOne(id: string) {
    return this.sellerRepository.findOne({where:{id}});
  }

/*   update(id: number, updateSellerDto: UpdateSellerDto) {
    return `This action updates a #${id} seller`;
  } */

  async removeSellerPrivilege(id: number) {
    return `This action removes a #${id} seller`;
  }
}
