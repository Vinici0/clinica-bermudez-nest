import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post()
  async runSeed() {
    return this.seedService.executeSeed();
  }

  @Post('data')
  async runSeedData(@Body() data: any) {
    return data;
  }
}
