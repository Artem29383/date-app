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
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ReplyService } from './reply.service';
import { ReplyEntity } from './reply.entity';
import { GetUser } from '../auth/get-user.decorator';
import { UserEntity } from '../user/entities/user.entity';
import { CreateReplyDto } from './dto/create-reply.dto';

@Controller('reply')
export class ReplyController {
  constructor(private replayService: ReplyService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getReplaysFromComment(
    @Query('commentId') commentId: string,
  ): Promise<ReplyEntity[]> {
    return this.replayService.getReplaysFromComment(commentId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/add')
  addReplayToComment(
    @GetUser() user: UserEntity,
    @Body() createReplayDto: CreateReplyDto,
  ) {
    return this.replayService.addReplayToComment(user, createReplayDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':replyId')
  removeReplayFromComment(@Param('replyId') replayId: string) {
    return this.replayService.removeReplayFromComment(replayId);
  }
}
