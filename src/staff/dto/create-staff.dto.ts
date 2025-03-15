import {
  IsString,
  IsOptional,
  MaxLength,
  IsBoolean,
  IsNotEmpty,
  IsEnum,
  IsNumber,
} from 'class-validator';
import { UserRoleStaff } from '@prisma/client';

export class CreateStaffDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @MaxLength(100, { message: 'El nombre no debe exceder los 100 caracteres' })
  name: string;

  @IsOptional()
  @IsString({ message: 'El contacto debe ser una cadena de texto' })
  @MaxLength(20, { message: 'El contacto no debe exceder los 20 caracteres' })
  contact?: string;

  @IsOptional()
  @IsString({ message: 'La dirección debe ser una cadena de texto' })
  address?: string;

  @IsOptional()
  @IsString({ message: 'El ID único debe ser una cadena de texto' })
  @MaxLength(50, { message: 'El ID único no debe exceder los 50 caracteres' })
  unique_id?: string;

  @IsOptional()
  @IsEnum(UserRoleStaff, { message: 'El rol debe ser STAFF o DIRECTOR' })
  role?: UserRoleStaff;

  @IsOptional()
  @IsBoolean({ message: 'show_next_button debe ser un valor booleano' })
  show_next_button?: boolean;

  @IsOptional()
  @IsBoolean({
    message: 'enable_desktop_notification debe ser un valor booleano',
  })
  enable_desktop_notification?: boolean;

  @IsNumber({}, { message: 'El ID del counter debe ser un número' })
  @IsOptional()
  counter_id?: number;

  // Nueva relación: usuario asignado al staff
  @IsNumber({}, { message: 'El ID del usuario debe ser un número' })
  @IsNotEmpty({ message: 'El ID del usuario es requerido' })
  user_id: number;

  // Usuario que crea el registro
  @IsNumber({}, { message: 'El ID del creador debe ser un número' })
  @IsNotEmpty({ message: 'El ID del creador es requerido' })
  create_uid: number;
}
