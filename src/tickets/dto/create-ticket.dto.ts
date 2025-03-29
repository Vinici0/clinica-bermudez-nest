import {
  IsString,
  IsOptional,
  MaxLength,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class CreateTicketDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @MaxLength(100, { message: 'El nombre no debe exceder los 100 caracteres' })
  name: string;

  @IsOptional()
  @IsString({ message: 'El teléfono debe ser una cadena de texto' })
  @MaxLength(20, { message: 'El teléfono no debe exceder los 20 caracteres' })
  phone?: string;

  @IsNumber({}, { message: 'El ID del usuario debe ser un número' })
  @IsNotEmpty({ message: 'El ID del usuario es requerido' })
  create_uid: number;

  @IsNumber({}, { message: 'El ID de la categoría debe ser un número' })
  @IsNotEmpty({ message: 'El ID de la categoría es requerido' })
  category_id: number;

  @IsOptional()
  @IsNumber({}, { message: 'El ID de la subcategoría debe ser un número' })
  sub_category_id?: number;

  @IsOptional()
  @IsNumber({}, { message: 'El ID de la sub-subcategoría debe ser un número' })
  sub_sub_category_id?: number;

  @IsOptional()
  @IsNumber({}, { message: 'El ID del estado del ticket debe ser un número' })
  ticket_status_id?: number;
}
