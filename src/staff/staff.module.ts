import { Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [StaffController],
  imports: [UsersModule, PrismaModule],
  providers: [StaffService],
})
export class StaffModule {}
