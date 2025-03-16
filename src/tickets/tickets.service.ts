import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { TicketValidator } from './utils/ticket.validator';
import { TicketWsGateway } from 'src/ticket-ws/ticket-ws.gateway';
import { NotificationService } from './notification.service';
import { TICKET_SELECT } from './utils/ticket-select.constant';

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

    const ticket = await this.prisma.ticket.create({
      data: createTicketDto,
    });
    await this.notificationService.notifyTicket(ticket, createTicketDto);
    return ticket;
  }

  async findAll(userId: number, paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    const [total, tickets] = await Promise.all([
      this.prisma.ticket.count({ where: { create_uid: userId } }),
      this.prisma.ticket.findMany({
        where: { create_uid: userId },
        take: limit,
        skip: offset,
        select: TICKET_SELECT,
        orderBy: { created_at: 'desc' },
      }),
    ]);
    return { total, tickets, limit, offset };
  }

  async findOne(id: number, userId: number) {
    await this.ticketValidator.validateUser(userId);
    return this.prisma.ticket.findFirstOrThrow({
      where: { id, create_uid: userId },
      select: TICKET_SELECT,
    });
  }

  async update(id: number, updateTicketDto: UpdateTicketDto) {
    const updateTicket = await this.prisma.ticket.update({
      where: { id },
      data: updateTicketDto,
    });

    await this.notificationService.notifyOldestOpenTickets(4, {
      category_id: updateTicket.category_id,
      sub_category_id: updateTicket.sub_category_id,
      sub_sub_category_id: updateTicket.sub_sub_category_id,
    });
    return updateTicket;
  }

  async remove(id: number) {
    return this.prisma.ticket.delete({ where: { id } });
  }
}
