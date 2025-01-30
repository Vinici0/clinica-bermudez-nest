import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly jwtService: JwtService) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }

  onModuleDestroy() {
    this.$disconnect();
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      if (userData.email) {
        const existingUser = await this.user.findUnique({
          where: { email: userData.email.toLowerCase() },
          select: { id: true },
        });

        if (existingUser) {
          throw new BadRequestException('Email already registered');
        }
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await this.user.create({
        data: {
          ...userData,
          password: hashedPassword,
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
        },
      });

      return { user, token: this.getJwtToken({ id: user.id.toString() }) };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Error creating user');
    }
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      const { email, password } = loginUserDto;

      const user = await this.user.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          isActive: true,
          image: true,
          password: true,
        },
      });

      if (!user) throw new BadRequestException('Invalid credentials');

      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if (!isPasswordValid)
        throw new BadRequestException('Invalid credentials');

      //quitar el password del objeto user
      delete user.password;
      return { user, token: this.getJwtToken({ id: user.id.toString() }) };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Error logging in');
    }
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  findAll() {
    return [];
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    console.log(error);

    throw new InternalServerErrorException('Please check server logs');
  }
}
