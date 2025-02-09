import {
  IsString,
  IsOptional,
  MaxLength,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsEnum,
  IsNumber,
} from 'class-validator';
import { UserRoleStaff } from '@prisma/client';

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

  // Eliminamos username y password porque Staff ya no inicia sesión.

  @IsOptional()
  @IsString({ message: 'Address must be a string' })
  address?: string;

  @IsOptional()
  @IsString({ message: 'Unique ID must be a string' })
  @MaxLength(50, { message: 'Unique ID must not exceed 50 characters' })
  unique_id?: string;

  @IsOptional()
  @IsEnum(UserRoleStaff, { message: 'Role must be STAFF or DIRECTOR' })
  role?: UserRoleStaff;

  @IsOptional()
  @IsBoolean({ message: 'Show next button must be a boolean' })
  show_next_button?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'Enable desktop notification must be a boolean' })
  enable_desktop_notification?: boolean;

  // Clave foránea para saber qué User creó este Staff
  @IsNumber({}, { message: 'create_uid must be a number' })
  @IsNotEmpty({ message: 'create_uid is required' })
  create_uid: number;

  @IsOptional()
  @IsNumber({}, { message: 'Counter ID must be a number' })
  counter_id?: number;
}
