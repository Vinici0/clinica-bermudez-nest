import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { TicketWsGateway } from 'src/ticket-ws/ticket-ws.gateway';

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

  findAll() {
    return this.prisma.category.findMany();
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
