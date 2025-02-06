import { WebSocketGateway } from '@nestjs/websockets';
import { TicketWsService } from './ticket-ws.service';

@WebSocketGateway({ cors: true })
export class TicketWsGateway {
  constructor(private readonly ticketWsService: TicketWsService) {}
}
