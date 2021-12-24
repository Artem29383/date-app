import { PostEntity } from './post.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UserEntity } from '../user/entities/user.entity';
import { GetPostsFilterDto } from './dto/get-postsfilter.dto';
import {
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
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

  async removePost(id: string): Promise<void> {
    const response = await this.delete({
      id,
    });

    if (response.affected === 0) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
  }

  async getPostsUser(
    getPostsFilterDto: GetPostsFilterDto,
    currentUser: UserEntity,
  ): Promise<{ counts: number; posts: PostEntity[] }> {
    const { id } = getPostsFilterDto;
    try {
      const query = this.createQueryBuilder('posts').innerJoinAndSelect(
        'posts.user',
        'u',
      );
      query.where({ user: id });
      query.orderBy('posts.createdAt', 'DESC');

      const counts = await query.getCount();

      if (getPostsFilterDto.limit) {
        query.limit(getPostsFilterDto.limit);
      }

      if (getPostsFilterDto.offset) {
        query.offset(getPostsFilterDto.offset);
      }

      let posts: PostEntity[] = (await query.getMany()) as PostEntity[];
      const favIds = currentUser.favorites.map((id) => id.id);

      const bookmarksIds = currentUser.bookmarks.map((id) => id.id);

      posts = posts
        .reduce((acc, post: PostEntity) => {
          favIds.includes(post.id)
            ? acc.push({
                ...post,
                isFavorite: true,
              })
            : acc.push({
                ...post,
                isFavorite: false,
              });
          return acc;
        }, [])
        .reduce((acc, post: PostEntity) => {
          bookmarksIds.includes(post.id)
            ? acc.push({
                ...post,
                isBookmark: true,
              })
            : acc.push({
                ...post,
                isBookmark: false,
              });
          return acc;
        }, []);

      return {
        posts,
        counts,
      };
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async getBookmarksUser(
    getPostsFilterDto: GetPostsFilterDto,
    currentUser: UserEntity,
  ): Promise<{ counts: number; posts: PostEntity[] }> {
    try {
      return {
        posts: currentUser.bookmarks,
        counts: currentUser.bookmarks.length,
      };
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  async findById(id: string): Promise<PostEntity> {
    const post = await this.findOne({ id }, { relations: ['user'] });

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
