import { Injectable } from '@nestjs/common';
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

    return this.commentRepository.createCommentToPost(createCommentDto, post);
  }

  async removeCommentFromPost(
    removeCommentDto: RemoveCommentDto,
  ): Promise<void> {
    const post = await this.postRepository.findById(removeCommentDto.postId);

    return this.commentRepository.removeCommentFromPost(removeCommentDto, post);
  }

  async getCommentsFromPost(postId: string): Promise<CommentEntity[]> {
    return this.commentRepository.getCommentsFromPost(postId);
  }
}
