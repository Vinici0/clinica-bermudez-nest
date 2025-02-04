import { Module } from '@nestjs/common';
import { SubSubCategoriesService } from './sub-sub-categories.service';
import { SubSubCategoriesController } from './sub-sub-categories.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [SubSubCategoriesController],
  providers: [SubSubCategoriesService],
  imports: [UsersModule, PrismaModule],
})
export class SubSubCategoriesModule {}
