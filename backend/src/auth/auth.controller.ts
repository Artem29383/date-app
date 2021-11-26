import {
  Controller,
  Post,
  Body,
  Get,
  Request,
  UseGuards,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() createAuthDto: AuthCredentialsDto) {
    return this.authService.create(createAuthDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Body() loginCredentialsDto: LoginCredentialsDto) {
    return this.authService.login(loginCredentialsDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get('/current')
  profile(@Request() req) {
    return req.user;
  }
}
