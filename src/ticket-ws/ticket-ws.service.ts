import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { Socket } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
// import { TicketsService } from 'src/tickets/tickets.service';

interface ConnectedClients {
  [id: string]: {
    socket: Socket;
    user: User;
  };
}

@Injectable()
export class TicketWsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  private connectedClients: ConnectedClients = {};

  async registerClient(client: Socket, userId: number) {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new Error('User not found');
    }

    this.checkUserConnection(user);

    this.connectedClients[client.id] = { socket: client, user };

    //Imprimir todos los clientes conectados
    console.log('Connected clients:', this.connectedClients);
  }

  async removeClient(client: Socket) {
    delete this.connectedClients[client.id];
    console.log('REMOVED CLIENT', client.id);
  }

  async getUserFromToken(payload: any): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id: payload.sub },
    });
  }

  private checkUserConnection(user: User) {
    for (const clientId of Object.keys(this.connectedClients)) {
      const connectedClient = this.connectedClients[clientId];

      if (connectedClient.user.id === user.id) {
        connectedClient.socket.disconnect();
        break;
      }
    }
  }

  //TODO: Solo como guia para cambiar por user
  async findOldestOpenTickets(limit = 4) {
    return this.prisma.ticket.findMany({
      where: {
        ticket_status: {
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

  getSocketByUserId(userId: number): Socket | null {
    for (const clientId in this.connectedClients) {
      if (this.connectedClients[clientId].user.id === userId) {
        return this.connectedClients[clientId].socket;
      }
    }
    return null;
  }

  async updateTicketStatusToInProgress(ticketId: number) {
    return this.prisma.ticket.update({
      where: { id: ticketId },
      data: {
        ticket_status_id: 2,
      },
    });
  }

  async updateTicketStatusToResolved(ticketId: number) {
    return this.prisma.ticket.update({
      where: { id: ticketId },
      data: {
        ticket_status: {
          update: {
            name: 'CLOSED',
          },
        },
      },
    });
  }
}
