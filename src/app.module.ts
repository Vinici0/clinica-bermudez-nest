import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { ClientsModule } from './clients/clients.module';
import { StaffModule } from './staff/staff.module';
import { CountersModule } from './counters/counters.module';
import { SubCategoriesModule } from './sub-categories/sub-categories.module';
import { SubSubCategoriesModule } from './sub-sub-categories/sub-sub-categories.module';
import { TicketsModule } from './tickets/tickets.module';
import { CategoriesOnStaffModule } from './categories-on-staff/categories-on-staff.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CategoriesModule, ClientsModule, StaffModule, CountersModule, SubCategoriesModule, SubSubCategoriesModule, TicketsModule, CategoriesOnStaffModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
