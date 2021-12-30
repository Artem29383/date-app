import { IsString } from 'class-validator';

export class RemoveReplyDto {
  @IsString()
  commentId: string;

  @IsString()
  replyId: string;
}
