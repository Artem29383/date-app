import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';
import { GetUser } from '../auth/get-user.decorator';
import { UserEntity } from '../user/entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetPostsFilterDto } from './dto/get-postsfilter.dto';
import { UserService } from '../user/user.service';
import { PostEntity } from './post.entity';

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

  @UseGuards(JwtAuthGuard)
  @Get('/publications')
  getPostsUser(
    @GetUser() user: UserEntity,
    @Query() filterDto: GetPostsFilterDto,
  ) {
    return this.postService.getPostsUser(filterDto, user);
  }

  @Post(':id/favorite')
  @UseGuards(JwtAuthGuard)
  async addPostToFavorite(
    @GetUser() user: UserEntity,
    @Param('id') id: string,
  ): Promise<PostEntity> {
    return await this.postService.addPostToFavorite(id, user);
  }

  @Delete(':id/favorite')
  @UseGuards(JwtAuthGuard)
  async removePostFromFavorite(
    @GetUser() user: UserEntity,
    @Param('id') id: string,
  ): Promise<PostEntity> {
    return await this.postService.removePostFromFavorite(id, user);
  }

  // @Post(':id/comment')
  // @UseGuards(JwtAuthGuard)
  // async addCommentToPost(
  //   @GetUser() user: UserEntity,
  //   @Param('id') id: string,
  // ): Promise<PostEntity> {
  //   return await this.postService.addCommentToPost(id, user);
  // }
}
