import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { pgConfig } from './config/postgres.config';

@Module({
  imports: [AuthModule, TypeOrmModule.forRoot(pgConfig)],
  controllers: [],
  providers: [],
})
export class AppModule {}
