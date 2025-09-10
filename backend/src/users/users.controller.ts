import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import * as usersInterface from './users.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): usersInterface.User[] {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): usersInterface.User | undefined {
    return this.usersService.findOne(Number(id));
  }

  @Post()
  create(@Body() user: Omit<usersInterface.User, 'id'>): usersInterface.User {
    return this.usersService.create(user);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: Partial<Omit<usersInterface.User, 'id'>>,
  ): usersInterface.User | undefined {
    return this.usersService.update(Number(id), data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(Number(id));
  }
}
