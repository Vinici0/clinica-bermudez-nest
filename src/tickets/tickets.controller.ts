import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { User } from '@prisma/client';
import { GetUser } from 'src/users/decorators/get-user.decorator';
import { Auth } from 'src/users/decorators/auth.decorator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { FindAllTicketsDto } from './dto/find-all-tickets.dto';

@Controller('tickets')
@Auth()
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.create(createTicketDto);
  }

  @Get()
  findAllForStaff(
    @GetUser() user: User,
    @Query() paginationDto: FindAllTicketsDto,
  ) {
    return this.ticketsService.findAllForStaff(user.id, paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: User) {
    return this.ticketsService.findOne(+id, user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTicketDto: UpdateTicketDto,
    @GetUser() user: User,
  ) {
    return this.ticketsService.update(+id, updateTicketDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketsService.remove(+id);
  }
}
