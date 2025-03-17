import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Staff, Ticket } from '@prisma/client';
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
      const clientSockets = this.ticketWsService.getSocketsByUserId(userId);

      if (clientSockets) {
        clientSockets.forEach((clientSocket) => {
          clientSocket.emit('new-ticket', { ticket });
        });
      }
      // if (clientSocket) {
      //   clientSocket.emit('new-ticket', { ticket });
      // }
    });
  }

  /**
   * Envía los X tickets más antiguos a cada staff que coincida con las condiciones.
   * @param limit   Número máximo de tickets a retornar (default: 4).
   * @param filters Campos opcionales (por ejemplo, category_id / sub_category_id / sub_sub_category_id).
   */
  async notifyAllOpenTicketsForStaff(staff: Staff) {
    const staffAssignments = await this.prisma.categoryAssignment.findMany({
      where: { staff_id: staff.id },
    });

    const orConditions = staffAssignments.map((assignment) => {
      return {
        category_id: assignment.category_id ?? undefined,
        sub_category_id: assignment.sub_category_id ?? undefined,
        sub_sub_category_id: assignment.sub_sub_category_id ?? undefined,
        ticket_status_id: 1,
      };
    });

    const openTickets = await this.prisma.ticket.findMany({
      where: {
        OR: orConditions,
      },
      orderBy: {
        created_at: 'asc',
      },
    });

    const sockets = this.ticketWsService.getSocketsByUserId(staff.user_id);

    if (sockets) {
      sockets.forEach((socket) => {
        socket.emit('all-open-tickets', {
          tickets: openTickets,
          total: openTickets.length,
        });
      });
    }
    //   clientSocket.emit('all-open-tickets', {
    //     tickets: openTickets,
    //     total: openTickets.length,
    //   });
    // }
  } 
}
