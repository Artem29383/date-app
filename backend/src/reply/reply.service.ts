import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReplyRepository } from './reply.repository';
import { CommentRepository } from '../comment/comment.repository';
import { UserEntity } from '../user/entities/user.entity';
import { CreateReplyDto } from './dto/create-reply.dto';

@Injectable()
export class ReplyService {
  constructor(
    @InjectRepository(ReplyRepository)
    private replayRepository: ReplyRepository,
    @InjectRepository(CommentRepository)
    private commentRepository: CommentRepository,
  ) {}

  async getReplaysFromComment(commentId: string) {
    return this.replayRepository.getReplaysFromComment(commentId);
  }

  async removeReplayFromComment(replayId: string) {
    return this.replayRepository.removeReplayFromComment(replayId);
  }

  async addReplayToComment(user: UserEntity, createReplayDto: CreateReplyDto) {
    const comment = await this.commentRepository.findOne({
      id: createReplayDto.commentId,
    });

    const replay = await this.replayRepository.createReplayToComment(
      createReplayDto,
      comment,
      user.id,
    );

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
