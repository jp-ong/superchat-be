import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersService } from '@/users/users.service';
import { LoginDto, RegisterDto } from './auth.dto';
import { PasswordUtil } from '@/utils/password.util';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async validateUser(data: LoginDto): Promise<User> {
    let user: User;

    try {
      user = await this.usersService.findOne(data.username);

      if (!(await PasswordUtil.comparePassword(data.password, user.password))) {
        throw new Error();
      }
    } catch {
      throw new BadRequestException();
    }

    return user;
  }

  async generateToken(user: User) {
    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
    });
    return {
      accessToken: token,
    };
  }

  async registerUser(data: RegisterDto) {
    return this.usersService.createUser(data);
  }
}
