import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { GENDER } from '../../types';
import { UserEntity } from '../entities/user.entity';
import { UniqueOnDatabase } from '../validations/UniqueValidation';

export class AuthCredentialsDto {
  @IsString()
  @UniqueOnDatabase(UserEntity, { message: 'Такая почта уже есть' })
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
  description?: string;

  @IsString()
  @IsEnum(GENDER)
  gender: string;

  @IsString()
  @IsOptional()
  age?: number;
}
