import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateCategoriesOnStaffDto {
  @IsNumber({}, { message: 'Staff ID must be a number' })
  @IsNotEmpty({ message: 'Staff ID is required' })
  staff_id: number;

  @IsNumber({}, { message: 'Category ID must be a number' })
  @IsNotEmpty({ message: 'Category ID is required' })
  category_id: number;
}
