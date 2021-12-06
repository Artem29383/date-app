import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { UserEntity } from '../auth/entities/user.entity';

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

  @ManyToOne(() => UserEntity, (user) => user.posts, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: UserEntity;
}
