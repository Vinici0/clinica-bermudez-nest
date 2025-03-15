import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Auth } from 'src/users/decorators/auth.decorator';
import { ValidRoles } from 'src/users/interfaces/valid-roles';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { GetUser } from 'src/users/decorators/get-user.decorator';
import { User } from '@prisma/client';

//Si se ubica aqui el Auth, se aplicara a todos los metodos del controlador
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @Auth()
  create(@GetUser() user: User, @Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(user, createCategoryDto);
  }

  @Get()
  @Auth()
  findAll(@GetUser() user: User, @Query() paginationDto: PaginationDto) {
    return this.categoriesService.findAll(user, paginationDto);
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    const category = this.categoriesService.findOne(+id);
    if (!category) throw new NotFoundException(`Category #${id} not found`);
    return category;
  }

  @Patch(':id')
  @Auth()
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
