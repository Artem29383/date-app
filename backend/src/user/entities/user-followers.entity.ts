import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class UserFollowersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userFollowingId: string;

  @ManyToOne(() => UserEntity, (user) => user.followers, {
    eager: false,
  })
  @Exclude({ toPlainOnly: true })
  user: UserEntity;
}
