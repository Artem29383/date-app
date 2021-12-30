import { Module } from '@nestjs/common';
import { BadgeController } from './badge.controller';
import { BadgeService } from './badge.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BadgeRepository } from './badge.repository';
import { UsersRepository } from '../auth/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BadgeRepository, UsersRepository])],
  controllers: [BadgeController],
  providers: [BadgeService],
})
export class BadgeModule {}
