import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CountersService } from './counters.service';
import { CreateCounterDto } from './dto/create-counter.dto';
import { UpdateCounterDto } from './dto/update-counter.dto';
import { GetUser } from 'src/users/decorators/get-user.decorator';
import { Auth } from 'src/users/decorators/auth.decorator';
import { User } from '@prisma/client';

@Controller('counters')
export class CountersController {
  constructor(private readonly countersService: CountersService) {}

  @Post()
  @Auth()
  create(@Body() createCounterDto: CreateCounterDto) {
    return this.countersService.create(createCounterDto);
  }

  @Get()
  @Auth()
  findAll(@GetUser() user: User) {
    return this.countersService.findAll(user.id);
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.countersService.findOne(+id);
  }

  @Patch(':id')
  @Auth()
  update(@Param('id') id: string, @Body() updateCounterDto: UpdateCounterDto) {
    return this.countersService.update(+id, updateCounterDto);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string) {
    return this.countersService.remove(+id);
  }
}
