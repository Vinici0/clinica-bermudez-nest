import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { TicketValidator } from './validators/ticket.validator';
import { TicketWsGateway } from 'src/ticket-ws/ticket-ws.gateway';
import { NotificationService } from './notification.service';

@Injectable()
export class TicketsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ticketValidator: TicketValidator,
    private readonly ticketWsGateway: TicketWsGateway,
    private readonly notificationService: NotificationService,
  ) {}

  async create(createTicketDto: CreateTicketDto) {
    await this.ticketValidator.validateTicketCreation(createTicketDto);

    // Crear el ticket
    const ticket = await this.prisma.ticket.create({
      data: createTicketDto,
    });

    // Llamada al servicio de notificaciones para emitir el nuevo ticket
    await this.notificationService.notifyNewTicket(ticket, createTicketDto);

    return ticket;
  }

  async findAll(userId: number, paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const [total, tickets] = await Promise.all([
      this.prisma.ticket.count({
        where: { create_uid: userId },
      }),

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
          ticket_status: {
            select: { id: true, name: true },
          },
          category: {
            select: { id: true, name: true },
          },
          sub_category: {
            select: { id: true, name: true },
          },
          sub_sub_category: {
            select: { id: true, name: true },
          },
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
    });
  }

  async update(id: number, updateTicketDto: UpdateTicketDto) {
    await this.ticketValidator.validateTicketExists(id);

    return this.prisma.ticket.update({
      where: {
        id,
      },
      data: updateTicketDto,
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
