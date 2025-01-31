import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'; // No se exporta JwtService
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from 'src/modules/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { EmailService } from 'src/modules/Mailing/email.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService, JwtStrategy, UsersService, EmailService],
  controllers: [AuthController],
})
export class AuthModule {}
