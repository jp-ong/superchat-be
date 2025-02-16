import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './messages.dto';
import { MessagesRepository } from './messages.repository';

@Injectable()
export class MessagesService {
  constructor(private readonly messagesRepository: MessagesRepository) {}

  create(data: CreateMessageDto) {
    return this.messagesRepository.create(data);
  }
}
