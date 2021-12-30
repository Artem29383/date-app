import { Module } from '@nestjs/common';
import { ReplyController } from './reply.controller';
import { ReplyService } from './reply.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReplyRepository } from './reply.repository';
import { CommentRepository } from '../comment/comment.repository';
import { PostRepository } from '../post/post.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReplyRepository,
      CommentRepository,
      PostRepository,
    ]),
  ],
  controllers: [ReplyController],
  providers: [ReplyService],
})
export class ReplyModule {}
