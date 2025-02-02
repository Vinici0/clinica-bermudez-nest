import {
  IsString,
  IsOptional,
  MaxLength,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class CreateCounterDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  @MaxLength(100, { message: 'Name must not exceed 100 characters' })
  name: string;

  @IsOptional()
  @IsBoolean({ message: 'Show checkbox must be a boolean' })
  show_checkbox?: boolean;

  @IsNumber({}, { message: 'Client ID must be a number' })
  @IsNotEmpty({ message: 'Client ID is required' })
  user_id: number;
}
