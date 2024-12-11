import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginUserDto } from './dto/login.dto';
import { ApiTags, ApiBody, ApiOperation } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Iniciar sesión con email y contraseña' })
  @ApiBody({ type: loginUserDto })
  @Post('login')
  async login(@Body() loginDto: loginUserDto) {
    return await this.authService.login(loginDto);
  }
}
