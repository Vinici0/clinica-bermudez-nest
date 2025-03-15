import { Module } from '@nestjs/common';
import { TicketWsService } from './ticket-ws.service';
import { TicketWsGateway } from './ticket-ws.gateway';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [PrismaModule, UsersModule],
  providers: [TicketWsGateway, TicketWsService],
  exports: [TicketWsGateway, TicketWsService],
})
export class TicketWsModule {}
