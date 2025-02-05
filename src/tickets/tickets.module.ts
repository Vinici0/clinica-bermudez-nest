import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { UsersModule } from 'src/users/users.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [TicketsController],
  providers: [TicketsService],
  imports: [UsersModule, PrismaModule],
})
export class TicketsModule {}
