import { EntityRepository, Repository } from 'typeorm';
import { UserFollowersEntity } from './entities/user-followers.entity';
import { FollowUserDto } from './dto/follow-user.dto';

@EntityRepository(UserFollowersEntity)
export class UsersFollowerRepository extends Repository<UserFollowersEntity> {
  constructor() {
    super();
  }

  async follow(filterDto: FollowUserDto, user): Promise<UserFollowersEntity> {
    const followUser: UserFollowersEntity = this.create({
      ...filterDto,
      user,
    });
    await this.save(followUser);
    return followUser;
  }

  async unfollow(unfollowUserDto: FollowUserDto, user) {
    const query = await this.createQueryBuilder('follower')
      .innerJoinAndSelect('follower.user', 'user')
      .where({ userFollowingId: unfollowUserDto.userFollowingId })
      .andWhere('user.id = :userFollowId', {
        userFollowId: `${user.id}`,
      })
      .getOne();

    await this.delete({ id: query.id });

    return true;
  }

  async getFollowers(id: string) {
    const query = this.createQueryBuilder('followers');
    query.where({ userFollowingId: id });

    return await query.getMany();
  }
}
