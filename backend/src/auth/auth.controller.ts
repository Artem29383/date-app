import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { LoginCredentialsDto } from './dto/login-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() createAuthDto: AuthCredentialsDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('/login')
  login(@Body() loginCredentialsDto: LoginCredentialsDto) {
    return this.authService.login(loginCredentialsDto);
  }
}
