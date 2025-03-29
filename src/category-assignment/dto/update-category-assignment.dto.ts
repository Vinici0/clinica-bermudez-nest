import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryAssignmentDto } from './create-category-assignment.dto';

export class UpdateCategoryAssignmentDto extends PartialType(CreateCategoryAssignmentDto) {}
