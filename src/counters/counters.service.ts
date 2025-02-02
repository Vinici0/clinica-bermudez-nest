import { Injectable } from '@nestjs/common';
import { CreateCounterDto } from './dto/create-counter.dto';
import { UpdateCounterDto } from './dto/update-counter.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CountersService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCounterDto: CreateCounterDto) {
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

  update(id: number, updateCounterDto: UpdateCounterDto) {
    return this.prisma.counter.update({
      where: { id },
      data: updateCounterDto,
    });
  }

  remove(id: number) {
    return this.prisma.counter.delete({
      where: { id },
    });
  }
}
