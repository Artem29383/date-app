import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { pgConfig } from './config/postgres.config';
import { UserModule } from './user/user.module';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot(pgConfig),
    UserModule,
    NestjsFormDataModule.config({ storage: MemoryStoredFile }),
    PostModule,
    CommentModule,
  ],
  controllers: [],
})
export class AppModule {}
