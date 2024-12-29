import { IsString, MinLength, IsBoolean, IsNumber } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  name_other_language?: string;

  @IsString()
  description?: string;

  @IsString()
  acronym?: string;

  @IsBoolean()
  display_on_transfer_ticket_screen?: boolean;

  @IsBoolean()
  display_on_backend_screen?: boolean;

  @IsNumber()
  priority?: number;
}
