import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoriesOnStaffDto } from './create-categories-on-staff.dto';

export class UpdateCategoriesOnStaffDto extends PartialType(CreateCategoriesOnStaffDto) {}
