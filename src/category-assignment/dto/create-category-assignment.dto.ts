import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCategoryAssignmentDto {
  @IsInt({ message: 'El ID del staff debe ser un número entero' })
  @IsNotEmpty({ message: 'El ID del staff es requerido' })
  staff_id: number;

  @IsInt({ message: 'El ID de la categoría debe ser un número entero' })
  @IsOptional()
  category_id?: number;

  @IsInt({ message: 'El ID de la subcategoría debe ser un número entero' })
  @IsOptional()
  sub_category_id?: number;

  @IsInt({ message: 'El ID de la sub-subcategoría debe ser un número entero' })
  @IsOptional()
  sub_sub_category_id?: number;
}
