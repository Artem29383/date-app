import { EntityRepository, Repository } from 'typeorm';
import { CommentEntity } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PostEntity } from '../post/post.entity';
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

    post.commentCount++;

    return comment;
  }

  async removeCommentFromPost(id: string): Promise<void> {
    const response = await this.delete({
      id,
    });

    if (response.affected === 0) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
  }

  async getCommentsFromPost(postId: string): Promise<CommentEntity[]> {
    return await this.find({ postId });
  }
}
