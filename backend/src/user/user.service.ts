import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from '../auth/users.repository';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly repository: UsersRepository,
  ) {}

  async updateUser(updateUserDto: UpdateUserDto) {
    return this.repository.updateUser(updateUserDto);
  }

  async getUserById(id: string) {
    return this.repository.getUserById(id);
  }
}
