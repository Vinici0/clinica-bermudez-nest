import { Injectable } from '@nestjs/common';
import { CreateCategoryAssignmentDto } from './dto/create-category-assignment.dto';
import { UpdateCategoryAssignmentDto } from './dto/update-category-assignment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class CategoryAssignmentService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCategoryAssignmentDto: CreateCategoryAssignmentDto) {
    return this.prisma.categoryAssignment.create({
      data: createCategoryAssignmentDto,
    });
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    return this.prisma.categoryAssignment.findMany({
      take: limit,
      skip: offset < 0 ? 0 : offset,
    });
  }

  findOne(id: number) {
    return this.prisma.categoryAssignment.findUnique({
      where: { id },
    });
  }

  update(id: number, updateCategoryAssignmentDto: UpdateCategoryAssignmentDto) {
    return this.prisma.categoryAssignment.update({
      where: { id },
      data: updateCategoryAssignmentDto,
    });
  }

  remove(id: number) {
    return this.prisma.categoryAssignment.delete({
      where: { id },
    });
  }
}
