import { IsOptional, IsString } from 'class-validator';

export class GetPostsFilterDto {
  @IsString()
  id?: string;

  @IsOptional()
  limit?: number;

  @IsOptional()
  offset?: number;
}
