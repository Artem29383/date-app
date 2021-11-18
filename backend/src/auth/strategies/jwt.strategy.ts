import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersRepository } from '../users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { secretKey } from '../auth.module';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {
    super({
      secretOrKey: secretKey,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload): Promise<UserEntity> {
    const { email } = payload;
    const user: UserEntity = await this.usersRepository.findOne({ email });

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
