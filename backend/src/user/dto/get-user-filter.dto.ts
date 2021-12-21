import { IsOptional, IsString } from 'class-validator';

export class GetUserFilterDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  limit?: number;

  @IsOptional()
  @IsString()
  offset?: number;
}
