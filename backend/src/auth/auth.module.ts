import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { BadgeRepository } from '../badge/badge.repository';

export const secretKey = 'topsectersp1';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: secretKey,
      signOptions: { expiresIn: '24h' },
    }),
    TypeOrmModule.forFeature([UsersRepository, BadgeRepository]),
  ],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
