import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { UsersModule } from 'src/users/users.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TicketWsModule } from 'src/ticket-ws/ticket-ws.module';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],
  imports: [UsersModule, PrismaModule, TicketWsModule],
})
export class CategoriesModule {}
