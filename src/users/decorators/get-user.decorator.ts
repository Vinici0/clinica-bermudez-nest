import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from '@prisma/client';

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    //ctx -> Para acceder a la petición y obtener el usuario
    const req = ctx.switchToHttp().getRequest();
    const user = req.user as User;
    console.log('user', user);
    
    if (!user)
      throw new InternalServerErrorException('User not found (request)');

    return !data ? user : user[data];
  },
);
