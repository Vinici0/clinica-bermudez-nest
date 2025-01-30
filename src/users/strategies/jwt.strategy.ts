import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
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

  async validate(payload: JwtPayload) {
    const { id } = payload;

    const user = await this.prisma.user.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        email: true,
        name: true,
        isActive: true,
        phone: true,
        image: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid token or user not found');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('User is inactive, please contact admin');
    }

    return user;
  }
}
