import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { PostEntity } from '../../post/post.entity';
import { UserFollowersEntity } from './user-followers.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ unique: true })
  username: string;

  @Column({ default: 0 })
  followersCount: number;

  @Column()
  countries: string;

  @Column({ nullable: true })
  avatarUrl?: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  age?: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @OneToMany(() => PostEntity, (post) => post.user, { eager: true })
  posts: PostEntity[];

  @OneToMany(() => UserFollowersEntity, (follower) => follower.user, {
    eager: true,
  })
  followers: UserFollowersEntity[];

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  @ManyToMany(() => PostEntity)
  @JoinTable()
  favorites: PostEntity[];

  @ManyToMany(() => PostEntity)
  @JoinTable()
  bookmarks: PostEntity[];
}
