import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TicketsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTicketDto: CreateTicketDto) {
    return this.prisma.ticket.create({
      data: createTicketDto,
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

  async findAll(userId: number) {
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
    return this.prisma.ticket.delete({
      where: {
        id,
      },
    });
  }
}
