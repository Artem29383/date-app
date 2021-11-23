import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from '../auth/users.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly repository: UsersRepository,
  ) {}

  async uploadAvatar(updateUserDto: UpdateUserDto) {
    return this.repository.updateAvatar(updateUserDto);
  }
}
