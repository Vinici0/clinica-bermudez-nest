import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { UsersModule } from 'src/users/users.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TicketValidator } from './validators/ticket.validator';
import { TicketWsModule } from 'src/ticket-ws/ticket-ws.module';

@Module({
  controllers: [TicketsController],
  providers: [TicketsService, TicketValidator],
  imports: [UsersModule, PrismaModule, TicketWsModule],
  exports: [TicketsService],
})
export class TicketsModule {}
