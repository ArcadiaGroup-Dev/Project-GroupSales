import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginUserDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: loginUserDto) {
    return await this.authService.login(loginDto);
  }
}
