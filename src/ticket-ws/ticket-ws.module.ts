import { Module } from '@nestjs/common';
import { TicketWsService } from './ticket-ws.service';
import { TicketWsGateway } from './ticket-ws.gateway';
import { UsersModule } from 'src/users/users.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [TicketWsGateway, TicketWsService],
  imports: [UsersModule, PrismaModule],
  exports: [TicketWsGateway],
})
export class TicketWsModule {}
