import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  SetMetadata,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from './guards/user-role.guard';
import { User } from '@prisma/client';
import { GetUser } from './decorators/get-user.decorator';
import { RawHeaders } from './decorators/raw-headers.decorator';
import {
  META_ROLES,
  RoleProtected,
} from './decorators/role-protected.decorator';
import { ValidRoles } from './interfaces/valid-roles';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  //De manera simple eso lo hace de manera automiticamente AuthGuard()
  //Descoradores: Simplemente los decoradores son funciones que se ejecutan antes de que
  //se ejecute la función a la que decoran.
  @Get('private')
  @RoleProtected(ValidRoles.ADMIN)
  @UseGuards(AuthGuard(), UserRoleGuard)
  findAllPrivate(
    @Req() request: Express.Request,
    @GetUser() user: User,
    @RawHeaders() rawHeaders: string[],
  ) {
    return {
      user,
      rawHeaders,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
