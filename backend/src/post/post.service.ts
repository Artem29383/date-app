import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './post.entity';
import { PostRepository } from './post.repository';
import { UserEntity } from '../auth/entities/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostRepository)
    private postRepository: PostRepository,
  ) {}

  createPost(
    createPostDto: CreatePostDto,
    user: UserEntity,
  ): Promise<PostEntity> {
    return this.postRepository.createPost(createPostDto, user);
  }
}
