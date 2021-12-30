import { EntityRepository, Repository } from 'typeorm';
import { BadgeEntity } from './badge.entity';
import { UserEntity } from '../user/entities/user.entity';

@EntityRepository(BadgeEntity)
export class BadgeRepository extends Repository<BadgeEntity> {
  async createBadge(user: UserEntity) {
    const isExist = await this.findOne({ userId: user.id });

    if (isExist) return;
    const badge = await this.create({ userId: user.id, user });

    return await this.save(badge);
  }

  async getBadge(user: UserEntity) {
    return user.badge;
  }
}
