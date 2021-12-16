import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PostRepository } from '../post/post.repository';
import { CommentEntity } from './comment.entity';
import { RemoveCommentDto } from './dto/remove-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentRepository)
    private commentRepository: CommentRepository,
    @InjectRepository(PostRepository)
    private postRepository: PostRepository,
  ) {}

  async createCommentToPost(
    createCommentDto: CreateCommentDto,
  ): Promise<CommentEntity> {
    const post = await this.postRepository.findById(createCommentDto.postId);
    if (post.disableComments)
      throw new HttpException(
        'You can"t add comment for this post',
        HttpStatus.METHOD_NOT_ALLOWED,
      );
    return this.commentRepository.createCommentToPost(createCommentDto, post);
  }

  async removeCommentFromPost(id: string): Promise<void> {
    return this.commentRepository.removeCommentFromPost(id);
  }

  async getCommentsFromPost(postId: string): Promise<CommentEntity[]> {
    return this.commentRepository.getCommentsFromPost(postId);
  }
}
