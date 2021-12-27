import { EntityRepository, Repository } from 'typeorm';
import { ReplyEntity } from './reply.entity';
import { CommentEntity } from '../comment/comment.entity';
import { CreateReplyDto } from './dto/create-reply.dto';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(ReplyEntity)
export class ReplyRepository extends Repository<ReplyEntity> {
  async getReplaysFromComment(commentId: string): Promise<ReplyEntity[]> {
    return await this.createQueryBuilder('replays')
      .leftJoinAndSelect('replays.user', 'u')
      .leftJoinAndSelect('replays.comment', 'com')
      .where('com.id = :commentId', { commentId })
      .getMany();
  }

  async removeReplayFromComment(replayId: string) {
    const response = await this.delete({
      id: replayId,
    });

    if (response.affected === 0) {
      throw new NotFoundException(`Replay with ID ${replayId} not found`);
    }
  }

  async createReplayToComment(
    createReplayDto: CreateReplyDto,
    comment: CommentEntity,
    userId: string,
  ): Promise<ReplyEntity> {
    return this.create({
      ...createReplayDto,
      userId,
      comment,
    });
  }
}
