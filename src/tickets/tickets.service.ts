import { Injectable, Logger } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { TicketValidator } from './utils/ticket.validator';
import { TicketWsGateway } from 'src/ticket-ws/ticket-ws.gateway';
import { NotificationService } from './notification.service';
import { TICKET_SELECT } from './utils/ticket-select.constant';
import { User } from '@prisma/client';
import { TicketStatusEnum } from './enums/ticket-status.enum';
import { FindAllTicketsDto } from './dto/find-all-tickets.dto';

@Injectable()
export class TicketsService {
  private readonly logger = new Logger(TicketsService.name);

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

  async findAllForStaff(userId: number, paginationDto: FindAllTicketsDto) {
    const {
      limit = 10,
      offset = 0,
      status = TicketStatusEnum.OPEN,
    } = paginationDto;

    // 1. Localiza el staff asociado al userId
    const staff = await this.prisma.staff.findFirstOrThrow({
      where: { user_id: userId },
    });

    // 2. Obtén las asignaciones de ese staff
    const staffAssignments = await this.prisma.categoryAssignment.findMany({
      where: { staff_id: staff.id },
    });

    // 3. Construye la lista de condiciones OR
    const orConditions = staffAssignments.map((assignment) => {
      return {
        category_id: assignment.category_id ?? undefined,
        sub_category_id: assignment.sub_category_id ?? undefined,
        sub_sub_category_id: assignment.sub_sub_category_id ?? undefined,
      };
    });

    // 4. Si no hay asignaciones, devuelve vacío
    if (!orConditions.length) {
      this.logger.warn(`No hay asignaciones para el staff con ID ${staff.id}`);
      return { total: 0, tickets: [], limit, offset };
    }

    // 5. Busca los tickets que cumplan con cualquiera de las asignaciones
    const [total, tickets] = await Promise.all([
      this.prisma.ticket.count({
        where: {
          OR: orConditions,
          AND: {
            ticket_status: {
              name: status,
            },
          },
        },
      }),

      this.prisma.ticket.findMany({
        where: {
          OR: orConditions,
          AND: {
            ticket_status: {
              name: status,
            },
          },
        },
        take: limit,
        skip: offset,
        select: TICKET_SELECT,
        orderBy: { created_at: 'desc' },
      }),
    ]);
    this.logger.log(`Tickets encontrados`);
    return { total, tickets, limit, offset };
  }

  async findOne(id: number, userId: number) {
    await this.ticketValidator.validateUser(userId);
    return this.prisma.ticket.findFirstOrThrow({
      where: { id, create_uid: userId },
      select: TICKET_SELECT,
    });
  }

  async update(id: number, updateTicketDto: UpdateTicketDto, user: User) {
    const staff = await this.prisma.staff.findFirst({
      where: { user_id: user.id },
    });

    const updateTicket = await this.prisma.ticket.update({
      where: { id },
      data: updateTicketDto,
    });

    await this.notificationService.notifyAllOpenTicketsForStaff(staff);
    return updateTicket;
  }

  async remove(id: number) {
    return this.prisma.ticket.delete({ where: { id } });
  }
}
