import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Ticket } from '@prisma/client';
import { TicketWsService } from 'src/ticket-ws/ticket-ws.service';
import { CreateTicketDto } from 'src/tickets/dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Injectable()
export class NotificationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ticketWsService: TicketWsService,
  ) {}

  async notifyTicket(
    ticket: Ticket,
    createTicketDto: CreateTicketDto | UpdateTicketDto,
  ) {
    const conditions = [
      { category_id: ticket.category_id },
      createTicketDto.sub_category_id
        ? { sub_category_id: createTicketDto.sub_category_id }
        : null,
      createTicketDto.sub_sub_category_id
        ? { sub_sub_category_id: createTicketDto.sub_sub_category_id }
        : null,
    ].filter(Boolean);

    const assignments = await this.prisma.categoryAssignment.findMany({
      where: {
        AND: conditions,
      },
      include: {
        staff: true,
      },
    });

    assignments.forEach((assignment) => {
      const userId = assignment.staff.user_id;

      //TODO: Verificar despues si se puede mejorar
      const clientSocket = this.ticketWsService.getSocketByStaffId(userId);
      if (clientSocket) {
        clientSocket.emit('new-ticket', { ticket });
      }
    });
  }

  /**
   * Envía los X tickets más antiguos a cada staff que coincida con las condiciones.
   * @param limit   Número máximo de tickets a retornar (default: 4).
   * @param filters Campos opcionales (por ejemplo, category_id / sub_category_id / sub_sub_category_id).
   */
  async notifyOldestOpenTickets(
    limit = 4,
    filters: {
      category_id?: number;
      sub_category_id?: number;
      sub_sub_category_id?: number;
    },
  ) {
    // Construimos las condiciones de asignación
    const conditions = [
      filters.category_id ? { category_id: filters.category_id } : null,
      filters.sub_category_id
        ? { sub_category_id: filters.sub_category_id }
        : null,
      filters.sub_sub_category_id
        ? { sub_sub_category_id: filters.sub_sub_category_id }
        : null,
    ].filter(Boolean);

    // Buscamos las asignaciones filtradas
    const assignments = await this.prisma.categoryAssignment.findMany({
      where: {
        AND: conditions,
      },
      include: {
        staff: true,
      },
    });

    // Obtenemos los tickets más antiguos de esa categoría / subcategoría / sub-subcategoría
    // Ajusta la condición según tus reglas de "tickets abiertos".
    const oldestTickets = await this.prisma.ticket.findMany({
      where: {
        category_id: filters.category_id,
        sub_category_id: filters.sub_category_id,
        sub_sub_category_id: filters.sub_sub_category_id,
        ticket_status_id: 1,
      },
      orderBy: {
        created_at: 'asc',
      },
    });

    assignments.forEach((assignment) => {
      const userId = assignment.staff.user_id;

      const clientSocket = this.ticketWsService.getSocketByStaffId(userId);

      if (clientSocket) {
        clientSocket.emit('oldest-open-tickets', {
          tickets: oldestTickets,
          total: oldestTickets.length,
        });
      }
    });
  }
}
