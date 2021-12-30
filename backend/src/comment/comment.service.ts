import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PostRepository } from '../post/post.repository';
import { CommentEntity } from './comment.entity';
import { UsersRepository } from '../auth/users.repository';
import { PostEntity } from '../post/post.entity';
import { UserEntity } from '../user/entities/user.entity';
import { NotifyType, OPERATION } from '../notify/types';
import { NotifyService } from '../notify/notify.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentRepository)
    private commentRepository: CommentRepository,
    @InjectRepository(PostRepository)
    private postRepository: PostRepository,
    @InjectRepository(UsersRepository)
    private userRepository: UsersRepository,
    private notifyService: NotifyService,
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
    await this.notifyService.createNotify(
      {
        userId: comment.userId,
        type: NotifyType.COMMENT,
        postId: post.id,
        commentId: comment.id,
      },
      OPERATION.PLUS,
      user.id,
    );

    return {
      ...comment,
      user: {
        username: user.username,
        avatarUrl: user.avatarUrl,
      },
    };
  }

  async removeCommentFromPost(id: string, user: UserEntity): Promise<void> {
    const comment = await this.commentRepository.findOne(
      { id },
      {
        relations: ['post'],
      },
    );

    comment.post.commentCount =
      comment.post.commentCount - 1 - comment.replays.length;
    await this.postRepository.save(comment.post);
    await this.notifyService.createNotify(
      {
        userId: comment.userId,
        type: NotifyType.COMMENT,
        postId: comment.postId,
        commentId: comment.id,
      },
      OPERATION.MINUS,
      user.id,
    );

    return this.commentRepository.removeCommentFromPost(id);
  }

  async getCommentsFromPost(postId: string): Promise<CommentEntity[]> {
    return this.commentRepository.getCommentsFromPost(postId);
  }
}
