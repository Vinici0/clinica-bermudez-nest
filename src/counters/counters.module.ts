import { Module } from '@nestjs/common';
import { CountersService } from './counters.service';
import { CountersController } from './counters.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [CountersController],
  providers: [CountersService],
  imports: [UsersModule, PrismaModule],
})
export class CountersModule {}
