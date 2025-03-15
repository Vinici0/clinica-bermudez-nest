import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Ticket } from '@prisma/client';
import { TicketWsService } from 'src/ticket-ws/ticket-ws.service';
import { CreateTicketDto } from 'src/tickets/dto/create-ticket.dto';

@Injectable()
export class NotificationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ticketWsService: TicketWsService,
  ) {}

  async notifyNewTicket(ticket: Ticket, createTicketDto: CreateTicketDto) {
    const assignments = await this.prisma.categoryAssignment.findMany({
      where: {
        OR: [
          { category_id: ticket.category_id },
          createTicketDto.sub_category_id
            ? { sub_category_id: createTicketDto.sub_category_id }
            : undefined,
          createTicketDto.sub_sub_category_id
            ? { sub_sub_category_id: createTicketDto.sub_sub_category_id }
            : undefined,
        ].filter(Boolean), // Elimina valores undefined
      },
      include: {
        staff: true,
      },
    });

    assignments.forEach((assignment) => {
      const userId = assignment.staff.user_id;
      const clientSocket = this.ticketWsService.getSocketByStaffId(userId);
      if (clientSocket) {
        clientSocket.emit('new-ticket', { ticket });
      }
    });
  }
}
