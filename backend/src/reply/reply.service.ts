import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReplyRepository } from './reply.repository';
import { CommentRepository } from '../comment/comment.repository';
import { UserEntity } from '../user/entities/user.entity';
import { CreateReplyDto } from './dto/create-reply.dto';
import { PostRepository } from '../post/post.repository';

@Injectable()
export class ReplyService {
  constructor(
    @InjectRepository(ReplyRepository)
    private replayRepository: ReplyRepository,
    @InjectRepository(CommentRepository)
    private commentRepository: CommentRepository,
    @InjectRepository(PostRepository)
    private postRepository: PostRepository,
  ) {}

  async getReplaysFromComment(commentId: string) {
    return this.replayRepository.getReplaysFromComment(commentId);
  }

  async removeReplayFromComment(replyId: string, commentId: string) {
    const comment = await this.commentRepository.findOne(
      {
        id: commentId,
      },
      { relations: ['post'] },
    );

    await this.postRepository.save({
      ...comment.post,
      commentCount: comment.post.commentCount - 1,
    });

    return this.replayRepository.removeReplayFromComment(replyId);
  }

  async addReplayToComment(user: UserEntity, createReplayDto: CreateReplyDto) {
    const comment = await this.commentRepository.findOne(
      {
        id: createReplayDto.commentId,
      },
      { relations: ['post'] },
    );

    const replay = await this.replayRepository.createReplayToComment(
      createReplayDto,
      comment,
      user.id,
    );

    await this.postRepository.save({
      ...comment.post,
      commentCount: comment.post.commentCount + 1,
    });

    await this.replayRepository.save(replay);

    return {
      ...replay,
      user: {
        username: user.username,
        avatarUrl: user.avatarUrl,
      },
    };
  }
}
