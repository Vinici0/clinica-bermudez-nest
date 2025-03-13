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

  async findAll(user: User) {
    return this.prisma.subSubCategory.findMany({
      where: {
        sub_category: {
          category: {
            create_uid: user.create_uid || user.id,
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

  async findOne(id: number, user: User) {
    return this.prisma.subSubCategory.findFirst({
      where: {
        id,
        sub_category: {
          category: {
            create_uid: user.create_uid || user.id,
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

  async update(id: number, updateSubSubCategoryDto: UpdateSubSubCategoryDto) {
    const existingSubSubCategory = await this.prisma.subSubCategory.findUnique({
      where: { id },
    });

    if (!existingSubSubCategory) {
      throw new BadRequestException('La subSubCategoria no existe');
    }

    return this.prisma.subSubCategory.update({
      where: { id },
      data: updateSubSubCategoryDto,
    });
  }

  async remove(id: number) {
    const subSubCategory = await this.prisma.subSubCategory.findUnique({
      where: { id },
    });

    if (!subSubCategory) {
      throw new BadRequestException('La subSubCategoria no existe');
    }

    return this.prisma.subSubCategory.delete({
      where: { id },
    });
  }
}
