import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { Socket } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';
// import { TicketsService } from 'src/tickets/tickets.service';

interface ConnectedClients {
  [id: string]: {
    socket: Socket;
    user: User;
  };
}

@Injectable()
export class TicketWsService {
  constructor(private readonly prisma: PrismaService) {}

  private connectedClients: ConnectedClients = {};

  async registerClient(client: Socket, user: User) {
    this.connectedClients[client.id] = { socket: client, user };
    console.log('Connected clients:', this.connectedClients);
  }

  async removeClient(client: Socket) {
    delete this.connectedClients[client.id];
    console.log('Connected clients:', this.connectedClients);
  }

  async getUserFromToken(payload: any): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id: payload.sub },
    });
  }

  async findOldestOpenTickets(limit = 4) {
    return this.prisma.ticket.findMany({
      where: {
        TicketStatus: {
          name: 'OPEN',
        },
      },
      select: {
        id: true,
        name: true,
        phone: true,
        created_at: true,
        updated_at: true,
      },
      orderBy: {
        created_at: 'asc',
      },
      take: limit,
    });
  }

  async updateTicketStatusToInProgress(ticketId: number) {
    return this.prisma.ticket.update({
      where: { id: ticketId },
      data: {
        ticketStatusId: 2,
      },
    });
  }

  async updateTicketStatusToResolved(ticketId: number) {
    return this.prisma.ticket.update({
      where: { id: ticketId },
      data: {
        TicketStatus: {
          update: {
            name: 'CLOSED',
          },
        },
      },
    });
  }
}
