import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.userRepository.findOneBy({email:createUserDto.email})
    if(newUser){
      return "Usuario ya registrado"
    }
    this.userRepository.save(createUserDto)

    
    const user = await this.userRepository.findOneBy({id:newUser.id})
    const {password,isAdmin,isSeller, ...userNoPassword} = user

    return userNoPassword

    }

  
  findAll() {
    return this.userRepository.find();
  }

  findOneById(id: string) {
    return this.userRepository.findOne({where:{id}});
  }

  
  findOneByEmail(email: string) {
    return this.userRepository.findOne({where:{email}});
  }


  async removeUser(id: string) {
    const user = await this.userRepository.findOne({where:{id}})
    if(!user){
      return "usuario inexistente"
    }
    user.isActive = false
    return "Usuario eliminado"
  }
}

