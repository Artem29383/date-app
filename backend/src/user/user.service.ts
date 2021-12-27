import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from '../auth/users.repository';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserFilterDto } from './dto/get-user-filter.dto';
import { UserEntity } from './entities/user.entity';
import { UsersFollowerRepository } from './usersFollow.repository';
import { FollowUserDto } from './dto/follow-user.dto';
import { PostRepository } from '../post/post.repository';
import { IPaginationMeta, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { PostEntity } from '../post/post.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly repository: UsersRepository,
    @InjectRepository(UsersFollowerRepository)
    private readonly followRepository: UsersFollowerRepository,
    @InjectRepository(PostRepository)
    private readonly postRepository: PostRepository,
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

  async getSubs(id: string) {
    const subsIds = await this.followRepository.getSubs(id);
    const followers = await this.repository
      .createQueryBuilder('follower')
      .whereInIds(subsIds.followers.map((elem) => elem.userFollowingId))
      .getMany();
    return { followers };
  }

  async getFeeds(
    user: UserEntity,
    page = 1,
    limit = 10,
  ): Promise<Pagination<unknown, IPaginationMeta>> {
    const currentUser = await this.repository.findOne(user.id, {
      relations: ['favorites'],
    });

    const { followers } = await this.getSubs(currentUser.id);
    const followersIds = followers.map((f) => f.id);
    const favIds = currentUser.favorites.map((f) => f.id);

    if (!followersIds.length)
      return {
        items: [],
        meta: {
          totalItems: 0,
          itemCount: 0,
          itemsPerPage: 10,
          totalPages: 1,
          currentPage: 1,
        },
      };

    const feeds = await this.postRepository
      .createQueryBuilder('posts')
      .innerJoinAndSelect('posts.user', 'u')
      .leftJoinAndSelect('posts.comments', 'com')
      .leftJoinAndSelect('com.replays', 'rep')
      .leftJoinAndSelect('rep.user', 'userRep')
      .leftJoinAndSelect('com.user', 'user')
      .where('u.id IN (:...followersIds)', { followersIds })
      .orderBy('posts.createdAt', 'ASC');

    const response = await paginate(feeds, { page, limit });

    return {
      items: response.items.map((i) => ({
        ...i,
        isFavorite: favIds.includes(i.id),
      })),
      meta: response.meta,
    };
  }
}
