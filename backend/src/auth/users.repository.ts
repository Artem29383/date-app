import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';

@EntityRepository(UserEntity)
export class UsersRepository extends Repository<UserEntity> {
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
}
