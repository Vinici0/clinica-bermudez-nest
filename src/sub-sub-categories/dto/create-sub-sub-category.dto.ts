import {
  IsString,
  IsOptional,
  MaxLength,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateSubSubCategoryDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  @MaxLength(100, { message: 'Name must not exceed 100 characters' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Other language name must be a string' })
  @MaxLength(100, {
    message: 'Other language name must not exceed 100 characters',
  })
  name_other_language?: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  @MaxLength(250, { message: 'Description must not exceed 250 characters' })
  description?: string;

  @IsNumber({}, { message: 'SubCategory ID must be a number' })
  @IsNotEmpty({ message: 'SubCategory ID is required' })
  sub_category_id: number;
}

export class UpdateSubSubCategoryDto extends PartialType(
  CreateSubSubCategoryDto,
) {}
