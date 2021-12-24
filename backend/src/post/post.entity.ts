import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { UserEntity } from '../user/entities/user.entity';
import { CommentEntity } from '../comment/comment.entity';

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  avatarUrl: string;

  @Column({ default: '' })
  description: string;

  @Column()
  disableComments: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column({ default: 0 })
  favoritesCount: number;

  @Column({ default: 0 })
  commentCount: number;

  @ManyToOne(() => UserEntity, (user) => user.posts, { eager: false })
  // @Exclude({ toPlainOnly: true })
  user: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.post, { eager: true })
  comments: CommentEntity[];
}
