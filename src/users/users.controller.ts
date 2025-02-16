import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { BaseResponseInterceptor } from '@/base/interceptors/base-response.interceptor';
import { UsersService } from './users.service';

@Controller('users')
@UseInterceptors(new BaseResponseInterceptor())
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':username')
  async findOne(@Param('username') username: string) {
    const { password, ...user } = await this.usersService.findOne(username);
    return user;
  }
}
