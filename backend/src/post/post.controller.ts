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
import { PostEntity } from './post.entity';
import { NotifyService } from '../notify/notify.service';

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
  @Delete(':id')
  removePost(@Param('id') id: string) {
    return this.postService.removePost(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/publications')
  getPostsUser(
    @GetUser() user: UserEntity,
    @Query() filterDto: GetPostsFilterDto,
  ) {
    return this.postService.getPostsUser(filterDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/bookmarks')
  getBookmarksUser(
    @GetUser() user: UserEntity,
    @Query() filterDto: GetPostsFilterDto,
  ) {
    return this.postService.getBookmarksUser(filterDto, user);
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

  @Post(':id/bookmark')
  @UseGuards(JwtAuthGuard)
  async addPostToBookmark(
    @GetUser() user: UserEntity,
    @Param('id') id: string,
  ): Promise<PostEntity> {
    return await this.postService.addPostToBookmark(id, user);
  }

  @Delete(':id/bookmark')
  @UseGuards(JwtAuthGuard)
  async removePostFromBookmark(
    @GetUser() user: UserEntity,
    @Param('id') id: string,
  ): Promise<PostEntity> {
    return await this.postService.removePostFromBookmark(id, user);
  }
}
