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
import { CommentService } from './comment.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateCommentDto } from './dto/create-comment.dto';
import { RemoveCommentDto } from './dto/remove-comment.dto';
import { CommentEntity } from './comment.entity';
import { PostEntity } from '../post/post.entity';
import { GetUser } from '../auth/get-user.decorator';
import { UserEntity } from '../user/entities/user.entity';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createCommentToPost(
    @GetUser() user: UserEntity,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<{
    createdAt: Date;
    post: PostEntity;
    id: string;
    text: string;
    postId: string;
    userId: string;
    user: { avatarUrl: string; username: string };
    updatedAt: Date;
  }> {
    return this.commentService.createCommentToPost(createCommentDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  removeCommentFromPost(@Param('id') id: string): Promise<void> {
    return this.commentService.removeCommentFromPost(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getCommentsFromPost(
    @Query('postId') postId: string,
  ): Promise<CommentEntity[]> {
    return this.commentService.getCommentsFromPost(postId);
  }
}
