import { IsString } from 'class-validator';

export class FollowUserDto {
  @IsString()
  userFollowingId?: string;
}
