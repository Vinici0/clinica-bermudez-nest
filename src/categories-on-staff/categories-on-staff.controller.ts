import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriesOnStaffService } from './categories-on-staff.service';
import { CreateCategoriesOnStaffDto } from './dto/create-categories-on-staff.dto';
import { UpdateCategoriesOnStaffDto } from './dto/update-categories-on-staff.dto';

@Controller('categories-on-staff')
export class CategoriesOnStaffController {
  constructor(private readonly categoriesOnStaffService: CategoriesOnStaffService) {}

  @Post()
  create(@Body() createCategoriesOnStaffDto: CreateCategoriesOnStaffDto) {
    return this.categoriesOnStaffService.create(createCategoriesOnStaffDto);
  }

  @Get()
  findAll() {
    return this.categoriesOnStaffService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesOnStaffService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoriesOnStaffDto: UpdateCategoriesOnStaffDto) {
    return this.categoriesOnStaffService.update(+id, updateCategoriesOnStaffDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesOnStaffService.remove(+id);
  }
}
