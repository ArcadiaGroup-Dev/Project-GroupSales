import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UserRole } from './entities/user.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBody({
    description: 'Datos necesarios para crear un usuario',
    schema: {
      example: {
        name: 'Jane Doe',
        email: 'janedoe@example.com',
        password: 'securepassword123',
        birthdate: '1990-01-01',
        phone: 1234567890,
        address: '123 Main Street',
        city: 'Springfield',
        country: 'USA',
      },
    },
  })
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.create(createUserDto);
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Patch(':id/seller')
  @ApiBody({
    description: 'Convertir un usuario en vendedor (solo admin)',
    schema: {
      example: {},
    },
  })
  async createSeller(@Param('id') id: string) {
    try {
      return await this.usersService.createSeller(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Patch(':id/admin')
  @ApiBody({
    description:
      'Convertir un usuario en administrador (opcionalmente se pueden enviar datos)',
    schema: {
      example: {
        name: 'New Admin Name',
        email: 'admin@example.com',
        password: 'newsecurepassword',
        birthdate: '1985-05-15',
        phone: 987654321,
        address: '456 Admin Lane',
        city: 'Capital City',
        country: 'USA',
      },
    },
  })
  async createAdmin(
    @Param('id') id: string,
    @Body() createUserDto?: CreateUserDto,
  ) {
    try {
      return await this.usersService.createAdmin(id, createUserDto);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    const user = await this.usersService.findOneById(id);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    return user;
  }

  @Get('search')
  async findOneByEmail(@Query('email') email: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    return user;
  }

  @Delete(':id')
  async removeUser(@Param('id') id: string) {
    try {
      return await this.usersService.removeUser(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
