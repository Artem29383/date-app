import { IsString, Length } from 'class-validator';

export class LoginCredentialsDto {
  @IsString()
  email: string;

  @Length(6, 32)
  @IsString()
  password: string;
}
