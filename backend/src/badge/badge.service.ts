import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BadgeRepository } from './badge.repository';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class BadgeService {
  constructor(
    @InjectRepository(BadgeRepository)
    private badgeRepository: BadgeRepository,
  ) {}

  async getBadge(user: UserEntity) {
    return this.badgeRepository.getBadge(user);
  }
}
