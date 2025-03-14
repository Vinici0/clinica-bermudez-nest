import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { TicketWsGateway } from 'src/ticket-ws/ticket-ws.gateway';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { User } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly ticketWsGateway: TicketWsGateway,
    private readonly prisma: PrismaService,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const { create_uid } = createCategoryDto;

    await this.prisma.user.findUniqueOrThrow({
      where: { id: create_uid },
    });

    //validar que el name no exista
    const existingCategory = await this.prisma.category.findUnique({
      where: { name: createCategoryDto.name },
    });

    if (existingCategory) {
      throw new BadRequestException('La categoría ya existe');
    }

    return this.prisma.category.create({
      data: createCategoryDto,
    });
  }

  async findAll(user: User, paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const [total, categories] = await Promise.all([
      this.prisma.category.count(),
      this.prisma.category.findMany({
        take: limit,
        skip: offset,
        include: {
          sub_categories: {
            include: {
              sub_sub_categories: true,
            },
          },
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: {
          created_at: 'desc',
        },
      }),
    ]);

    return {
      total,
      categories,
      limit,
      offset,
    };
  }
  findOne(id: number) {
    return this.prisma.category.findUniqueOrThrow({
      where: { id },
    });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  remove(id: number) {
    return this.prisma.category.delete({
      where: { id },
    });
  }
}
