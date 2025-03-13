import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';

import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async create(data: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      //Para enviar un error para que el cliente entienda
      throw new BadRequestException('El email ya está en uso');
    }

    return this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
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
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        isActive: true,
        image: true,
        created_at: true,
        updated_at: true,
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
  }
  async login(loginUserDto: LoginUserDto) {
    this.logger.log('loginUserDto ' + JSON.stringify(loginUserDto));
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
    if (!user) throw new BadRequestException('Credenciales inválidas');

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid)
      throw new BadRequestException('Credenciales inválidas');

    //quitar el password del objeto user
    delete userWithRoles.password;
    return {
      user: userWithRoles,
      token: this.getJwtToken({ id: user.id.toString() }),
    };
  }

  async checkAuthStatus(user: User) {
    return {
      user,
      token: this.getJwtToken({ id: user.id.toString() }),
    };
  }

  findOne(id: number) {
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
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return this.prisma.user.update({
      where: { id },
      data: { isActive: false },
    });
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
