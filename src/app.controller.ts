import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { BaseResponseInterceptor } from './base/interceptors/base-response.interceptor';

@Controller('health')
@UseInterceptors(new BaseResponseInterceptor())
export class AppController {
  @Get()
  getHealth() {
    return;
  }
}
