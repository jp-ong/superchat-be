import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatsService {
  findAll() {
    return `This action returns all chats`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }
}
