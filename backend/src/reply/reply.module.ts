import { Module } from '@nestjs/common';
import { ReplyController } from './reply.controller';
import { ReplyService } from './reply.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReplyRepository } from './reply.repository';
import { CommentRepository } from '../comment/comment.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ReplyRepository, CommentRepository])],
  controllers: [ReplyController],
  providers: [ReplyService],
})
export class ReplyModule {}
