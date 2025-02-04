import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSubSubCategoryDto } from './dto/create-sub-sub-category.dto';
import { UpdateSubSubCategoryDto } from './dto/update-sub-sub-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class SubSubCategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSubSubCategoryDto: CreateSubSubCategoryDto) {
    const existingSubSubCategory = await this.prisma.subSubCategory.findUnique({
      where: { name: createSubSubCategoryDto.name },
    });

    if (existingSubSubCategory) {
      throw new BadRequestException('La subSubCategoria ya existe');
    }

    return this.prisma.subSubCategory.create({
      data: createSubSubCategoryDto,
    });
  }

  async findAll(userId: number) {
    return this.prisma.subSubCategory.findMany({
      where: {
        sub_category: {
          category: {
            user_id: userId,
          },
        },
      },
      select: {
        id: true,
        name: true,
        description: true,
        sub_category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async findOne(id: number, userId: number) {
    return this.prisma.subSubCategory.findFirst({
      where: {
        id,
        sub_category: {
          category: {
            user_id: userId,
          },
        },
      },
      select: {
        id: true,
        name: true,
        description: true,
        sub_category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  update(id: number, updateSubSubCategoryDto: UpdateSubSubCategoryDto) {
    return `This action updates a #${id} subSubCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} subSubCategory`;
  }
}
