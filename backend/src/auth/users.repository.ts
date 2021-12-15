import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

@EntityRepository(UserEntity)
export class UsersRepository extends Repository<UserEntity> {
  constructor() {
    super();
  }

  async createUser(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<UserEntity> {
    const user = this.create({ ...authCredentialsDto });

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(authCredentialsDto.password, salt);
    await this.save({ ...user, password: hashedPassword });

    delete user.password;
    return {
      ...user,
    };
  }

  //@TODO переделать на multer и обработку картинки на бэке
  async updateUser(updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const { email, avatarUrl, username, age, description } = updateUserDto;
    const user: UserEntity = await this.findOne({ email });
    user.avatarUrl = avatarUrl;
    user.username = username;
    user.description = description;
    user.age = age || 0;
    delete user.password;
    await this.save(user);
    return user;
  }

  async getUserById(id: string): Promise<UserEntity> {
    const user = await this.findOne(id);

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return user;
  }
}
