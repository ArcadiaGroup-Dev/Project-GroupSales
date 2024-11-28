import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';
import { JwtPayload } from './jwt.interface';


@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    
  ) {}

  
  async login(user: any) {
    const payload: JwtPayload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

 
}
