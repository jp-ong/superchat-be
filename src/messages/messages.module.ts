import { Module } from '@nestjs/common';
import { PrismaModule } from '@/prisma/prisma.module';
import { MessagesRepository } from './messages.repository';
import { MessagesService } from './messages.service';

@Module({
  providers: [MessagesService, MessagesRepository],
  imports: [PrismaModule],
  exports: [MessagesService],
})
export class MessagesModule {}
