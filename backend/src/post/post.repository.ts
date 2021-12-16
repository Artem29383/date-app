import { PostEntity } from './post.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UserEntity } from '../user/entities/user.entity';
import { GetPostsFilterDto } from './dto/get-postsfilter.dto';
import {
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> {
  async createPost(
    createPostDto: CreatePostDto,
    user: UserEntity,
  ): Promise<PostEntity> {
    const post: PostEntity = this.create({
      ...createPostDto,
      user,
    });

    await this.save(post);
    return post;
  }

  async getPostsUser(
    getPostsFilterDto: GetPostsFilterDto,
    currentUser: UserEntity,
  ) {
    const { id } = getPostsFilterDto;
    try {
      const query = this.createQueryBuilder('posts');
      query.where({ user: id });
      query.orderBy('posts.createdAt', 'DESC');

      const counts = await query.getCount();

      if (getPostsFilterDto.limit) {
        query.limit(getPostsFilterDto.limit);
      }

      if (getPostsFilterDto.offset) {
        query.offset(getPostsFilterDto.offset);
      }

      const posts: PostEntity[] = (await query.getMany()) as PostEntity[];
      const favIds = currentUser.favorites.map((id) => id.id);

      return {
        posts: posts.reduce((acc, post: PostEntity) => {
          favIds.includes(post.id)
            ? acc.push({ ...post, isFavorite: true })
            : acc.push({ ...post, isFavorite: false });
          return acc;
        }, []),
        counts,
      };
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async findById(id: string): Promise<PostEntity> {
    const post = await this.findOne({ id });

    if (!post) throw new HttpException('Not found post', HttpStatus.NOT_FOUND);

    return post;
  }

  async addPostToFavorite(
    id: string,
    user: UserEntity,
  ): Promise<{ post: PostEntity; user: UserEntity }> {
    const post = await this.findById(id);

    const isNotFavorite =
      user.favorites.findIndex(
        (postFavorite) => postFavorite.id === post.id,
      ) === -1;

    if (isNotFavorite) {
      user.favorites.push(post);
      post.favoritesCount++;
    }

    return { post, user };
  }

  async addPostToBookmark(
    id: string,
    user: UserEntity,
  ): Promise<{ post: PostEntity; user: UserEntity }> {
    const post = await this.findById(id);

    const isNotInBookmark =
      user.bookmarks.findIndex(
        (bookmarkPost) => bookmarkPost.id === post.id,
      ) === -1;

    if (isNotInBookmark) {
      user.bookmarks.push(post);
    }

    return { post, user };
  }

  async removePostFromFavorite(
    id: string,
    user: UserEntity,
  ): Promise<{ post: PostEntity; user: UserEntity }> {
    const post = await this.findById(id);

    const indexFavorite = user.favorites.findIndex(
      (postFavorite) => postFavorite.id === post.id,
    );

    if (indexFavorite >= 0) {
      user.favorites.splice(indexFavorite, 1);
      post.favoritesCount--;
    }

    return { post, user };
  }

  async removePostFromBookmark(
    id: string,
    user: UserEntity,
  ): Promise<{ post: PostEntity; user: UserEntity }> {
    const post = await this.findById(id);

    const indexBookmark = user.bookmarks.findIndex(
      (bookmarkPost) => bookmarkPost.id === post.id,
    );

    if (indexBookmark >= 0) {
      user.favorites.splice(indexBookmark, 1);
    }

    return { post, user };
  }
}
