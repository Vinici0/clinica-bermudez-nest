import { IsEnum, IsOptional, IsPositive, IsNumber, Min } from 'class-validator';
import { TicketStatusEnum } from '../enums/ticket-status.enum';

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
}
