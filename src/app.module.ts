// Third Party Imports
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

// Feature Modules
import { CategoriesModule } from './categories/categories.module';
import { CategoriesOnStaffModule } from './categories-on-staff/categories-on-staff.module';
import { CountersModule } from './counters/counters.module';
import { StaffModule } from './staff/staff.module';
import { SubCategoriesModule } from './sub-categories/sub-categories.module';
import { SubSubCategoriesModule } from './sub-sub-categories/sub-sub-categories.module';
import { TicketsModule } from './tickets/tickets.module';
import { UsersModule } from './users/users.module';
import { SeedModule } from './seed/seed.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'public'),
    // }),

    CategoriesModule,
    StaffModule,
    CountersModule,
    SubCategoriesModule,
    SubSubCategoriesModule,
    TicketsModule,
    CategoriesOnStaffModule,
    UsersModule,
    SeedModule,
    RolesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
