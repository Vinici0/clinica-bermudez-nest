import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { TicketValidator } from './validators/ticket.validator';
import { TicketWsGateway } from 'src/ticket-ws/ticket-ws.gateway';

@Injectable()
export class TicketsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ticketValidator: TicketValidator,
    private readonly ticketWsGateway: TicketWsGateway,
  ) {}

  async create(createTicketDto: CreateTicketDto) {
    await this.ticketValidator.validateTicketCreation(createTicketDto);

    return this.prisma.ticket.create({
      data: createTicketDto,
      select: {
        id: true,
        name: true,
        phone: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async findAll(userId: number, paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new BadRequestException(`Usuario con ID ${userId} no encontrado`);
    }

    const [total, tickets] = await Promise.all([
      // Get total count
      this.prisma.ticket.count({
        where: { create_uid: userId },
      }),
      // Get paginated results
      this.prisma.ticket.findMany({
        where: { create_uid: userId },
        take: limit,
        skip: offset,
        select: {
          id: true,
          name: true,
          phone: true,
          created_at: true,
          updated_at: true,
        },
        orderBy: {
          created_at: 'desc',
        },
      }),
    ]);

    return {
      total,
      tickets,
      limit,
      offset,
    };
  }

  async findOne(id: number, userId: number) {
    await this.ticketValidator.validateUser(userId);

    return this.prisma.ticket.findFirstOrThrow({
      where: {
        id,
        create_uid: userId,
      },
      select: {
        id: true,
        name: true,
        phone: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async update(id: number, updateTicketDto: UpdateTicketDto) {
    await this.ticketValidator.validateTicketExists(id);

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
    await this.ticketValidator.validateTicketExists(id);

    return this.prisma.ticket.delete({
      where: {
        id,
      },
    });
  }
}
