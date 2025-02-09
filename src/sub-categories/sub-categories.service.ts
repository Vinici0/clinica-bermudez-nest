import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class SubCategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSubCategoryDto: CreateSubCategoryDto) {
    const existingSubCategory = await this.prisma.subCategory.findUnique({
      where: { name: createSubCategoryDto.name },
    });

    if (existingSubCategory) {
      throw new BadRequestException('La subcategoría ya existe');
    }

    return this.prisma.subCategory.create({
      data: createSubCategoryDto,
      select: {
        id: true,
        name: true,
        description: true,
        category_id: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async findAll(userId: number) {
    return this.prisma.subCategory.findMany({
      where: {
        category: {
          create_uid: userId,
        },
      },
      select: {
        id: true,
        name: true,
        description: true,
        acronym: true,
        display_type: true,
        show_for: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async findOne(id: number, userId: number) {
    console.log('id', id);

    if (!id) {
      throw new BadRequestException('La subcategoría no existe');
    }

    if (!userId) {
      throw new BadRequestException('El usuario no existe');
    }

    const subCategory = await this.prisma.subCategory.findFirst({
      where: {
        id,
        category: {
          create_uid: userId,
        },
      },
    });

    if (!subCategory) {
      throw new BadRequestException('La subcategoría no existe');
    }

    return this.prisma.subCategory.findFirstOrThrow({
      where: {
        id,
        category: {
          create_uid: userId,
        },
      },
      select: {
        id: true,
        name: true,
        description: true,
        acronym: true,
        display_type: true,
        show_for: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async update(id: number, updateSubCategoryDto: UpdateSubCategoryDto) {
    const existingSubCategory = await this.prisma.subCategory.findUnique({
      where: { id },
    });

    if (!existingSubCategory) {
      throw new BadRequestException('La subcategoria no existe');
    }

    return this.prisma.subCategory.update({
      where: { id },
      data: updateSubCategoryDto,
      select: {
        id: true,
        name: true,
        description: true,
        category_id: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async remove(id: number) {
    const subCategory = await this.prisma.subCategory.findUnique({
      where: { id },
    });

    if (!subCategory) {
      throw new BadRequestException('La subcategoría no existe');
    }

    return this.prisma.subCategory.delete({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        category_id: true,
        created_at: true,
        updated_at: true,
      },
    });
  }
}
