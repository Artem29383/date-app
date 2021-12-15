import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateCommentDto } from './dto/create-comment.dto';
import { RemoveCommentDto } from './dto/remove-comment.dto';
import { CommentEntity } from './comment.entity';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createCommentToPost(
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<CommentEntity> {
    return this.commentService.createCommentToPost(createCommentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  removeCommentFromPost(
    @Body() removeCommentDto: RemoveCommentDto,
  ): Promise<void> {
    return this.commentService.removeCommentFromPost(removeCommentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getCommentsFromPost(
    @Query('postId') postId: string,
  ): Promise<CommentEntity[]> {
    return this.commentService.getCommentsFromPost(postId);
  }
}
