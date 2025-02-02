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
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {}

  //En caos retorne false no se ejecutará el controlador
  async canActivate(context: ExecutionContext): Promise<boolean> {
    /* TODO: Toeme comunicacoin con SetMetadata desde el controlador: @SetMetadata */
    const validRoles: string[] = this.reflector.get(
      META_ROLES,
      context.getHandler(),
    );

    if (!validRoles || validRoles.length === 0) return true;

    const req = context.switchToHttp().getRequest();
    const userId = req.user?.id;

    if (!userId) throw new BadRequestException('User not found');

    const userWithRoles = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        user_roles: {
          include: {
            role: true,
          },
        },
      },
    });

    const hasRole = userWithRoles.user_roles.some((ur) =>
      validRoles.includes(ur.role.name),
    );

    if (!hasRole) {
      throw new ForbiddenException(
        `User ${userWithRoles.name} needs a valid role: [${validRoles}]`,
      );
    }

    return true;
  }
}
