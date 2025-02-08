import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { TicketWsService } from './ticket-ws.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class TicketWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;
  private readonly connectedClients = new Map<string, Socket>();

  constructor(private readonly ticketWsService: TicketWsService) {}

  async handleConnection(client: Socket) {
    this.connectedClients.set(client.id, client);
    client.join('chat_room');
  }

  async handleDisconnect(client: Socket) {
    this.connectedClients.delete(client.id);
    client.leave('chat_room');
  }

  @SubscribeMessage('message-from-client')
  handleMessage(client: Socket, payload: string) {
    client.broadcast.to('chat_room').emit('message-from-server', {
      clientId: client.id,
      message: payload,
      timestamp: new Date().toISOString(),
    });
  }

  // on-working-changed
  // @SubscribeMessage('on-working-changed')
  // async handleWorkingChanged(
  //   client: Socket,
  //   payload: { ticketId: number; working: boolean },
  // ) {
  //   const ticket = await this.ticketWsService.getTicketById(payload.ticketId);
  //   if (!ticket) {
  //     return;
  //   }

  //   if (ticket.user_id !== user.id) {
  //     return;
  //   }

  //   const updatedTicket = await this.ticketWsService.updateWorking(
  //     payload.ticketId,
  //     payload.working,
  //   );

  //   this.wss.to('chat_room').emit('working-changed', updatedTicket);
  // }
}
