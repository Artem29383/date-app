import { IsOptional, IsString } from 'class-validator';

export class GetFeedsDto {
  @IsOptional()
  @IsString()
  limit?: number;

  @IsOptional()
  @IsString()
  page?: number;
}
