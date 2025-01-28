import { Module } from '@nestjs/common';
import { CategoriesOnStaffService } from './categories-on-staff.service';
import { CategoriesOnStaffController } from './categories-on-staff.controller';

@Module({
  controllers: [CategoriesOnStaffController],
  providers: [CategoriesOnStaffService]
})
export class CategoriesOnStaffModule {}
