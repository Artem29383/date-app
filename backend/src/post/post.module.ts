import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepository } from './post.repository';
import { UserService } from '../user/user.service';
import { UsersRepository } from '../auth/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PostRepository, UsersRepository])],
  providers: [PostService, UserService],
  controllers: [PostController],
})
export class PostModule {}
