import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';

@Entity()
export class NotifyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column({ default: false })
  viewed: boolean;

  @Column()
  userId: string;

  @Column()
  myUserId: string;

  @Column({ default: null })
  commentId: string;

  @Column({ default: null })
  postId: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.notifications, { eager: false })
  user: UserEntity;
}
