import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from '../auth/users.repository';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserFilterDto } from './dto/get-user-filter.dto';
import { UserEntity } from './entities/user.entity';
import { UserFollowersEntity } from './entities/user-followers.entity';
import { UsersFollowerRepository } from './usersFollow.repository';
import { FollowUserDto } from './dto/follow-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly repository: UsersRepository,
    @InjectRepository(UsersFollowerRepository)
    private readonly followRepository: UsersFollowerRepository,
  ) {}

  async updateUser(updateUserDto: UpdateUserDto) {
    return this.repository.updateUser(updateUserDto);
  }

  async getUserById(id: string, userCurrent: UserEntity) {
    const user = await this.repository.getUserById(id);
    const qb = await this.followRepository
      .createQueryBuilder('follower')
      .innerJoinAndSelect('follower.user', 'user')
      .where('user.id = :userFollowId', {
        userFollowId: `${id}`,
      })
      .getCount();

    const query = await this.followRepository
      .createQueryBuilder('follower')
      .innerJoinAndSelect('follower.user', 'user')
      .where({ userFollowingId: id })
      .andWhere('user.id = :userFollowId', {
        userFollowId: `${userCurrent.id}`,
      })
      .getCount();

    const isFollow = Boolean(query);

    return { ...user, isFollow, subsCount: qb };
  }

  async getUsers(
    filterDto: GetUserFilterDto,
    user: UserEntity,
  ): Promise<{ users: UserEntity[]; counts: number }> {
    return this.repository.getUsers(filterDto, user);
  }

  async follow(followUserDto: FollowUserDto, user: UserEntity) {
    const currentUser = await this.repository.getUserById(
      followUserDto.userFollowingId,
    );
    currentUser.followersCount = currentUser.followersCount + 1;

    await this.repository.save(currentUser);

    return this.followRepository.follow(followUserDto, user);
  }

  async unfollow(unfollowUserDto: FollowUserDto, user: UserEntity) {
    const currentUser = await this.repository.getUserById(
      unfollowUserDto.userFollowingId,
    );
    currentUser.followersCount = currentUser.followersCount - 1;

    await this.repository.save(currentUser);

    return this.followRepository.unfollow(unfollowUserDto, user);
  }

  async getFollowers(id: string) {
    return this.followRepository.getFollowers(id);
  }
}
