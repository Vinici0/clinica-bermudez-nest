import { Injectable } from '@nestjs/common';
import { CreateCategoriesOnStaffDto } from './dto/create-categories-on-staff.dto';
import { UpdateCategoriesOnStaffDto } from './dto/update-categories-on-staff.dto';

@Injectable()
export class CategoriesOnStaffService {
  create(createCategoriesOnStaffDto: CreateCategoriesOnStaffDto) {
    return 'This action adds a new categoriesOnStaff';
  }

  findAll() {
    return `This action returns all categoriesOnStaff`;
  }

  findOne(id: number) {
    return `This action returns a #${id} categoriesOnStaff`;
  }

  update(id: number, updateCategoriesOnStaffDto: UpdateCategoriesOnStaffDto) {
    return `This action updates a #${id} categoriesOnStaff`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoriesOnStaff`;
  }
}
