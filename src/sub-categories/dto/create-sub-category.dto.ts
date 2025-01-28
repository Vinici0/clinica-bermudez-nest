import {
  IsString,
  IsOptional,
  MaxLength,
  IsNotEmpty,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { DisplayType, ShowFor } from '@prisma/client';

export class CreateSubCategoryDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  @MaxLength(100, { message: 'Name must not exceed 100 characters' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Other language name must be a string' })
  @MaxLength(100, {
    message: 'Name in other language must not exceed 100 characters',
  })
  name_other_language?: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  @MaxLength(250, { message: 'Description must not exceed 250 characters' })
  description?: string;

  @IsOptional()
  @IsString({ message: 'Acronym must be a string' })
  @MaxLength(10, { message: 'Acronym must not exceed 10 characters' })
  acronym?: string;

  @IsOptional()
  @IsEnum(DisplayType, {
    message:
      'Display type must be one of: TRANSFER_AND_TICKET_SCREEN, TICKET_SCREEN, TRANSFER_SCREEN',
  })
  display_type?: DisplayType;

  @IsOptional()
  @IsEnum(ShowFor, {
    message: 'Show for must be one of: BACKEND_AND_ONLINE, BACKEND, ONLINE',
  })
  show_for?: ShowFor;

  @IsNumber({}, { message: 'Category ID must be a number' })
  @IsNotEmpty({ message: 'Category ID is required' })
  category_id: number;
}

export class UpdateSubCategoryDto extends PartialType(CreateSubCategoryDto) {}
