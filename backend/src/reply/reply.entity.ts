import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CommentEntity } from '../comment/comment.entity';
import { UserEntity } from '../user/entities/user.entity';

@Entity()
export class ReplyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @Column()
  replyUsername: string;

  @Column()
  userId: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => CommentEntity, (comment) => comment.replays, {
    eager: false,
    onDelete: 'CASCADE',
  })
  comment: CommentEntity;

  @ManyToOne(() => UserEntity, (user) => user.replays, { eager: false })
  user: UserEntity;
}
