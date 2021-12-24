import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from '../auth/users.repository';
import { UsersFollowerRepository } from './usersFollow.repository';
import { PostRepository } from '../post/post.repository';

@Module({
  imports: [
    NestjsFormDataModule,
    TypeOrmModule.forFeature([
      UsersRepository,
      UsersFollowerRepository,
      PostRepository,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
