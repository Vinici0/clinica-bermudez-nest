import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { UsersModule } from 'src/users/users.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TicketValidator } from './utils/ticket.validator';
import { TicketWsModule } from 'src/ticket-ws/ticket-ws.module';
import { NotificationService } from './notification.service';

@Module({
  imports: [UsersModule, PrismaModule, TicketWsModule],
  controllers: [TicketsController],
  providers: [TicketsService, TicketValidator, NotificationService],
  exports: [TicketsService],
})
export class TicketsModule {}
