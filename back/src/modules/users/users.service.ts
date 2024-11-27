import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.userRepository.findOneBy({ email: createUserDto.email });
      if (existingUser) {
        return "Usuario ya registrado";
      }

      const newUser = await this.userRepository.save(createUserDto);
      const { password, role, ...userNoPassword } = newUser;
      return userNoPassword;
    } catch (error) {
      throw new Error(`Error al crear usuario: ${error.message}`);
    }
  }

  async createSeller(id: string) {
    try {
      const client = await this.userRepository.findOne({ where: { id } });
      if (!client || client.role !== UserRole.CLIENT) {
        throw new Error('Error en la generación de vendedor');
      }

      client.role = UserRole.SELLER;
      return await this.userRepository.save(client);
    } catch (error) {
      throw new Error(`Error al crear vendedor: ${error.message}`);
    }
  }

  async createAdmin(id: string, createUserDto?: CreateUserDto) {
    try {
      let newAdmin = await this.findOneById(id);
    
      if (!newAdmin) {
        if (!createUserDto) {
          throw new Error('No se proporcionaron datos para crear el administrador');
        }
        await this.create(createUserDto); 
        newAdmin = await this.findOneByEmail(createUserDto.email); 
      }
    
      newAdmin.role = UserRole.ADMIN;
      return await this.userRepository.save(newAdmin);
    } catch (error) {
      throw new Error(`Error al crear administrador: ${error.message}`);
    }
  }

  async findAll() {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new Error(`Error al obtener todos los usuarios: ${error.message}`);
    }
  }

  async findOneById(id: string) {
    try {
      return await this.userRepository.findOne({ where: { id } });
    } catch (error) {
      throw new Error(`Error al obtener usuario por ID: ${error.message}`);
    }
  }

  async findOneByEmail(email: string) {
    try {
      return await this.userRepository.findOne({ where: { email } });
    } catch (error) {
      throw new Error(`Error al obtener usuario por email: ${error.message}`);
    }
  }

  async removeUser(id: string) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        return "Usuario inexistente";
      }

      user.isActive = false;
      await this.userRepository.save(user);
      return "Usuario eliminado";
    } catch (error) {
      throw new Error(`Error al eliminar usuario: ${error.message}`);
    }
  }
}
