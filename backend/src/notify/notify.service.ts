import { Injectable } from '@nestjs/common';
import { CreateNotifyDto } from './dto/create-notify.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NotifyRepository } from './notify.repository';
import { UsersRepository } from '../auth/users.repository';
import { BadgeRepository } from '../badge/badge.repository';
import { OPERATION } from './types';

@Injectable()
export class NotifyService {
  constructor(
    @InjectRepository(NotifyRepository)
    private notifyRepository: NotifyRepository,
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    @InjectRepository(BadgeRepository)
    private badgeRepository: BadgeRepository,
  ) {}

  async createNotify(
    createNotifyDto: CreateNotifyDto,
    operation: OPERATION,
    myUserId: string,
  ) {
    console.info(createNotifyDto);
    console.info(myUserId);
    const user = await this.usersRepository.findOne(createNotifyDto.userId);
    const { notify, user: currentUser } =
      await this.notifyRepository.createNotify(
        createNotifyDto,
        user,
        operation,
        myUserId,
      );

    console.info('currentUser.badge', currentUser.badge);
    await this.badgeRepository.save(currentUser.badge);
    console.info('end');
    return notify;
  }
}
