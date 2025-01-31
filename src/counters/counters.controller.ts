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

@Controller('counters')
export class CountersController {
  constructor(private readonly countersService: CountersService) {}

  @Post()
  create(@Body() createCounterDto: CreateCounterDto) {
    return this.countersService.create(createCounterDto);
  }

  @Get()
  findAll() {
    return this.countersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.countersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCounterDto: UpdateCounterDto) {
    return this.countersService.update(+id, updateCounterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.countersService.remove(+id);
  }
}
