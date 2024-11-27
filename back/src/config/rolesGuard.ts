import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../modules/users/entities/user.entity';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const userId = request.params.id;

    if (!requiredRoles) {
      return true;
    }


    if (user.role === UserRole.ADMIN) {
      return true;
    }


    if (user.id === userId) {
      return true;
    }

    return false; 
  }
}
