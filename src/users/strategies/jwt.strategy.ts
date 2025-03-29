import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { PrismaService } from 'src/prisma/prisma.service';

//Aqui cargar la data del usuario que se encuentra en el token
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // Inyecta tu UserService, Repository, etc., para buscar usuarios en la BD
  constructor(
    private readonly prisma: PrismaService,
    configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      //Para que se envie por el header Authorization: Bearer token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    });
  }

  // Aquí típicamente se hace algo como:
  // 1. Buscar en tu BD el usuario por su ID o email que venga en el payload
  // 2. Retornar el usuario (o solo parte de su información)
  async validate(payload: JwtPayload) {
    const { id } = payload;

    const user = await this.prisma.user.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        email: true,
        name: true,
        is_active: true,
        phone: true,
        create_uid: true,
        image: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid token or user not found');
    }

    if (!user.is_active) {
      throw new UnauthorizedException('User is inactive, please contact admin');
    }

    // Omitimos la consulta a la BD y simplemente retornamos la info del token
    return user;
  }
}
