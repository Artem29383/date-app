import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PostEntity } from '../post/post.entity';
import { UserEntity } from '../user/entities/user.entity';
import { ReplyEntity } from '../reply/reply.entity';

@Entity()
export class CommentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @Column()
  postId: string;

  @Column()
  userId: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => PostEntity, (post) => post.comments, {
    eager: false,
  })
  post: PostEntity;

  @ManyToOne(() => UserEntity, (user) => user.comments, { eager: false })
  user: UserEntity;

  @OneToMany(() => ReplyEntity, (replay) => replay.comment, {
    eager: true,
    onDelete: 'CASCADE',
  })
  replays: ReplyEntity[];
}
