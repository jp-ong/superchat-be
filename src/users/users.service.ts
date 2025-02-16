import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PasswordUtil } from '@/utils/password.util';
import { CreateUserDto } from './users.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findOne(username: string): Promise<User> {
    let data: User;

    try {
      data = await this.usersRepository.findOne(username);
    } catch {
      throw new BadRequestException();
    }

    return data;
  }

  async createUser(data: CreateUserDto): Promise<User> {
    let user: User;

    try {
      const hashedPassword = await PasswordUtil.hashPassword(data.password);
      user = await this.usersRepository.create(data.username, hashedPassword);
    } catch {
      throw new BadRequestException();
    }

    return user;
  }
}
