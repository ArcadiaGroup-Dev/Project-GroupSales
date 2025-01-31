import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/modules/users/users.service';
import { JwtPayload } from './jwt.interface';
import { EmailService } from 'src/modules/Mailing/email.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly mailerService: EmailService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const { password: _, ...result } = user;
    return result;
  }

  async login(user: { email: string; password: string }) {
    const validatedUser = await this.validateUser(user.email, user.password);

    const payload: JwtPayload = {
      username: validatedUser.name,
      sub: validatedUser.id,
    };
    const { password: _, ...userNoPassword } = validatedUser;
    return {
      access_token: this.jwtService.sign(payload),
      user: userNoPassword,
    };
  }
  async requestPasswordReset(email: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }


    const payload = { sub: user.id, email: user.email };
    const resetToken = this.jwtService.sign(payload, { expiresIn: '1h' });


    await this.mailerService.sendPasswordResetEmail(user.email, resetToken);

    return { message: 'Correo de recuperación enviado' };
  }

  async resetPassword(token: string, newPassword: string) {
    try {
      const decoded = this.jwtService.verify(token);
      const user = await this.usersService.findOneById(decoded.sub);

      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }

    
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await this.usersService.updatePassword(user.id, hashedPassword);

      return { message: 'Contraseña actualizada con éxito' };
    } catch (error) {
      throw new BadRequestException('Token inválido o expirado');
    }
  }
}
