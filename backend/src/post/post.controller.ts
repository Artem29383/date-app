import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';
import { GetUser } from '../auth/get-user.decorator';
import { UserEntity } from '../auth/entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  createPost(
    @Body() createPostDto: CreatePostDto,
    @GetUser() user: UserEntity,
  ) {
    return this.postService.createPost(createPostDto, user);
  }
}
