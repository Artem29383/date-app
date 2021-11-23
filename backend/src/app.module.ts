import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { pgConfig } from './config/postgres.config';
import { UserModule } from './user/user.module';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot(pgConfig),
    UserModule,
    NestjsFormDataModule.config({ storage: MemoryStoredFile }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
