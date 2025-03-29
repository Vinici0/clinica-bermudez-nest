import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CategoryAssignmentService } from './category-assignment.service';
import { CreateCategoryAssignmentDto } from './dto/create-category-assignment.dto';
import { UpdateCategoryAssignmentDto } from './dto/update-category-assignment.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('category-assignment')
export class CategoryAssignmentController {
  constructor(
    private readonly categoryAssignmentService: CategoryAssignmentService,
  ) {}

  @Post()
  create(@Body() createCategoryAssignmentDto: CreateCategoryAssignmentDto) {
    return this.categoryAssignmentService.create(createCategoryAssignmentDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.categoryAssignmentService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryAssignmentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryAssignmentDto: UpdateCategoryAssignmentDto,
  ) {
    return this.categoryAssignmentService.update(
      +id,
      updateCategoryAssignmentDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryAssignmentService.remove(+id);
  }
}
