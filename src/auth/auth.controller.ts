import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { BaseResponseInterceptor } from '@/base/interceptors/base-response.interceptor';
import { LoginDto, RegisterDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@UseInterceptors(new BaseResponseInterceptor())
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() data: LoginDto) {
    const user = await this.authService.validateUser(data);
    return this.authService.generateToken(user);
  }

  @Post('register')
  async register(@Body() data: RegisterDto) {
    const user = await this.authService.registerUser(data);
    return this.authService.generateToken(user);
  }
}
