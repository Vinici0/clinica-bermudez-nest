import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  private categories: Category[] = [
    {
      id: 1,
      name: 'Category 1',
      name_other_language: 'Category 1',
      description: 'Category 1',
      acronym: 'C1',
      display_on_transfer_ticket_screen: true,
      display_on_backend_screen: true,
      priority: 1,
    },
    {
      id: 2,
      name: 'Category 2',
      name_other_language: 'Category 2',
      description: 'Category 2',
      acronym: 'C2',
      display_on_transfer_ticket_screen: true,
      display_on_backend_screen: true,
      priority: 2,
    },
    {
      id: 3,
      name: 'Category 3',
      name_other_language: 'Category 3',
      description: 'Category 3',
      acronym: 'C3',
      display_on_transfer_ticket_screen: true,
      display_on_backend_screen: true,
      priority: 3,
    },
  ];

  create(createCategoryDto: CreateCategoryDto) {
    const category: Category = {
      id: 1,
      ...createCategoryDto,
    };
    this.categories.push(category);
    return category;
  }

  findAll() {
    return this.categories;
  }

  findOne(id: number) {
    return this.categories.find((category) => category.id === id);
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = this.findOne(id);
    if (category) {
      const index = this.categories.indexOf(category);
      this.categories[index] = {
        ...category,
        ...updateCategoryDto,
      };
      return this.categories[index];
    }
  }

  remove(id: number) {
    const category = this.findOne(id);
    if (category) {
      const index = this.categories.indexOf(category);
      this.categories.splice(index, 1);
      return category;
    }

    return null;
  }

  //TODO: Implement the following methods
  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Pokemon exists in db ${JSON.stringify(error.keyValue)}`,
      );
    }
    console.log(error);
    throw new InternalServerErrorException(
      `Can't create Pokemon - Check server logs`,
    );
  }
}
