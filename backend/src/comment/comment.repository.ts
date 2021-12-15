import { EntityRepository, Repository } from 'typeorm';
import { CommentEntity } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PostEntity } from '../post/post.entity';
import { RemoveCommentDto } from './dto/remove-comment.dto';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(CommentEntity)
export class CommentRepository extends Repository<CommentEntity> {
  async createCommentToPost(
    createCommentDto: CreateCommentDto,
    post: PostEntity,
  ): Promise<CommentEntity> {
    const comment: CommentEntity = this.create({
      ...createCommentDto,
      post,
    });

    await this.save(comment);
    return comment;
  }

  async removeCommentFromPost(
    removeCommentDto: RemoveCommentDto,
    post: PostEntity,
  ): Promise<void> {
    const response = await this.delete({
      id: removeCommentDto.commentId,
      post,
    });

    if (response.affected === 0) {
      throw new NotFoundException(
        `Comment with ID ${removeCommentDto.commentId} not found`,
      );
    }
  }

  async getCommentsFromPost(postId: string): Promise<CommentEntity[]> {
    return await this.find({ postId });
  }
}
