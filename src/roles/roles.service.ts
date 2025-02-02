import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoleResponseDto } from './dto/response-role.dto';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: { name: string; description?: string }): Promise<Role> {
    return this.prisma.role.create({ data });
  }

  async findAll(): Promise<RoleResponseDto[]> {
    return this.prisma.role.findMany({
      select: {
        id: true,
        name: true,
        description: true,
      },
    });
  }
}
