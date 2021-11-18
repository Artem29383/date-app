import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { Roles } from '../../types';

export class AuthCredentialsDto {
  @IsString()
  email: string;

  @Length(6, 32)
  @IsString()
  password: string;

  @IsString()
  @Length(2, 32)
  username: string;

  @IsString()
  countries: string;

  @IsString()
  @IsOptional()
  avatarUrl?: string;

  @IsString()
  @IsOptional()
  @IsEnum(Roles)
  role: string;
}
