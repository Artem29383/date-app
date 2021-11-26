import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString } from 'class-validator';
import { Column } from 'typeorm';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsOptional()
  avatarUrl?: string;

  @IsString()
  email: string;

  @IsString()
  @IsOptional()
  username?: string;

  @Column()
  @IsOptional()
  description?: string;

  @Column()
  @IsOptional()
  age?: number;
}
