import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateMessageDto } from '@/messages/messages.dto';
import { MessagesService } from '@/messages/messages.service';

enum ChatEvents {
  USER_JOINED = 'userJoined',
  USER_LEFT = 'userLeft',
  NEW_MESSAGE = 'newMessage',
  CREATE_MESSAGE = 'createMessage',
}

@WebSocketGateway(5001, { namespace: 'chats' })
export class ChatsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private readonly messagesService: MessagesService) {}

  handleConnection(client: Socket) {
    this.server.emit(ChatEvents.USER_JOINED, {
      userId: client.id,
      message: 'User entered the chat',
    });
  }

  handleDisconnect(client: Socket) {
    this.server.emit(ChatEvents.USER_LEFT, {
      userId: client.id,
      message: 'User left the chat',
    });
  }

  @SubscribeMessage(ChatEvents.CREATE_MESSAGE)
  async handleCreateMessage(@MessageBody() data: CreateMessageDto) {
    const message = await this.messagesService.create(data);
    this.server.emit(ChatEvents.NEW_MESSAGE, message);
    return message;
  }
}
