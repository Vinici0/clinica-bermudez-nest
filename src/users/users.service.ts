import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';

import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async create(data: {
    name: string;
    email?: string;
    phone?: string;
    password: string;
    isActive?: boolean;
    image?: string;
  }): Promise<User> {
    try {
      return this.prisma.user.create({
        data: {
          ...data,
          user_roles: {
            create: {
              role: {
                connect: {
                  name: 'ADMIN',
                },
              },
            },
          },
        },
        include: {
          user_roles: true,
        },
      });
    } catch (error) {
      this.handleDBErrors(error);
    }
  }
  async login(loginUserDto: LoginUserDto) {
    try {
      const { email, password } = loginUserDto;

      const user = await this.prisma.user.findUnique({
        where: { email: email.toLowerCase() },
        select: {
          id: true,
          name: true,
          email: true,
          password: true,
          isActive: true,
          phone: true,
          image: true,
          user_roles: {
            select: {
              role: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });

      const userWithRoles = {
        ...user,
        roles: user.user_roles.map((ur) => ur.role.name),
        user_roles: undefined,
      };
      if (!user) throw new BadRequestException('Invalid credentials');

      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if (!isPasswordValid)
        throw new BadRequestException('Invalid credentials');

      //quitar el password del objeto user
      delete userWithRoles.password;
      return {
        userWithRoles,
        token: this.getJwtToken({ id: user.id.toString() }),
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Error logging in');
    }
  }

  async checkAuthStatus(user: User) {
    return {
      user,
      token: this.getJwtToken({ id: user.id.toString() }),
    };
  }

  findOne(id: number) {
    try {
      return this.prisma.user.findUnique({
        where: { id },
        include: {
          user_roles: {
            select: {
              role: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  remove(id: number) {
    try {
      return this.prisma.user.update({
        where: { id },
        data: { isActive: false },
      });
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    console.log(error);

    throw new InternalServerErrorException('Please check server logs');
  }
}
