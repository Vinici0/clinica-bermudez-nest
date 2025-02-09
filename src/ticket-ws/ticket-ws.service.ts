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
}
