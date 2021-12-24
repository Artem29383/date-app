import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PostRepository } from '../post/post.repository';
import { CommentEntity } from './comment.entity';
import { RemoveCommentDto } from './dto/remove-comment.dto';
import { UsersRepository } from '../auth/users.repository';
import { PostEntity } from '../post/post.entity';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentRepository)
    private commentRepository: CommentRepository,
    @InjectRepository(PostRepository)
    private postRepository: PostRepository,
    @InjectRepository(UsersRepository)
    private userRepository: UsersRepository,
  ) {}

  async createCommentToPost(
    createCommentDto: CreateCommentDto,
    user: UserEntity,
  ): Promise<{
    createdAt: Date;
    post: PostEntity;
    id: string;
    text: string;
    postId: string;
    userId: string;
    user: { avatarUrl: string; username: string };
    updatedAt: Date;
  }> {
    const post = await this.postRepository.findById(createCommentDto.postId);
    if (post.disableComments)
      throw new HttpException(
        'You can"t add comment for this post',
        HttpStatus.METHOD_NOT_ALLOWED,
      );
    const comment = await this.commentRepository.createCommentToPost(
      createCommentDto,
      post,
      user.id,
    );

    await this.postRepository.save(post);
    await this.commentRepository.save(comment);

    return {
      ...comment,
      user: {
        username: user.username,
        avatarUrl: user.avatarUrl,
      },
    };
  }

  async removeCommentFromPost(id: string): Promise<void> {
    const comment = await this.commentRepository.findOne({ id });
    const post = await this.postRepository.findById(comment.postId);

    post.commentCount--;
    await this.postRepository.save(post);

    return this.commentRepository.removeCommentFromPost(id);
  }

  async getCommentsFromPost(postId: string): Promise<CommentEntity[]> {
    return this.commentRepository.getCommentsFromPost(postId);
  }
}
