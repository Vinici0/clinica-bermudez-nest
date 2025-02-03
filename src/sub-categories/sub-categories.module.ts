import { Module } from '@nestjs/common';
import { SubCategoriesService } from './sub-categories.service';
import { SubCategoriesController } from './sub-categories.controller';
import { UsersModule } from 'src/users/users.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [SubCategoriesController],
  providers: [SubCategoriesService],
  imports: [UsersModule, PrismaModule],
})
export class SubCategoriesModule {}
