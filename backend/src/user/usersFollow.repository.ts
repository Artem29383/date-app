import { EntityRepository, Repository } from 'typeorm';
import { UserFollowersEntity } from './entities/user-followers.entity';
import { FollowUserDto } from './dto/follow-user.dto';
import { UserEntity } from './entities/user.entity';

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

  async unfollow(unfollowUserDto: FollowUserDto, user: UserEntity) {
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
    const followers = await this.createQueryBuilder('follower')
      .leftJoinAndSelect('follower.user', 'user')
      .select([
        'follower.userFollowingId',
        'user.id',
        'user.username',
        'user.avatarUrl',
      ])
      .where({ userFollowingId: id })
      .getMany();

    return { followers: followers.map((elem) => elem.user) };
  }

  async getSubs(id: string) {
    const followers = await this.createQueryBuilder('follower')
      .leftJoinAndSelect('follower.user', 'user')
      .where('user.id = :userFollowId', {
        userFollowId: `${id}`,
      })
      .select(['follower.userFollowingId'])
      .getMany();

    return { followers };
  }
}
