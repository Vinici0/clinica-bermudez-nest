import { Injectable } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { User } from '@prisma/client';

@Injectable()
export class StaffService {
  constructor(private readonly prisma: PrismaService) {}

  create(createStaffDto: CreateStaffDto) {
    return this.prisma.staff.create({
      data: createStaffDto,
    });
  }

  findAll(user: User, paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    return this.prisma.staff.findMany({
      take: limit,
      skip: offset < 0 ? 0 : offset,
      where: {
        user_id: user.create_uid || user.id,
      },
    });
  }

  findOne(id: number, user: User) {
    return this.prisma.staff.findUnique({
      where: {
        user_id: user.create_uid || user.id,
        id,
      },
    });
  }

  update(id: number, updateStaffDto: UpdateStaffDto) {
    return this.prisma.staff.update({
      where: { id },
      data: updateStaffDto,
    });
  }

  remove(id: number) {
    return this.prisma.staff.delete({
      where: { id },
    });
  }
}
