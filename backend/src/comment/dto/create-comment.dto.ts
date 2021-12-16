import { IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  text: string;

  @IsString()
  postId: string;

  @IsString()
  userId: string;

  @IsString()
  username: string;

  @IsString()
  userAvatar: string;
}
