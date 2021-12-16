import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { PostEntity } from '../post/post.entity';

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

  @Column({ default: '' })
  userAvatar: string;

  @Column()
  username: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => PostEntity, (post) => post.comments, { eager: false })
  @Exclude({ toPlainOnly: true })
  post: PostEntity;
}
