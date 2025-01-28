import {
  IsString,
  IsOptional,
  MaxLength,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateTicketDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  @MaxLength(100, { message: 'Name must not exceed 100 characters' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Phone must be a string' })
  @MaxLength(20, { message: 'Phone must not exceed 20 characters' })
  phone?: string;

  @IsNumber({}, { message: 'Client ID must be a number' })
  @IsNotEmpty({ message: 'Client ID is required' })
  client_id: number;

  @IsNumber({}, { message: 'Category ID must be a number' })
  @IsNotEmpty({ message: 'Category ID is required' })
  category_id: number;

  @IsOptional()
  @IsNumber({}, { message: 'SubCategory ID must be a number' })
  sub_category_id?: number;

  @IsOptional()
  @IsNumber({}, { message: 'SubSubCategory ID must be a number' })
  sub_sub_category_id?: number;
}

export class UpdateTicketDto extends PartialType(CreateTicketDto) {}
