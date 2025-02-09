import { Module } from '@nestjs/common';
import { TicketWsService } from './ticket-ws.service';
import { TicketWsGateway } from './ticket-ws.gateway';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [TicketWsGateway, TicketWsService],
  exports: [TicketWsGateway],
})
export class TicketWsModule {}
