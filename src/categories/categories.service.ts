import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  private readonly logger = new Logger(CategoriesService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const { user_id } = createCategoryDto;
      console.log(user_id);

      const user = await this.prisma.user.findUnique({
        where: { id: user_id },
      });

      if (!user) {
        throw new BadRequestException(`User #${user_id} not found`);
      }

      return await this.prisma.category.create({
        data: createCategoryDto,
      });
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll() {
    try {
      return await this.prisma.category.findMany();
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.category.findUnique({
        where: { id },
      });
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      return await this.prisma.category.update({
        where: { id },
        data: updateCategoryDto,
      });
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.category.delete({
        where: { id },
      });
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  private handleExceptions(error: any) {
    if (error instanceof BadRequestException) {
      throw error;
    }

    switch (error.code) {
      case 'P2002':
        throw new BadRequestException(
          `Category with this unique field already exists`,
        );

      case 'P2003':
        throw new BadRequestException(
          `Foreign key constraint failed - Referenced record not found`,
        );

      case 'P2025':
        throw new BadRequestException(`Record not found`);

      default:
        this.logger.error(error);
        throw new InternalServerErrorException(
          `Can't process request - Check server logs`,
        );
    }
  }
}
