import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCounterDto } from './dto/create-counter.dto';
import { UpdateCounterDto } from './dto/update-counter.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CountersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCounterDto: CreateCounterDto) {
    const existingCounter = await this.prisma.counter.findUnique({
      where: { name: createCounterDto.name },
    });

    if (existingCounter) {
      throw new BadRequestException('El contador ya existe');
    }

    return this.prisma.counter.create({
      data: createCounterDto,
    });
  }

  findAll(userId: number) {
    return this.prisma.counter.findMany({
      where: {
        user_id: userId,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.counter.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: number, updateCounterDto: UpdateCounterDto) {
    const existingCounter = await this.prisma.counter.findUnique({
      where: { id },
    });

    if (!existingCounter) {
      throw new BadRequestException('El contador no existe');
    }

    return this.prisma.counter.update({
      where: { id },
      data: updateCounterDto,
    });
  }

  async remove(id: number) {
    const counter = await this.prisma.counter.findUnique({
      where: { id },
    });

    if (!counter) {
      throw new BadRequestException('El contador no existe');
    }

    return this.prisma.counter.delete({
      where: { id },
    });
  }
}
