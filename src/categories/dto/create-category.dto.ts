import {
  IsString,
  MinLength,
  IsBoolean,
  IsNumber,
  IsOptional,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';

export class CreateCategoryDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  @MinLength(2, { message: 'Name must be at least 2 characters' })
  @MaxLength(50, { message: 'Name must not exceed 50 characters' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Other language name must be a string' })
  @MinLength(2, {
    message: 'Other language name must be at least 2 characters',
  })
  @MaxLength(50, {
    message: 'Other language name must not exceed 50 characters',
  })
  name_other_language?: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  @MaxLength(200, { message: 'Description must not exceed 200 characters' })
  description?: string;

  @IsOptional()
  @IsString({ message: 'Acronym must be a string' })
  @MinLength(1, { message: 'Acronym must be at least 1 character' })
  @MaxLength(10, { message: 'Acronym must not exceed 10 characters' })
  acronym?: string;

  @IsOptional()
  @IsBoolean({ message: 'Display on transfer ticket screen must be a boolean' })
  display_on_transfer_ticket_screen?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'Display on backend screen must be a boolean' })
  display_on_backend_screen?: boolean;

  @IsOptional()
  @IsNumber({}, { message: 'Priority must be a number' })
  priority?: number;

  @IsNumber({}, { message: 'Client ID must be a number' })
  @IsNotEmpty({ message: 'Client ID is required' })
  client_id: number;
}
