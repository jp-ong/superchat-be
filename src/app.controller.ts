import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { BaseResponseInterceptor } from './interceptors/base-response.interceptor';

@Controller('health')
@UseInterceptors(new BaseResponseInterceptor())
export class AppController {
  @Get()
  getHealth() {
    return;
  }
}
