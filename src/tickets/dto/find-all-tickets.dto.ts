import { IsEnum, IsOptional, IsPositive, IsNumber, Min } from 'class-validator';
import { SortOrder, TicketStatusEnum } from '../enums/ticket.enum';

export class FindAllTicketsDto {
  @IsEnum(TicketStatusEnum)
  @IsOptional()
  status?: TicketStatusEnum;

  @IsOptional()
  @IsPositive()
  @IsNumber()
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  offset?: number;

  @IsEnum(SortOrder)
  @IsOptional()
  order?: SortOrder = SortOrder.DESC;
}
