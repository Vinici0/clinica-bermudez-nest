import {
  IsString,
  IsOptional,
  MaxLength,
  IsNotEmpty,
  MinLength,
  IsBoolean,
  IsInt,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @MaxLength(100, { message: 'El nombre no debe exceder los 100 caracteres' })
  name: string;

  @IsOptional()
  @MaxLength(100, {
    message: 'El correo electrónico no debe exceder los 100 caracteres',
  })
  email?: string;

  @IsOptional()
  @IsString({ message: 'El teléfono debe ser una cadena de texto' })
  @MaxLength(20, { message: 'El teléfono no debe exceder los 20 caracteres' })
  phone?: string;

  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @MaxLength(100, {
    message: 'La contraseña no debe exceder los 100 caracteres',
  })
  password: string;

  @IsOptional()
  @IsBoolean({ message: 'isActive debe ser un valor booleano' })
  is_active?: boolean = true;

  @IsOptional()
  @IsString({ message: 'La imagen debe ser una cadena de texto' })
  @MaxLength(100, {
    message: 'La ruta de la imagen no debe exceder los 100 caracteres',
  })
  image?: string;

  @IsOptional()
  @IsInt({ message: 'El ID del creador debe ser un número entero' })
  create_uid?: number;
}

/*
Example:
  const newUserDto: CreateUserDto = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  password: 'securepassword',
  create_uid: 1,
};
*/
