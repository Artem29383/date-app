import { Controller, Post, Body, Get, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { LocalAuthGuard } from "./guards/local-auth.guard";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() createAuthDto: AuthCredentialsDto) {
    return this.authService.create(createAuthDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Body() loginCredentialsDto: LoginCredentialsDto) {
    return this.authService.login(loginCredentialsDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  profile(@Request() req) {
    delete req.user.password
    return req.user;
  }
}
