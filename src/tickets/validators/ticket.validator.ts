import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTicketDto } from '../dto/create-ticket.dto';

@Injectable()
export class TicketValidator {
  constructor(private readonly prisma: PrismaService) {}

  async validateTicketCreation(createTicketDto: CreateTicketDto) {
    const { user_id, category_id, sub_category_id, sub_sub_category_id } =
      createTicketDto;

    await this.validateUser(user_id);
    await this.validateTicketExists(category_id);

    if (sub_category_id) {
      await this.validateSubCategory(sub_category_id, category_id);
    }

    if (sub_sub_category_id && sub_category_id) {
      await this.validateSubSubCategory(sub_sub_category_id, sub_category_id);
    }
  }

  async validateUser(userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new BadRequestException(`Usuario con ID ${userId} no encontrado`);
    }
  }

  async validateTicketExists(categoryId: number) {
    const category = await this.prisma.category.findFirst({
      where: { id: categoryId },
    });
    if (!category) {
      throw new BadRequestException(
        `Categoría ${categoryId} no encontrada o no pertenece al usuario`,
      );
    }
  }

  async validateSubCategory(subCategoryId: number, categoryId: number) {
    const subCategory = await this.prisma.subCategory.findFirst({
      where: { id: subCategoryId, category_id: categoryId },
    });

    if (!subCategory) {
      throw new BadRequestException(
        `Subcategoría ${subCategoryId} no encontrada o no pertenece a la categoría ${categoryId}`,
      );
    }
  }

  async validateSubSubCategory(
    subSubCategoryId: number,
    subCategoryId: number,
  ) {
    const subSubCategory = await this.prisma.subSubCategory.findFirst({
      where: { id: subSubCategoryId, sub_category_id: subCategoryId },
    });

    if (!subSubCategory) {
      throw new BadRequestException(
        `Sub-subcategoría ${subSubCategoryId} no encontrada o no pertenece a la subcategoría ${subCategoryId}`,
      );
    }
  }
}
