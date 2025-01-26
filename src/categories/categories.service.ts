import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class CategoriesService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(CategoriesService.name);

  constructor() {
    super();
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Connected to the database');
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      return await this.category.create({
        data: createCategoryDto,
      });
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll() {
    try {
      return await this.category.findMany();
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findOne(id: number) {
    try {
      return await this.category.findUnique({
        where: { id },
      });
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      return await this.category.update({
        where: { id },
        data: updateCategoryDto,
      });
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: number) {
    try {
      return await this.category.delete({
        where: { id },
      });
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  private handleExceptions(error: any) {
    if (error.code === 'P2002') {
      throw new BadRequestException(
        `Category with this unique field already exists`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(
      `Can't process request - Check server logs`,
    );
  }
}
