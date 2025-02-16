import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(username: string) {
    return this.prisma.user.findUniqueOrThrow({ where: { username } });
  }

  async create(username: string, password: string) {
    return this.prisma.user.create({
      data: { username, password, chatIds: [] },
    });
  }
}
