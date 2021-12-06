import { PostEntity } from './post.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UserEntity } from '../auth/entities/user.entity';

@EntityRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> {
  async createPost(
    createPostDto: CreatePostDto,
    user: UserEntity,
  ): Promise<PostEntity> {
    console.info('user', user);
    const post: PostEntity = this.create({
      ...createPostDto,
      user,
    });

    await this.save(post);
    return post;
  }
}
