import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepository } from './post.repository';
import { UserService } from '../user/user.service';
import { UsersRepository } from '../auth/users.repository';
import { UsersFollowerRepository } from '../user/usersFollow.repository';
import { NotifyService } from '../notify/notify.service';
import { NotifyRepository } from '../notify/notify.repository';
import { BadgeRepository } from '../badge/badge.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostRepository,
      UsersRepository,
      UsersFollowerRepository,
      NotifyRepository,
      BadgeRepository,
    ]),
  ],
  providers: [PostService, UserService, NotifyService],
  controllers: [PostController],
})
export class PostModule {}
