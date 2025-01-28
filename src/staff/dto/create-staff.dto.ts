import {
  IsString,
  IsOptional,
  MaxLength,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsEnum,
  IsNumber,
  MinLength,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

// Ajusta si deseas más valores en el enum
export enum UserRole {
  STAFF = 'STAFF',
  DIRECTOR = 'DIRECTOR',
}

export class CreateStaffDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  @MaxLength(100, { message: 'Name must not exceed 100 characters' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Contact must be a string' })
  @MaxLength(20, { message: 'Contact must not exceed 20 characters' })
  contact?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @MaxLength(100, { message: 'Email must not exceed 100 characters' })
  email?: string;

  @IsString({ message: 'Username must be a string' })
  @IsNotEmpty({ message: 'Username is required' })
  @MaxLength(50, { message: 'Username must not exceed 50 characters' })
  username: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  @IsOptional()
  @IsString({ message: 'Address must be a string' })
  address?: string;

  @IsOptional()
  @IsString({ message: 'Unique ID must be a string' })
  @MaxLength(50, { message: 'Unique ID must not exceed 50 characters' })
  unique_id?: string;

  @IsOptional()
  @IsEnum(UserRole, { message: 'Role must be STAFF or DIRECTOR' })
  role?: UserRole;

  @IsOptional()
  @IsBoolean({ message: 'Show next button must be a boolean' })
  show_next_button?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'Enable desktop notification must be a boolean' })
  enable_desktop_notification?: boolean;

  @IsNumber({}, { message: 'Client ID must be a number' })
  @IsNotEmpty({ message: 'Client ID is required' })
  client_id: number;

  @IsOptional()
  @IsNumber({}, { message: 'Counter ID must be a number' })
  counter_id?: number;
}

export class UpdateStaffDto extends PartialType(CreateStaffDto) {}
