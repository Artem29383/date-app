import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  description: string;

  disableComments: boolean;

  @IsString()
  @IsNotEmpty()
  avatarUrl: string;
}
