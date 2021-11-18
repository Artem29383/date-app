import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginCredentialsDto } from './dto/login-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly repository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  create(createAuthDto: AuthCredentialsDto) {
    return this.repository.createUser(createAuthDto);
  }

  async login(loginCredentialsDto: LoginCredentialsDto) {
    const { email, password } = loginCredentialsDto;
    const user = await this.repository.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { email };
      const accessToken: string = await this.jwtService.sign(payload);
      delete user.password;
      return { ...user, accessToken };
    }

    throw new UnauthorizedException('Please check your login credentials');
  }
}
