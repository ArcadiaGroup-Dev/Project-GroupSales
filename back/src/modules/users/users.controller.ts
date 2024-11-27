import { Controller, Get, Post, Patch, Body, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from '../../config/role.decorator';
import { UserRole } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.create(createUserDto);
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }


  @Patch(':id/seller')
  @Roles(UserRole.ADMIN)  
  async createSeller(@Param('id') id: string) {
    try {
      return await this.usersService.createSeller(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }


  @Patch(':id/admin')
  @Roles(UserRole.ADMIN)  
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
  @Roles(UserRole.ADMIN)  
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
  @Roles(UserRole.ADMIN)  
  async removeUser(@Param('id') id: string) {
    try {
      return await this.usersService.removeUser(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

