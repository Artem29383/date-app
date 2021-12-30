import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { PostEntity } from '../../post/post.entity';
import { UserFollowersEntity } from './user-followers.entity';
import { CommentEntity } from '../../comment/comment.entity';
import { ReplyEntity } from '../../reply/reply.entity';
import { NotifyEntity } from '../../notify/notify.entity';
import { BadgeEntity } from '../../badge/badge.entity';

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

  @OneToMany(() => NotifyEntity, (notify) => notify.user, { eager: true })
  notifications: NotifyEntity[];

  @OneToOne(() => BadgeEntity, (badge) => badge.user, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  badge: BadgeEntity;

  @OneToMany(() => UserFollowersEntity, (follower) => follower.user, {
    eager: true,
  })
  // @Exclude({ toPlainOnly: true })
  followers: UserFollowersEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.user, { eager: true })
  comments: CommentEntity[];

  @OneToMany(() => ReplyEntity, (replay) => replay.user, { eager: true })
  replays: ReplyEntity[];

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
