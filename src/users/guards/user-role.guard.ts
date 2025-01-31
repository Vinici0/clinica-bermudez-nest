import {
  CanActivate,
  ExecutionContext,
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from '../decorators/role-protected.decorator';
import { User, UserRole } from '@prisma/client';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: string[] = this.reflector.get(
      META_ROLES,
      context.getHandler(),
    );
    console.log('validRoles', validRoles);

    if (!validRoles) return true;
    if (validRoles.length === 0) return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user as User;

    // if (!user) throw new BadRequestException('User not found');

    // const hasRole = user.user_roles.some((userRole) =>
    //   validRoles.includes(userRole.role.name),
    // );

    // if (!hasRole) {
    //   throw new ForbiddenException(
    //     `User ${user.name} needs a valid role: [${validRoles}]`,
    //   );
    // }
    console.log('user', user);

    return true;
  }
}
