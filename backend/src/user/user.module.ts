import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from '../auth/users.repository';
import { UsersFollowerRepository } from './usersFollow.repository';
import { PostRepository } from '../post/post.repository';
import { NotifyRepository } from '../notify/notify.repository';
import { NotifyService } from '../notify/notify.service';
import { BadgeRepository } from '../badge/badge.repository';

@Module({
  imports: [
    NestjsFormDataModule,
    TypeOrmModule.forFeature([
      UsersRepository,
      UsersFollowerRepository,
      PostRepository,
      NotifyRepository,
      BadgeRepository,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, NotifyService],
})
export class UserModule {}
