import { IsString } from 'class-validator';

export class RemoveCommentDto {
  @IsString()
  commentId: string;
}
