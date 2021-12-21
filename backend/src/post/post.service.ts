import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './post.entity';
import { PostRepository } from './post.repository';
import { UserEntity } from '../user/entities/user.entity';
import { GetPostsFilterDto } from './dto/get-postsfilter.dto';
import { UsersRepository } from '../auth/users.repository';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostRepository)
    private postRepository: PostRepository,
    @InjectRepository(UsersRepository)
    private userRepository: UsersRepository,
  ) {}

  createPost(
    createPostDto: CreatePostDto,
    user: UserEntity,
  ): Promise<PostEntity> {
    return this.postRepository.createPost(createPostDto, user);
  }

  removePost(id: string): Promise<void> {
    return this.postRepository.removePost(id);
  }

  async getPostsUser(getPostsFilterDto: GetPostsFilterDto, user: UserEntity) {
    const currentUser = await this.userRepository.findOne(user.id, {
      relations: ['favorites', 'bookmarks'],
    });

    return this.postRepository.getPostsUser(getPostsFilterDto, currentUser);
  }

  async getBookmarksUser(
    getPostsFilterDto: GetPostsFilterDto,
    user: UserEntity,
  ) {
    const currentUser = await this.userRepository.findOne(user.id, {
      relations: ['bookmarks'],
    });

    return this.postRepository.getBookmarksUser(getPostsFilterDto, currentUser);
  }

  async addPostToFavorite(id: string, user: UserEntity): Promise<PostEntity> {
    const currentUser = await this.userRepository.findOne(user.id, {
      relations: ['favorites'],
    });

    const { user: userChanged, post } =
      await this.postRepository.addPostToFavorite(id, currentUser);

    await this.userRepository.save(userChanged);
    await this.postRepository.save(post);

    return post;
  }

  async addPostToBookmark(id: string, user: UserEntity): Promise<PostEntity> {
    const currentUser = await this.userRepository.findOne(user.id, {
      relations: ['bookmarks'],
    });

    const { user: userChanged, post } =
      await this.postRepository.addPostToBookmark(id, currentUser);

    await this.userRepository.save(userChanged);
    await this.postRepository.save(post);

    return post;
  }

  async removePostFromFavorite(
    id: string,
    user: UserEntity,
  ): Promise<PostEntity> {
    const currentUser = await this.userRepository.findOne(user.id, {
      relations: ['favorites'],
    });

    const { user: userChanged, post } =
      await this.postRepository.removePostFromFavorite(id, currentUser);

    await this.userRepository.save(userChanged);
    await this.postRepository.save(post);

    return post;
  }

  async removePostFromBookmark(
    id: string,
    user: UserEntity,
  ): Promise<PostEntity> {
    const currentUser = await this.userRepository.findOne(user.id, {
      relations: ['bookmarks'],
    });

    const { user: userChanged, post } =
      await this.postRepository.removePostFromBookmark(id, currentUser);

    await this.userRepository.save(userChanged);
    await this.postRepository.save(post);

    return post;
  }
}
