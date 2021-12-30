import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { PostService } from '../post/post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepository } from '../post/post.repository';
import { UsersRepository } from '../auth/users.repository';
import { CommentRepository } from './comment.repository';
import { ReplyRepository } from '../reply/reply.repository';
import { NotifyRepository } from '../notify/notify.repository';
import { NotifyService } from '../notify/notify.service';
import { BadgeRepository } from '../badge/badge.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostRepository,
      UsersRepository,
      CommentRepository,
      ReplyRepository,
      NotifyRepository,
      BadgeRepository,
    ]),
  ],
  providers: [CommentService, PostService, NotifyService],
  controllers: [CommentController],
})
export class CommentModule {}
