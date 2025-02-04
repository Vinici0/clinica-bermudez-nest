import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SubSubCategoriesService } from './sub-sub-categories.service';
import { CreateSubSubCategoryDto } from './dto/create-sub-sub-category.dto';
import { UpdateSubSubCategoryDto } from './dto/update-sub-sub-category.dto';
import { Auth } from 'src/users/decorators/auth.decorator';
import { GetUser } from 'src/users/decorators/get-user.decorator';
import { User } from '@prisma/client';

@Controller('sub-sub-categories')
@Auth()
export class SubSubCategoriesController {
  constructor(
    private readonly subSubCategoriesService: SubSubCategoriesService,
  ) {}

  @Post()
  create(@Body() createSubSubCategoryDto: CreateSubSubCategoryDto) {
    return this.subSubCategoriesService.create(createSubSubCategoryDto);
  }

  @Get()
  findAll(@GetUser() user: User) {
    return this.subSubCategoriesService.findAll(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: User) {
    return this.subSubCategoriesService.findOne(+id, user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubSubCategoryDto: UpdateSubSubCategoryDto,
  ) {
    return this.subSubCategoriesService.update(+id, updateSubSubCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subSubCategoriesService.remove(+id);
  }
}
