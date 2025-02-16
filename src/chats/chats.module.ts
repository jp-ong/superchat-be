import { Module } from '@nestjs/common';
import { ChatsGateway } from './chats.gateway';
import { ChatsService } from './chats.service';
import { MessagesModule } from '@/messages/messages.module';

@Module({
  providers: [ChatsGateway, ChatsService],
  imports: [MessagesModule],
})
export class ChatsModule {}
