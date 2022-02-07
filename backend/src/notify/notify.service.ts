import { Injectable } from '@nestjs/common';
import { CreateNotifyDto } from './dto/create-notify.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NotifyRepository } from './notify.repository';
import { UsersRepository } from '../auth/users.repository';
import { BadgeRepository } from '../badge/badge.repository';
import { OPERATION } from './types';
import { UserEntity } from '../user/entities/user.entity';
import { NotifyType } from '../badge/types';

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

  async getNotify(user: UserEntity) {
    const queryObjects = {};
    const query = await this.notifyRepository
      .createQueryBuilder('notify')
      .where('notify.userId = :userId', { userId: user.id })
      .getMany();

    queryObjects[NotifyType.LIKE] = query.filter(
      (q) => q.type === NotifyType.LIKE,
    );
    queryObjects[NotifyType.SUBSCRIBE] = query.filter((q) => q.type === 'SUBS');
    queryObjects[NotifyType.COMMENT] = query.filter(
      (q) => q.type === 'COMMENTS',
    );

    return queryObjects;
  }

  async createNotify(
    createNotifyDto: CreateNotifyDto,
    operation: OPERATION,
    myUserId: string,
  ) {
    console.info('cre', createNotifyDto);
    console.info('my', myUserId);
    if (createNotifyDto.userId === myUserId) return;
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
