import { EntityRepository, Repository } from 'typeorm';
import { NotifyEntity } from './notify.entity';
import { CreateNotifyDto } from './dto/create-notify.dto';
import { UserEntity } from '../user/entities/user.entity';
import { OPERATION } from './types';

@EntityRepository(NotifyEntity)
export class NotifyRepository extends Repository<NotifyEntity> {
  async createNotify(
    createNotifyDto: CreateNotifyDto,
    currentUser: UserEntity,
    operation: OPERATION,
    myUserId: string,
  ): Promise<{ notify: NotifyEntity; user: UserEntity }> {
    const user = {
      ...currentUser,
      badge: {
        ...currentUser.badge,
        [createNotifyDto.type.toLowerCase()]:
          operation === OPERATION.PLUS
            ? currentUser.badge[createNotifyDto.type.toLowerCase()] + 1
            : operation === OPERATION.MINUS &&
              currentUser.badge[createNotifyDto.type.toLowerCase()] > 1
            ? currentUser.badge[createNotifyDto.type.toLowerCase()] - 1
            : 0,
      },
    };

    const notify = {
      ...createNotifyDto,
      myUserId,
      user,
    } as NotifyEntity;

    operation === OPERATION.MINUS
      ? await this.delete({
          myUserId,
          postId: createNotifyDto.postId || null,
          userId: createNotifyDto.userId,
          commentId: createNotifyDto.commentId || null,
          type: createNotifyDto.type,
        })
      : await this.save(notify);

    return {
      notify,
      user,
    };
  }
}
