import { Module } from '@nestjs/common';
import { CategoryAssignmentService } from './category-assignment.service';
import { CategoryAssignmentController } from './category-assignment.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [CategoryAssignmentController],
  imports: [PrismaModule],
  providers: [CategoryAssignmentService],
})
export class CategoryAssignmentModule {}
