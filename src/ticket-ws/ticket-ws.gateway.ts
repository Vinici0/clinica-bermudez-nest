import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { TicketWsService } from './ticket-ws.service';
import { Server, Socket } from 'socket.io';
import { JwtPayload } from 'src/users/interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({ cors: true })
export class TicketWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;
  private readonly connectedClients = new Map<string, Socket>();

  constructor(
    private readonly ticketWsService: TicketWsService,
    private readonly jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket) {
    const token = client.handshake.query.token as string;

    if (!token) {
      client.emit('auth-error', { message: 'No token provided' });
      client.disconnect(true);
      return;
    }

    let payload: JwtPayload;

    try {
      payload = this.jwtService.verify(token);
      await this.ticketWsService.registerClient(client, payload.id);
      this.connectedClients.set(client.id, client);
      console.log('Connected clients:', this.connectedClients.size);
      // client.join('chat_room');
      // await this.emitOldestOpenTickets();
    } catch (error) {
      client.emit('auth-error', { message: 'Error authenticating' });
      client.disconnect(true);
    }
  }

  async handleDisconnect(client: Socket) {
    this.connectedClients.delete(client.id);
    client.leave('chat_room');
  }

  @SubscribeMessage('update-ticket-status')
  async handleTicketStatusUpdate(
    client: Socket,
    payload: { ticketId: number; status: string },
  ) {
    try {
      if (payload.status === 'IN_PROGRESS') {
        await this.ticketWsService.updateTicketStatusToInProgress(
          payload.ticketId,
        );
      } else if (payload.status === 'CLOSED') {
        await this.ticketWsService.updateTicketStatusToResolved(
          payload.ticketId,
        );
      }

      await this.emitOldestOpenTickets();
    } catch (error) {
      client.emit('ticket-error', { message: 'Error updating ticket status' });
    }
  }

  private async emitOldestOpenTickets() {
    const oldestTickets = await this.ticketWsService.findOldestOpenTickets();
    this.wss.to('chat_room').emit('oldest-open-tickets', {
      tickets: oldestTickets,
      timestamp: new Date().toISOString(),
    });
  }
}

/*

  TODO: Pending tasks:
  - Listar todo los tickets abiertos por id de usuario
  - Listar el ticket por que actualmente esta en progreso por id de usuario
  - Listar el ticket por que actualmente esta cerrado por id de usuario
  - Crear un ticket
  -- Total de tickets abiertos
*/
