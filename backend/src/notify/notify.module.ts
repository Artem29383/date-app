import { Module } from '@nestjs/common';
import { NotifyController } from './notify.controller';
import { NotifyService } from './notify.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotifyRepository } from './notify.repository';
import { UsersRepository } from '../auth/users.repository';
import { BadgeRepository } from '../badge/badge.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      NotifyRepository,
      UsersRepository,
      BadgeRepository,
    ]),
  ],
  controllers: [NotifyController],
  providers: [NotifyService],
})
export class NotifyModule {}
