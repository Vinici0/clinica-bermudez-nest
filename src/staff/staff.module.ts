import { Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [StaffController],
  imports: [PrismaModule],
  providers: [StaffService],
})
export class StaffModule {}
