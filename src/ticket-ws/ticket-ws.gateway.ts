import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { TicketWsService } from './ticket-ws.service';
import { Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/users/interfaces/jwt-payload.interface';
import { UnauthorizedException } from '@nestjs/common';

@WebSocketGateway({ cors: true })
export class TicketWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly ticketWsService: TicketWsService,
    private readonly jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket) {
    console.log('Client connected:', client.id);

    // const token = client.handshake.headers.authentication as string;

    // try {
    //   const payload = this.jwtService.verify(token) as JwtPayload;
    //   const user = await this.ticketWsService.getUserFromToken(payload);

    //   await this.ticketWsService.registerClient(client, user);
    // } catch (error) {
    //   client.disconnect();
    //   throw new UnauthorizedException('Token no válido');
    // }
  }

  async handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);

    // await this.ticketWsService.removeClient(client);
  }
}
