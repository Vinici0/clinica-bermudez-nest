import { Module } from '@nestjs/common';
import { TicketWsService } from './ticket-ws.service';
import { TicketWsGateway } from './ticket-ws.gateway';

@Module({
  providers: [TicketWsGateway, TicketWsService]
})
export class TicketWsModule {}
