import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TicketsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTicketDto: CreateTicketDto) {
    const { user_id, category_id, sub_category_id, sub_sub_category_id } =
      createTicketDto;

    const user = await this.prisma.user.findUnique({ where: { id: user_id } });
    if (!user) {
      throw new BadRequestException(`Usuario con ID ${user_id} no encontrado`);
    }

    const category = await this.prisma.category.findFirst({
      where: { id: category_id, user_id },
    });
    if (!category) {
      throw new BadRequestException(
        `Categoría ${category_id} no encontrada o no pertenece al usuario ${user_id}`,
      );
    }

    if (sub_category_id) {
      const subCategory = await this.prisma.subCategory.findFirst({
        where: { id: sub_category_id, category_id },
      });
      if (!subCategory) {
        throw new BadRequestException(
          `Subcategoría ${sub_category_id} no encontrada o no pertenece a la categoría ${category_id}`,
        );
      }
    }

    if (sub_sub_category_id && sub_category_id) {
      const subSubCategory = await this.prisma.subSubCategory.findFirst({
        where: { id: sub_sub_category_id, sub_category_id },
      });
      if (!subSubCategory) {
        throw new BadRequestException(
          `Sub-subcategoría ${sub_sub_category_id} no encontrada o no pertenece a la subcategoría ${sub_category_id}`,
        );
      }
    }

    return this.prisma.ticket.create({
      data: createTicketDto,
      select: {
        id: true,
        name: true,
        phone: true,
        created_at: true,
        updated_at: true,
        category: { select: { id: true, name: true } },
        sub_category: { select: { id: true, name: true } },
        sub_sub_category: { select: { id: true, name: true } },
        TicketStatus: { select: { id: true, name: true } },
      },
    });
  }

  async findAll(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new BadRequestException(`Usuario con ID ${userId} no encontrado`);
    }

    return this.prisma.ticket.findMany({
      where: {
        user_id: userId,
      },
      select: {
        id: true,
        name: true,
        phone: true,
        created_at: true,
        updated_at: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        sub_category: {
          select: {
            id: true,
            name: true,
          },
        },
        sub_sub_category: {
          select: {
            id: true,
            name: true,
          },
        },
        TicketStatus: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async findOne(id: number, userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new BadRequestException(`Usuario con ID ${userId} no encontrado`);
    }

    return this.prisma.ticket.findFirstOrThrow({
      where: {
        id,
        user_id: userId,
      },
      select: {
        id: true,
        name: true,
        phone: true,
        created_at: true,
        updated_at: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        sub_category: {
          select: {
            id: true,
            name: true,
          },
        },
        sub_sub_category: {
          select: {
            id: true,
            name: true,
          },
        },
        TicketStatus: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async update(id: number, updateTicketDto: UpdateTicketDto) {
    const existingTicket = await this.prisma.ticket.findUnique({
      where: { id },
    });

    if (!existingTicket) {
      throw new BadRequestException('El ticket no existe');
    }

    return this.prisma.ticket.update({
      where: {
        id,
      },
      data: updateTicketDto,
      select: {
        id: true,
        name: true,
        phone: true,
        updated_at: true,
      },
    });
  }

  async remove(id: number) {
    const ticket = await this.prisma.ticket.findUnique({
      where: {
        id,
      },
    });

    if (!ticket) {
      throw new BadRequestException('El ticket no existe');
    }

    return this.prisma.ticket.delete({
      where: {
        id,
      },
    });
  }
}
