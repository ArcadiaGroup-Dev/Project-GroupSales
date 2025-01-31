import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    const existingUser = await this.userRepository.findOneBy({ email });
    if (existingUser) {
      throw new Error('Usuario ya registrado');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    const savedUser = await this.userRepository.save(newUser);

    const { password: _, ...userNoPassword } = savedUser;
    return userNoPassword;
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
          throw new Error(
            'No se proporcionaron datos para crear el administrador',
          );
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
        return 'Usuario inexistente';
      }

      user.isActive = false;
      await this.userRepository.save(user);
      return 'Usuario eliminado';
    } catch (error) {
      throw new Error(`Error al eliminar usuario: ${error.message}`);
    }
  }

  async updatePassword(userId: string, newPassword: string): Promise<void> {
    const user = await this.findOneById(userId);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await this.userRepository.save(user);
  }
}
